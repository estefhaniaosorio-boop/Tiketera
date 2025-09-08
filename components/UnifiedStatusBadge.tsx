import React from 'react';
import { EstadoSolicitud, EstadoContrato } from '../types';

interface UnifiedStatusBadgeProps {
  status: EstadoSolicitud | EstadoContrato;
}

const UnifiedStatusBadge: React.FC<UnifiedStatusBadgeProps> = ({ status }) => {
  let bgColor = 'bg-gray-200';
  let textColor = 'text-gray-700';

  switch (status) {
    // Solicitud statuses
    case EstadoSolicitud.EXITOSO:
      bgColor = 'bg-success-light';
      textColor = 'text-success-dark';
      break;
    case EstadoSolicitud.PENDIENTE:
      bgColor = 'bg-primary-light';
      textColor = 'text-primary-dark';
      break;
    case EstadoSolicitud.NO_EXITOSO:
      bgColor = 'bg-danger-light';
      textColor = 'text-danger-dark';
      break;
    case EstadoSolicitud.VENCIDO:
      bgColor = 'bg-warning-light';
      textColor = 'text-warning-dark';
      break;
    // Contrato statuses
    case EstadoContrato.FIRMADO:
      bgColor = 'bg-success-light';
      textColor = 'text-success-dark';
      break;
    case EstadoContrato.PENDIENTE: // Same as solicitud pendiente
      bgColor = 'bg-primary-light';
      textColor = 'text-primary-dark';
      break;
    case EstadoContrato.VENCIDO: // Same as solicitud vencido
      bgColor = 'bg-warning-light';
      textColor = 'text-warning-dark';
      break;
    case EstadoContrato.NO_EXITOSO:
        bgColor = 'bg-danger-light';
        textColor = 'text-danger-dark';
        break;
  }

  return (
    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${bgColor} ${textColor}`}>
      {status}
    </span>
  );
};

export default UnifiedStatusBadge;