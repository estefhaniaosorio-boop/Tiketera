
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../constants';
import NotificationToast from '../components/NotificationToast';
import { AppContext } from '../App';

const ForgotPasswordPage: React.FC = () => {
  const [nit, setNit] = useState('');
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

    if (!nit.trim()) {
      setError('El NIT es requerido.');
      setIsLoading(false);
      return;
    }

    if (!appContext) {
      setError('No se pudo cargar la información de la aplicación.');
      setIsLoading(false);
      return;
    }
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const normalizeNit = (n: string): string => {
        if (!n) return '';
        return n.split('-')[0].replace(/[.,]/g, '');
    };
    const normalizedNit = normalizeNit(nit);

    const foundCredential = appContext.credentials.find(
      (cred) => normalizeNit(cred.nit) === normalizedNit
    );

    if (foundCredential) {
      // In a real app, you would send an email here.
      // For this demo, we show a success message.
      setToastMessage('Se ha enviado un correo a su email registrado.');
      setIsToastVisible(true);
      setNit(''); // Clear field after submission
    } else {
      setError('El NIT ingresado no se encuentra registrado.');
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-light via-primary-DEFAULT to-primary-dark p-4">
      <div className="bg-white p-8 md:p-12 rounded-xl shadow-2xl w-full max-w-md">
        <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-brand-red">Recuperar Contraseña</h1>
            <p className="text-gray-600 mt-2">Ingrese su NIT para recibir su contraseña actual por correo.</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="nit" className="block text-sm font-medium text-gray-700">
              NIT
            </label>
            <input
              id="nit"
              name="nit"
              type="text"
              autoComplete="nit"
              required
              value={nit}
              onChange={(e) => setNit(e.target.value)}
              placeholder="Ingrese su NIT registrado"
              className="mt-1 block w-full px-4 py-3 border border-gray-400 rounded-lg shadow-sm placeholder-gray-400 sm:text-sm"
            />
          </div>
          {error && <p className="text-sm text-center text-danger-dark bg-danger-light p-3 rounded-md">{error}</p>}
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-danger-dark disabled:opacity-50"
            >
              {isLoading ? 'Buscando...' : 'Recordar contraseña'}
            </button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => navigate(ROUTES.LOGIN)}
            className="inline-block bg-danger-dark text-white font-semibold py-2 px-4 rounded-lg shadow-md text-sm"
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
