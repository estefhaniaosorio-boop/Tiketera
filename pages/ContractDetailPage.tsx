
import React, { useContext, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../App';
import { ROUTES } from '../constants';
import { ArrowLeftIcon } from '../components/icons';
import UnifiedStatusBadge from '../components/UnifiedStatusBadge';
import { Signer, Firma, EstadoContrato } from '../types';

const ContractDetailPage: React.FC = () => {
  const { contractId } = useParams<{ contractId: string }>();
  const appContext = useContext(AppContext);
  const navigate = useNavigate();

  if (!appContext || !contractId) {
    return <div className="p-6 text-center">Cargando detalle del contrato...</div>;
  }

  const contract = appContext.getContractById(contractId);

  const signaturesBySigner = useMemo(() => {
    if (!contract) return new Map<string, Firma>();
    const map = new Map<string, Firma>();
    contract.signatures.forEach(sig => map.set(sig.signerId, sig));
    return map;
  }, [contract]);

  if (!contract) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Contrato no encontrado</h2>
        <button
            onClick={() => navigate(ROUTES.REQUESTS_DASHBOARD)}
            className="mt-6 inline-flex items-center px-4 py-2 text-sm font-medium rounded-md text-white bg-danger-dark"
        >
            <ArrowLeftIcon className="w-5 h-5 mr-2" />
            Volver al Dashboard de Envíos
        </button>
      </div>
    );
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleString('es-CO', { 
      year: 'numeric', month: 'long', day: 'numeric', 
      hour: '2-digit', minute: '2-digit', second: '2-digit' 
    });
  };
  
  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Detalle Contrato: <span className="text-primary-DEFAULT">{contract.id}</span>
          </h1>
          <p className="text-gray-600">{contract.fileName}</p>
        </div>
        <UnifiedStatusBadge status={contract.status} />
      </div>

      {contract.status === EstadoContrato.NO_EXITOSO && (
          <div className="bg-danger-light border-l-4 border-danger-dark text-danger-dark p-4 rounded-r-lg shadow" role="alert">
              <p className="font-bold">Proceso de Firma No Exitoso</p>
              <p>Uno o más firmantes no completaron el proceso de validación de identidad correctamente o el proceso falló. El contrato no ha sido firmado.</p>
          </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Columna de Información y Firmas */}
        <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-lg">
                <h2 className="text-xl font-semibold text-gray-700 mb-4 border-b pb-2">Información General</h2>
                <dl className="space-y-3">
                    <div>
                        <dt className="text-sm font-medium text-gray-500">Fecha de Creación</dt>
                        <dd className="mt-1 text-sm text-gray-900">{formatDate(contract.createdAt)}</dd>
                    </div>
                    <div>
                        <dt className="text-sm font-medium text-gray-500">Fecha de Vencimiento</dt>
                        <dd className="mt-1 text-sm text-gray-900">{formatDate(contract.expiresAt)}</dd>
                    </div>
                </dl>
            </div>
             <div className="bg-white p-6 rounded-xl shadow-lg">
                <h2 className="text-xl font-semibold text-gray-700 mb-4 border-b pb-2">Firmantes ({contract.signers.length})</h2>
                <ul className="space-y-4">
                    {contract.signers.map(signer => {
                        const signature = signaturesBySigner.get(signer.id);
                        return (
                            <li key={signer.id} className="p-3 bg-gray-50 rounded-lg">
                                <div className="flex justify-between items-center mb-1">
                                  <p className="font-semibold text-gray-800">{signer.name}</p>
                                  <span className="text-xs font-semibold text-white bg-primary-DEFAULT px-2 py-0.5 rounded-full">{signer.role}</span>
                                </div>
                                <p className="text-sm text-gray-500">{signer.email}</p>
                                <p className="text-sm text-gray-500">Doc: {signer.doc}</p>
                                <div className="mt-2 text-xs">
                                    {signature ? 
                                        <span className="font-bold text-success-dark">FIRMADO</span> : 
                                        <span className="font-bold text-primary-dark">PENDIENTE</span>
                                    }
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
        
        {/* Columna de Contenido y Firmas Detalladas */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-lg space-y-6">
          <section>
            <h2 className="text-xl font-semibold text-gray-700 mb-4 border-b pb-2">Documento del Contrato</h2>
             <div className="w-full h-80 p-4 border rounded-lg bg-gray-50 overflow-y-auto">
                <pre className="whitespace-pre-wrap text-sm text-gray-800 font-sans">
                    {contract.templateContent ? contract.templateContent : "La previsualización de archivos PDF no está disponible en esta demostración."}
                </pre>
            </div>
          </section>

          <section>
             <h2 className="text-xl font-semibold text-gray-700 mb-4 border-b pb-2">Evidencia de Firmas</h2>
             {contract.signatures.length > 0 ? (
                <div className="space-y-6">
                    {contract.signatures.map(signature => {
                        const signer = contract.signers.find(s => s.id === signature.signerId);
                        if (!signer) return null;
                        return (
                           <div key={signature.signerId} className="border rounded-lg p-4 bg-gray-50">
                               <h3 className="font-bold text-lg text-primary-dark mb-3">{signer.name}</h3>
                               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                                   <div className="flex flex-col items-center">
                                       <p className="text-sm font-semibold text-gray-600 mb-1">Foto del Firmante</p>
                                       <img src={signature.photoImage} alt={`Foto de ${signer.name}`} className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md"/>
                                   </div>
                                   <div className="flex flex-col items-center">
                                       <p className="text-sm font-semibold text-gray-600 mb-1">Firma Registrada</p>
                                       <div className="bg-white p-2 border rounded-md shadow-inner">
                                            <img src={signature.signatureImage} alt={`Firma de ${signer.name}`} className="h-20 object-contain"/>
                                       </div>
                                   </div>
                               </div>
                               <div className="mt-4 pt-3 border-t text-center">
                                   <p className="text-sm text-gray-700">
                                       Firmado el: <span className="font-semibold">{formatDate(signature.timestamp)}</span>
                                   </p>
                                   <p className="text-xs text-gray-500">
                                       Ubicación (lat, long): {signature.geolocation.lat}, {signature.geolocation.long}
                                   </p>
                               </div>
                           </div>
                        )
                    })}
                </div>
             ) : (
                <p className="text-center text-gray-500 py-4">Aún no se han registrado firmas para este contrato.</p>
             )}
          </section>

        </div>
      </div>
      
      <div className="pt-6 text-center">
          <button
            onClick={() => navigate(ROUTES.REQUESTS_DASHBOARD)}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-danger-dark"
          >
            <ArrowLeftIcon className="w-5 h-5 mr-2" />
            Volver al Dashboard
          </button>
        </div>
    </div>
  );
};

export default ContractDetailPage;
