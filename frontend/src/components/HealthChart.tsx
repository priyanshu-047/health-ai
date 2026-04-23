const HealthChart = () => {
  const data = [
    { day: 'Mon', score: 85, symptoms: 4 },
    { day: 'Tue', score: 88, symptoms: 3 },
    { day: 'Wed', score: 82, symptoms: 5 },
    { day: 'Thu', score: 90, symptoms: 2 },
    { day: 'Fri', score: 92, symptoms: 3 },
    { day: 'Sat', score: 89, symptoms: 4 },
    { day: 'Sun', score: 94, symptoms: 1 },
  ]

  const maxScore = Math.max(...data.map(d => d.score))

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <div className="h-3 w-3 bg-primary-500 rounded-full mr-2"></div>
            <span className="text-sm text-gray-600">Health Score</span>
          </div>
          <div className="flex items-center">
            <div className="h-3 w-3 bg-warning-500 rounded-full mr-2"></div>
            <span className="text-sm text-gray-600">Symptoms</span>
          </div>
        </div>
        <select className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 bg-white">
          <option>Last 7 days</option>
          <option>Last 30 days</option>
          <option>Last 3 months</option>
        </select>
      </div>

      <div className="relative h-64">
        {/* Grid lines */}
        <div className="absolute inset-0 flex flex-col justify-between">
          {[100, 80, 60, 40, 20, 0].map((line) => (
            <div key={line} className="border-t border-gray-100"></div>
          ))}
        </div>

        {/* Chart bars */}
        <div className="absolute inset-0 flex items-end justify-between px-4">
          {data.map((item, index) => (
            <div key={index} className="flex flex-col items-center w-10">
              <div className="flex items-end space-x-1 h-48">
                <div
                  className="w-3 bg-primary-500 rounded-t-lg transition-all duration-300 hover:bg-primary-600"
                  style={{ height: `${(item.score / maxScore) * 100}%` }}
                ></div>
                <div
                  className="w-3 bg-warning-500 rounded-t-lg transition-all duration-300 hover:bg-warning-600"
                  style={{ height: `${(item.symptoms / 5) * 100}%` }}
                ></div>
              </div>
              <div className="mt-2 text-sm text-gray-500">{item.day}</div>
              <div className="text-xs font-semibold mt-1">{item.score}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default HealthChart