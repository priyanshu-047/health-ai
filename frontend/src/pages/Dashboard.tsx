import { Activity, Heart, Thermometer, Brain, TrendingUp, Calendar, Users, AlertCircle, Clock } from 'lucide-react'
import StatCard from '../components/StatCard'
import HealthChart from '../components/HealthChart'
import RecentActivity from '../components/RecentActivity'

const Dashboard = () => {
  const stats: Array<{
    title: string
    value: string
    change: string
    icon: any
    color: 'success' | 'warning' | 'danger' | 'info' | 'secondary'
    trend: 'up' | 'down' | 'stable'
  }> = [
    {
      title: 'Health Score',
      value: '92/100',
      change: '+2.5%',
      icon: Heart,
      color: 'success',
      trend: 'up',
    },
    {
      title: 'Symptoms Today',
      value: '3',
      change: '-1 from yesterday',
      icon: Thermometer,
      color: 'warning',
      trend: 'down',
    },
    {
      title: 'Active Conditions',
      value: '1',
      change: 'Stable',
      icon: Activity,
      color: 'info',
      trend: 'stable',
    },
    {
      title: 'Mental Wellness',
      value: '88%',
      change: '+5.2%',
      icon: Brain,
      color: 'secondary',
      trend: 'up',
    },
  ]

  const upcomingAppointments = [
    { id: 1, title: 'Annual Checkup', doctor: 'Dr. Sharma', time: '10:00 AM', date: 'Tomorrow' },
    { id: 2, title: 'Dermatology', doctor: 'Dr. Patel', time: '2:30 PM', date: 'Apr 25' },
    { id: 3, title: 'Nutritionist', doctor: 'Dr. Gupta', time: '11:15 AM', date: 'Apr 28' },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's your health overview.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      {/* Charts and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Health Trends</h3>
                <p className="text-gray-600">Last 30 days overview</p>
              </div>
              <button className="btn-secondary text-sm">
                <TrendingUp className="h-4 w-4 mr-2" />
                View Details
              </button>
            </div>
            <HealthChart />
          </div>
        </div>

        <div className="space-y-6">
          {/* Upcoming Appointments */}
          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Upcoming Appointments</h3>
              <Calendar className="h-5 w-5 text-primary-500" />
            </div>
            <div className="space-y-4">
              {upcomingAppointments.map((appt) => (
                <div key={appt.id} className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-gray-900">{appt.title}</h4>
                      <p className="text-sm text-gray-600">{appt.doctor}</p>
                    </div>
                    <span className="badge-info">{appt.date}</span>
                  </div>
                  <div className="mt-3 flex items-center text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-1" />
                    {appt.time}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Health Tips */}
          <div className="glass-card rounded-2xl p-6 gradient-success/10 border border-success-100">
            <div className="flex items-start space-x-3">
              <AlertCircle className="h-6 w-6 text-success-600 mt-1" />
              <div>
                <h4 className="font-semibold text-gray-900">Daily Health Tip</h4>
                <p className="text-gray-700 mt-2">
                  Stay hydrated! Drink at least 8 glasses of water today. Proper hydration improves cognitive function and energy levels.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="glass-card rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
            <p className="text-gray-600">Your health interactions and updates</p>
          </div>
          <Users className="h-5 w-5 text-gray-400" />
        </div>
        <RecentActivity />
      </div>
    </div>
  )
}

export default Dashboard