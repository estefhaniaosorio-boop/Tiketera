import React from 'react';
import { FaSpinner } from 'react-icons/fa';

interface LoaderOverlayProps {
  isVisible: boolean;
  text?: string;
}

const LoaderOverlay: React.FC<LoaderOverlayProps> = ({ isVisible, text = 'Procesando...' }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm">
      <div className="flex flex-col items-center text-white">
        <FaSpinner className="animate-spin w-12 h-12 mb-4" />
        <p className="text-lg font-semibold">{text}</p>
      </div>
    </div>
  );
};

export default LoaderOverlay;
