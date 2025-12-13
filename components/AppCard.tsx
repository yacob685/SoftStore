import React from 'react';
import { AppData } from '../types';
import { Star, Download, ShieldCheck } from 'lucide-react';

interface AppCardProps {
  app: AppData;
  onClick: (app: AppData) => void;
}

const AppCard: React.FC<AppCardProps> = ({ app, onClick }) => {
  return (
    <div 
      className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer border border-gray-100 flex flex-col h-full overflow-hidden group"
      onClick={() => onClick(app)}
    >
      <div className="p-5 flex-1">
        <div className="flex items-start justify-between mb-4">
          <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center overflow-hidden flex-shrink-0">
             <img 
               src={`https://picsum.photos/seed/${app.id}/200`} 
               alt={app.name} 
               className="w-full h-full object-cover"
             />
          </div>
          <div className="flex flex-col items-end">
             <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-emerald-50 text-emerald-700">
               {app.license}
             </span>
             {app.category === 'Security' && (
                <ShieldCheck size={16} className="text-emerald-500 mt-1" />
             )}
          </div>
        </div>
        
        <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-emerald-600 transition-colors">
          {app.name}
        </h3>
        <p className="text-sm text-gray-500 mb-3">{app.developer}</p>
        
        <div className="flex items-center mb-3">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                size={14} 
                fill={i < Math.floor(app.rating / 2) ? "currentColor" : "none"} 
                className={i < Math.floor(app.rating / 2) ? "" : "text-gray-300"}
              />
            ))}
          </div>
          <span className="text-xs text-gray-500 ml-2 font-semibold">{app.rating}/10</span>
        </div>
        
        <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
          {app.description}
        </p>
      </div>

      <div className="bg-gray-50 px-5 py-3 border-t border-gray-100 flex items-center justify-between">
        <span className="text-xs text-gray-500">{app.os} • {app.version}</span>
        <div className="text-emerald-600 bg-emerald-100 hover:bg-emerald-200 p-2 rounded-full transition-colors">
            <Download size={16} />
        </div>
      </div>
    </div>
  );
};

export default AppCard;
