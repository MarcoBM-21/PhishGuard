import { Analysis } from '../types';

const isExtensionEnvironment = typeof chrome !== 'undefined' && chrome.storage;

// Storage implementation that works in both extension and browser environments
export const saveAnalysis = (analysis: Analysis): Promise<void> => {
  return new Promise((resolve) => {
    if (isExtensionEnvironment) {
      chrome.storage.local.get(['analyses'], (result) => {
        const analyses: Analysis[] = result.analyses || [];
        analyses.unshift(analysis);
        chrome.storage.local.set({ analyses }, resolve);
      });
    } else {
      try {
        const analyses: Analysis[] = JSON.parse(localStorage.getItem('analyses') || '[]');
        analyses.unshift(analysis);
        localStorage.setItem('analyses', JSON.stringify(analyses));
        resolve();
      } catch (error) {
        console.error('Error saving to localStorage:', error);
        resolve();
      }
    }
  });
};

export const getAnalysisHistory = (): Promise<Analysis[]> => {
  return new Promise((resolve) => {
    if (isExtensionEnvironment) {
      chrome.storage.local.get(['analyses'], (result) => {
        resolve(result.analyses || []);
      });
    } else {
      try {
        const analyses = JSON.parse(localStorage.getItem('analyses') || '[]');
        resolve(analyses);
      } catch (error) {
        console.error('Error reading from localStorage:', error);
        resolve([]);
      }
    }
  });
};

export const getRecentAnalyses = (count: number = 3): Promise<Analysis[]> => {
  return new Promise((resolve) => {
    getAnalysisHistory().then((analyses) => {
      resolve(analyses.slice(0, count));
    });
  });
};

export const clearHistory = (): Promise<void> => {
  return new Promise((resolve) => {
    if (isExtensionEnvironment) {
      chrome.storage.local.remove(['analyses'], resolve);
    } else {
      try {
        localStorage.removeItem('analyses');
        resolve();
      } catch (error) {
        console.error('Error clearing localStorage:', error);
        resolve();
      }
    }
  });
};