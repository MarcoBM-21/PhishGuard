import React from 'react';
import { Shield } from 'lucide-react';

const LoadingState: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className="relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <Shield className="h-16 w-16 text-blue-500 animate-pulse" />
        </div>
        <div className="h-24 w-24 rounded-full border-4 border-blue-200 border-t-blue-600 animate-spin"></div>
      </div>
      
      <div className="mt-6 text-center">
        <h2 className="text-lg font-semibold text-gray-700 mb-2">Analizando contenido</h2>
        <p className="text-gray-500 text-sm max-w-xs">
        Estamos buscando posibles indicadores de phishing.
        Solo tomará un momento...
        </p>
      </div>
      
      <div className="mt-6 w-full max-w-xs">
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div className="bg-blue-600 h-2.5 rounded-full animate-progress"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingState;