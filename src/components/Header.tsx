import React from 'react';
import { Shield } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-4 shadow-md">
      <div className="flex items-center justify-between">
        <div 
          className="flex items-center space-x-2 cursor-pointer" 
          onClick={() => navigate('/')}
        >
          <Shield className="h-6 w-6" />
          <h1 className="text-xl font-bold">PhishGuard</h1>
        </div>
        
        <nav>
          <ul className="flex space-x-4">
            <li>
              <button 
                className={`px-3 py-1 rounded-md transition-colors ${
                  location.pathname === '/' 
                    ? 'bg-white text-blue-700 font-medium' 
                    : 'text-white hover:bg-blue-700'
                }`}
                onClick={() => navigate('/')}
              >
                Principal
              </button>
            </li>
            <li>
              <button 
                className={`px-3 py-1 rounded-md transition-colors ${
                  location.pathname === '/history' 
                    ? 'bg-white text-blue-700 font-medium' 
                    : 'text-white hover:bg-blue-700'
                }`}
                onClick={() => navigate('/history')}
              >
                Historial
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;