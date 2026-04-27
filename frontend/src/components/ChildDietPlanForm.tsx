import { useState } from 'react'
import { Baby, Loader2, Sparkles } from 'lucide-react'
import { dietApi } from '../services/api'

const ChildDietPlanForm = () => {
  const [loading, setLoading] = useState(false)
  const [dietPlan, setDietPlan] = useState<string>('')
  const [error, setError] = useState<string>('')
  const [success, setSuccess] = useState(false)

  // Form state
  const [formData, setFormData] = useState({
    age: 10,
    gender: 'Male',
    height_cm: 140,
    weight_kg: 35,
    behaviour: ['Normal'],
    goals: ['Growth'],
    diet_type: 'Vegetarian',
    food_region: 'North Indian',
    sleep_hours: 8,
    activity_level: 'Moderate',
    milk_qty: 200,
    food_intake: 'Low fruits',
    allergies: [] as string[],
    breakfast: 'Paratha',
    school_tiffin: 'Sandwich',
    lunch: 'Dal Roti',
    dinner: 'Rice Sabzi'
  })

  // Options
  const genderOptions = ['Male', 'Female']
  const behaviourOptions = [
    'Normal',
    'Picky Eater',
    'Skips Breakfast',
    'Overeats Snacks',
    'Prefers Taste Over Nutrition',
    'Irregular Meal Schedule',
    'Frequent Packaged Foods',
    'Good Eating Habits'
  ]
  const goalsOptions = [
    'Healthy growth',
    'Improve immunity',
    'Increase weight',
    'Reduce junk habits',
    'Manage medical condition'
  ]
  const dietTypeOptions = ['Vegetarian', 'Eggetarian', 'Non-Vegetarian', 'Jain']
  const foodRegionOptions = ['North Indian', 'South Indian', 'Gujarati', 'Bengali', 'Rajasthani', 'Mixed']
  const activityLevelOptions = ['Light', 'Moderate', 'High']
  const foodIntakeOptions = ['None', '1 serving', '2 servings', '3+ servings']
  const allergiesOptions = ['Milk/Dairy', 'Nuts', 'Egg', 'Gluten/Wheat', 'Soy', 'Fish']

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    if (type === 'number') {
      setFormData(prev => ({ ...prev, [name]: parseFloat(value) || 0 }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
  }

  const handleArrayChange = (name: keyof typeof formData, value: string, checked: boolean) => {
    const currentArray = formData[name] as string[]
    if (checked) {
      setFormData(prev => ({ ...prev, [name]: [...currentArray, value] }))
    } else {
      setFormData(prev => ({ ...prev, [name]: currentArray.filter(item => item !== value) }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess(false)
    setDietPlan('')

    try {
      const response = await dietApi.generateChildDietPlan(formData)
      if (response.data.success) {
        setDietPlan(response.data.diet_plan)
        setSuccess(true)
      } else {
        setError(response.data.error || 'Failed to generate diet plan')
      }
    } catch (err: any) {
      setError(err.response?.data?.error || 'Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      <div className="glass-card rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-12 w-12 bg-primary-50 rounded-xl flex items-center justify-center">
            <Baby className="h-6 w-6 text-primary-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Child Diet Plan Generator</h2>
            <p className="text-gray-600">Generate personalized diet plans for children (ages 1-18)</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Age (years)</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                min="1"
                max="18"
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {genderOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Height (cm)</label>
              <input
                type="number"
                name="height_cm"
                value={formData.height_cm}
                onChange={handleChange}
                step="0.1"
                min="50"
                max="200"
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Weight (kg)</label>
              <input
                type="number"
                name="weight_kg"
                value={formData.weight_kg}
                onChange={handleChange}
                step="0.1"
                min="5"
                max="100"
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Sleep Hours</label>
              <input
                type="number"
                name="sleep_hours"
                value={formData.sleep_hours}
                onChange={handleChange}
                min="5"
                max="12"
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Milk Quantity (ml)</label>
              <input
                type="number"
                name="milk_qty"
                value={formData.milk_qty}
                onChange={handleChange}
                min="0"
                max="1000"
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          {/* Behaviour - Multi-select */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Eating Behaviour</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {behaviourOptions.map(option => (
                <label key={option} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.behaviour.includes(option)}
                    onChange={(e) => handleArrayChange('behaviour', option, e.target.checked)}
                    className="h-4 w-4 text-primary-600 rounded"
                  />
                  <span className="text-sm text-gray-700">{option}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Goals - Multi-select */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Health Goals</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {goalsOptions.map(option => (
                <label key={option} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.goals.includes(option)}
                    onChange={(e) => handleArrayChange('goals', option, e.target.checked)}
                    className="h-4 w-4 text-primary-600 rounded"
                  />
                  <span className="text-sm text-gray-700">{option}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Diet Preferences */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Diet Type</label>
              <select
                name="diet_type"
                value={formData.diet_type}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {dietTypeOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Food Region</label>
              <select
                name="food_region"
                value={formData.food_region}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {foodRegionOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Activity Level</label>
              <select
                name="activity_level"
                value={formData.activity_level}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {activityLevelOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Fruit/Healthy Food Intake</label>
              <select
                name="food_intake"
                value={formData.food_intake}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {foodIntakeOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Allergies */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Food Allergies</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {allergiesOptions.map(option => (
                <label key={option} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.allergies.includes(option)}
                    onChange={(e) => handleArrayChange('allergies', option, e.target.checked)}
                    className="h-4 w-4 text-primary-600 rounded"
                  />
                  <span className="text-sm text-gray-700">{option}</span>
                </label>
              ))}
            </div>
          </div>

          {/* 24-hour Recall */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">24-Hour Food Recall</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Breakfast</label>
                <input
                  type="text"
                  name="breakfast"
                  value={formData.breakfast}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="What did they eat for breakfast?"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">School Tiffin</label>
                <input
                  type="text"
                  name="school_tiffin"
                  value={formData.school_tiffin}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="What was in their school tiffin?"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Lunch</label>
                <input
                  type="text"
                  name="lunch"
                  value={formData.lunch}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="What did they eat for lunch?"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Dinner</label>
                <input
                  type="text"
                  name="dinner"
                  value={formData.dinner}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="What did they eat for dinner?"
                  required
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary py-3 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Generating Diet Plan...
                </>
              ) : (
                <>
                  <Sparkles className="h-5 w-5" />
                  Generate Personalized Diet Plan
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Results Section */}
      {error && (
        <div className="glass-card rounded-2xl p-6 border border-danger-200 bg-danger-50">
          <h3 className="text-lg font-semibold text-danger-700 mb-2">Error</h3>
          <p className="text-danger-600">{error}</p>
        </div>
      )}

      {success && dietPlan && (
        <div className="glass-card rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900">Generated Diet Plan</h3>
              <p className="text-gray-600">Personalized 3-day meal plan for your child</p>
            </div>
            <div className="px-4 py-2 bg-success-100 text-success-700 rounded-xl font-medium">
              Successfully Generated
            </div>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: dietPlan.replace(/\n/g, '<br>') }} />
          </div>
          
          <div className="mt-6 flex justify-end">
            <button
              onClick={() => {
                const blob = new Blob([dietPlan], { type: 'text/markdown' })
                const url = URL.createObjectURL(blob)
                const a = document.createElement('a')
                a.href = url
                a.download = 'child-diet-plan.md'
                a.click()
                URL.revokeObjectURL(url)
              }}
              className="btn-secondary"
            >
              Download as Markdown
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default ChildDietPlanForm