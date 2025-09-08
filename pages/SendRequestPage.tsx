
import React, { useState, useContext } from 'react';
import { AppContext } from '../App';
import { TipoDocumento, Solicitud } from '../types';
import Modal from '../components/Modal';
import { CheckIcon, WarningIcon } from '../components/icons';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../constants';
import { FaPaperPlane, FaCopy } from 'react-icons/fa';

const mapTipoDocumentoToApiCode = (tipo: TipoDocumento): string => {
  switch (tipo) {
    case TipoDocumento.CEDULA_CIUDADANIA: return 'CC';
    case TipoDocumento.PASAPORTE: return 'PA';
    case TipoDocumento.CEDULA_EXTRANJERIA: return 'CE';
    default: return 'CC';
  }
};

const SendRequestPage: React.FC = () => {
  const appContext = useContext(AppContext);
  const navigate = useNavigate();

  const [tipoDocumento, setTipoDocumento] = useState<TipoDocumento>(TipoDocumento.CEDULA_CIUDADANIA);
  const [numeroDocumento, setNumeroDocumento] = useState('');
  const [numeroCelular, setNumeroCelular] = useState('');
  const [correoElectronico, setCorreoElectronico] = useState('');
  const [errors, setErrors] = useState<Partial<Record<keyof Omit<Solicitud, 'id' | 'fechaEnvio' | 'estado' | 'fechaVencimientoLink'>, string>>>({});
  
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [generatedRequestId, setGeneratedRequestId] = useState('');
  const [isNoTransactionsModalOpen, setIsNoTransactionsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  const [biometricsUrl, setBiometricsUrl] = useState('');
  const [submittedEmail, setSubmittedEmail] = useState('');
  const [copyButtonText, setCopyButtonText] = useState('Copiar');

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof Omit<Solicitud, 'id' | 'fechaEnvio' | 'estado' | 'tipoDocumento' | 'fechaVencimientoLink'>, string>> = {};
    if (!numeroDocumento.trim()) newErrors.numeroDocumento = "Número de documento es requerido.";
    else if (!/^[a-zA-Z0-9\s.-]+$/.test(numeroDocumento.trim())) {
        newErrors.numeroDocumento = "Número de documento contiene caracteres inválidos.";
    }
    if (!numeroCelular.trim()) {
        newErrors.numeroCelular = "Número de celular es requerido.";
    } else if (!/^\d{10}$/.test(numeroCelular.trim())) {
        newErrors.numeroCelular = "Número de celular debe tener 10 dígitos.";
    }
    if (!correoElectronico.trim()) {
        newErrors.correoElectronico = "Correo electrónico es requerido.";
    } else if (!/\S+@\S+\.\S+/.test(correoElectronico.trim())) {
        newErrors.correoElectronico = "Correo electrónico inválido.";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm() || !appContext || !appContext.user) return;

    setApiError('');
    setIsLoading(true);

    const availableTransactions = appContext.user.cupoAsignado - appContext.user.cupoConsumido;
    if (availableTransactions <= 0) {
      setIsNoTransactionsModalOpen(true);
      setIsLoading(false);
      return;
    }

    let sanitizedDoc: string;
    if (tipoDocumento === TipoDocumento.CEDULA_CIUDADANIA) {
        sanitizedDoc = numeroDocumento.replace(/[^\d]/g, '');
    } else {
        sanitizedDoc = numeroDocumento.replace(/[^a-zA-Z0-9]/g, '');
    }
    
    try {
      const response = await fetch(`https://2ncqe7ikzh.execute-api.us-east-1.amazonaws.com/stage/biometry/v1/start-validation`,  {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': 'b5EW1Ilf215yPfRk86dzI3PM77x01AU49TppJ83R',
        }, 
        body: JSON.stringify({
          userData: {
            userId: sanitizedDoc,
            userType: mapTipoDocumentoToApiCode(tipoDocumento),
          }
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        const errorMessage = errorData?.message || `Error en la solicitud: ${response.status} ${response.statusText}`;
        throw new Error(errorMessage);
      }
      const data = await response.json();
      if (!data.url || !data.idValidation) {
        console.error('Biometrics API response was invalid:', data);
        throw new Error("La respuesta del servicio de biometría es inválida.");
      }
  
      const newConsecutiveId = appContext.addRequest({
        tipoDocumento,
        numeroDocumento,
        numeroCelular,
        correoElectronico,
        biometriaUrl: data.url,
        idValidation: data.idValidation,
      });
      
      appContext.consumeTransactions();
      
      setGeneratedRequestId(newConsecutiveId);
      setBiometricsUrl(data.url);
      setSubmittedEmail(correoElectronico);
      setCopyButtonText('Copiar');
      setIsSuccessModalOpen(true);
      
      setTipoDocumento(TipoDocumento.CEDULA_CIUDADANIA);
      setNumeroDocumento('');
      setNumeroCelular('');
      setCorreoElectronico('');
      setErrors({});

    } catch (error) {
      console.error("Biometrics API error:", error);
      setApiError((error as Error).message || 'No se pudo completar la solicitud. Verifique la consola para detalles de CORS o errores de red.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCelularChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ''); // Allow only digits
    setNumeroCelular(value);
     if (value && value.length !== 10) {
      setErrors(prev => ({ ...prev, numeroCelular: "Número de celular debe tener 10 dígitos." }));
    } else {
      setErrors(prev => {
        const { numeroCelular, ...rest } = prev;
        return rest;
      });
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCorreoElectronico(value);
    if (value && !/\S+@\S+\.\S+/.test(value)) {
      setErrors(prev => ({ ...prev, correoElectronico: "Correo electrónico inválido." }));
    } else {
      setErrors(prev => {
        const { correoElectronico, ...rest } = prev;
        return rest;
      });
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(biometricsUrl).then(() => {
        setCopyButtonText('¡Copiado!');
        setTimeout(() => setCopyButtonText('Copiar'), 2000);
    }).catch(err => {
        console.error('Error al copiar el enlace: ', err);
        alert('No se pudo copiar el enlace.');
    });
  };

  const formFields = [
    { name: 'numeroDocumento', label: 'Número de Cédula de Ciudadanía', type: 'text', placeholder: 'Ingrese el número de documento', value: numeroDocumento, onChange: (e: React.ChangeEvent<HTMLInputElement>) => setNumeroDocumento(e.target.value) },
    { name: 'numeroCelular', label: 'Número de celular', type: 'tel', placeholder: 'Ej: 3001234567', value: numeroCelular, onChange: handleCelularChange },
    { name: 'correoElectronico', label: 'Correo electrónico', type: 'email', placeholder: 'cliente@example.com', value: correoElectronico, onChange: handleEmailChange },
  ];

  return (
    <div className="max-w-2xl mx-auto">
      {appContext && appContext.user && (
        <div className="mb-6 p-4 border border-dashed border-gray-300 rounded-lg bg-gray-50 shadow">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">Panel de Simulación (Solo para Pruebas):</h4>
          <p className="text-xs text-gray-600 mb-3">
            Cupo Disponible: <span className="font-bold text-lg text-primary-dark">{appContext.user.cupoAsignado - appContext.user.cupoConsumido}</span>
             {" "} de <span className="font-semibold">{appContext.user.cupoAsignado}</span>
          </p>
          <div className="flex flex-col sm:flex-row gap-2">
            <button
              type="button"
              onClick={() => appContext.setTransactionsForTesting('reset_consumed')}
              className="flex-1 text-xs bg-danger-dark text-white px-3 py-2 rounded-md font-medium"
            >
              Resetear Cupo Consumido
            </button>
            <button
              type="button"
              onClick={() => appContext.setTransactionsForTesting('add_10_assigned')}
              className="flex-1 text-xs bg-danger-dark text-white px-3 py-2 rounded-md font-medium"
            >
              Añadir 10 al Cupo Asignado
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-3">
            Este cambio afecta el contador de transacciones solo para la sesión actual de {appContext.user.nombreInmobiliaria}.
          </p>
        </div>
      )}

      <h1 className="text-3xl font-bold text-gray-800 mb-8">Enviar Solicitud de Validación</h1>
      
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg space-y-6">
        {formFields.map(field => (
          <div key={field.name}>
            <label htmlFor={field.name} className="block text-sm font-medium text-gray-700 mb-1">
              {field.label}
            </label>
            {/* FIX: Remove dead code for rendering a select element, as no select fields are defined in `formFields`. This resolves TypeScript errors. */}
            <input
              type={field.type}
              id={field.name}
              name={field.name}
              placeholder={field.placeholder}
              value={field.value as string}
              onChange={field.onChange as (e: React.ChangeEvent<HTMLInputElement>) => void}
              className="mt-1 block w-full px-3 py-2 border border-gray-400 rounded-md shadow-sm placeholder-gray-400 sm:text-sm"
              aria-describedby={field.name === 'numeroDocumento' ? 'numeroDocumentoHelp' : undefined}
            />
            {field.name === 'numeroDocumento' && <p id="numeroDocumentoHelp" className="mt-1 text-xs text-gray-500">Solo letras y números, sin puntos ni comas.</p>}
            {errors[field.name as keyof typeof errors] && <p className="mt-1 text-xs text-red-600">{errors[field.name as keyof typeof errors]}</p>}
          </div>
        ))}
        
        {apiError && <p className="text-sm text-center text-danger-dark bg-danger-light p-3 rounded-md">{apiError}</p>}

        <div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-danger-dark disabled:opacity-50"
          >
            {isLoading ? 'Enviando...' : 'Enviar Solicitud'}
          </button>
        </div>
      </form>

      <Modal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        title="¡Solicitud Enviada con Éxito!"
        icon={<FaPaperPlane className="w-12 h-12 text-primary-DEFAULT" />}
        iconBgColor="bg-primary-light"
      >
        <p className="mb-2">La solicitud de validación ha sido enviada y registrada correctamente.</p>
        <p className="font-semibold text-lg mb-1">ID Consecutivo: {generatedRequestId}</p>
        <p className="text-xs text-gray-500 mb-2">Se ha enviado un correo electrónico a <strong>{submittedEmail}</strong> con el siguiente enlace para completar la validación biométrica.</p>
        
        <div className="my-4 p-3 bg-gray-100 rounded border border-gray-300 text-left">
          <p className="font-semibold text-xs mb-2">Enlace de Biometría:</p>
          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={biometricsUrl}
              className="flex-grow bg-white border border-gray-300 rounded px-2 py-1 text-gray-700 text-xs"
              aria-label="Enlace de biometría"
            />
            <button
              onClick={handleCopy}
              className="flex-shrink-0 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-1 px-3 rounded inline-flex items-center gap-1 transition-colors"
              aria-label="Copiar enlace"
            >
              <FaCopy className="w-4 h-4" />
              <span className="text-xs">{copyButtonText}</span>
            </button>
          </div>
        </div>

        <p className="text-xs text-gray-500 mb-6">(Este enlace se muestra aquí con fines de demostración).</p>
        <button
          onClick={() => {
            setIsSuccessModalOpen(false);
            navigate(ROUTES.DASHBOARD);
          }}
          className="w-full bg-danger-dark text-white px-4 py-2 rounded-lg"
        >
          Volver al menú principal
        </button>
      </Modal>

      <Modal
        isOpen={isNoTransactionsModalOpen}
        onClose={() => setIsNoTransactionsModalOpen(false)}
        title="Sin Transacciones Disponibles"
        icon={<WarningIcon className="w-12 h-12 text-danger-DEFAULT" />}
        iconBgColor="bg-danger-light"
      >
        <p className="mb-4">Ha agotado su cupo de transacciones disponibles para validaciones biométricas.</p>
        <div className="text-left mb-6">
            <h4 className="font-semibold text-gray-800 mb-1">¿Qué puede hacer?</h4>
            <p className="text-sm text-gray-600">Para continuar realizando validaciones, por favor comuníquese con su ejecutivo comercial para adquirir un nuevo paquete de transacciones.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
             <button
              onClick={() => setIsNoTransactionsModalOpen(false)}
              className="w-full bg-danger-dark text-white px-4 py-2 rounded-lg"
            >
              Entendido
            </button>
        </div>
      </Modal>
    </div>
  );
};

export default SendRequestPage;
