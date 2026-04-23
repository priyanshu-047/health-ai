import { Apple, Flame, Droplets, CheckCircle, TrendingUp } from 'lucide-react'
import { useState } from 'react'

const DietPlanner = () => {
  const [selectedDay, setSelectedDay] = useState('Today')

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  
  const meals = {
    breakfast: {
      name: 'Oatmeal with Berries',
      calories: 320,
      protein: '12g',
      carbs: '54g',
      fats: '8g',
    },
    lunch: {
      name: 'Grilled Chicken Salad',
      calories: 450,
      protein: '35g',
      carbs: '20g',
      fats: '15g',
    },
    dinner: {
      name: 'Salmon with Vegetables',
      calories: 380,
      protein: '28g',
      carbs: '25g',
      fats: '18g',
    },
    snacks: {
      name: 'Greek Yogurt & Almonds',
      calories: 210,
      protein: '15g',
      carbs: '12g',
      fats: '10g',
    },
  }

  const nutritionGoals = {
    calories: { target: 2000, current: 1360, unit: 'cal' },
    protein: { target: 90, current: 90, unit: 'g' },
    carbs: { target: 250, current: 111, unit: 'g' },
    fats: { target: 65, current: 51, unit: 'g' },
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Diet Planner</h1>
        <p className="text-gray-600">Personalized nutrition plans and tracking</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Meal Plan */}
        <div className="lg:col-span-2">
          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Today's Meal Plan</h3>
                <p className="text-gray-600">April 22, 2024 • 1,360 calories consumed</p>
              </div>
              <div className="flex space-x-2">
                {days.map((day) => (
                  <button
                    key={day}
                    onClick={() => setSelectedDay(day)}
                    className={`px-4 py-2 rounded-xl font-medium ${
                      selectedDay === day
                        ? 'bg-primary-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              {Object.entries(meals).map(([key, meal]) => (
                <div key={key} className="p-6 bg-gray-50 rounded-2xl border border-gray-200 card-hover">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="h-12 w-12 bg-primary-50 rounded-xl flex items-center justify-center">
                        <Apple className="h-6 w-6 text-primary-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 capitalize">{key}</h4>
                        <h5 className="text-lg font-semibold text-gray-900">{meal.name}</h5>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center text-warning-600">
                        <Flame className="h-4 w-4 mr-1" />
                        <span className="font-bold">{meal.calories} cal</span>
                      </div>
                      <div className="text-sm text-gray-500 mt-1">
                        P: {meal.protein} • C: {meal.carbs} • F: {meal.fats}
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center space-x-4">
                    <button className="flex-1 btn-secondary py-2">
                      <CheckCircle className="h-4 w-4 mr-2 inline" />
                      Mark as Eaten
                    </button>
                    <button className="flex-1 btn-primary py-2">
                      View Recipe
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Weekly Progress */}
          <div className="mt-8 glass-card rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Weekly Nutrition Progress</h3>
            <div className="h-64 bg-gray-50 rounded-xl flex items-center justify-center">
              <div className="text-center">
                <TrendingUp className="h-12 w-12 text-gray-300 mx-auto mb-2" />
                <p className="text-gray-500">Chart visualization of weekly nutrition</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Nutrition & Goals */}
        <div className="space-y-6">
          {/* Nutrition Summary */}
          <div className="glass-card rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Nutrition Summary</h3>
            <div className="space-y-6">
              {Object.entries(nutritionGoals).map(([key, goal]) => {
                const percentage = Math.min(100, (goal.current / goal.target) * 100)
                return (
                  <div key={key}>
                    <div className="flex justify-between mb-2">
                      <span className="font-medium text-gray-900 capitalize">{key}</span>
                      <span className="font-semibold">
                        {goal.current}/{goal.target} {goal.unit}
                      </span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          percentage >= 100 ? 'bg-success-500' :
                          percentage >= 75 ? 'bg-primary-500' :
                          percentage >= 50 ? 'bg-warning-500' :
                          'bg-danger-500'
                        }`}
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Water Intake */}
          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-semibold text-gray-900">Water Intake</h3>
                <p className="text-gray-600">Goal: 8 glasses per day</p>
              </div>
              <Droplets className="h-6 w-6 text-primary-500" />
            </div>
            <div className="grid grid-cols-4 gap-3">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((glass) => (
                <div
                  key={glass}
                  className={`h-20 rounded-xl flex items-center justify-center ${
                    glass <= 5 ? 'bg-primary-100 border-2 border-primary-300' : 'bg-gray-100 border-2 border-gray-200'
                  }`}
                >
                  <Droplets className={`h-8 w-8 ${glass <= 5 ? 'text-primary-600' : 'text-gray-400'}`} />
                </div>
              ))}
            </div>
            <div className="mt-4 text-center">
              <p className="text-gray-700">
                <span className="font-bold text-primary-600">5/8</span> glasses consumed today
              </p>
            </div>
          </div>

          {/* Diet Tips */}
          <div className="glass-card rounded-2xl p-6 gradient-success/10 border border-success-100">
            <h4 className="font-semibold text-gray-900 mb-3">Healthy Eating Tips</h4>
            <ul className="space-y-3 text-sm text-gray-700">
              <li className="flex items-start">
                <div className="h-2 w-2 bg-success-500 rounded-full mt-2 mr-3"></div>
                <span>Eat protein with every meal for sustained energy</span>
              </li>
              <li className="flex items-start">
                <div className="h-2 w-2 bg-success-500 rounded-full mt-2 mr-3"></div>
                <span>Include colorful vegetables for antioxidants</span>
              </li>
              <li className="flex items-start">
                <div className="h-2 w-2 bg-success-500 rounded-full mt-2 mr-3"></div>
                <span>Stay hydrated - drink water before meals</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DietPlanner