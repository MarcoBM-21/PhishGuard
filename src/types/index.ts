export type AnalysisType = 'url' | 'email';

export type AnalysisStatus = 'idle' | 'loading' | 'complete';

export type AnalysisResult = 'PHISHING' | 'NO PHISHING' | 'INVÁLIDO';

export interface Analysis {
  id: string;
  type: AnalysisType;
  content: string;
  result: AnalysisResult;
  timestamp: number;
}