import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Analysis, AnalysisStatus, AnalysisType, AnalysisResult } from '../types';
import { getAnalysisHistory, getRecentAnalyses } from '../utils/storage';
import { performAnalysis } from '../utils/analysisUtils';

interface AnalysisContextType {
  status: AnalysisStatus;
  currentAnalysis: Analysis | null;
  recentAnalyses: Analysis[];
  allAnalyses: Analysis[];
  startAnalysis: (type: AnalysisType, content: string) => Promise<void>;
  resetStatus: () => void;
  refreshHistory: () => Promise<void>;
}

const AnalysisContext = createContext<AnalysisContextType | undefined>(undefined);

export const useAnalysis = (): AnalysisContextType => {
  const context = useContext(AnalysisContext);
  if (!context) {
    throw new Error('useAnalysis must be used within an AnalysisProvider');
  }
  return context;
};

interface AnalysisProviderProps {
  children: ReactNode;
}

export const AnalysisProvider: React.FC<AnalysisProviderProps> = ({ children }) => {
  const [status, setStatus] = useState<AnalysisStatus>('idle');
  const [currentAnalysis, setCurrentAnalysis] = useState<Analysis | null>(null);
  const [recentAnalyses, setRecentAnalyses] = useState<Analysis[]>([]);
  const [allAnalyses, setAllAnalyses] = useState<Analysis[]>([]);

  const refreshHistory = async (): Promise<void> => {
    const history = await getAnalysisHistory();
    setAllAnalyses(history);
    const recent = await getRecentAnalyses(3);
    setRecentAnalyses(recent);
  };

  useEffect(() => {
    refreshHistory();
  }, []);

  const startAnalysis = async (type: AnalysisType, content: string): Promise<void> => {
    setStatus('loading');
    try {
      const analysis = await performAnalysis(type, content);
      setCurrentAnalysis(analysis);
      setStatus('complete');
      await refreshHistory();
    } catch (error) {
      console.error('Analysis failed:', error);
      setStatus('idle');
    }
  };

  const resetStatus = (): void => {
    setStatus('idle');
    setCurrentAnalysis(null);
  };

  const value: AnalysisContextType = {
    status,
    currentAnalysis,
    recentAnalyses,
    allAnalyses,
    startAnalysis,
    resetStatus,
    refreshHistory,
  };

  return (
    <AnalysisContext.Provider value={value}>
      {children}
    </AnalysisContext.Provider>
  );
};