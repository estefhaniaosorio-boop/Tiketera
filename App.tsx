

import React, { useState, useCallback, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AppContextType, User, Solicitud, EstadoSolicitud, Contrato, Signer, EstadoContrato, Firma, Credential, CupoData, TransaccionDetallada, TipoEnvio, TipoDocumento } from './types';
import { ROUTES, INITIAL_REQUESTS, MOCK_CONTRACTS, MOCK_CREDENTIALS, MOCK_CUPO_DATA } from './constants';

import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import SendRequestPage from './pages/SendRequestPage';
import RequestsDashboardPage from './pages/RequestsDashboardPage';
import RequestDetailPage from './pages/RequestDetailPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ContractSigningPage from './pages/ContractSigningPage';
import ContractDetailPage from './pages/ContractDetailPage'; // Nuevo
import NotFoundPage from './pages/NotFoundPage';
import Sidebar from './components/Sidebar';

export const AppContext = React.createContext<AppContextType | null>(null);

const BIOMETRY_API_KEY = 'BLX4v9u8SZ5ypiyL9ZPpV8qWPAWppXP73qvXq61l';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const appContext = React.useContext(AppContext);
  const location = useLocation();

  if (!appContext?.isAuthenticated) {
    return <>{children}</>;
  }

  const hideSidebarOnPaths = [ROUTES.LOGIN, ROUTES.FORGOT_PASSWORD];
  const shouldShowSidebar = !hideSidebarOnPaths.includes(location.pathname);
  
  return (
    <div className="flex h-screen bg-gray-100">
      {shouldShowSidebar && <Sidebar />}
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

const ProtectedRoute: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const appContext = React.useContext(AppContext);
  if (!appContext?.isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }
  return children;
};


const App: React.FC = () => {
  const [inmobiliarias, setInmobiliarias] = useState<User[]>([]);

  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem('currentUser');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return !!localStorage.getItem('currentUser');
  });
  
  const [credentials, setCredentials] = useState<Credential[]>([]);
  const [isAppLoading, setIsAppLoading] = useState<boolean>(true);
  const [credentialError, setCredentialError] = useState<string | null>(null);

  const [consecutiveIdCounter, setConsecutiveIdCounter] = useState<number>(() => {
    const stored = localStorage.getItem('consecutiveIdCounter');
    return stored ? parseInt(stored, 10) : 1;
  });

  const [requests, setRequests] = useState<Solicitud[]>(() => {
    const storedRequests = localStorage.getItem('requests');
    if (storedRequests) {
        try {
            const parsedRequests = JSON.parse(storedRequests);
            // This logic is now handled on creation, but kept for legacy data safety
            return parsedRequests.map((req: Solicitud) => {
                if (req.estado === EstadoSolicitud.PENDIENTE && !req.fechaVencimientoLink) {
                    const vencimiento = new Date(req.fechaEnvio);
                    vencimiento.setDate(vencimiento.getDate() + 5); 
                    return { ...req, fechaVencimientoLink: vencimiento.toISOString() };
                }
                return req;
            });
        } catch (e) {
            console.error("Failed to parse requests from localStorage", e);
            return INITIAL_REQUESTS;
        }
    }
    return INITIAL_REQUESTS;
  });
  
  const [contracts, setContracts] = useState<Contrato[]>(() => {
    const storedContracts = localStorage.getItem('contracts');
    return storedContracts ? JSON.parse(storedContracts) : MOCK_CONTRACTS;
  });
  
  const [transaccionesDetalladas, setTransaccionesDetalladas] = useState<TransaccionDetallada[]>(() => {
      const stored = localStorage.getItem('transaccionesDetalladas');
      return stored ? JSON.parse(stored) : [];
  });
  
  useEffect(() => {
    const loadMockCredentials = () => {
      setCredentials(MOCK_CREDENTIALS);
    };

    loadMockCredentials();
  }, []);

  useEffect(() => {
    if (credentials.length > 0) {
      const fetchCupoData = async (): Promise<CupoData[]> => {
        return Promise.resolve(MOCK_CUPO_DATA);
      };

      const initializeInmobiliarias = async () => {
        setIsAppLoading(true);
        try {
          const cupoData = await fetchCupoData();
          const normalizeNit = (n: string): string => n ? n.split('-')[0].replace(/[.,]/g, '') : '';

          const freshInmobiliariasData: User[] = credentials.map(cred => {
            const cupo = cupoData.find(c => normalizeNit(c.nit) === normalizeNit(cred.nit));
            return {
              poliza: cred.poliza,
              nombreInmobiliaria: cred.inmobiliaria,
              nit: normalizeNit(cred.nit),
              cupoAsignado: cupo?.asignadas ?? 0,
              cupoConsumido: cupo?.usadas ?? 0,
            };
          });
          
          const storedData = localStorage.getItem('inmobiliariasData');
          if (storedData) {
            const storedInmobiliarias: User[] = JSON.parse(storedData);
            const mergedData = freshInmobiliariasData.map(freshUser => {
              const storedUser = storedInmobiliarias.find(su => su.nit === freshUser.nit);
              if (storedUser) {
                return { ...freshUser, cupoConsumido: storedUser.cupoConsumido };
              }
              return freshUser;
            });
            setInmobiliarias(mergedData);
          } else {
            setInmobiliarias(freshInmobiliariasData);
          }

        } catch (error) {
          console.error("Failed to initialize inmobiliarias data:", error);
          setCredentialError("No se pudo cargar la información de las inmobiliarias.");
        } finally {
          setIsAppLoading(false);
        }
      };

      initializeInmobiliarias();
    }
  }, [credentials]);

  useEffect(() => {
    if (isAuthenticated && user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
    } else {
      localStorage.removeItem('currentUser');
    }
  }, [isAuthenticated, user]);

  useEffect(() => {
    if (inmobiliarias.length > 0) {
      localStorage.setItem('inmobiliariasData', JSON.stringify(inmobiliarias));
    }
  }, [inmobiliarias]);

  useEffect(() => {
    localStorage.setItem('requests', JSON.stringify(requests));
  }, [requests]);

  useEffect(() => {
    localStorage.setItem('contracts', JSON.stringify(contracts));
  }, [contracts]);
  
  useEffect(() => {
      localStorage.setItem('transaccionesDetalladas', JSON.stringify(transaccionesDetalladas));
  }, [transaccionesDetalladas]);

  useEffect(() => {
      localStorage.setItem('consecutiveIdCounter', consecutiveIdCounter.toString());
  }, [consecutiveIdCounter]);


  const logout = useCallback(() => {
    setIsAuthenticated(false);
    setUser(null);
    // Clear all session data for security
    localStorage.removeItem('currentUser');
    localStorage.removeItem('inmobiliariasData');
    localStorage.removeItem('requests');
    localStorage.removeItem('contracts');
    localStorage.removeItem('transaccionesDetalladas');
    localStorage.removeItem('consecutiveIdCounter');

  }, []);
  
  const login = useCallback(async (nit: string, pass: string): Promise<boolean> => {
      const normalizeNit = (n: string): string => {
        if (!n) return '';
        return n.split('-')[0].replace(/[.,]/g, '');
      };
      
      const normalizedUserInputNit = normalizeNit(nit);

      const validCredential = credentials.find(cred =>
        normalizeNit(cred.nit) === normalizedUserInputNit &&
        cred.password_asignada === pass &&
        cred.estado === 'Activo'
      );

      if (validCredential) {
        const foundUser = inmobiliarias.find(inmo => inmo.nit === normalizedUserInputNit);
        if (foundUser) {
          setUser(foundUser);
          setIsAuthenticated(true);
          return true;
        } else {
           console.error(`No profile data found for nit ${normalizedUserInputNit}`);
           return false;
        }
      }
      return false;
  }, [credentials, inmobiliarias]);

  useEffect(() => {
    if (!isAuthenticated) return;
    let inactivityTimer: number;
    const logoutUser = () => { logout(); };
    const resetTimer = () => {
        clearTimeout(inactivityTimer);
        inactivityTimer = window.setTimeout(logoutUser, 15 * 60 * 1000);
    };
    const activityEvents: (keyof WindowEventMap)[] = ['mousemove', 'mousedown', 'keypress', 'scroll', 'touchstart'];
    activityEvents.forEach(event => window.addEventListener(event, resetTimer));
    resetTimer();
    return () => {
        clearTimeout(inactivityTimer);
        activityEvents.forEach(event => window.removeEventListener(event, resetTimer));
    };
  }, [isAuthenticated, logout]);

  const consumeTransactions = useCallback((count: number = 1) => {
    if (!user) return;
    const updatedUser = { ...user, cupoConsumido: user.cupoConsumido + count };
    setUser(updatedUser);
    setInmobiliarias(prev => prev.map(inmo => inmo.poliza === user.poliza ? updatedUser : inmo));
  }, [user]);
  
  const getNextConsecutiveId = (prefix: 'SOL' | 'CON'): string => {
    const nextId = consecutiveIdCounter;
    setConsecutiveIdCounter(prev => prev + 1);
    return `${prefix}-${String(nextId).padStart(6, '0')}`;
  };

  const addRequest = useCallback((requestData: Omit<Solicitud, 'id' | 'fechaEnvio' | 'estado' | 'fechaVencimientoLink'>): string => {
    if (!user) return '';

    const newConsecutiveId = getNextConsecutiveId('SOL');
    const fechaEnvio = new Date();
    const vencimiento = new Date(fechaEnvio);
    vencimiento.setDate(vencimiento.getDate() + 5);

    const newRequest: Solicitud = {
      ...requestData,
      id: newConsecutiveId,
      fechaEnvio: fechaEnvio.toISOString(),
      estado: EstadoSolicitud.PENDIENTE,
      fechaVencimientoLink: vencimiento.toISOString(),
    };
    setRequests(prev => [newRequest, ...prev]);
    
    const newTransaction: TransaccionDetallada = {
      fechaEnvio: newRequest.fechaEnvio,
      nitInmobiliaria: user.nit,
      idConsecutivo: newConsecutiveId,
      tipoEnvio: TipoEnvio.SOLICITUD,
      tipoDocumento: newRequest.tipoDocumento,
      numeroDocumento: newRequest.numeroDocumento,
      numeroCelular: newRequest.numeroCelular,
      correoElectronico: newRequest.correoElectronico,
      fechaVencimiento: vencimiento.toISOString(),
      estado: newRequest.estado,
    };
    setTransaccionesDetalladas(prev => [newTransaction, ...prev]);

    return newConsecutiveId;
  }, [user, consecutiveIdCounter]);


  const getRequestById = useCallback((id: string): Solicitud | undefined => {
    return requests.find(req => req.id === id);
  }, [requests]);
  
  const updateRequestStatus = useCallback((id: string, newStatus: EstadoSolicitud): void => {
    setRequests(prevReqs => prevReqs.map(req => {
      if (req.id === id && req.estado !== newStatus) {
        // For resending a VENCIDO request, update send date and expiration
        if (req.estado === EstadoSolicitud.VENCIDO && newStatus === EstadoSolicitud.PENDIENTE) {
          const newFechaEnvio = new Date().toISOString();
          const vencimiento = new Date(newFechaEnvio);
          vencimiento.setDate(vencimiento.getDate() + 5);
          return { ...req, estado: newStatus, fechaEnvio: newFechaEnvio, fechaVencimientoLink: vencimiento.toISOString() };
        }
        // For all other status transitions (e.g., PENDING -> SUCCESS), just update the status
        return { ...req, estado: newStatus };
      }
      return req;
    }));
    setTransaccionesDetalladas(prevTrans => prevTrans.map(tran => {
        if (tran.idConsecutivo === id) {
            return { ...tran, estado: newStatus };
        }
        return tran;
    }));
  }, []);

  const setTransactionsForTesting = useCallback((action: 'reset_consumed' | 'add_10_assigned') => {
    if (!user) return;
    let updatedUser: User;
    if (action === 'reset_consumed') {
      updatedUser = { ...user, cupoConsumido: 0 };
    } else { // 'add_10_assigned'
      updatedUser = { ...user, cupoAsignado: user.cupoAsignado + 10 };
    }
    setUser(updatedUser);
    setInmobiliarias(prev => prev.map(inmo => inmo.poliza === user.poliza ? updatedUser : inmo));
  }, [user]);
  
  const updateContractStatus = useCallback((id: string, newStatus: EstadoContrato, signatures: Firma[] = []): void => {
    setContracts(prevContracts => prevContracts.map(contract => {
        if (contract.id === id) {
            return {
                ...contract,
                status: newStatus,
                signatures: signatures.length > 0 ? signatures : contract.signatures,
            };
        }
        return contract;
    }));
  }, []);

  useEffect(() => {
    const checkRequestStatuses = async () => {
      const pendingRequests = requests.filter(
        r => r.estado === EstadoSolicitud.PENDIENTE && r.idValidation
      );

      if (pendingRequests.length === 0) return;

      for (const request of pendingRequests) {
        if (request.fechaVencimientoLink && new Date() > new Date(request.fechaVencimientoLink)) {
          if (request.estado !== EstadoSolicitud.VENCIDO) {
            updateRequestStatus(request.id, EstadoSolicitud.VENCIDO);
          }
          continue;
        }

        try {
          const response = await fetch(`https://2ncqe7ikzh.execute-api.us-east-1.amazonaws.com/stage/biometry/v1/status?idValidation=${request.idValidation}`, {
            headers: { 'x-api-key': BIOMETRY_API_KEY }
          });

          if (!response.ok) {
              const errorData = await response.json().catch(() => ({ message: `HTTP status ${response.status}` }));
              const detail = errorData?.message ? (typeof errorData.message === 'string' ? errorData.message : JSON.stringify(errorData.message)) : `Status: ${response.status}`;
              console.error(`API error for validation ID ${request.idValidation}: ${detail}`);
              continue;
          }

          const data = await response.json();
          if (data.status === 'validation-success') {
            updateRequestStatus(request.id, EstadoSolicitud.EXITOSO);
          } else if (data.status === 'validation-failed') {
            updateRequestStatus(request.id, EstadoSolicitud.NO_EXITOSO);
          }
        } catch (error) {
          console.error(`Error processing status check for request ${request.id}:`, error);
        }
      }
    };

    const intervalId = setInterval(checkRequestStatuses, 20000); // Check every 20 seconds
    return () => clearInterval(intervalId);
  }, [requests, updateRequestStatus]);
  
  useEffect(() => {
    const checkStatuses = async () => {
      const pendingContracts = contracts.filter(
        c => c.status === EstadoContrato.PENDIENTE && c.signers.some(s => s.idValidation)
      );
      
      if (pendingContracts.length === 0) return;

      for (const contract of pendingContracts) {
        if (new Date() > new Date(contract.expiresAt)) {
            updateContractStatus(contract.id, EstadoContrato.VENCIDO);
            continue;
        }

        try {
          const signerStatusPromises = contract.signers
            .filter(signer => signer.idValidation)
            .map(signer =>
              fetch(`https://2ncqe7ikzh.execute-api.us-east-1.amazonaws.com/stage/biometry/v1/status?idValidation=${signer.idValidation}`, {
                headers: { 'x-api-key': BIOMETRY_API_KEY }
              }).then(async res => {
                if (!res.ok) {
                  const errorData = await res.json().catch(() => ({ message: `HTTP status ${res.status}` }));
                  const detail = errorData?.message ? (typeof errorData.message === 'string' ? errorData.message : JSON.stringify(errorData.message)) : `Status: ${res.status}`;
                  throw new Error(`API error for validation ID ${signer.idValidation}: ${detail}`);
                }
                return res.json();
              })
            );

          const results = await Promise.allSettled(signerStatusPromises);

          let successfulSignatures = 0;
          let failedSignatures = false;
          let hasApiError = false;

          results.forEach(result => {
            if (result.status === 'fulfilled') {
              const data = result.value;
              if (data.status === 'validation-success') {
                successfulSignatures++;
              } else if (data.status === 'validation-failed') {
                failedSignatures = true;
              }
            } else { 
              console.error(`A signer status check failed for contract ${contract.id}:`, result.reason?.message || result.reason);
              hasApiError = true;
            }
          });

          if (failedSignatures || hasApiError) {
            updateContractStatus(contract.id, EstadoContrato.NO_EXITOSO);
          } else if (successfulSignatures === contract.signers.length) {
            const newSignatures: Firma[] = contract.signers.map(signer => ({
                signerId: signer.id,
                signatureImage: `https://via.placeholder.com/200x100.png?text=Firma+${signer.name.split(' ')[0]}`,
                photoImage: `https://picsum.photos/seed/${signer.doc}/150/150`,
                timestamp: new Date().toISOString(),
                geolocation: { lat: 4.60971, long: -74.08175 }
            }));
            updateContractStatus(contract.id, EstadoContrato.FIRMADO, newSignatures);
          }
        } catch (error) {
          console.error(`Error processing status checks for contract ${contract.id}:`, error);
        }
      }
    };

    const intervalId = setInterval(checkStatuses, 20000); // Check every 20 seconds
    return () => clearInterval(intervalId);
  }, [contracts, updateContractStatus]);

  const addContract = useCallback((contractData: Omit<Contrato, 'id' | 'status' | 'createdAt' | 'expiresAt' | 'signatures'>): Contrato => {
    if (!user) throw new Error("User not authenticated");

    const newContractId = `CON-MAIN-${String(Date.now()).slice(-6)}`;
    const now = new Date();
    const expires = new Date(now);
    expires.setDate(now.getDate() + 7);

    const newConsecutiveId = getNextConsecutiveId('CON');

    const signersWithTransactionIds: Signer[] = [];
    const newTransactions: TransaccionDetallada[] = [];

    contractData.signers.forEach(signer => {
        signersWithTransactionIds.push({
            ...signer,
            transactionId: newConsecutiveId
        });

        const transactionVencimiento = new Date(now);
        transactionVencimiento.setDate(transactionVencimiento.getDate() + 5);

        newTransactions.push({
            fechaEnvio: now.toISOString(),
            nitInmobiliaria: user.nit,
            idConsecutivo: newConsecutiveId,
            tipoEnvio: TipoEnvio.CONTRATO,
            tipoDocumento: signer.tipoDocumento,
            numeroDocumento: signer.doc,
            numeroCelular: signer.phone,
            correoElectronico: signer.email,
            fechaVencimiento: transactionVencimiento.toISOString(),
            estado: EstadoSolicitud.PENDIENTE,
        });
    });

    const newContract: Contrato = {
      ...contractData,
      id: newContractId,
      status: EstadoContrato.PENDIENTE,
      createdAt: now.toISOString(),
      expiresAt: expires.toISOString(),
      signatures: [],
      signers: signersWithTransactionIds
    };
    
    setContracts(prev => [newContract, ...prev]);
    setTransaccionesDetalladas(prev => [...newTransactions, ...prev]);
    
    return newContract;
  }, [user, consecutiveIdCounter]);


  const getContractById = useCallback((id: string): Contrato | undefined => {
    return contracts.find(c => c.id === id);
  }, [contracts]);

  const appContextValue: AppContextType = {
    isAuthenticated,
    user,
    login,
    logout,
    isAppLoading,
    credentialError,
    credentials,
    consumeTransactions,
    requests,
    addRequest,
    getRequestById,
    updateRequestStatus,
    setTransactionsForTesting,
    transaccionesDetalladas,
    contracts,
    addContract,
    getContractById,
    updateContractStatus,
  };

  return (
    <AppContext.Provider value={appContextValue}>
      <HashRouter>
        <Layout>
          <Routes>
            <Route path={ROUTES.LOGIN} element={<LoginPage />} />
            <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPasswordPage />} />
            
            <Route path={ROUTES.DASHBOARD} element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
            <Route path={ROUTES.SEND_REQUEST} element={<ProtectedRoute><SendRequestPage /></ProtectedRoute>} />
            <Route path={ROUTES.REQUESTS_DASHBOARD} element={<ProtectedRoute><RequestsDashboardPage /></ProtectedRoute>} />
            <Route path={ROUTES.REQUEST_DETAIL} element={<ProtectedRoute><RequestDetailPage /></ProtectedRoute>} />
            <Route path={ROUTES.CONTRACT_SIGNING} element={<ProtectedRoute><ContractSigningPage /></ProtectedRoute>} />
            <Route path={ROUTES.CONTRACT_DETAIL} element={<ProtectedRoute><ContractDetailPage /></ProtectedRoute>} />
            
            <Route path="/" element={isAuthenticated ? <Navigate to={ROUTES.DASHBOARD} /> : <Navigate to={ROUTES.LOGIN} />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Layout>
      </HashRouter>
    </AppContext.Provider>
  );
};

export default App;