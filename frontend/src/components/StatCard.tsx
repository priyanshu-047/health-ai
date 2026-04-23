import { LucideIcon } from 'lucide-react'
import { ArrowUp, ArrowDown, Minus } from 'lucide-react'

interface StatCardProps {
  title: string
  value: string
  change: string
  icon: LucideIcon
  color: 'success' | 'warning' | 'danger' | 'info' | 'secondary'
  trend: 'up' | 'down' | 'stable'
}

const StatCard = ({ title, value, change, icon: Icon, color, trend }: StatCardProps) => {
  const colorClasses = {
    success: 'bg-success-50 text-success-700 border-success-200',
    warning: 'bg-warning-50 text-warning-700 border-warning-200',
    danger: 'bg-danger-50 text-danger-700 border-danger-200',
    info: 'bg-primary-50 text-primary-700 border-primary-200',
    secondary: 'bg-secondary-50 text-secondary-700 border-secondary-200',
  }

  const trendIcons = {
    up: <ArrowUp className="h-4 w-4" />,
    down: <ArrowDown className="h-4 w-4" />,
    stable: <Minus className="h-4 w-4" />,
  }

  return (
    <div className={`glass-card rounded-2xl p-6 border ${colorClasses[color]} card-hover`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <h3 className="text-2xl font-bold mt-2">{value}</h3>
          <div className="flex items-center mt-2">
            <div className={`p-1 rounded-full ${trend === 'up' ? 'bg-success-100' : trend === 'down' ? 'bg-danger-100' : 'bg-gray-100'}`}>
              {trendIcons[trend]}
            </div>
            <span className="text-sm font-medium ml-2">{change}</span>
          </div>
        </div>
        <div className={`p-3 rounded-xl ${colorClasses[color].split(' ')[0]} bg-opacity-30`}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </div>
  )
}

export default StatCard