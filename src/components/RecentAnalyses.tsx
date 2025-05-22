import React from 'react';
import { Clock, ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Analysis } from '../types';
import AnalysisCard from './AnalysisCard';

interface RecentAnalysesProps {
  analyses: Analysis[];
}

const RecentAnalyses: React.FC<RecentAnalysesProps> = ({ analyses }) => {
  const navigate = useNavigate();
  
  if (analyses.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-center mb-4">
          <h2 className="text-lg font-medium text-gray-900 flex items-center">
            Historial de atentados
          </h2>
        </div>
        <p className="text-gray-500 text-sm text-center py-6">
          Aún no hay historial de análisis. 
          Empieza analizando una URL o el contenido de un correo electrónico.
        </p>
      </div>
    );
  }
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-medium text-gray-900 flex items-center">
          <Clock className="h-5 w-5 mr-2 text-blue-500" />
          Analisis recientes
        </h2>
        <button
          onClick={() => navigate('/history')}
          className="text-blue-600 text-sm font-medium flex items-center hover:text-blue-800"
        >
          Ver todo
          <ArrowUpRight className="h-4 w-4 ml-1" />
        </button>
      </div>
      
      <div className="space-y-3">
        {analyses.map((analysis) => (
          <AnalysisCard key={analysis.id} analysis={analysis} />
        ))}
      </div>
    </div>
  );
};

export default RecentAnalyses;