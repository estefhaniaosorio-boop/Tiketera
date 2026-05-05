

export interface Credential {
  inmobiliaria: string;
  nit: string;
  email: string;
  poliza: string;
  password_asignada: string;
  estado: string;
  permisos: ('validar_identidad' | 'firma_contrato')[];
}

export enum TipoDocumento {
  CEDULA_CIUDADANIA = "Cédula de Ciudadanía",
  PASAPORTE = "Pasaporte",
  CEDULA_EXTRANJERIA = "Cédula de Extranjería",
}

export enum EstadoSolicitud {
  PENDIENTE = "Pendiente",
  EXITOSO = "Exitoso",
  NO_EXITOSO = "No exitoso",
  VENCIDO = "Vencido",
}

export interface Solicitud {
  id: string; // This will now be the consecutive ID, e.g., SOL-000001
  tipoDocumento: TipoDocumento;
  numeroDocumento: string;
  numeroCelular: string;
  correoElectronico: string;
  fechaEnvio: string; // ISO string format
  estado: EstadoSolicitud;
  fechaVencimientoLink?: string; // ISO string format
  biometriaUrl?: string;
  idValidation?: string;
}

export interface User {
  poliza: string;
  nit: string;
  nombreInmobiliaria: string;
  cupoAsignado: number;
  cupoConsumido: number;
  permisos: ('validar_identidad' | 'firma_contrato')[];
}

// NUEVOS TIPOS PARA CONTRATOS
export enum EstadoContrato {
  PENDIENTE = "Pendiente de Firmas",
  FIRMADO = "Firmado",
  VENCIDO = "Vencido",
  NO_EXITOSO = "No Exitoso",
}

export enum SignerRole {
  ARRENDADOR = "Arrendador",
  ARRENDATARIO = "Arrendatario",
  DEUDOR_SOLIDARIO = "Deudor Solidario",
}

export interface Firma {
  signerId: string; // Corresponds to Signer.id
  signatureImage: string; // Base64 or URL to the signature image
  photoImage: string; // Base64 or URL to the signer's photo
  timestamp: string; // ISO string of when it was signed
  geolocation: { lat: number; long: number }; // Geolocation coordinates
}

export interface Signer {
  id: string;
  name: string;
  tipoDocumento: TipoDocumento;
  doc: string;
  email: string;
  phone: string;
  role: SignerRole;
  biometriaUrl?: string;
  idValidation?: string;
  transactionId?: string; // ID from "Transacciones Enviadas", e.g., CON-000002
}

export interface Contrato {
  id: string;
  fileName: string;
  fileUrl?: string; // URL to the PDF
  templateContent?: string; // Text content if from template
  status: EstadoContrato;
  createdAt: string; // ISO string
  expiresAt: string; // ISO string
  signers: Signer[];
  signatures: Firma[];
}

export enum TipoEnvio {
  SOLICITUD = "Solicitud",
  CONTRATO = "Contrato",
}

// Simula la estructura de datos de la hoja "Transacciones Enviadas"
export interface TransaccionDetallada {
  fechaEnvio: string;
  nitInmobiliaria: string;
  idConsecutivo: string; // e.g., SOL-000001, CON-000002
  tipoEnvio: TipoEnvio;
  tipoDocumento: TipoDocumento;
  numeroDocumento: string;
  numeroCelular: string;
  correoElectronico: string;
  fechaVencimiento: string;
  estado: EstadoSolicitud;
}


export interface AppContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (nit: string, pass: string) => Promise<boolean>;
  logout: () => void;
  isAppLoading: boolean;
  credentialError: string | null;
  credentials: Credential[];
  consumeTransactions: (count?: number) => void;
  requests: Solicitud[];
  addRequest: (requestData: Omit<Solicitud, 'id' | 'fechaEnvio' | 'estado' | 'fechaVencimientoLink'>) => string; // Returns new consecutive ID
  getRequestById: (id: string) => Solicitud | undefined;
  updateRequestStatus: (id: string, newStatus: EstadoSolicitud) => void;
  setTransactionsForTesting: (action: 'reset_consumed' | 'add_10_assigned') => void;
  transaccionesDetalladas: TransaccionDetallada[];
  contracts: Contrato[];
  addContract: (contractData: Omit<Contrato, 'id' | 'status' | 'createdAt' | 'expiresAt' | 'signatures'>) => Contrato; // Returns new contract with signer transaction IDs
  getContractById: (id: string) => Contrato | undefined;
  updateContractStatus: (id: string, newStatus: EstadoContrato, signatures?: Firma[]) => void;
}


export interface ChartDataPoint {
  month: string;
  disponibles: number; // Renamed from enviadas for new chart logic
  consumidas: number;  // Renamed from exitosas for new chart logic
}

// Simula la estructura de datos de la hoja "Cupo disponible" de Google Sheets
export interface CupoData {
  nit: string;
  asignadas: number;
  usadas: number;
}
