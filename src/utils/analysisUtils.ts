import { Analysis, AnalysisType, AnalysisResult } from '../types';
import { saveAnalysis } from './storage';

// This function simulates the analysis process
// In a real extension, this would call an API or use ML models
export const analyzeContent = async (
  type: AnalysisType,
  content: string
): Promise<AnalysisResult> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 2000));
  
  // Simple mock detection logic for demonstration
  // URL analysis
  if (type === 'url') {
    const suspiciousTerms = [
      'phishing', 'secure-login', 'account-verify', 
      'suspicious', 'bank-secure', 'login-verify'
    ];
    return suspiciousTerms.some(term => content.toLowerCase().includes(term)) 
      ? 'PHISHING' 
      : 'NO PHISHING';
  }
  
  // Email content analysis
  if (type === 'email') {
    const suspiciousTerms = [
      'urgent action required', 'verify your account', 
      'password expired', 'suspicious activity', 
      'click here to secure', 'payment information update'
    ];
    return suspiciousTerms.some(term => content.toLowerCase().includes(term)) 
      ? 'PHISHING' 
      : 'NO PHISHING';
  }
  
  return 'NO PHISHING';
};

export const performAnalysis = async (
  type: AnalysisType,
  content: string
): Promise<Analysis> => {
  const result = await analyzeContent(type, content);
  
  const analysis: Analysis = {
    id: Date.now().toString(),
    type,
    content,
    result,
    timestamp: Date.now(),
  };
  
  // Save to storage
  await saveAnalysis(analysis);
  
  return analysis;
};

export const formatTimestamp = (timestamp: number): string => {
  return new Date(timestamp).toLocaleString();
};

export const truncateContent = (content: string, maxLength: number = 50): string => {
  if (content.length <= maxLength) return content;
  return `${content.substring(0, maxLength)}...`;
};