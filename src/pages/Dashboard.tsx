import React from 'react';
import { Shield } from 'lucide-react';
import AnalysisForm from '../components/AnalysisForm';
import RecentAnalyses from '../components/RecentAnalyses';
import { useAnalysis } from '../context/AnalysisContext';

const Dashboard: React.FC = () => {
  const { recentAnalyses } = useAnalysis();
  
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <div className="flex justify-center mb-3">
          <Shield className="h-12 w-12 text-blue-600" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">PhishGuard</h1>
        <p className="text-gray-600 max-w-md mx-auto">
        Tu guardia contra el engaño en cada clic
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <AnalysisForm />
        </div>
        
        <div>
          <RecentAnalyses analyses={recentAnalyses} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;