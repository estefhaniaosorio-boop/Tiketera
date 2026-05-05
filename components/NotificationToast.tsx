
import React, { useEffect } from 'react';
import { CheckIcon } from './icons';

interface NotificationToastProps {
  message: string;
  isVisible: boolean;
  onDismiss: () => void;
  duration?: number;
  type?: 'success' | 'error' | 'info';
}

const NotificationToast: React.FC<NotificationToastProps> = ({ 
  message, 
  isVisible, 
  onDismiss, 
  duration = 3000,
  type = 'success'
}) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onDismiss();
      }, duration);
      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible, duration, onDismiss]);

  if (!isVisible) return null;

  let bgColor = 'bg-green-500';
  if (type === 'error') bgColor = 'bg-red-500';
  if (type === 'info') bgColor = 'bg-blue-500';
  
  return (
    <div 
      className={`fixed top-5 right-5 ${bgColor} text-white p-4 rounded-lg shadow-lg flex items-center z-[100]`}
    >
      <CheckIcon className="w-6 h-6 mr-3" />
      <span>{message}</span>
      <button onClick={onDismiss} className="ml-4 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xl font-bold text-white">&times;</button>
    </div>
  );
};

export default NotificationToast;
