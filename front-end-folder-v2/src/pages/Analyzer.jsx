import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Card, { ResultCard } from '../components/Card.jsx';
import Loader, { ButtonLoader } from '../components/Loader.jsx';
import { analyzeHealth } from '../services/api.js';

const Analyzer = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    symptoms: '',
    age: '',
    gender: '',
    lifestyle: ''
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const genderOptions = [
    { value: '', label: 'Select Gender' },
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other' },
    { value: 'prefer_not_to_say', label: 'Prefer not to say' }
  ];

  const lifestyleOptions = [
    { value: '', label: 'Select Lifestyle' },
    { value: 'sedentary', label: 'Sedentary (Little to no exercise)' },
    { value: 'lightly_active', label: 'Lightly Active (Light exercise 1-3 days/week)' },
    { value: 'moderately_active', label: 'Moderately Active (Moderate exercise 3-5 days/week)' },
    { value: 'very_active', label: 'Very Active (Hard exercise 6-7 days/week)' },
    { value: 'extremely_active', label: 'Extremely Active (Very hard exercise & physical job)' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.symptoms.trim()) {
      toast.error('Please describe your symptoms');
      return;
    }

    if (!formData.age || formData.age < 1 || formData.age > 120) {
      toast.error('Please enter a valid age (1-120)');
      return;
    }

    setLoading(true);
    try {
      const response = await analyzeHealth(formData);
      setResult(response);
      toast.success('Analysis completed successfully!');
    } catch (error) {
      console.error('Analysis error:', error);
      toast.error(error.message || 'Failed to analyze symptoms. Please try again.');
      
      // Mock data for demonstration if API fails
      setResult({
        possibleConditions: ['Common Cold', 'Seasonal Allergies', 'Mild Dehydration'],
        homeRemedies: [
          'Drink plenty of warm fluids',
          'Get adequate rest (7-8 hours sleep)',
          'Use a humidifier for dry throat',
          'Gargle with warm salt water'
        ],
        dietPlan: [
          'Increase vitamin C intake (oranges, bell peppers)',
          'Stay hydrated with water and herbal teas',
          'Easily digestible foods like soups and broths',
          'Avoid dairy if experiencing congestion'
        ],
        exercise: [
          'Light walking for 15-20 minutes daily',
          'Deep breathing exercises',
          'Gentle stretching to improve circulation'
        ],
        precautions: [
          'Monitor temperature regularly',
          'Avoid strenuous activities',
          'Consult doctor if symptoms worsen',
          'Isolate if fever develops'
        ],
        disclaimer: 'This analysis is based on general medical knowledge and may not be accurate for your specific condition. Always consult a healthcare professional.'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setFormData({
      symptoms: '',
      age: '',
      gender: '',
      lifestyle: ''
    });
    setResult(null);
    toast.success('Form cleared');
  };

  const handleNewAnalysis = () => {
    setResult(null);
    setFormData({
      symptoms: '',
      age: '',
      gender: '',
      lifestyle: ''
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="section-padding py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Health <span className="text-primary-600">Analyzer</span>
            </h1>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Describe your symptoms and get AI-powered health recommendations. Our system analyzes your input and provides personalized guidance.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Form */}
            <div className="lg:col-span-2">
              <Card className="h-full">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Enter Your Health Information</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Symptoms */}
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Symptoms <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="symptoms"
                      value={formData.symptoms}
                      onChange={handleChange}
                      placeholder="Describe your symptoms in detail (e.g., headache, fever, cough, fatigue...)"
                      className="input-field h-40 resize-none"
                      required
                      disabled={loading}
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      Be as specific as possible for better analysis
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Age */}
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        Age <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        placeholder="Enter your age"
                        min="1"
                        max="120"
                        className="input-field"
                        required
                        disabled={loading}
                      />
                    </div>

                    {/* Gender */}
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        Gender
                      </label>
                      <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        className="input-field"
                        disabled={loading}
                      >
                        {genderOptions.map(option => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Lifestyle */}
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Lifestyle
                    </label>
                    <select
                      name="lifestyle"
                      value={formData.lifestyle}
                      onChange={handleChange}
                      className="input-field"
                      disabled={loading}
                    >
                      {lifestyleOptions.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <button
                      type="submit"
                      disabled={loading}
                      className="btn-primary flex-1 flex items-center justify-center"
                    >
                      {loading ? <ButtonLoader /> : 'Analyze Symptoms'}
                    </button>
                    <button
                      type="button"
                      onClick={handleClear}
                      disabled={loading}
                      className="btn-secondary flex-1"
                    >
                      Clear Form
                    </button>
                    <button
                      type="button"
                      onClick={() => navigate('/history')}
                      className="border border-gray-300 text-gray-700 font-medium py-3 px-6 rounded-xl hover:bg-gray-50 transition-colors"
                    >
                      View History
                    </button>
                  </div>
                </form>

                {/* Loading State */}
                {loading && (
                  <div className="mt-8">
                    <div className="text-center">
                      <Loader text="Analyzing your symptoms with AI..." />
                      <p className="text-gray-500 mt-4">
                        This may take a few moments as our AI processes your information...
                      </p>
                    </div>
                  </div>
                )}
              </Card>
            </div>

            {/* Right Column - Info/Results */}
            <div className="space-y-6">
              {/* How it works */}
              <Card>
                <h3 className="text-xl font-bold text-gray-900 mb-4">How It Works</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="w-6 h-6 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center mr-3 flex-shrink-0">
                      1
                    </div>
                    <span className="text-gray-700">Describe your symptoms in detail</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-6 h-6 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center mr-3 flex-shrink-0">
                      2
                    </div>
                    <span className="text-gray-700">AI analyzes using medical knowledge</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-6 h-6 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center mr-3 flex-shrink-0">
                      3
                    </div>
                    <span className="text-gray-700">Get personalized recommendations</span>
                  </li>
                </ul>
              </Card>

              {/* Disclaimer */}
              <Card className="bg-amber-50 border-amber-200">
                <h3 className="text-xl font-bold text-amber-800 mb-3">⚠️ Important Notice</h3>
                <p className="text-amber-700 text-sm">
                  This tool provides general health suggestions and is not medical advice. Always consult with a qualified healthcare professional for medical concerns.
                </p>
              </Card>

              {/* Results Preview */}
              {result && (
                <Card className="bg-gradient-to-br from-primary-50 to-secondary-50 border-primary-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Analysis Complete!</h3>
                  <p className="text-gray-700 mb-4">
                    Your health analysis has been completed. Scroll down to see detailed results.
                  </p>
                  <button
                    onClick={handleNewAnalysis}
                    className="w-full btn-secondary"
                  >
                    Start New Analysis
                  </button>
                </Card>
              )}
            </div>
          </div>

          {/* Results Display */}
          {result && (
            <div className="mt-12 animate-fade-in">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Your Health Analysis Results</h2>
                <p className="text-gray-600">Based on your symptoms and profile</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <ResultCard
                  title="Possible Conditions"
                  items={result.possibleConditions}
                  icon="🩺"
                  color="primary"
                />
                <ResultCard
                  title="Home Remedies"
                  items={result.homeRemedies}
                  icon="🏡"
                  color="secondary"
                />
                <ResultCard
                  title="Diet Plan"
                  items={result.dietPlan}
                  icon="🥗"
                  color="emerald"
                />
                <ResultCard
                  title="Exercise Recommendations"
                  items={result.exercise}
                  icon="🏃‍♂️"
                  color="blue"
                />
                <ResultCard
                  title="Precautions"
                  items={result.precautions}
                  icon="⚠️"
                  color="amber"
                />
              </div>

              {/* Final Disclaimer */}
              <Card className="mt-8 bg-red-50 border-red-200">
                <div className="flex items-start">
                  <div className="text-red-600 mr-4 text-2xl">🚨</div>
                  <div>
                    <h3 className="text-xl font-bold text-red-800 mb-2">Medical Disclaimer</h3>
                    <p className="text-red-700">
                      {result.disclaimer || 'This analysis is based on general medical knowledge and may not be accurate for your specific condition. Always consult a healthcare professional for proper diagnosis and treatment.'}
                    </p>
                    <p className="text-red-700 mt-2 font-medium">
                      If you experience severe symptoms like chest pain, difficulty breathing, or loss of consciousness, seek emergency medical attention immediately.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Analyzer;