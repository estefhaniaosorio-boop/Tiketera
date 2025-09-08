
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../App';
import { ROUTES } from '../constants';
import { EyeIcon, EyeSlashIcon } from '../components/icons';

const LoginPage: React.FC = () => {
  const [nit, setNit] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const appContext = useContext(AppContext);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!nit || !password) {
      setError('NIT y contraseña son requeridos.');
      setIsLoading(false);
      return;
    }

    if (appContext) {
      const success = await appContext.login(nit, password);
      if (success) {
        navigate(ROUTES.DASHBOARD);
      } else {
        setError('Tu nombre de usuario y/o contraseña son incorrectos');
      }
    } else {
        setError('No se pudo acceder al contexto de la aplicación.');
    }
    setIsLoading(false);
  };
  
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const inputBaseClasses = "mt-1 block w-full px-4 py-3 border rounded-lg shadow-sm placeholder-gray-400 sm:text-sm";
  const errorInputClasses = "border-danger-dark ring-1 ring-danger-dark";
  const normalInputClasses = "border-gray-400";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-light via-primary-DEFAULT to-primary-dark p-4">
      <div className="bg-white p-8 md:p-12 rounded-xl shadow-2xl w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-brand-red">EL LIBERTADOR</h1>
          <p className="text-gray-600 mt-2">Bienvenido. Ingrese a su cuenta.</p>
        </div>
        
        {appContext?.credentialError && (
            <div className="mb-4 p-3 bg-danger-light text-center rounded-lg">
                <p className="text-sm text-danger-dark">{appContext.credentialError}</p>
            </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="nit" className="block text-sm font-medium text-gray-700">
              NIT
            </label>
            <input
              id="nit"
              name="nit"
              type="text"
              autoComplete="username"
              required
              value={nit}
              onChange={(e) => setNit(e.target.value)}
              placeholder="NIT (sin puntos, guión ni DV)"
              className={`${inputBaseClasses} ${error ? errorInputClasses : normalInputClasses}`}
              disabled={appContext?.isAppLoading}
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Contraseña
            </label>
            <div className="relative mt-1">
              <input
                id="password"
                name="password"
                type={isPasswordVisible ? 'text' : 'password'}
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Ingrese su contraseña"
                className={`block w-full px-4 py-3 border rounded-lg shadow-sm placeholder-gray-400 sm:text-sm pr-10 ${error ? errorInputClasses : normalInputClasses}`}
                disabled={appContext?.isAppLoading}
              />
              {password && (
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                  aria-label={isPasswordVisible ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                >
                  {isPasswordVisible ? (
                    <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                  ) : (
                    <EyeIcon className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              )}
            </div>
          </div>

          {error && <p className="text-sm text-danger-dark text-center">{error}</p>}
          
          <div>
            <button
              type="submit"
              disabled={isLoading || appContext?.isAppLoading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-danger-dark disabled:opacity-50"
            >
              {appContext?.isAppLoading ? 'Cargando datos...' : (isLoading ? 'Verificando...' : 'Iniciar Sesión')}
            </button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => navigate(ROUTES.FORGOT_PASSWORD)}
            className="inline-block bg-danger-dark text-white font-semibold py-2 px-4 rounded-lg shadow-md text-sm"
          >
            ¿Olvidó su contraseña?
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
