import { Analysis, AnalysisType, AnalysisResult } from '../types';
import { saveAnalysis } from './storage';

export const analyzeContent = async (
    type: AnalysisType,
    content: string
): Promise<AnalysisResult> => {
  try {
    const url =
        type === 'url'
            ? 'https://phishing-backend-production.up.railway.app/predict_url'
            : 'https://phishing-backend-production.up.railway.app/predict_text';

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ [type]: content }),
    });

    if (!response.ok) throw new Error('Error de red');

    const data = await response.json();

    return data.is_phishing ? 'PHISHING' : 'NO PHISHING';

  } catch (error) {
    console.error('Error al analizar:', error);
    return 'ERROR';
  }
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

  await saveAnalysis(analysis);
  return analysis;
};

export const formatTimestamp = (timestamp: number): string =>
    new Date(timestamp).toLocaleString();

export const truncateContent = (content: string, maxLength: number = 50): string =>
    content.length <= maxLength ? content : `${content.substring(0, maxLength)}...`;
