

import React, { useState, useContext, useRef } from 'react';
import { AppContext } from '../App';
import Modal from '../components/Modal';
import { CheckIcon, WarningIcon, ArrowLeftIcon, PencilSquareIcon } from '../components/icons';
import { FaFileUpload, FaMagic, FaUserPlus, FaTrash, FaFileAlt, FaHome, FaStore, FaCopy, FaFileWord } from 'react-icons/fa';
import { Signer, SignerRole, TipoDocumento } from '../types';
import { GoogleGenAI, Type } from "@google/genai";
import LoaderOverlay from '../components/LoaderOverlay';
import { RENTAL_CONTRACT_TEMPLATE_COMERCIAL, RENTAL_CONTRACT_TEMPLATE_VIVIENDA } from '../constants';
import mammoth from 'mammoth';
import * as pdfjsLib from 'pdfjs-dist';
import SignaturePad from '../components/SignaturePad';

// Set the workerSrc to ensure pdf.js can find its worker script.
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://esm.sh/pdfjs-dist@4.5.136/build/pdf.worker.mjs';

const getClientIP = async (): Promise<string> => {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        if (!response.ok) return '192.168.1.1';
        const data = await response.json();
        return data.ip || '192.168.1.1';
    } catch (error) {
        console.error('Error getting client IP:', error);
        return '192.168.1.1';
    }
};

const fileToBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      resolve(result.split(',')[1]);
    };
    reader.onerror = (error) => reject(error);
  });

const mapTipoDocumentoToApiCode = (tipo: TipoDocumento): string => {
  switch (tipo) {
    case TipoDocumento.CEDULA_CIUDADANIA: return 'CC';
    case TipoDocumento.PASAPORTE: return 'PA';
    case TipoDocumento.CEDULA_EXTRANJERIA: return 'CE';
    default: return 'CC';
  }
};

const sendEmailNotification = async (payload: object) => {
    const endpoint = 'https://segurobolivar-trial.app.n8n.cloud/webhook-test/c8b708cb-c698-4403-80cc-e41c8489ab41';
    
    // 1) Standard fetch
    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });
        if (response.ok) {
            console.log('Email notification sent via standard fetch.');
            return;
        }
        console.warn('Standard fetch for email failed with status:', response.status);
    } catch (error) {
        console.warn('Standard fetch for email failed, falling back...', error);
    }

    // 2) navigator.sendBeacon
    try {
        if (navigator.sendBeacon) {
            const blob = new Blob([JSON.stringify(payload)], { type: 'text/plain' });
            if (navigator.sendBeacon(endpoint, blob)) {
                console.log('Email notification sent via sendBeacon.');
                return;
            }
        }
    } catch (error) {
        console.warn('sendBeacon for email failed, falling back...', error);
    }

    // 3) fetch with no-cors (last resort)
    try {
        await fetch(endpoint, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'text/plain',
            },
            body: JSON.stringify(payload),
        });
        console.log('Email notification sent via no-cors fetch (fire and forget).');
    } catch (error) {
        console.error('All methods to send email notification failed.', error);
    }
};

const EditSignerModal: React.FC<{
  signer: Signer;
  onClose: () => void;
  onSave: (signer: Signer) => void;
}> = ({ signer, onClose, onSave }) => {
  const [editForm, setEditForm] = useState(signer);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(editForm);
  };

  return (
    <Modal isOpen={true} onClose={onClose} title={`Editar Firmante: ${signer.name}`}>
      <form onSubmit={handleSave} className="text-left space-y-4">
        <div>
          <label htmlFor="editSignerName" className="block text-sm font-medium text-gray-700">Nombre Completo</label>
          <input id="editSignerName" type="text" value={editForm.name} onChange={e => setEditForm({ ...editForm, name: e.target.value })} className="mt-1 block w-full px-3 py-2 border border-gray-400 rounded-md shadow-sm" required />
        </div>
        <div>
            <label htmlFor="editSignerRole" className="block text-sm font-medium text-gray-700">Rol del Firmante</label>
            <select id="editSignerRole" value={editForm.role} onChange={e => setEditForm({ ...editForm, role: e.target.value as SignerRole })} className="mt-1 block w-full px-3 py-2 border border-gray-400 rounded-md shadow-sm" required >
                {Object.values(SignerRole).map(role => (<option key={role} value={role}>{role}</option>))}
            </select>
        </div>
        <div>
            <label htmlFor="editSignerDoc" className="block text-sm font-medium text-gray-700">No. Cédula de Ciudadanía</label>
            <input id="editSignerDoc" type="text" value={editForm.doc} onChange={e => setEditForm({ ...editForm, doc: e.target.value })} className="mt-1 block w-full px-3 py-2 border border-gray-400 rounded-md shadow-sm" required />
        </div>
        <div>
            <label htmlFor="editSignerPhone" className="block text-sm font-medium text-gray-700">Celular (10 dígitos)</label>
            <input id="editSignerPhone" type="tel" value={editForm.phone} onChange={e => setEditForm({ ...editForm, phone: e.target.value.replace(/\D/g, '') })} className="mt-1 block w-full px-3 py-2 border border-gray-400 rounded-md shadow-sm" required pattern="\d{10}" />
        </div>
        <div>
            <label htmlFor="editSignerEmail" className="block text-sm font-medium text-gray-700">Email</label>
            <input id="editSignerEmail" type="email" value={editForm.email} onChange={e => setEditForm({ ...editForm, email: e.target.value })} className="mt-1 block w-full px-3 py-2 border border-gray-400 rounded-md shadow-sm" required />
        </div>
        <div className="flex justify-end gap-3 pt-4">
            <button type="button" onClick={onClose} className="bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded-lg shadow-md">Cancelar</button>
            <button type="submit" className="bg-primary text-white font-semibold py-2 px-4 rounded-lg shadow-md">Guardar Cambios</button>
        </div>
      </form>
    </Modal>
  );
};


const ContractSigningPage: React.FC = () => {
  const appContext = useContext(AppContext);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [currentStep, setCurrentStep] = useState<'initial' | 'review'>('initial');
  const [contractSource, setContractSource] = useState<{ type: 'file', file: File } | { type: 'template', name: string, content: string } | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');

  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [processingText, setProcessingText] = useState<string>('');
  
  const [signers, setSigners] = useState<Signer[]>([]);
  const [signerSignatures, setSignerSignatures] = useState<Record<string, string>>({});
  const [signingSignerId, setSigningSignerId] = useState<string | null>(null);
  const [signerForm, setSignerForm] = useState({ name: '', tipoDocumento: TipoDocumento.CEDULA_CIUDADANIA, doc: '', email: '', phone: '', role: SignerRole.ARRENDATARIO });
  const [signerFormErrors, setSignerFormErrors] = useState<Partial<Record<keyof Omit<Signer, 'id'>, string>>>({});
  const [editingSigner, setEditingSigner] = useState<Signer | null>(null);
  const [showAddSignerForm, setShowAddSignerForm] = useState(false);
  
  const [apiError, setApiError] = useState('');
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isNoTransactionsModalOpen, setIsNoTransactionsModalOpen] = useState(false);
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);

  const [submittedSigners, setSubmittedSigners] = useState<Signer[]>([]);
  const [copyStatus, setCopyStatus] = useState<Record<string, string>>({});

  const resetState = () => {
    setCurrentStep('initial');
    setContractSource(null);
    setPreviewUrl('');
    setSigners([]);
    setApiError('');
    setEditingSigner(null);
    setShowAddSignerForm(false);
    if(fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const sendContractForSignature = async (signersToSend: Signer[], file: File | null, content: string): Promise<boolean> => {
    if (!appContext || !appContext.user) return false;
    
    setApiError('');
    
    const availableTransactions = appContext.user.cupoAsignado - appContext.user.cupoConsumido;
    if (availableTransactions < signersToSend.length) {
      setIsNoTransactionsModalOpen(true);
      return false;
    }

    try {
      setProcessingText('Enviando enlaces de firma...');
      setIsProcessing(true);
      const clientIP = await getClientIP();

      const signerPromises = signersToSend.map(async (signer) => {
        let sanitizedDoc: string;
        if (signer.tipoDocumento === TipoDocumento.CEDULA_CIUDADANIA) {
            sanitizedDoc = signer.doc.replace(/[^\d]/g, '');
        } else {
            sanitizedDoc = signer.doc.replace(/[^a-zA-Z0-9]/g, '');
        }
        
        const params = new URLSearchParams({
            d: sanitizedDoc,
            tc: mapTipoDocumentoToApiCode(signer.tipoDocumento),
            ip: clientIP,
            cs: signer.phone,
        });

        const response = await fetch(`https://2ncqe7ikzh.execute-api.us-east-1.amazonaws.com/stage/biometry/v1/start-validation?${params.toString()}`, {
            method: 'POST',
            headers: { 'x-api-key': import.meta.env.VITE_BIOMETRY_API_KEY || '' },
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({ message: `HTTP status ${response.status}` }));
          const detail = errorData?.message ? (typeof errorData.message === 'string' ? errorData.message : JSON.stringify(errorData.message)) : `Status: ${response.status}`;
          throw new Error(`Error para ${signer.name}: ${detail}`);
        }
        const data = await response.json();
        if (!data.url || !data.idValidation) {
          console.error('Biometrics API response was invalid:', data);
          throw new Error(`Respuesta inválida para ${signer.name}.`);
        }
        return { ...signer, biometriaUrl: data.url, idValidation: data.idValidation };
      });

      const signersWithBiometryData = await Promise.all(signerPromises);
      
      const newContract = appContext.addContract({
          fileName: file?.name ?? 'Contrato desde Plantilla.pdf',
          templateContent: content,
          signers: signersWithBiometryData,
      });
      
      if (appContext.user) {
        newContract.signers.forEach(signer => {
          if (!signer.biometriaUrl) return;
          const emailPayload = {
            email: signer.email,
            link: signer.biometriaUrl,
            id_solicitud: newContract.id,
            nombre_inmobiliaria: appContext.user!.nombreInmobiliaria,
            tipo_proceso: `Firma de Contrato: ${newContract.fileName}`
          };
          sendEmailNotification(emailPayload);
        });
      }

      setSubmittedSigners(newContract.signers);
      appContext.consumeTransactions(signersToSend.length);
      setIsSuccessModalOpen(true);
      resetState();
      return true;

    } catch (error) {
      console.error("Error en envío a biometría:", error);
      setApiError((error instanceof Error ? error.message : String(error)) || 'No se pudo completar la solicitud.');
      return false;
    } finally {
        setIsProcessing(false);
    }
  };
  
  const extractSignersWithGemini = async (file: File) => {
    setIsProcessing(true);
    setProcessingText('Analizando documento y extrayendo firmantes...');
    setApiError('');
    let extractedSigners: Signer[] = [];
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

      const schema = {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING, description: 'Nombre completo del firmante.' },
            tipoDocumento: { 
                type: Type.STRING, 
                description: `Tipo de documento. Este campo siempre debe ser "${TipoDocumento.CEDULA_CIUDADANIA}".`,
                enum: [TipoDocumento.CEDULA_CIUDADANIA]
            },
            doc: { type: Type.STRING, description: 'Número de documento de identidad del firmante. Limpiar puntos y comas.' },
            email: { type: Type.STRING, description: 'Correo electrónico del firmante. Si no está presente, devolver un string vacío "".' },
            phone: { type: Type.STRING, description: 'Número de teléfono o celular del firmante (10 dígitos). Si no está presente, devolver un string vacío "".' }
          },
          required: ['name', 'doc', 'tipoDocumento']
        }
      };
      
      const prompt = "Analiza el siguiente contrato y extrae la información de todos los firmantes (arrendador, arrendatario, deudores solidarios, etc.). Devuelve un arreglo de objetos JSON con los detalles de cada firmante. Para cada firmante, incluye 'name' (nombre completo), 'tipoDocumento' (este campo debe ser siempre 'Cédula de Ciudadanía'), 'doc' (número de documento sin puntos ni comas), 'email' (correo electrónico) y 'phone' (número de celular de 10 dígitos). Si el email o el teléfono no se encuentran en el documento para un firmante, devuelve un string vacío para esos campos. Si el tipo de documento es NIT, clasifícalo como Cédula de Ciudadanía.";

      let contents;
      const isWord = file.type.includes('word');

      if (isWord) {
        const arrayBuffer = await file.arrayBuffer();
        const { value: textContent } = await mammoth.extractRawText({ arrayBuffer });
        if (!textContent.trim()) {
            throw new Error("El documento de Word parece estar vacío o no se pudo leer el texto.");
        }
        contents = { parts: [{ text: prompt }, { text: textContent }] };
      } else { // PDF
        const base64String = await fileToBase64(file);
        contents = { parts: [{ text: prompt }, { inlineData: { mimeType: file.type, data: base64String } }] };
      }

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents,
        config: { responseMimeType: 'application/json', responseSchema: schema }
      });
      
      const parsedData = JSON.parse(response.text) as Omit<Signer, 'id' | 'role'>[];
      
      const signersWithId = parsedData.map(s => ({
        ...s,
        id: `signer-${Date.now()}-${Math.random()}`,
        role: SignerRole.ARRENDATARIO, // Default role, user can change it
      }));

      extractedSigners = signersWithId;
      setSigners(signersWithId);

      if (signersWithId.length === 0) {
        setApiError('No se encontraron firmantes en el documento. Por favor, añádalos manualmente.');
      }

    } catch (error) {
      console.error("Error extracting signers:", error);
      setApiError('Ocurrió un error al analizar el documento. Por favor, añada los firmantes manualmente.');
      setSigners([]);
      extractedSigners = [];
    } finally {
      setIsProcessing(false);
      setShowAddSignerForm(extractedSigners.length === 0);
    }
  };

  const processFile = async (file: File) => {
    setApiError('');
    setSigners([]);
    setContractSource({ type: 'file', file });
    
    const isWord = file.type.includes('word');

    if (isWord) {
        try {
            const arrayBuffer = await file.arrayBuffer();
            const { value: html } = await mammoth.convertToHtml({ arrayBuffer });
            const styledHtml = `<html><head><style>body{font-family:sans-serif;line-height:1.6;padding:2rem;max-width:800px;margin:auto;} h1,h2,h3{color:#333;} p{margin-bottom:1em;}</style></head><body>${html}</body></html>`;
            setPreviewUrl('data:text/html;charset=utf-8,' + encodeURIComponent(styledHtml));
        } catch (e) {
            console.error("Error converting Word to HTML", e);
            setPreviewUrl('');
        }
    } else { // PDF
        try {
            const arrayBuffer = await file.arrayBuffer();
            const pdf = await pdfjsLib.getDocument(arrayBuffer).promise;
            let fullText = '';
            for (let i = 1; i <= pdf.numPages; i++) {
                const page = await pdf.getPage(i);
                const textContent = await page.getTextContent();
                const pageText = textContent.items.map(item => ('str' in item ? item.str : '')).join(' ');
                fullText += pageText + '\n\n';
            }
            const htmlContent = fullText.replace(/\n/g, '<br />');
            const styledHtml = `<html><head><style>body{font-family:sans-serif;line-height:1.6;padding:2rem;max-width:800px;margin:auto;white-space:pre-wrap;word-wrap:break-word;}</style></head><body>${htmlContent}</body></html>`;
            setPreviewUrl('data:text/html;charset=utf-8,' + encodeURIComponent(styledHtml));
        } catch (error) {
            console.error("Error processing PDF for preview:", error);
            setPreviewUrl(URL.createObjectURL(file)); // Fallback if text extraction fails
        }
    }

    await extractSignersWithGemini(file);
    setCurrentStep('review');
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const allowedTypes = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
    if (allowedTypes.includes(file.type)) {
      processFile(file);
    } else {
      alert("Por favor, seleccione un archivo PDF o Word (.doc, .docx).");
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };
  
  const handleGenerateContract = (type: 'vivienda' | 'comercial') => {
    const template = type === 'vivienda' ? RENTAL_CONTRACT_TEMPLATE_VIVIENDA : RENTAL_CONTRACT_TEMPLATE_COMERCIAL;
    const name = type === 'vivienda' ? 'Contrato de Vivienda Urbana' : 'Contrato de Local Comercial';
    setContractSource({ type: 'template', name: name, content: template });
    setSigners([]);
    setApiError('');
    setShowAddSignerForm(true);
    setCurrentStep('review');
    setIsTemplateModalOpen(false);
  };

  const validateSignerForm = (): boolean => {
    const errors: Partial<Record<keyof Omit<Signer, 'id'>, string>> = {};
    if (!signerForm.name.trim()) errors.name = "Nombre requerido.";
    if (!signerForm.doc.trim()) errors.doc = "Documento requerido.";
    else if (!/^[a-zA-Z0-9.-]+$/.test(signerForm.doc.trim())) {
        errors.doc = "Formato de documento inválido.";
    }
    if (!signerForm.email.trim() || !/\S+@\S+\.\S+/.test(signerForm.email)) errors.email = "Email inválido.";
    if (!signerForm.phone.trim() || !/^\d{10}$/.test(signerForm.phone)) errors.phone = "Celular debe tener 10 dígitos.";
    setSignerFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  const handleAddSigner = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateSignerForm()) {
      setSigners([...signers, { ...signerForm, id: `signer-${Date.now()}` }]);
      setSignerForm({ name: '', tipoDocumento: TipoDocumento.CEDULA_CIUDADANIA, doc: '', email: '', phone: '', role: SignerRole.ARRENDATARIO });
      setSignerFormErrors({});
    }
  };

  const handleRemoveSigner = (id: string) => {
    setSigners(signers.filter(s => s.id !== id));
  };
  
  const handleUpdateSigner = (updatedSigner: Signer) => {
    setSigners(signers.map(s => s.id === updatedSigner.id ? updatedSigner : s));
    setEditingSigner(null);
  };

  const handleFinalSubmit = async () => {
    if (!contractSource) return;

    // Verificar que todos los firmantes hayan firmado
    const unsignedSigners = signers.filter(s => !signerSignatures[s.id]);
    if (unsignedSigners.length > 0) {
      setApiError(`Faltan firmas de: ${unsignedSigners.map(s => s.name).join(', ')}. Cada firmante debe firmar antes de enviar a verificación biométrica.`);
      return;
    }

    let success = false;
    if (contractSource.type === 'file') {
        success = await sendContractForSignature(signers, contractSource.file, '');
    } else {
        success = await sendContractForSignature(signers, null, contractSource.content);
    }
  };
  
  const handleCopy = (signerId: string, url: string) => {
    navigator.clipboard.writeText(url).then(() => {
        setCopyStatus(prev => ({ ...prev, [signerId]: '¡Copiado!' }));
        setTimeout(() => {
            setCopyStatus(prev => ({ ...prev, [signerId]: 'Copiar' }));
        }, 2000);
    }).catch(err => {
        console.error('Error al copiar el enlace: ', err);
        alert('No se pudo copiar el enlace.');
    });
  };

  const availableTransactions = appContext?.user ? appContext.user.cupoAsignado - appContext.user.cupoConsumido : 0;
  
  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <LoaderOverlay isVisible={isProcessing} text={processingText} />
      
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Firma de Contrato</h1>
        {currentStep === 'review' && (
            <button onClick={resetState} className="inline-flex items-center bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded-lg shadow-md text-sm hover:bg-gray-300">
                <ArrowLeftIcon className="w-4 h-4 mr-2" />
                Empezar de Nuevo
            </button>
        )}
      </div>
      
      {currentStep === 'initial' && (
        <div className="bg-white p-8 rounded-xl shadow-lg text-center">
            <div className="grid md:grid-cols-2 gap-6">
                <div 
                    className="border-2 border-dashed border-gray-300 rounded-lg p-8 flex flex-col items-center justify-center hover:border-danger-DEFAULT hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={() => fileInputRef.current?.click()}
                >
                    <FaFileUpload className="w-16 h-16 text-primary-DEFAULT mb-4"/>
                    <h3 className="font-semibold text-lg text-gray-800 mb-2">Adjuntar Contrato</h3>
                    <p className="text-sm text-gray-600 mb-4">Sube un archivo PDF o Word para iniciar el proceso.</p>
                    <input type="file" accept="application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
                    <button type="button" className="bg-primary text-white font-semibold py-2 px-4 rounded-lg shadow-md mt-auto pointer-events-none">
                        Seleccionar Archivo
                    </button>
                </div>
                <div 
                    className="border-2 border-dashed border-gray-300 rounded-lg p-8 flex flex-col items-center justify-center hover:border-danger-DEFAULT hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={() => setIsTemplateModalOpen(true)}
                >
                    <FaMagic className="w-16 h-16 text-primary-DEFAULT mb-4"/>
                    <h3 className="font-semibold text-lg text-gray-800 mb-2">Utilizar Plantilla</h3>
                    <p className="text-sm text-gray-600 mb-4">Elige un modelo de contrato y añade los firmantes manualmente.</p>
                    <button type="button" className="bg-primary text-white font-semibold py-2 px-4 rounded-lg shadow-md mt-auto pointer-events-none">
                        Elegir Plantilla
                    </button>
                </div>
            </div>
        </div>
      )}

      {currentStep === 'review' && contractSource && (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
            {/* --- COLUMNA DE VISTA PREVIA --- */}
            <div className="lg:col-span-3 bg-white p-4 rounded-xl shadow-lg">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">Vista Previa del Documento</h2>
                <div className="bg-gray-100 rounded-lg overflow-hidden">
                    {previewUrl ? (
                         <iframe src={previewUrl} className="w-full h-[70vh] border-0" title="Vista previa del Documento"></iframe>
                    ) : contractSource.type === 'template' ? (
                        <div className="w-full h-[70vh] p-4 overflow-y-auto">
                            <pre className="whitespace-pre-wrap text-sm text-gray-800 font-sans">{contractSource.content}</pre>
                        </div>
                    ) : (
                        <div className="w-full h-[70vh] border rounded-lg flex flex-col items-center justify-center bg-gray-50 text-gray-500 p-4 text-center">
                            {contractSource?.type === 'file' && contractSource.file.type.includes('word') ?
                                <FaFileWord className="w-16 h-16 mb-4" /> : <FaFileAlt className="w-16 h-16 mb-4" />
                            }
                            <p className="font-semibold">Generando vista previa...</p>
                            <p className="text-sm mt-1">Si la vista previa no carga, es posible que el archivo esté protegido o en un formato no compatible.</p>
                            <p className="text-sm mt-1 font-mono">{contractSource?.type === 'file' && contractSource.file.name}</p>
                        </div>
                    )}
                </div>
            </div>

            {/* --- COLUMNA DE FIRMANTES --- */}
            <div className="lg:col-span-2 space-y-6">
                <div className="bg-white p-6 rounded-xl shadow-lg">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">Firmantes del Contrato</h2>

                    {apiError && <p className="mb-4 text-sm text-center text-danger-dark bg-danger-light p-3 rounded-md">{apiError}</p>}
                    
                    {signers.length > 0 && (
                        <ul className="space-y-4 mb-4">
                            {signers.map(signer => (
                                <li key={signer.id} className="border rounded-lg bg-gray-50 overflow-hidden">
                                    <div className="p-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                                        <div className="flex-1">
                                            <p className="font-medium text-gray-800">{signer.name} <span className="text-xs font-semibold text-white bg-primary-DEFAULT px-2 py-0.5 rounded-full ml-2">{signer.role}</span></p>
                                            <p className="text-sm text-gray-500">{signer.email} / {signer.phone}</p>
                                            <p className="text-sm text-gray-500">{signer.tipoDocumento} - {signer.doc}</p>
                                        </div>
                                        <div className="flex gap-2 self-end sm:self-center flex-shrink-0">
                                            <button onClick={() => setEditingSigner(signer)} className="bg-gray-200 text-gray-700 p-2 rounded-full hover:bg-gray-300" title="Editar Firmante"><PencilSquareIcon className="w-5 h-5"/></button>
                                            <button onClick={() => handleRemoveSigner(signer.id)} className="bg-danger-light text-danger-dark p-2 rounded-full hover:bg-danger-DEFAULT hover:text-white" title="Eliminar Firmante"><FaTrash className="w-5 h-5" /></button>
                                        </div>
                                    </div>
                                    {/* Sección de firma inline para cada firmante */}
                                    <div className="border-t border-gray-200 p-3 bg-white">
                                      {signerSignatures[signer.id] ? (
                                        <div className="flex items-center gap-3">
                                          <span className="text-sm text-green-700 bg-green-100 px-3 py-1 rounded-full font-medium">✓ Firmado</span>
                                          <img src={signerSignatures[signer.id]} alt="Firma" className="h-10 border rounded" />
                                          <button
                                            onClick={() => setSignerSignatures(prev => { const copy = {...prev}; delete copy[signer.id]; return copy; })}
                                            className="text-xs text-gray-500 hover:text-primary underline ml-auto"
                                          >
                                            Cambiar firma
                                          </button>
                                        </div>
                                      ) : (
                                        <button
                                          onClick={() => setSigningSignerId(signer.id)}
                                          className="w-full flex items-center justify-center gap-2 py-3 px-4 border-2 border-dashed border-warning-DEFAULT rounded-lg text-warning-dark hover:bg-yellow-50 transition-colors font-medium text-sm"
                                        >
                                          ✏️ Firmar aquí — {signer.name}
                                        </button>
                                      )}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                    
                    {showAddSignerForm ? (
                        <div>
                          <h3 className="text-lg font-semibold text-gray-700 mb-3 border-t pt-4">Añadir Nuevo Firmante</h3>
                          <form onSubmit={handleAddSigner} className="grid grid-cols-1 gap-4">
                              <input placeholder="Nombre Completo" type="text" value={signerForm.name} onChange={e => setSignerForm({...signerForm, name: e.target.value})} className="block w-full px-3 py-2 border border-gray-400 rounded-md" />
                              {signerFormErrors.name && <p className="text-xs text-red-600 -mt-2">{signerFormErrors.name}</p>}
                              <select value={signerForm.role} onChange={e => setSignerForm({ ...signerForm, role: e.target.value as SignerRole })} className="block w-full px-3 py-2 border border-gray-400 rounded-md">
                                  {Object.values(SignerRole).map(role => (<option key={role} value={role}>{role}</option>))}
                              </select>
                              <input placeholder="No. Cédula de Ciudadanía" type="text" value={signerForm.doc} onChange={e => setSignerForm({...signerForm, doc: e.target.value})} className="block w-full px-3 py-2 border border-gray-400 rounded-md" />
                              {signerFormErrors.doc && <p className="text-xs text-red-600 -mt-2">{signerFormErrors.doc}</p>}
                              <input placeholder="Celular (10 dígitos)" type="tel" value={signerForm.phone} onChange={e => setSignerForm({ ...signerForm, phone: e.target.value.replace(/\D/g, '')})} className="block w-full px-3 py-2 border border-gray-400 rounded-md" />
                              {signerFormErrors.phone && <p className="text-xs text-red-600 -mt-2">{signerFormErrors.phone}</p>}
                              <input placeholder="Email" type="email" value={signerForm.email} onChange={e => setSignerForm({ ...signerForm, email: e.target.value})} className="block w-full px-3 py-2 border border-gray-400 rounded-md" />
                              {signerFormErrors.email && <p className="text-xs text-red-600 -mt-2">{signerFormErrors.email}</p>}
                              <button type="submit" className="inline-flex items-center justify-center bg-primary text-white font-semibold py-2 px-4 rounded-lg shadow-md">
                                  <FaUserPlus className="mr-2"/> Añadir Firmante
                              </button>
                          </form>
                        </div>
                     ) : (
                        <div className="border-t pt-4 mt-4">
                            <button
                                type="button"
                                onClick={() => setShowAddSignerForm(true)}
                                className="w-full inline-flex items-center justify-center bg-gray-100 text-gray-700 font-semibold py-2 px-4 rounded-lg shadow-sm hover:bg-gray-200"
                            >
                                <FaUserPlus className="mr-2" /> Añadir Firmante Manualmente
                            </button>
                        </div>
                     )}
                </div>

                <div className="bg-white p-6 rounded-xl shadow-lg">
                    <p className="text-sm text-gray-600 mb-4">Se consumirá <span className="font-bold text-lg">{signers.length}</span> transacción(es) de su saldo disponible. Saldo actual: <span className="font-bold text-lg">{availableTransactions}</span>.</p>
                    <button onClick={handleFinalSubmit} disabled={isProcessing || signers.length === 0 || availableTransactions < signers.length} className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white bg-primary disabled:opacity-50 disabled:cursor-not-allowed">
                        {isProcessing ? 'Enviando...' : `Enviar a Firma (${signers.length})`}
                    </button>
                </div>
            </div>
        </div>
      )}

      <Modal isOpen={isTemplateModalOpen} onClose={() => setIsTemplateModalOpen(false)} title="Seleccionar Plantilla de Contrato" icon={<FaMagic className="w-12 h-12 text-primary-DEFAULT" />} iconBgColor="bg-primary-light">
          <p className="mb-6">Elija el tipo de contrato que desea generar. Podrá añadir los firmantes manualmente.</p>
          <div className="flex flex-col sm:flex-row gap-4">
              <button onClick={() => handleGenerateContract('vivienda')} className="flex-1 flex flex-col items-center justify-center p-4 bg-white border-2 border-danger-dark text-danger-dark rounded-lg hover:bg-danger-light">
                  <FaHome className="w-8 h-8 mb-2" /> <span className="font-semibold">Vivienda Urbana</span>
              </button>
              <button onClick={() => handleGenerateContract('comercial')} className="flex-1 flex flex-col items-center justify-center p-4 bg-white border-2 border-danger-dark text-danger-dark rounded-lg hover:bg-danger-light">
                  <FaStore className="w-8 h-8 mb-2" /> <span className="font-semibold">Local Comercial</span>
              </button>
          </div>
          <div className="mt-6">
            <button 
                type="button" 
                onClick={() => setIsTemplateModalOpen(false)} 
                className="w-full inline-flex items-center justify-center bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded-lg shadow-sm hover:bg-gray-300"
            >
                <ArrowLeftIcon className="w-4 h-4 mr-2" />
                Volver
            </button>
          </div>
      </Modal>

      <Modal isOpen={isSuccessModalOpen} onClose={() => setIsSuccessModalOpen(false)} title="¡Contrato Enviado a Firma!" icon={<CheckIcon className="w-12 h-12 text-success-DEFAULT" />} iconBgColor="bg-success-light">
          <p className="mb-4">El contrato ha sido enviado y registrado. Se ha notificado a los siguientes firmantes para que completen la validación:</p>
          <ul className="space-y-3 text-left bg-gray-50 p-4 rounded-lg mb-4 max-h-60 overflow-y-auto">
              {submittedSigners.map(signer => (
                  <li key={signer.id}>
                      <p className="font-semibold text-gray-800">{signer.name} <span className="font-bold text-primary-dark">(ID: {signer.transactionId})</span></p>
                      <p className="text-xs text-gray-500">{signer.email}</p>
                      <div className="flex items-center gap-2 mt-1">
                          <input type="text" readOnly value={signer.biometriaUrl || ''} className="flex-grow bg-white border border-gray-300 rounded px-2 py-1 text-gray-700 text-xs" />
                          <button onClick={() => handleCopy(signer.id, signer.biometriaUrl || '')} className="flex-shrink-0 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-1 px-3 rounded inline-flex items-center gap-1 transition-colors text-xs">
                              <FaCopy className="w-3 h-3" /> {copyStatus[signer.id] || 'Copiar'}
                          </button>
                      </div>
                  </li>
              ))}
          </ul>
          <p className="text-xs text-gray-500 mb-6">(Los enlaces se muestran aquí con fines de demostración).</p>
          <button onClick={() => setIsSuccessModalOpen(false)} className="w-full bg-primary text-white px-4 py-2 rounded-lg">Entendido</button>
      </Modal>

      <Modal isOpen={isNoTransactionsModalOpen} onClose={() => setIsNoTransactionsModalOpen(false)} title="Transacciones Insuficientes" icon={<WarningIcon className="w-12 h-12 text-danger-DEFAULT" />} iconBgColor="bg-danger-light">
          <p className="mb-4">No tiene suficientes transacciones disponibles para enviar este contrato a todos los firmantes.</p>
          <div className="text-left mb-6 bg-gray-100 p-3 rounded-lg">
              <p>Transacciones requeridas: <span className="font-bold">{signers.length}</span></p>
              <p>Transacciones disponibles: <span className="font-bold">{availableTransactions}</span></p>
          </div>
          <p className="text-sm text-gray-600 mb-4">Por favor, contacte a su ejecutivo comercial para adquirir más transacciones.</p>
          <button onClick={() => setIsNoTransactionsModalOpen(false)} className="w-full bg-primary text-white px-4 py-2 rounded-lg">Entendido</button>
      </Modal>
      
      {editingSigner && <EditSignerModal signer={editingSigner} onClose={() => setEditingSigner(null)} onSave={handleUpdateSigner} />}

      {/* Modal de firma (dibujar o adjuntar) */}
      {signingSignerId && (() => {
        const signer = signers.find(s => s.id === signingSignerId);
        if (!signer) return null;
        return (
          <SignaturePad
            signerName={signer.name}
            onCancel={() => setSigningSignerId(null)}
            onSignatureComplete={(dataUrl) => {
              setSignerSignatures(prev => ({ ...prev, [signer.id]: dataUrl }));
              setSigningSignerId(null);
            }}
          />
        );
      })()}

    </div>
  );
};

export default ContractSigningPage;
