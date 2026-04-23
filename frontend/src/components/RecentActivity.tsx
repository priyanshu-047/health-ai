import { CheckCircle, AlertTriangle, FileText, Pill, Clock } from 'lucide-react'

const RecentActivity = () => {
  const activities = [
    {
      id: 1,
      type: 'symptom',
      title: 'Symptom check completed',
      description: 'Headache and fever analyzed',
      time: '2 hours ago',
      icon: CheckCircle,
      color: 'success',
    },
    {
      id: 2,
      type: 'alert',
      title: 'High blood pressure alert',
      description: 'Reading: 145/95 mmHg',
      time: '5 hours ago',
      icon: AlertTriangle,
      color: 'danger',
    },
    {
      id: 3,
      type: 'report',
      title: 'Lab report uploaded',
      description: 'Complete blood count results',
      time: '1 day ago',
      icon: FileText,
      color: 'info',
    },
    {
      id: 4,
      type: 'medication',
      title: 'Medication reminder',
      description: 'Take Vitamin D supplement',
      time: '2 days ago',
      icon: Pill,
      color: 'warning',
    },
    {
      id: 5,
      type: 'appointment',
      title: 'Upcoming appointment',
      description: 'Annual physical with Dr. Sharma',
      time: '3 days ago',
      icon: Clock,
      color: 'secondary',
    },
  ]

  const getColorClass = (color: string) => {
    switch (color) {
      case 'success': return 'bg-success-100 text-success-700'
      case 'danger': return 'bg-danger-100 text-danger-700'
      case 'info': return 'bg-primary-100 text-primary-700'
      case 'warning': return 'bg-warning-100 text-warning-700'
      case 'secondary': return 'bg-secondary-100 text-secondary-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <div className="space-y-4">
      {activities.map((activity) => {
        const Icon = activity.icon
        return (
          <div key={activity.id} className="flex items-start p-4 hover:bg-gray-50 rounded-xl transition-colors">
            <div className={`p-2 rounded-lg ${getColorClass(activity.color)}`}>
              <Icon className="h-5 w-5" />
            </div>
            <div className="ml-4 flex-1">
              <div className="flex justify-between">
                <h4 className="font-medium text-gray-900">{activity.title}</h4>
                <span className="text-sm text-gray-500">{activity.time}</span>
              </div>
              <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
            </div>
          </div>
        )
      })}
      <button className="w-full py-3 text-center text-primary-600 font-medium hover:bg-primary-50 rounded-xl transition-colors">
        View All Activity
      </button>
    </div>
  )
}

export default RecentActivity