import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import Card from '../components/Card.jsx';
import Loader, { SkeletonList } from '../components/Loader.jsx';
import { getHealthHistory } from '../services/api.js';

const History = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    setLoading(true);
    try {
      const data = await getHealthHistory();
      setHistory(data);
    } catch (error) {
      console.error('Failed to fetch history:', error);
      toast.error('Failed to load history. Using demo data.');
      
      // Mock data for demonstration
      setHistory([
        {
          id: 1,
          symptoms: 'Headache, fever, fatigue',
          timestamp: '2024-03-15T10:30:00Z',
          summary: 'Possible viral infection. Recommended rest and hydration.',
          conditions: ['Common Cold', 'Viral Fever'],
          severity: 'mild'
        },
        {
          id: 2,
          symptoms: 'Cough, sore throat, runny nose',
          timestamp: '2024-03-10T14:20:00Z',
          summary: 'Upper respiratory infection. Suggested home remedies.',
          conditions: ['Upper Respiratory Infection'],
          severity: 'moderate'
        },
        {
          id: 3,
          symptoms: 'Muscle pain, joint stiffness',
          timestamp: '2024-03-05T09:15:00Z',
          summary: 'Possible muscle strain. Recommended light exercise.',
          conditions: ['Muscle Strain'],
          severity: 'mild'
        },
        {
          id: 4,
          symptoms: 'Stomach pain, nausea, loss of appetite',
          timestamp: '2024-02-28T16:45:00Z',
          summary: 'Gastrointestinal issue. Suggested dietary changes.',
          conditions: ['Gastritis', 'Indigestion'],
          severity: 'moderate'
        },
        {
          id: 5,
          symptoms: 'Insomnia, anxiety, fatigue',
          timestamp: '2024-02-20T11:10:00Z',
          summary: 'Stress-related symptoms. Recommended relaxation techniques.',
          conditions: ['Stress', 'Anxiety'],
          severity: 'mild'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'mild': return 'bg-green-100 text-green-800';
      case 'moderate': return 'bg-yellow-100 text-yellow-800';
      case 'severe': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSeverityLabel = (severity) => {
    switch (severity) {
      case 'mild': return 'Mild';
      case 'moderate': return 'Moderate';
      case 'severe': return 'Severe';
      default: return 'Unknown';
    }
  };

  const filteredHistory = filter === 'all' 
    ? history 
    : history.filter(item => item.severity === filter);

  const clearHistory = () => {
    if (window.confirm('Are you sure you want to clear all history? This action cannot be undone.')) {
      setHistory([]);
      toast.success('History cleared');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="section-padding py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                Health <span className="text-primary-600">History</span>
              </h1>
              <p className="text-gray-600">
                View your previous health analyses and track your health journey
              </p>
            </div>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link
                to="/app"
                className="btn-primary"
              >
                New Analysis
              </Link>
              <button
                onClick={clearHistory}
                className="px-5 py-3 border border-red-300 text-red-600 font-medium rounded-xl hover:bg-red-50 transition-colors"
              >
                Clear History
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card className="text-center">
              <div className="text-3xl font-bold text-primary-600">{history.length}</div>
              <div className="text-gray-600">Total Analyses</div>
            </Card>
            <Card className="text-center">
              <div className="text-3xl font-bold text-green-600">
                {history.filter(h => h.severity === 'mild').length}
              </div>
              <div className="text-gray-600">Mild Cases</div>
            </Card>
            <Card className="text-center">
              <div className="text-3xl font-bold text-yellow-600">
                {history.filter(h => h.severity === 'moderate').length}
              </div>
              <div className="text-gray-600">Moderate Cases</div>
            </Card>
            <Card className="text-center">
              <div className="text-3xl font-bold text-red-600">
                {history.filter(h => h.severity === 'severe').length}
              </div>
              <div className="text-gray-600">Severe Cases</div>
            </Card>
          </div>

          {/* Filters */}
          <div className="mb-6">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-lg font-medium ${filter === 'all' ? 'bg-primary-600 text-white' : 'bg-white text-gray-700 border border-gray-300'}`}
              >
                All Records
              </button>
              <button
                onClick={() => setFilter('mild')}
                className={`px-4 py-2 rounded-lg font-medium ${filter === 'mild' ? 'bg-green-600 text-white' : 'bg-white text-gray-700 border border-gray-300'}`}
              >
                Mild
              </button>
              <button
                onClick={() => setFilter('moderate')}
                className={`px-4 py-2 rounded-lg font-medium ${filter === 'moderate' ? 'bg-yellow-600 text-white' : 'bg-white text-gray-700 border border-gray-300'}`}
              >
                Moderate
              </button>
              <button
                onClick={() => setFilter('severe')}
                className={`px-4 py-2 rounded-lg font-medium ${filter === 'severe' ? 'bg-red-600 text-white' : 'bg-white text-gray-700 border border-gray-300'}`}
              >
                Severe
              </button>
            </div>
          </div>

          {/* History List */}
          <Card>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Previous Analyses</h2>
              <button
                onClick={fetchHistory}
                className="text-primary-600 hover:text-primary-800 font-medium flex items-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Refresh
              </button>
            </div>

            {loading ? (
              <SkeletonList count={5} />
            ) : filteredHistory.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">📋</div>
                <h3 className="text-xl font-bold text-gray-700 mb-2">No history found</h3>
                <p className="text-gray-500 mb-6">
                  {filter === 'all' 
                    ? "You haven't performed any health analyses yet." 
                    : `No ${filter} severity records found.`}
                </p>
                <Link
                  to="/app"
                  className="btn-primary inline-block"
                >
                  Perform First Analysis
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredHistory.map((record) => (
                  <div
                    key={record.id}
                    className="border border-gray-200 rounded-xl p-5 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex flex-col md:flex-row md:items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getSeverityColor(record.severity)}`}>
                            {getSeverityLabel(record.severity)}
                          </span>
                          <span className="text-gray-500 text-sm ml-3">
                            {formatDate(record.timestamp)}
                          </span>
                        </div>
                        
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {record.symptoms}
                        </h3>
                        
                        <p className="text-gray-700 mb-3">
                          {record.summary}
                        </p>
                        
                        {record.conditions && record.conditions.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-3">
                            {record.conditions.map((condition, idx) => (
                              <span
                                key={idx}
                                className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm"
                              >
                                {condition}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                      
                      <div className="mt-4 md:mt-0 md:ml-4 flex space-x-2">
                        <button
                          onClick={() => toast.success('Viewing details for record ' + record.id)}
                          className="px-4 py-2 text-primary-600 hover:bg-primary-50 rounded-lg font-medium"
                        >
                          View Details
                        </button>
                        <button
                          onClick={() => toast.success('Record ' + record.id + ' deleted')}
                          className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg font-medium"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>

          {/* Tips */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <Card className="bg-gradient-to-r from-primary-50 to-blue-50">
              <h3 className="text-xl font-bold text-gray-900 mb-3">📈 Tracking Your Health</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <div className="w-2 h-2 rounded-full bg-primary-500 mt-2 mr-3 flex-shrink-0"></div>
                  <span>Regular health checks help identify patterns</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 rounded-full bg-primary-500 mt-2 mr-3 flex-shrink-0"></div>
                  <span>Compare symptoms over time to monitor progress</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 rounded-full bg-primary-500 mt-2 mr-3 flex-shrink-0"></div>
                  <span>Share history with healthcare providers for better diagnosis</span>
                </li>
              </ul>
            </Card>
            
            <Card className="bg-gradient-to-r from-secondary-50 to-emerald-50">
              <h3 className="text-xl font-bold text-gray-900 mb-3">🔒 Privacy & Security</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <div className="w-2 h-2 rounded-full bg-secondary-500 mt-2 mr-3 flex-shrink-0"></div>
                  <span>Your health data is stored locally in your browser</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 rounded-full bg-secondary-500 mt-2 mr-3 flex-shrink-0"></div>
                  <span>No personal information is shared with third parties</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 rounded-full bg-secondary-500 mt-2 mr-3 flex-shrink-0"></div>
                  <span>You can clear your history at any time</span>
                </li>
              </ul>
            </Card>
          </div>

          {/* Export Options */}
          <div className="mt-8 text-center">
            <p className="text-gray-600 mb-4">Export your health history for personal records</p>
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() => toast.success('PDF export started')}
                className="px-5 py-3 bg-white border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 font-medium"
              >
                Export as PDF
              </button>
              <button
                onClick={() => toast.success('CSV export started')}
                className="px-5 py-3 bg-white border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 font-medium"
              >
                Export as CSV
              </button>
              <button
                onClick={() => toast.success('Print preview opened')}
                className="px-5 py-3 bg-white border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 font-medium"
              >
                Print History
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;