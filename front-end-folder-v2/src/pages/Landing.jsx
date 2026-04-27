import React from 'react';
import { Link } from 'react-router-dom';
import Card, { CardHeader, CardContent } from '../components/Card.jsx';

const Landing = () => {
  const features = [
    {
      title: 'AI Health Analysis',
      description: 'Get accurate health insights based on your symptoms using advanced AI algorithms.',
      icon: '🧠',
      color: 'primary'
    },
    {
      title: 'Home Remedies',
      description: 'Natural and effective home remedies for common health issues.',
      icon: '🏡',
      color: 'secondary'
    },
    {
      title: 'Diet & Exercise Plans',
      description: 'Personalized diet and exercise recommendations for better health.',
      icon: '🥗',
      color: 'emerald'
    },
    {
      title: 'History Tracking',
      description: 'Keep track of your health analysis history and monitor progress.',
      icon: '📊',
      color: 'blue'
    }
  ];

  const steps = [
    {
      number: '1',
      title: 'Enter Symptoms',
      description: 'Describe your symptoms in simple language'
    },
    {
      number: '2',
      title: 'AI Analysis',
      description: 'Our AI analyzes symptoms and medical knowledge'
    },
    {
      number: '3',
      title: 'Get Results',
      description: 'Receive structured health recommendations'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="section-padding py-12 md:py-20">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            AI-Powered Health Guidance at{' '}
            <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              Your Fingertips
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
            Get smart health suggestions using AI based on your symptoms. Our advanced system provides personalized recommendations for better health management.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/app" className="btn-primary text-lg px-8 py-4">
              Try Now
            </Link>
            <Link to="/history" className="btn-secondary text-lg px-8 py-4">
              View History
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding py-12 bg-white">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Powerful Features</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Everything you need for comprehensive health analysis and guidance
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} hover={true} className="h-full">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="section-padding py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Simple three-step process to get your health recommendations
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center text-white text-2xl font-bold mb-4">
                  {step.number}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-3/4 w-full h-1 bg-gradient-to-r from-primary-200 to-secondary-200"></div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Disclaimer Section */}
      <section className="section-padding py-12">
        <Card className="bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200">
          <CardContent>
            <div className="flex items-start">
              <div className="text-amber-600 mr-4 text-2xl">⚠️</div>
              <div>
                <h3 className="text-xl font-bold text-amber-800 mb-2">Important Disclaimer</h3>
                <p className="text-amber-700">
                  This tool provides general health suggestions and is not medical advice. Always consult with a qualified healthcare professional for medical concerns. The AI analysis is based on general medical knowledge and may not be accurate for your specific condition.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* CTA Section */}
      <section className="section-padding py-12">
        <div className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-3xl p-8 md:p-12 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Start improving your health today</h2>
          <p className="text-primary-100 mb-8 max-w-2xl mx-auto">
            Join thousands of users who have used our AI health assistant to make better health decisions.
          </p>
          <Link to="/app" className="inline-block bg-white text-primary-700 font-bold py-4 px-10 rounded-xl hover:bg-gray-100 transition-colors shadow-lg">
            Get Started Now
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="section-padding py-8 border-t border-gray-200">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-primary-500 to-secondary-500"></div>
              <span className="text-xl font-bold text-gray-900">Health-AI</span>
            </div>
            <p className="text-gray-500 text-sm mt-2">AI-powered health guidance for everyone</p>
          </div>
          <div className="text-gray-600 text-sm">
            <p>© {new Date().getFullYear()} Health-AI Assistant. All rights reserved.</p>
            <p className="mt-1">This is a demonstration project for educational purposes.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;