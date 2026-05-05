import React from 'react';

interface BolivarLogoProps {
  size?: number;
  className?: string;
  showText?: boolean;
}

/**
 * Logo de Seguros Bolívar.
 * Para usar el logo oficial, coloca el archivo PNG en public/logo-seguros-bolivar.png
 * Si no existe, muestra una versión tipográfica profesional.
 */
const BolivarLogo: React.FC<BolivarLogoProps> = ({ size = 40, className = '', showText = true }) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <img
        src="/logo-seguros-bolivar.png"
        alt="Seguros Bolívar"
        style={{ height: size, width: 'auto' }}
        onError={(e) => {
          // Si no existe el archivo local, ocultar la imagen rota
          const target = e.target as HTMLImageElement;
          target.style.display = 'none';
        }}
      />
      {showText && (
        <span
          style={{ fontSize: size * 0.45 }}
          className="font-bold text-primary tracking-tight"
        >
          BoliVer
        </span>
      )}
    </div>
  );
};

export default BolivarLogo;
