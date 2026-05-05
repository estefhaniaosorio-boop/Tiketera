
import React, { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../App';
import { EstadoSolicitud } from '../types';
import { ROUTES }
 from '../constants';
import UnifiedStatusBadge from '../components/UnifiedStatusBadge';
import { ArrowLeftIcon, RefreshIcon } from '../components/icons';

const RequestDetailPage: React.FC = () => {
  const { requestId } = useParams<{ requestId: string }>();
  const appContext = useContext(AppContext);
  const navigate = useNavigate();

  if (!appContext || !requestId) {
    return <div className="p-6 text-center">Cargando detalle de la solicitud...</div>;
  }

  const request = appContext.getRequestById(requestId);

  if (!request) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Solicitud no encontrada</h2>
        <p className="text-gray-500">No pudimos encontrar una solicitud con el ID: {requestId}</p>
        <button
            onClick={() => navigate(ROUTES.REQUESTS_DASHBOARD)}
            className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary"
        >
            <ArrowLeftIcon className="w-5 h-5 mr-2" />
            Volver al Dashboard
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

  const handleResendRequest = () => {
    if (request.estado === EstadoSolicitud.VENCIDO) {
      appContext.updateRequestStatus(request.id, EstadoSolicitud.PENDIENTE);
      alert(`La solicitud Vencida ${request.id} ha sido marcada como Pendiente y reenviada (simulado). Se ha establecido una nueva fecha de vencimiento para el link.`);
      // No navigation needed, page will re-render with updated status and dates from context.
    }
  };
  
  const detailItems = [
    { label: "Tipo de Documento", value: request.tipoDocumento },
    { label: "Número de Documento", value: request.numeroDocumento },
    { label: "Número de Celular", value: request.numeroCelular },
    { label: "Correo Electrónico", value: request.correoElectronico },
    { label: "Fecha y Hora de Envío/Último Reenvío", value: formatDate(request.fechaEnvio) },
    { 
      label: "Fecha Vencimiento Link", 
      value: request.fechaVencimientoLink ? formatDate(request.fechaVencimientoLink) : 'N/A'
    },
  ];

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          Detalle Solicitud: <span className="text-primary-DEFAULT">{request.id}</span>
        </h1>
        <UnifiedStatusBadge status={request.estado} />
      </div>

      <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg space-y-6">
        <section>
          <h2 className="text-xl font-semibold text-gray-700 mb-4 border-b pb-2">Información de la Solicitud</h2>
          <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            {detailItems.map(item => (
              <div key={item.label}>
                <dt className="text-sm font-medium text-gray-500">{item.label}</dt>
                <dd className="mt-1 text-sm text-gray-900">{item.value}</dd>
              </div>
            ))}
          </dl>
        </section>

        {request.estado !== EstadoSolicitud.PENDIENTE && request.estado !== EstadoSolicitud.VENCIDO && (
          <section>
            <h2 className="text-xl font-semibold text-gray-700 mb-4 border-b pb-2">Resultado de la Validación</h2>
            {request.estado === EstadoSolicitud.EXITOSO && (
              <div className="p-4 rounded-md bg-success-light text-success-dark">
                <p className="font-semibold">Identidad verificada con éxito.</p>
              </div>
            )}
            {request.estado === EstadoSolicitud.NO_EXITOSO && (
              <div className="p-4 rounded-md bg-danger-light text-danger-dark">
                <p className="font-semibold">No se pudo verificar la identidad.</p>
                <p className="text-sm">El cliente debe reintentar el proceso de validación biométrica o la solicitud puede ser reenviada si se considera un error temporal.</p>
              </div>
            )}
          </section>
        )}
        
        <div className="pt-6 border-t border-gray-200 flex flex-col sm:flex-row gap-3 justify-end">
          <button
            onClick={() => navigate(ROUTES.REQUESTS_DASHBOARD)}
            className="flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary"
          >
            <ArrowLeftIcon className="w-5 h-5 mr-2" />
            Volver al Dashboard
          </button>
          {/* Reenviar Solicitud button only for VENCIDO status */}
          {request.estado === EstadoSolicitud.VENCIDO && (
            <button
              onClick={handleResendRequest}
              className="flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary"
            >
              <RefreshIcon className="w-5 h-5 mr-2" />
              Reenviar Solicitud
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default RequestDetailPage;
