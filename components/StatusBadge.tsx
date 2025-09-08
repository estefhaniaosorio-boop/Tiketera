
import React from 'react';
import { EstadoSolicitud } from '../types';

interface StatusBadgeProps {
  status: EstadoSolicitud;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  let bgColor = 'bg-gray-200';
  let textColor = 'text-gray-700';

  switch (status) {
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
      bgColor = 'bg-warning-light'; // Using warning theme colors
      textColor = 'text-warning-dark';
      break;
  }

  return (
    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${bgColor} ${textColor}`}>
      {status}
    </span>
  );
};

export default StatusBadge;