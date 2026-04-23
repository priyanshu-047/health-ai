import { Settings as SettingsIcon, Bell, Shield, User, Moon, Download, Key } from 'lucide-react'
import { useState } from 'react'

const Settings = () => {
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    reminders: true,
    healthAlerts: true,
  })

  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600">Manage your account preferences and privacy</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Account Settings */}
        <div className="lg:col-span-2 space-y-6">
          {/* Profile Settings */}
          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="h-10 w-10 bg-primary-100 rounded-xl flex items-center justify-center">
                <User className="h-5 w-5 text-primary-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Profile Settings</h3>
                <p className="text-gray-600">Update your personal information</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                  <input type="text" className="input-field" defaultValue="Priyanshu" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                  <input type="text" className="input-field" defaultValue="Sharma" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input type="email" className="input-field" defaultValue="dr.priyanshu@example.com" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <input type="tel" className="input-field" defaultValue="+91 9876543210" />
              </div>

              <button className="btn-primary mt-4">Save Changes</button>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="h-10 w-10 bg-warning-100 rounded-xl flex items-center justify-center">
                <Bell className="h-5 w-5 text-warning-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
                <p className="text-gray-600">Manage how you receive notifications</p>
              </div>
            </div>

            <div className="space-y-4">
              {Object.entries(notifications).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div>
                    <h4 className="font-medium text-gray-900 capitalize">{key.replace(/([A-Z])/g, ' $1')}</h4>
                    <p className="text-sm text-gray-600">
                      {key === 'email' && 'Receive email notifications'}
                      {key === 'push' && 'Push notifications on this device'}
                      {key === 'reminders' && 'Medication and appointment reminders'}
                      {key === 'healthAlerts' && 'Important health alerts'}
                    </p>
                  </div>
                  <button
                    onClick={() => toggleNotification(key as keyof typeof notifications)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                      value ? 'bg-primary-500' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                        value ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Preferences */}
        <div className="space-y-6">
          {/* Privacy & Security */}
          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="h-10 w-10 bg-success-100 rounded-xl flex items-center justify-center">
                <Shield className="h-5 w-5 text-success-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Privacy & Security</h3>
                <p className="text-gray-600">Manage your data and security</p>
              </div>
            </div>

            <div className="space-y-4">
              <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 rounded-xl transition-colors">
                <div className="flex items-center">
                  <Key className="h-5 w-5 text-gray-500 mr-3" />
                  <span className="font-medium text-gray-900">Change Password</span>
                </div>
                <div className="text-primary-500">→</div>
              </button>

              <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 rounded-xl transition-colors">
                <div className="flex items-center">
                  <Download className="h-5 w-5 text-gray-500 mr-3" />
                  <span className="font-medium text-gray-900">Export Data</span>
                </div>
                <div className="text-primary-500">→</div>
              </button>

              <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 rounded-xl transition-colors">
                <div className="flex items-center">
                  <Shield className="h-5 w-5 text-gray-500 mr-3" />
                  <span className="font-medium text-gray-900">Two-Factor Auth</span>
                </div>
                <div className="badge-warning">Enable</div>
              </button>
            </div>
          </div>

          {/* Appearance */}
          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="h-10 w-10 bg-secondary-100 rounded-xl flex items-center justify-center">
                <Moon className="h-5 w-5 text-secondary-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Appearance</h3>
                <p className="text-gray-600">Customize your interface</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Theme</h4>
                <div className="flex space-x-3">
                  <button className="flex-1 p-4 bg-gray-900 text-white rounded-xl border-2 border-gray-900">
                    Dark
                  </button>
                  <button className="flex-1 p-4 bg-white text-gray-900 rounded-xl border-2 border-primary-500">
                    Light
                  </button>
                  <button className="flex-1 p-4 bg-gray-50 text-gray-900 rounded-xl border-2 border-gray-200">
                    System
                  </button>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-3">Language</h4>
                <select className="w-full input-field">
                  <option>English (US)</option>
                  <option>Hindi</option>
                  <option>Spanish</option>
                  <option>French</option>
                </select>
              </div>
            </div>
          </div>

          {/* About */}
          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="h-10 w-10 bg-primary-100 rounded-xl flex items-center justify-center">
                <SettingsIcon className="h-5 w-5 text-primary-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">About Health AI</h3>
                <p className="text-gray-600">Version 1.0.0 • Premium</p>
              </div>
            </div>

            <div className="space-y-3">
              <button className="w-full text-left p-3 hover:bg-gray-50 rounded-xl transition-colors">
                <span className="font-medium text-gray-900">Terms of Service</span>
              </button>
              <button className="w-full text-left p-3 hover:bg-gray-50 rounded-xl transition-colors">
                <span className="font-medium text-gray-900">Privacy Policy</span>
              </button>
              <button className="w-full text-left p-3 hover:bg-gray-50 rounded-xl transition-colors">
                <span className="font-medium text-gray-900">Help & Support</span>
              </button>
              <button className="w-full text-left p-3 hover:bg-gray-50 rounded-xl transition-colors text-danger-600">
                <span className="font-medium">Delete Account</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings