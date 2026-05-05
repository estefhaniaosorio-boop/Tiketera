
import React, { useState, useContext, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../App';
import { EstadoSolicitud, EstadoContrato, TipoDocumento } from '../types';
import { ROUTES } from '../constants';
import UnifiedStatusBadge from '../components/UnifiedStatusBadge';
import { EyeIcon, PlusIcon, RefreshIcon } from '../components/icons';
import { FaDownload } from 'react-icons/fa';
import NotificationToast from '../components/NotificationToast';
import { PencilSquareIcon } from '../components/icons';


const RequestsDashboardPage: React.FC = () => {
  const appContext = useContext(AppContext);
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | 'Todos'>('Todos');
  const [toastInfo, setToastInfo] = useState<{message: string, type: 'success' | 'error' | 'info', isVisible: boolean}>({
    message: '',
    type: 'info',
    isVisible: false
  });

  const unifiedData = useMemo(() => {
    if (!appContext) return [];
    
    const mappedRequests = appContext.requests.map(req => ({
        id: req.id,
        type: 'Solicitud' as const,
        description: `Doc: ${req.numeroDocumento}`,
        status: req.estado,
        date: req.fechaEnvio,
        rawDate: new Date(req.fechaEnvio),
        navigateTo: ROUTES.REQUEST_DETAIL.replace(':requestId', req.id),
        isResendable: req.estado === EstadoSolicitud.VENCIDO,
    }));

    const mappedContracts = appContext.contracts.map(con => ({
        id: con.id,
        type: 'Contrato' as const,
        description: con.fileName,
        status: con.status,
        date: con.createdAt,
        rawDate: new Date(con.createdAt),
        navigateTo: ROUTES.CONTRACT_DETAIL.replace(':contractId', con.id),
        isResendable: false,
    }));

    return [...mappedRequests, ...mappedContracts].sort((a, b) => b.rawDate.getTime() - a.rawDate.getTime());
  }, [appContext]);

  const allStatuses = useMemo(() => [...new Set([...Object.values(EstadoSolicitud), ...Object.values(EstadoContrato)])], []);

  const filteredData = useMemo(() => {
    return unifiedData.filter(item => {
      const matchesSearch = searchTerm === '' || 
                            item.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            item.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'Todos' || item.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [unifiedData, searchTerm, statusFilter]);

  if (!appContext) {
    return <div className="p-6 text-center">Cargando envíos...</div>;
  }
  
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('es-CO', { 
      year: 'numeric', month: 'short', day: 'numeric', 
      hour: '2-digit', minute: '2-digit' 
    });
  };

  const handleResendFromDashboard = (id: string) => {
    if (appContext) {
      appContext.updateRequestStatus(id, EstadoSolicitud.PENDIENTE);
      setToastInfo({
        message: `Solicitud ${id} reenviada. Ahora está Pendiente con nueva fecha de vencimiento.`,
        type: 'success',
        isVisible: true
      });
    }
  };

  const handleDownloadReport = () => {
    const headers = ["ID", "Tipo", "Descripción", "Estado", "Fecha Creación/Envío"];
    const csvRows = [headers.join(',')];

    filteredData.forEach(item => {
      const row = [
        `"${item.id}"`,
        `"${item.type}"`,
        `"${item.description}"`,
        `"${item.status}"`,
        `"${formatDate(item.date)}"`,
      ];
      csvRows.push(row.join(','));
    });

    const csvString = csvRows.join('\n');
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `reporte_envios_${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard de Envíos</h1>
        <div className="flex flex-wrap gap-2">
            <button
              onClick={handleDownloadReport}
              className="flex items-center bg-primary text-white font-semibold py-2 px-4 rounded-lg shadow-md"
              title="Descargar reporte de envíos filtrados"
            >
              <FaDownload className="w-4 h-4 mr-2" />
              Descargar Reporte
            </button>
            <button
              onClick={() => navigate(ROUTES.SEND_REQUEST)}
              className="flex items-center bg-primary text-white font-semibold py-2 px-4 rounded-lg shadow-md"
            >
              <PlusIcon className="w-5 h-5 mr-2" />
              Nueva Solicitud
            </button>
             <button
              onClick={() => navigate(ROUTES.CONTRACT_SIGNING)}
              className="flex items-center bg-primary text-white font-semibold py-2 px-4 rounded-lg shadow-md"
            >
              <PencilSquareIcon className="w-5 h-5 mr-2" />
              Nuevo Contrato
            </button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <input
            type="text"
            placeholder="Buscar por ID, documento o archivo..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-400 rounded-lg"
            aria-label="Buscar envíos"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as string | 'Todos')}
            className="w-full px-4 py-2 border border-gray-400 rounded-lg"
            aria-label="Filtrar por estado"
          >
            <option value="Todos">Todos los Estados</option>
            {allStatuses.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>

        {filteredData.length === 0 ? (
           <div className="text-center py-10">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No hay envíos</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm || statusFilter !== "Todos" ? "Pruebe ajustando su búsqueda o filtros." : "Comience creando una nueva solicitud o contrato."}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {['ID', 'Tipo', 'Acciones', 'Descripción', 'Estado', 'Fecha'].map(header => (
                    <th key={header} scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredData.map((item) => (
                  <tr key={item.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.type}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => navigate(item.navigateTo)}
                        className="bg-primary text-white p-1 rounded-full" 
                        title="Ver Detalle"
                      >
                        <EyeIcon className="w-5 h-5" />
                      </button>
                      {item.isResendable && (
                        <button
                            onClick={() => handleResendFromDashboard(item.id)}
                            className="ml-2 bg-primary text-white p-1 rounded-full"
                            title="Reenviar Solicitud"
                        >
                            <RefreshIcon className="w-5 h-5" />
                        </button>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 truncate" title={item.description}>{item.description}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <UnifiedStatusBadge status={item.status} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(item.date)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <NotificationToast
        message={toastInfo.message}
        isVisible={toastInfo.isVisible}
        onDismiss={() => setToastInfo(prev => ({ ...prev, isVisible: false }))}
        type={toastInfo.type}
      />
    </div>
  );
};

export default RequestsDashboardPage;
