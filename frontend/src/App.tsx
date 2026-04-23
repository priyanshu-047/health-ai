import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Dashboard'
import SymptomChecker from './pages/SymptomChecker'
import HealthReports from './pages/HealthReports'
import DietPlanner from './pages/DietPlanner'
import Settings from './pages/Settings'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-primary-50/30">
        <Navbar />
        <div className="flex pt-16">
          <Sidebar />
          <main className="flex-1 p-6 md:p-8">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/symptom-checker" element={<SymptomChecker />} />
              <Route path="/health-reports" element={<HealthReports />} />
              <Route path="/diet-planner" element={<DietPlanner />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </main>
        </div>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#fff',
              color: '#333',
              border: '1px solid #e5e7eb',
              borderRadius: '12px',
              padding: '16px',
              boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
            },
          }}
        />
      </div>
    </Router>
  )
}

export default App