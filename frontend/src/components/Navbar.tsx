import { useState } from 'react'
import { Menu, X, Bell, Search, User, Shield } from 'lucide-react'
import { motion } from 'framer-motion'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-white/30">
      <div className="section-padding py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="p-2 gradient-primary rounded-xl">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 font-display">Health AI</h1>
              <p className="text-xs text-gray-500">Premium Health Intelligence</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search symptoms, diseases, reports..."
                className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl w-64 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <div className="flex items-center space-x-6">
              <button className="relative p-2 hover:bg-gray-100 rounded-xl transition-colors">
                <Bell className="h-5 w-5 text-gray-600" />
                <span className="absolute -top-1 -right-1 h-2 w-2 bg-danger-500 rounded-full"></span>
              </button>

              <div className="flex items-center space-x-3">
                <div className="h-9 w-9 gradient-primary rounded-full flex items-center justify-center">
                  <User className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold">Dr. Priyanshu</p>
                  <p className="text-xs text-gray-500">Premium Member</p>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 hover:bg-gray-100 rounded-xl"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden mt-4 pb-4"
          >
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 gradient-primary rounded-full flex items-center justify-center">
                    <User className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold">Dr. Priyanshu</p>
                    <p className="text-sm text-gray-500">Premium Member</p>
                  </div>
                </div>
                <button className="p-2 hover:bg-gray-100 rounded-xl">
                  <Bell className="h-5 w-5 text-gray-600" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  )
}

export default Navbar