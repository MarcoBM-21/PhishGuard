import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Globe, Mail, AlertTriangle, Loader2 } from 'lucide-react';
import { AnalysisType } from '../types';
import { useAnalysis } from '../context/AnalysisContext';

const AnalysisForm: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AnalysisType>('url');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { startAnalysis } = useAnalysis();
  const navigate = useNavigate();
  
  const handleTabChange = (tab: AnalysisType) => {
    setActiveTab(tab);
    setContent('');
    setError('');
  };
  
  const validate = (): boolean => {
    if (!content.trim()) {
      setError('El campo se encuentra vacío');
      return false;
    }
    
    if (activeTab === 'url') {
      try {
        // Basic URL validation
        new URL(content);
      } catch {
        setError('URL inválida');
        return false;
      }
    }

    if (activeTab === 'email' && content.trim().length < 40) {
      setError('No hay suficiente información');
      return false;
    }
    
    setError('');
    return true;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    setIsLoading(true);
    const start = performance.now();

    try {
      await startAnalysis(activeTab, content);
      const end = performance.now();
      const duration = ((end - start) / 1000).toFixed(2);
      sessionStorage.setItem('analysisDuration', duration); 
      navigate('/result');
    } catch (err) {
      setError('Ha ocurrido un error, por favor intentar denuevo');
      console.error(err);
    } finally {
      setIsLoading (false);
    }
  };
  
  return (
    <div className="rounded-lg shadow-md p-6 max-w-md w-full mx-auto">
      <div className="flex border-b mb-6">
        <button
          className={`flex items-center px-4 py-2 border-b-2 font-medium text-sm ${
            activeTab === 'url'
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
          onClick={() => handleTabChange('url')}
        >
          <Globe className="h-5 w-5 mr-2" />
          Analizar URL
        </button>
        <button
          className={`flex items-center px-4 py-2 border-b-2 font-medium text-sm ${
            activeTab === 'email'
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
          onClick={() => handleTabChange('email')}
        >
          <Mail className="h-5 w-5 mr-2" />
          Analizar Correo
        </button>
      </div>
      
      <form onSubmit={handleSubmit}>
        {activeTab === 'url' ? (
          <div className="mb-4">
            <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-1">
              Ingresar URL a analizar
            </label>
            <input
              type="text"
              id="url"
              placeholder="https://example.com"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
        ) : (
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Pegar contenido de correo
            </label>
            <textarea
              id="email"
              rows={4}
              placeholder="Paste the email content here..."
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
        )}
        
        {error && (
          <div className="mb-4 flex items-start p-3 bg-red-50 text-red-700 rounded-md">
            <AlertTriangle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
            <p className="text-sm">{error}</p>
          </div>
        )}
        
        <button
          type="submit"
          disabled={isLoading}
          className="w-full h-11 flex items-center justify-center bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-60"
        >
          {isLoading ? (
          <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              'Analizar ahora'
            )}
        </button>
      </form>
    </div>
  );
};

export default AnalysisForm;