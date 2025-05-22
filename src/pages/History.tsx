import React, { useState } from 'react';
import { FileText, Trash2, Filter, Search } from 'lucide-react';
import { useAnalysis } from '../context/AnalysisContext';
import AnalysisCard from '../components/AnalysisCard';
import { Analysis, AnalysisType } from '../types';
import { useNavigate} from 'react-router-dom';

const History: React.FC = () => {
  const { allAnalyses, refreshHistory } = useAnalysis();
  const [filterType, setFilterType] = useState<AnalysisType | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  
  const filteredAnalyses = allAnalyses.filter((analysis) => {
    // Filter by type
    const typeMatch = filterType === 'all' || analysis.type === filterType;
    
    // Filter by search term
    const searchMatch = analysis.content.toLowerCase().includes(searchTerm.toLowerCase());
    
    return typeMatch && searchMatch;
  });
  
  const handleClearHistory = async () => {
    if (window.confirm('Are you sure you want to clear all analysis history?')) {
      chrome.storage.local.remove(['analyses'], async () => {
        await refreshHistory();
      });
    }
  };
  
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center">
          <FileText className="h-6 w-6 mr-2 text-blue-600" />
          Historial
        </h1>
        
        {allAnalyses.length > 0 && (
          <button
            onClick={handleClearHistory}
            className="flex items-center text-sm px-3 py-1 border border-red-300 text-red-600 rounded hover:bg-red-50"
          >
            <Trash2 className="h-4 w-4 mr-1" />
            Limpiar Historial
          </button>
        )}
      </div>
      
      {allAnalyses.length > 0 ? (
        <>
          <div className="bg-white rounded-lg shadow-md p-4 mb-6">
            <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search analysis content..."
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Filter className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md appearance-none focus:ring-blue-500 focus:border-blue-500"
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value as AnalysisType | 'all')}
                >
                  <option value="all">Todos</option>
                  <option value="url">URL</option>
                  <option value="email">Contenido</option>
                </select>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            {filteredAnalyses.length > 0 ? (
              filteredAnalyses.map((analysis) => (
                <AnalysisCard key={analysis.id} analysis={analysis} detailed />
              ))
            ) : (
              <div className="bg-white rounded-lg shadow-md p-6 text-center text-gray-500">
                Resultados no encontrados
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <div className="flex justify-center mb-4">
            <FileText className="h-12 w-12 text-gray-300" />
          </div>
          <h2 className="text-xl font-medium text-gray-700 mb-2">Sin historial</h2>
          <p className="text-gray-500 mb-6">
          Aún no has realizado ningún análisis de phishing.
          Vuelve a la página de inicio para empezar a analizar las URL o el contenido del correo electrónico.
          </p>
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Atrás
          </button>
        </div>
      )}
    </div>
  );
};

export default History;