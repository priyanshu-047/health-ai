import axios from 'axios';
import toast from 'react-hot-toast';

// API Configuration
const API_BASE_URL = 'http://localhost:8080/api/health';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // 30 seconds timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding auth token if needed
api.interceptors.request.use(
  (config) => {
    // You can add authentication token here if needed
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    let errorMessage = 'An unexpected error occurred';
    
    if (error.response) {
      // Server responded with error status
      switch (error.response.status) {
        case 400:
          errorMessage = 'Bad request. Please check your input.';
          break;
        case 401:
          errorMessage = 'Unauthorized. Please login again.';
          // Redirect to login if needed
          break;
        case 403:
          errorMessage = 'Forbidden. You do not have permission.';
          break;
        case 404:
          errorMessage = 'Resource not found.';
          break;
        case 500:
          errorMessage = 'Server error. Please try again later.';
          break;
        case 502:
          errorMessage = 'Bad gateway. The server is down or unreachable.';
          break;
        case 503:
          errorMessage = 'Service unavailable. Please try again later.';
          break;
        default:
          errorMessage = error.response.data?.message || `Error ${error.response.status}`;
      }
    } else if (error.request) {
      // Request made but no response
      errorMessage = 'Network error. Please check your internet connection.';
    } else {
      // Something else happened
      errorMessage = error.message || 'Request configuration error';
    }
    
    // Show error toast
    toast.error(errorMessage);
    
    // Return a rejected promise with the error message
    return Promise.reject(new Error(errorMessage));
  }
);

/**
 * Analyze health symptoms
 * @param {Object} data - Health analysis request data
 * @param {string} data.symptoms - Description of symptoms
 * @param {number} data.age - Age of the patient
 * @param {string} data.gender - Gender of the patient
 * @param {string} data.lifestyle - Lifestyle category
 * @returns {Promise<Object>} Analysis results
 */
export const analyzeHealth = async (data) => {
  try {
    const response = await api.post('/analyze', data);
    return response;
  } catch (error) {
    console.error('Health analysis error:', error);
    throw error;
  }
};

/**
 * Get health analysis history
 * @returns {Promise<Array>} List of health records
 */
export const getHealthHistory = async () => {
  try {
    const response = await api.get('/history');
    return response;
  } catch (error) {
    console.error('Fetch history error:', error);
    throw error;
  }
};

/**
 * Get specific health record by ID
 * @param {string|number} id - Record ID
 * @returns {Promise<Object>} Health record
 */
export const getHealthRecord = async (id) => {
  try {
    const response = await api.get(`/history/${id}`);
    return response;
  } catch (error) {
    console.error('Fetch record error:', error);
    throw error;
  }
};

/**
 * Delete health record by ID
 * @param {string|number} id - Record ID
 * @returns {Promise<Object>} Delete confirmation
 */
export const deleteHealthRecord = async (id) => {
  try {
    const response = await api.delete(`/history/${id}`);
    return response;
  } catch (error) {
    console.error('Delete record error:', error);
    throw error;
  }
};

/**
 * Mock health analysis for development/demo
 * @param {Object} data - Health analysis request data
 * @returns {Promise<Object>} Mock analysis results
 */
export const mockAnalyzeHealth = (data) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        possibleConditions: [
          'Common Cold',
          'Seasonal Allergies',
          'Mild Dehydration',
          data.symptoms.toLowerCase().includes('headache') ? 'Tension Headache' : null,
          data.symptoms.toLowerCase().includes('fever') ? 'Viral Infection' : null,
        ].filter(Boolean),
        homeRemedies: [
          'Drink plenty of warm fluids (water, herbal tea)',
          'Get adequate rest (7-8 hours of sleep)',
          'Use a humidifier for dry throat or congestion',
          'Gargle with warm salt water for sore throat',
          'Apply warm compress for muscle pain',
        ],
        dietPlan: [
          'Increase vitamin C intake (oranges, bell peppers, strawberries)',
          'Stay hydrated with water and electrolyte drinks',
          'Easily digestible foods like soups, broths, and steamed vegetables',
          'Avoid dairy if experiencing congestion',
          'Include probiotic foods like yogurt for gut health',
        ],
        exercise: [
          'Light walking for 15-20 minutes daily',
          'Deep breathing exercises to improve lung capacity',
          'Gentle stretching to improve circulation',
          'Yoga or meditation for stress relief',
          'Avoid strenuous activities until symptoms improve',
        ],
        precautions: [
          'Monitor temperature regularly',
          'Avoid contact with others if contagious',
          'Consult doctor if symptoms worsen or persist beyond 3 days',
          'Seek emergency care for severe symptoms (chest pain, difficulty breathing)',
          'Follow up with healthcare provider for persistent issues',
        ],
        disclaimer: 'This analysis is based on general medical knowledge and AI patterns. It is not a substitute for professional medical advice, diagnosis, or treatment. Always consult with a qualified healthcare provider for any health concerns.',
        timestamp: new Date().toISOString(),
        severity: data.symptoms.length > 100 ? 'moderate' : 'mild',
      });
    }, 1500); // Simulate API delay
  });
};

/**
 * Mock health history for development/demo
 * @returns {Promise<Array>} Mock health records
 */
export const mockGetHealthHistory = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          symptoms: 'Headache, fever, fatigue',
          timestamp: '2024-03-15T10:30:00Z',
          summary: 'Possible viral infection. Recommended rest and hydration.',
          conditions: ['Common Cold', 'Viral Fever'],
          severity: 'mild',
          age: 28,
          gender: 'female',
        },
        {
          id: 2,
          symptoms: 'Cough, sore throat, runny nose',
          timestamp: '2024-03-10T14:20:00Z',
          summary: 'Upper respiratory infection. Suggested home remedies.',
          conditions: ['Upper Respiratory Infection'],
          severity: 'moderate',
          age: 35,
          gender: 'male',
        },
        {
          id: 3,
          symptoms: 'Muscle pain, joint stiffness',
          timestamp: '2024-03-05T09:15:00Z',
          summary: 'Possible muscle strain. Recommended light exercise.',
          conditions: ['Muscle Strain'],
          severity: 'mild',
          age: 42,
          gender: 'other',
        },
      ]);
    }, 1000);
  });
};

// Export the axios instance for custom requests
export default api;