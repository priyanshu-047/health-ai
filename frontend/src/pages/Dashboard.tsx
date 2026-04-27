import { Activity, Heart, Thermometer, Brain } from 'lucide-react'
import StatCard from '../components/StatCard'

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

      {/* Simple placeholder for future content */}
      <div className="glass-card rounded-2xl p-8 text-center">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">More features coming soon</h3>
        <p className="text-gray-600">
          Health charts, upcoming appointments, and activity feed will be available shortly.
        </p>
      </div>
    </div>
  )
}

export default Dashboard