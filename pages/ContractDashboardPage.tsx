
import React, { useState, useContext, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../App';
import { Contrato, EstadoContrato } from '../types';
import { ROUTES } from '../constants';
import ContractStatusBadge from '../components/ContractStatusBadge';
import { EyeIcon } from '../components/icons';
import KPICard from '../components/KPICard';
import { FaFileSignature, FaClock, FaExclamationCircle } from 'react-icons/fa';

const ContractDashboardPage: React.FC = () => {
  const appContext = useContext(AppContext);
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<EstadoContrato | 'Todos'>('Todos');

  const filteredContracts = useMemo(() => {
    if (!appContext) return [];
    return appContext.contracts.filter(contract => {
      const matchesSearch = searchTerm === '' || 
                            contract.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            contract.fileName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'Todos' || contract.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [appContext, searchTerm, statusFilter]);
  
  const kpiData = useMemo(() => {
    if (!appContext) return { signed: 0, pending: 0, expired: 0 };
    return {
      signed: appContext.contracts.filter(c => c.status === EstadoContrato.FIRMADO).length,
      pending: appContext.contracts.filter(c => c.status === EstadoContrato.PENDIENTE).length,
      expired: appContext.contracts.filter(c => c.status === EstadoContrato.VENCIDO).length,
    };
  }, [appContext]);


  if (!appContext) {
    return <div className="p-6 text-center">Cargando contratos...</div>;
  }
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-CO', { 
      year: 'numeric', month: 'short', day: 'numeric'
    });
  };

  return (
    <div className="space-y-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-primary-dark">Dashboard de Contratos</h1>
        <p className="text-gray-600">Visualice y gestione el estado de sus contratos.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <KPICard 
          title="Contratos Firmados" 
          value={kpiData.signed} 
          icon={<FaFileSignature />}
          colorClass="bg-success-DEFAULT"
        />
        <KPICard 
          title="Pendientes de Firma" 
          value={kpiData.pending} 
          icon={<FaClock />}
          colorClass="bg-primary-DEFAULT"
        />
        <KPICard 
          title="Contratos Vencidos" 
          value={kpiData.expired} 
          icon={<FaExclamationCircle />}
          colorClass="bg-warning-DEFAULT"
        />
      </div>

      <div className="bg-white p-6 rounded-xl shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <input
            type="text"
            placeholder="Buscar por ID o nombre de archivo..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-400 rounded-lg"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as EstadoContrato | 'Todos')}
            className="w-full px-4 py-2 border border-gray-400 rounded-lg"
          >
            <option value="Todos">Todos los Estados</option>
            {Object.values(EstadoContrato).map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>

        {filteredContracts.length === 0 ? (
           <div className="text-center py-10">
            <h3 className="text-lg font-medium text-gray-900">No se encontraron contratos</h3>
            <p className="mt-1 text-sm text-gray-500">Ajuste su búsqueda o filtros.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {['ID Contrato', 'Archivo', 'Estado', 'Firmantes', 'Fecha Creación', 'Acciones'].map(header => (
                    <th key={header} scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredContracts.map((contract) => (
                  <tr key={contract.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{contract.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{contract.fileName}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <ContractStatusBadge status={contract.status} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">{contract.signers.length}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(contract.createdAt)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => navigate(ROUTES.CONTRACT_DETAIL.replace(':contractId', contract.id))}
                        className="bg-primary text-white p-1 rounded-full" 
                        title="Ver Detalle del Contrato"
                      >
                        <EyeIcon className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContractDashboardPage;
