import React, { useContext, useMemo } from 'react';
import { AppContext } from '../App';
import KPICard from '../components/KPICard';
import SimpleBarChart from '../components/SimpleBarChart';
import { MONTHLY_REQUEST_DATA } from '../constants';
import { FaTasks, FaCheckCircle } from 'react-icons/fa';


const DashboardPage: React.FC = () => {
  const appContext = useContext(AppContext);

  const kpiData = useMemo(() => {
    if (!appContext || !appContext.user) return {
        cupoAsignado: 0,
        cupoConsumido: 0,
        cupoDisponible: 0,
    };

    const { user } = appContext;
    const cupoDisponible = user.cupoAsignado - user.cupoConsumido;

    return {
      cupoAsignado: user.cupoAsignado,
      cupoConsumido: user.cupoConsumido,
      cupoDisponible,
    };
  }, [appContext]);


  if (!appContext || !appContext.user) {
    return <div className="p-6 text-center">Cargando datos del dashboard...</div>;
  }

  return (
    <div className="space-y-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-primary-dark">Home</h1>
        <p className="text-gray-600">Bienvenido, {appContext.user.nombreInmobiliaria}</p>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <KPICard 
          title="Transacciones Disponibles" 
          value={kpiData.cupoDisponible} 
          icon={<FaTasks />}
          colorClass="bg-primary-DEFAULT"
          description={`Tiene un total de ${kpiData.cupoAsignado} transacciones asignadas.`}
        />
        <KPICard 
          title="Cupo Consumido" 
          value={kpiData.cupoConsumido} 
          icon={<FaCheckCircle />}
          colorClass="bg-success-DEFAULT"
           description="Total de transacciones utilizadas a la fecha."
        />
        <KPICard 
          title="Cupo Asignado" 
          value={kpiData.cupoAsignado} 
          colorClass="bg-warning-dark"
           description="El total de su paquete de transacciones."
        />
      </div>

      <div className="flex justify-center">
        <SimpleBarChart data={MONTHLY_REQUEST_DATA} />
      </div>

    </div>
  );
};

export default DashboardPage;