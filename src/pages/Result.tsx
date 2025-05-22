import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAnalysis } from '../context/AnalysisContext';
import LoadingState from '../components/LoadingState';
import AnalysisResult from '../components/AnalysisResult';

const Result: React.FC = () => {
  const { status, currentAnalysis, resetStatus } = useAnalysis();
  const navigate = useNavigate();
  
  useEffect(() => {
    // If there's no analysis in progress or completed, redirect to home
    if (status === 'idle' && !currentAnalysis) {
      navigate('/');
    }
    
    // Cleanup function to reset the analysis state when leaving the page
    return () => {
      if (status === 'complete') {
        resetStatus();
      }
    };
  }, [status, currentAnalysis, navigate, resetStatus]);
  
  if (status === 'loading') {
    return <LoadingState />;
  }
  
  if (status === 'complete' && currentAnalysis) {
    return <AnalysisResult analysis={currentAnalysis} />;
  }
  
  return null;
};

export default Result;