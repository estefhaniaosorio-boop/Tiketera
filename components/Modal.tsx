
import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  iconBgColor?: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, icon, iconBgColor = 'bg-gray-100' }) => {
  if (!isOpen) return null;


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div 
        className="bg-white rounded-lg shadow-xl p-6 md:p-8 w-full max-w-md m-4"
      >
        <div className="flex flex-col items-center text-center">
          {icon && (
            <div className={`mx-auto flex items-center justify-center h-16 w-16 rounded-full ${iconBgColor} mb-4`}>
              {icon}
            </div>
          )}
          <h3 className="text-2xl font-semibold leading-6 text-gray-900 mb-2">{title}</h3>
          <div className="mt-2 text-sm text-gray-600 w-full">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
