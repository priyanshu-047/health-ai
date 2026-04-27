import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Loader from './components/Loader.jsx';

// Lazy load pages for better performance
const Landing = lazy(() => import('./pages/Landing.jsx'));
const Analyzer = lazy(() => import('./pages/Analyzer.jsx'));
const History = lazy(() => import('./pages/History.jsx'));

// Fallback component for lazy loading
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <Loader size="large" text="Loading page..." />
  </div>
);

// 404 Page component
const NotFound = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="text-center">
      <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Page Not Found</h2>
      <p className="text-gray-600 mb-8 max-w-md">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <a
        href="/"
        className="inline-block bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-primary-700 hover:to-secondary-700 transition-all"
      >
        Return to Home
      </a>
    </div>
  </div>
);

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/app" element={<Analyzer />} />
            <Route path="/history" element={<History />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
        
        {/* Global footer for all pages except Landing (which has its own) */}
        <Routes>
          <Route path="/" element={null} />
          <Route path="*" element={
            <footer className="border-t border-gray-200 mt-12">
              <div className="section-padding py-6">
                <div className="flex flex-col md:flex-row justify-between items-center">
                  <div className="mb-4 md:mb-0">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 rounded-lg bg-gradient-to-r from-primary-500 to-secondary-500"></div>
                      <span className="text-lg font-bold text-gray-900">Health-AI Assistant</span>
                    </div>
                    <p className="text-gray-500 text-sm mt-1">AI-powered health guidance</p>
                  </div>
                  <div className="text-gray-600 text-sm text-center md:text-right">
                    <p>© {new Date().getFullYear()} Health-AI Assistant v2.0</p>
                    <p className="mt-1">For demonstration purposes only</p>
                  </div>
                </div>
              </div>
            </footer>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;