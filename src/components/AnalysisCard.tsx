import React from 'react';
import { Analysis } from '../types';
import { formatTimestamp, truncateContent } from '../utils/analysisUtils';
import { Globe, Mail, Shield, ShieldAlert } from 'lucide-react';

interface AnalysisCardProps {
  analysis: Analysis;
  detailed?: boolean;
}

const AnalysisCard: React.FC<AnalysisCardProps> = ({ analysis, detailed = false }) => {
  const { type, content, result, timestamp } = analysis;
  
  const isPhishing = result === 'PHISHING';
  
  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden border-l-4 
      ${isPhishing ? 'border-red-500' : 'border-green-500'} 
      transition-all hover:shadow-lg`}>
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            {type === 'url' ? (
              <Globe className="h-5 w-5 text-blue-500 mr-2" />
            ) : (
              <Mail className="h-5 w-5 text-purple-500 mr-2" />
            )}
            <span className="font-medium capitalize">
              {type} Analysis
            </span>
          </div>
          <span className="text-xs text-gray-500">
            {formatTimestamp(timestamp)}
          </span>
        </div>
        
        <div className="mb-3">
          <p className="text-gray-700 text-sm">
            {detailed ? content : truncateContent(content, 40)}
          </p>
        </div>
        
        <div className={`flex items-center justify-between ${
          isPhishing ? 'text-red-500' : 'text-green-500'
        }`}>
          <div className="flex items-center">
            {isPhishing ? (
              <ShieldAlert className="h-5 w-5 mr-1" />
            ) : (
              <Shield className="h-5 w-5 mr-1" />
            )}
            <span className="font-bold">
              {result}
            </span>
          </div>
          
          {detailed && (
            <p className="text-xs text-gray-500">
              ID: {analysis.id.substring(0, 8)}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnalysisCard;