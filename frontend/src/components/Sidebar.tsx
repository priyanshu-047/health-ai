import { NavLink } from 'react-router-dom'
import { Home, Stethoscope, FileText, Apple, Settings, TrendingUp, Heart, Clock } from 'lucide-react'

const menuItems = [
  { icon: Home, label: 'Dashboard', path: '/' },
  { icon: Stethoscope, label: 'Symptom Checker', path: '/symptom-checker' },
  { icon: FileText, label: 'Health Reports', path: '/health-reports' },
  { icon: Apple, label: 'Diet Planner', path: '/diet-planner' },
  { icon: TrendingUp, label: 'Health Trends', path: '/trends' },
  { icon: Heart, label: 'Wellness Tips', path: '/wellness' },
  { icon: Clock, label: 'Appointments', path: '/appointments' },
  { icon: Settings, label: 'Settings', path: '/settings' },
]

const Sidebar = () => {
  return (
    <aside className="hidden md:block w-64 border-r border-gray-200 bg-white/50 min-h-[calc(100vh-4rem)]">
      <div className="p-6">
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Quick Actions</h2>
          <div className="space-y-3">
            <button className="w-full btn-primary text-sm py-2.5">
              New Symptom Check
            </button>
            <button className="w-full btn-secondary text-sm py-2.5">
              Upload Report
            </button>
          </div>
        </div>

        <nav className="space-y-1">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Navigation
          </h3>
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive
                    ? 'bg-primary-50 text-primary-700 border-l-4 border-primary-500'
                    : 'text-gray-600 hover:bg-gray-50'
                }`
              }
            >
              <item.icon className="h-5 w-5" />
              <span className="font-medium">{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="mt-8 p-4 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl border border-primary-100">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 gradient-primary rounded-full flex items-center justify-center">
              <Heart className="h-5 w-5 text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">Health Score</h4>
              <p className="text-sm text-gray-600">92/100 • Excellent</p>
            </div>
          </div>
          <div className="mt-4">
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full gradient-success rounded-full w-[92%]"></div>
            </div>
            <p className="text-xs text-gray-500 mt-2">Updated today</p>
          </div>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar