
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AppContext } from '../App';
import { ROUTES } from '../constants';
import { HomeIcon, DocumentPlusIcon, ListBulletIcon, LogoutIcon, PencilSquareIcon, DocumentTextIcon } from './icons';

const Sidebar: React.FC = () => {
  const appContext = React.useContext(AppContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    if (appContext) {
      appContext.logout();
      navigate(ROUTES.LOGIN);
    }
  };

  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
      isActive
        ? 'bg-danger-dark text-white'
        : 'text-gray-700 hover:bg-danger-light hover:text-danger-dark'
    }`;

  return (
    <div className="flex flex-col w-64 bg-white shadow-lg h-full">
      <div className="flex items-center justify-center h-20 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-brand-red">EL LIBERTADOR</h1>
      </div>
      <nav className="flex-1 p-4 space-y-2">
        <NavLink to={ROUTES.DASHBOARD} className={navLinkClasses}>
          <HomeIcon className="w-5 h-5 mr-3" />
          Home
        </NavLink>
        <NavLink to={ROUTES.SEND_REQUEST} className={navLinkClasses}>
          <DocumentPlusIcon className="w-5 h-5 mr-3" />
          Enviar Solicitud
        </NavLink>
        <NavLink to={ROUTES.CONTRACT_SIGNING} className={navLinkClasses}>
          <PencilSquareIcon className="w-5 h-5 mr-3" />
          Firma de Contrato
        </NavLink>
        <NavLink to={ROUTES.REQUESTS_DASHBOARD} className={navLinkClasses}>
          <ListBulletIcon className="w-5 h-5 mr-3" />
          Dashboard de Envíos
        </NavLink>
      </nav>
      <div className="p-4 border-t border-gray-200">
        {appContext?.user && (
          <div className="mb-4 text-sm text-gray-600">
            <p>NIT: {appContext.user.nit}</p>
          </div>
        )}
        <button
          onClick={handleLogout}
          className="flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white bg-danger-dark rounded-lg"
        >
          <LogoutIcon className="w-5 h-5 mr-2" />
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
