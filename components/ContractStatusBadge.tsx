import React from 'react';
import { EstadoContrato } from '../types';

interface ContractStatusBadgeProps {
  status: EstadoContrato;
}

const ContractStatusBadge: React.FC<ContractStatusBadgeProps> = ({ status }) => {
  let bgColor = 'bg-gray-200';
  let textColor = 'text-gray-700';

  switch (status) {
    case EstadoContrato.FIRMADO:
      bgColor = 'bg-success-light';
      textColor = 'text-success-dark';
      break;
    case EstadoContrato.PENDIENTE:
      bgColor = 'bg-primary-light';
      textColor = 'text-primary-dark';
      break;
    case EstadoContrato.VENCIDO:
      bgColor = 'bg-warning-light';
      textColor = 'text-warning-dark';
      break;
  }

  return (
    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${bgColor} ${textColor}`}>
      {status}
    </span>
  );
};

export default ContractStatusBadge;