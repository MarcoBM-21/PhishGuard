import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { AnalysisProvider } from './context/AnalysisContext';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Result from './pages/Result';
import History from './pages/History';

function App() {
  return (
    <Router>
      <AnalysisProvider>
        <div className="flex flex-col min-h-screen bg-gray-100">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/result" element={<Result />} />
              <Route path="/history" element={<History />} />
            </Routes>
          </main>
        </div>
      </AnalysisProvider>
    </Router>
  );
}

export default App;