import { Upload, FileText, Download, Eye, Calendar, TrendingUp } from 'lucide-react'
import { useState } from 'react'

const HealthReports = () => {
  const [uploading, setUploading] = useState(false)

  const reports = [
    { id: 1, name: 'Blood Test Report', date: 'Apr 15, 2024', type: 'Lab', status: 'Analyzed' },
    { id: 2, name: 'ECG Results', date: 'Mar 28, 2024', type: 'Cardiology', status: 'Reviewed' },
    { id: 3, name: 'X-Ray Chest', date: 'Feb 10, 2024', type: 'Radiology', status: 'Pending' },
    { id: 4, name: 'Annual Physical', date: 'Jan 05, 2024', type: 'General', status: 'Archived' },
  ]

  const handleUpload = () => {
    setUploading(true)
    // Simulate upload
    setTimeout(() => {
      setUploading(false)
      alert('Report uploaded successfully!')
    }, 1500)
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Health Reports</h1>
        <p className="text-gray-600">Upload, view, and analyze your medical reports</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Upload Section */}
        <div className="lg:col-span-2">
          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Upload New Report</h3>
                <p className="text-gray-600">Supported formats: PDF, JPG, PNG</p>
              </div>
              <Upload className="h-6 w-6 text-primary-500" />
            </div>

            <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:border-primary-400 transition-colors">
              <div className="max-w-md mx-auto">
                <div className="h-16 w-16 gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Upload className="h-8 w-8 text-white" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Drag & drop files here</h4>
                <p className="text-gray-600 mb-6">or click to browse</p>
                <input
                  type="file"
                  id="report-upload"
                  className="hidden"
                  accept=".pdf,.jpg,.jpeg,.png"
                />
                <label
                  htmlFor="report-upload"
                  className="btn-primary inline-block cursor-pointer"
                >
                  Browse Files
                </label>
                <p className="text-sm text-gray-500 mt-4">Max file size: 10MB</p>
              </div>
            </div>

            <button
              onClick={handleUpload}
              disabled={uploading}
              className="w-full mt-6 btn-primary py-4"
            >
              {uploading ? (
                <span className="flex items-center justify-center">
                  <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Uploading...
                </span>
              ) : (
                'Upload & Analyze Report'
              )}
            </button>
          </div>

          {/* Recent Reports */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Reports</h3>
            <div className="space-y-4">
              {reports.map((report) => (
                <div key={report.id} className="glass-card rounded-2xl p-6 card-hover">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="h-12 w-12 bg-primary-50 rounded-xl flex items-center justify-center">
                        <FileText className="h-6 w-6 text-primary-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{report.name}</h4>
                        <div className="flex items-center space-x-4 mt-1">
                          <span className="text-sm text-gray-500 flex items-center">
                            <Calendar className="h-3 w-3 mr-1" />
                            {report.date}
                          </span>
                          <span className="text-sm text-gray-500">{report.type}</span>
                          <span className={`badge ${
                            report.status === 'Analyzed' ? 'badge-success' :
                            report.status === 'Reviewed' ? 'badge-info' :
                            'badge-warning'
                          }`}>
                            {report.status}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="p-2 hover:bg-gray-100 rounded-xl">
                        <Eye className="h-5 w-5 text-gray-600" />
                      </button>
                      <button className="p-2 hover:bg-gray-100 rounded-xl">
                        <Download className="h-5 w-5 text-gray-600" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Analysis Insights */}
        <div className="space-y-6">
          <div className="glass-card rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Report Insights</h3>
            <div className="space-y-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Health Trends</h4>
                <div className="h-48 bg-gray-50 rounded-xl flex items-center justify-center">
                  <div className="text-center">
                    <TrendingUp className="h-12 w-12 text-gray-300 mx-auto mb-2" />
                    <p className="text-gray-500">Chart visualization</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-3">Key Metrics</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Blood Pressure</span>
                    <span className="font-semibold text-success-600">120/80</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Cholesterol</span>
                    <span className="font-semibold text-warning-600">180 mg/dL</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Blood Sugar</span>
                    <span className="font-semibold text-success-600">95 mg/dL</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-card rounded-2xl p-6 gradient-success/10 border border-success-100">
            <h4 className="font-semibold text-gray-900 mb-3">Tips for Better Reports</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start">
                <div className="h-2 w-2 bg-success-500 rounded-full mt-2 mr-3"></div>
                <span>Always fast for 8-12 hours before blood tests</span>
              </li>
              <li className="flex items-start">
                <div className="h-2 w-2 bg-success-500 rounded-full mt-2 mr-3"></div>
                <span>Bring previous reports for comparison</span>
              </li>
              <li className="flex items-start">
                <div className="h-2 w-2 bg-success-500 rounded-full mt-2 mr-3"></div>
                <span>Keep digital copies for easy access</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HealthReports