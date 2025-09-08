
import React from 'react';

interface KPICardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  description?: string;
  colorClass?: string;
}

const KPICard: React.FC<KPICardProps> = ({ title, value, icon, description, colorClass = "bg-primary-DEFAULT" }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg"> {/* Removed hover:shadow-xl */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500 uppercase">{title}</p>
          <p className="text-3xl font-bold text-gray-800 mt-1">{value}</p>
        </div>
        {icon && React.isValidElement(icon) && (
          <div className={`p-3 rounded-full ${colorClass} text-white`}>
            {React.cloneElement(icon as React.ReactElement<any>, { className: "w-7 h-7" })}
          </div>
        )}
      </div>
      {description && <p className="text-xs text-gray-400 mt-2">{description}</p>}
    </div>
  );
};

export default KPICard;