import axios from 'axios'

// Use environment variable with fallback for local development
const API_BASE_URL = (import.meta as any).env?.VITE_API_URL || 'http://localhost:8000'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor for adding auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('health_ai_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor for handling errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized
      localStorage.removeItem('health_ai_token')
      window.location.href = '/'
    }
    return Promise.reject(error)
  }
)

export const symptomApi = {
  checkSymptoms: (symptoms: string[]) =>
    api.post('/api/symptom-check', { symptoms }),
  
  getAnalysis: (data: any) =>
    api.post('/api/predict', data),
  
  getRemedies: (condition: string) =>
    api.get(`/api/remedies/${condition}`),
  
  getMedicines: (condition: string) =>
    api.get(`/api/medicines/${condition}`),
}

export const reportApi = {
  uploadReport: (formData: FormData) =>
    api.post('/api/report/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  
  getReports: () =>
    api.get('/api/reports'),
  
  analyzeReport: (reportId: string) =>
    api.get(`/api/report/analyze/${reportId}`),
}

export const dietApi = {
  getDietPlan: (conditions: string[], preferences: any) =>
    api.post('/api/diet/plan', { conditions, preferences }),
  
  getNutritionTips: () =>
    api.get('/api/diet/tips'),
  
  trackNutrition: (data: any) =>
    api.post('/api/diet/track', data),
  
  generateChildDietPlan: (data: any) =>
    api.post('/api/child-diet-plan', data),
  
  generateAdultMealPlan: (data: any) =>
    api.post('/api/adult-meal-plan', data),
}

export const userApi = {
  getProfile: () =>
    api.get('/api/user/profile'),
  
  updateProfile: (data: any) =>
    api.put('/api/user/profile', data),
  
  getHealthHistory: () =>
    api.get('/api/user/health-history'),
}

export default api