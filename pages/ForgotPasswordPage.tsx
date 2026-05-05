
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../constants';
import NotificationToast from '../components/NotificationToast';
import { AppContext } from '../App';

const ForgotPasswordPage: React.FC = () => {
  const [identificacion, setIdentificacion] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isToastVisible, setIsToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const appContext = useContext(AppContext);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!identificacion.trim()) {
      setError('La identificación es requerida.');
      setIsLoading(false);
      return;
    }

    if (!appContext) {
      setError('No se pudo cargar la información de la aplicación.');
      setIsLoading(false);
      return;
    }
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const normalizeId = (n: string): string => {
        if (!n) return '';
        return n.split('-')[0].replace(/[.,]/g, '');
    };
    const normalizedId = normalizeId(identificacion);

    const foundCredential = appContext.credentials.find(
      (cred) => normalizeId(cred.nit) === normalizedId
    );

    if (foundCredential) {
      setToastMessage('Se ha enviado un correo a su email registrado.');
      setIsToastVisible(true);
      setIdentificacion('');
    } else {
      setError('La identificación ingresada no se encuentra registrada.');
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-dark via-primary-DEFAULT to-primary-light p-4">
      <div className="bg-white p-8 md:p-12 rounded-xl shadow-2xl w-full max-w-md">
        <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-primary">Recuperar Contraseña</h1>
            <p className="text-gray-600 mt-2">Ingrese su identificación para recibir instrucciones por correo.</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="identificacion" className="block text-sm font-medium text-gray-700">
              Identificación
            </label>
            <input
              id="identificacion"
              name="identificacion"
              type="text"
              required
              value={identificacion}
              onChange={(e) => setIdentificacion(e.target.value)}
              placeholder="Número de identificación o NIT"
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 sm:text-sm focus:ring-primary focus:border-primary"
            />
          </div>
          {error && <p className="text-sm text-center text-danger-dark bg-danger-light p-3 rounded-md">{error}</p>}
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark transition-colors disabled:opacity-50"
            >
              {isLoading ? 'Buscando...' : 'Recuperar contraseña'}
            </button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => navigate(ROUTES.LOGIN)}
            className="text-sm text-primary hover:text-primary-dark font-medium underline"
          >
            Volver a Iniciar Sesión
          </button>
        </div>
      </div>
      <NotificationToast 
        message={toastMessage}
        isVisible={isToastVisible}
        onDismiss={() => setIsToastVisible(false)}
        type="success"
      />
    </div>
  );
};

export default ForgotPasswordPage;
