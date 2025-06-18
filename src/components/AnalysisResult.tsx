import React from 'react';
import { Shield, ShieldAlert, ArrowLeft, AlertTriangle, FileText, Timer, XCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Analysis } from '../types';
import { formatTimestamp } from '../utils/analysisUtils';

interface AnalysisResultProps {
  analysis: Analysis;
}

const AnalysisResult: React.FC<AnalysisResultProps> = ({ analysis }) => {
  const navigate = useNavigate();
  const isPhishing = analysis.result === 'PHISHING';
  const isValid = analysis.result === 'NO PHISHING';
  const isInvalid = analysis.result === 'INVÁLIDO';

  const duration = sessionStorage.getItem('analysisDuration');
  
  let borderColor, bgColor, iconBg, iconColor, textColor, IconComponent, message;

  if (isPhishing) {
    borderColor = 'border-red-500';
    bgColor = 'bg-red-50';
    iconBg = 'bg-red-100';
    iconColor = 'text-red-500';
    textColor = 'text-red-600';
    IconComponent = ShieldAlert;
    message = 'Este contenido tiene indicadores potenciales de Phishing';
  } else if (isValid) {
    borderColor = 'border-green-500';
    bgColor = 'bg-green-50';
    iconBg = 'bg-green-100';
    iconColor = 'text-green-500';
    textColor = 'text-green-600';
    IconComponent = Shield;
    message = 'Este contenido aparenta ser legítimo';
  } else {
    borderColor = 'border-yellow-500';
    bgColor = 'bg-yellow-50';
    iconBg = 'bg-yellow-100';
    iconColor = 'text-yellow-500';
    textColor = 'text-yellow-600';
    IconComponent = XCircle;
    message = 'No se pudo determinar la legitimidad del contenido';
  }

  return (
    <div className="max-w-md w-full mx-auto">
      <div 
        className={`bg-white rounded-lg shadow-lg overflow-hidden border-t-8 ${borderColor}`}
      >
        <div className={`p-6 ${bgColor}`}>
          <div className="flex justify-center mb-4">
            <div className={`p-3 ${iconBg} rounded-full`}>
              <IconComponent className={`h-12 w-12 ${iconColor}`} />
            </div>
          </div>
          
          <h2 className={`text-2xl font-bold text-center ${textColor}`}>
            {analysis.result}
          </h2>
          
          <p className="text-gray-600 text-center mt-2">
            {message}
          </p>
        </div>
        
        <div className="p-6 border-t border-gray-200">
          <div className="mb-4">
            <h3 className="text-sm font-medium text-gray-500 mb-1">Tipo de análisis</h3>
            <p className="font-medium capitalize">{analysis.type} Análisis</p>
          </div>
          
          <div className="mb-4">
            <h3 className="text-sm font-medium text-gray-500 mb-1">Contenido Analizado</h3>
            <div className="p-3 bg-gray-50 rounded-md text-sm text-gray-800 break-all">
              {analysis.content}
            </div>
          </div>
          
          <div className="mb-4">
            <h3 className="text-sm font-medium text-gray-500 mb-1">Tiempo de análisis</h3>
            <p className="text-sm">{formatTimestamp(analysis.timestamp)}</p>
          </div>

          <div className="mb-4">
            <h3 className="text-sm font-medium text-gray-500 mb-1">Duración de detección</h3>
            <div className="flex items-center gap-2 text-sm text-gray-800">
              <Timer className="h-4 w-4" />
              {duration ? `${duration} segundos` : 'Desconocido'}
            </div>
          </div>
          
          {isPhishing && (
            <div className="mb-4 p-3 bg-red-50 rounded-md border border-red-100">
              <div className="flex">
                <AlertTriangle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-red-800 text-sm">Recomendaciones</h4>
                  <ul className="mt-1 text-xs text-red-700 list-disc list-inside">
                    <li>No haga clic en ningún enlace</li>
                    <li>No descargue archivos adjuntos</li>
                    <li>No proporcione información personal</li>
                    <li>Informe esto a su departamento de TI si corresponde</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {isInvalid && (
            <div className="mb-4 p-3 bg-yellow-50 rounded-md border border-yellow-100">
              <div className="flex">
                <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-yellow-800 text-sm">Información</h4>
                  <p className="mt-1 text-xs text-yellow-700">
                    El contenido proporcionado no pudo ser analizado correctamente. 
                    Esto puede deberse a un formato no compatible o contenido insuficiente.
                  </p>
                </div>
              </div>
            </div>
          )}
          
          <div className="flex space-x-3">
            <button
              onClick={() => navigate('/')}
              className="flex-1 flex items-center justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Atrás
            </button>
            <button
              onClick={() => navigate('/history')}
              className="flex-1 flex items-center justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <FileText className="h-4 w-4 mr-2" />
              Ver Historial
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisResult;