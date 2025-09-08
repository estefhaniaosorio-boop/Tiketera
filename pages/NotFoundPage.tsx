
import React from 'react';
// FIX: Update react-router-dom import for v5 compatibility.
import { Link } from 'react-router-dom';
import { ROUTES } from '../constants';
import { ArrowLeftIcon } from '../components/icons';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4 text-center">
      <img src="https://picsum.photos/300/200?grayscale&blur=2" alt="Lost" className="w-64 h-auto rounded-lg shadow-lg mb-8" />
      <h1 className="text-6xl font-extrabold text-primary-dark mb-4">404</h1>
      <h2 className="text-3xl font-semibold text-gray-800 mb-2">Página No Encontrada</h2>
      <p className="text-gray-600 mb-8 max-w-md">
        Lo sentimos, la página que está buscando no existe o ha sido movida.
        Verifique la URL o regrese al inicio.
      </p>
      <Link
        to={ROUTES.DASHBOARD}
        className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-danger-dark"
      >
        <ArrowLeftIcon className="w-5 h-5 mr-2" />
        Volver al Dashboard
      </Link>
    </div>
  );
};

export default NotFoundPage;
