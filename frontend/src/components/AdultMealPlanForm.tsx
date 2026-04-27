import { useState } from 'react'
import { User, Loader2, Calculator, Activity, Heart, Apple, Utensils, Droplets, Flame, Coffee, Beef, Fish, Egg, Milk, Banana, Wheat, AlertCircle } from 'lucide-react'
import { dietApi } from '../services/api'

const AdultMealPlanForm = () => {
  const [loading, setLoading] = useState(false)
  const [mealPlan, setMealPlan] = useState<any>(null)
  const [error, setError] = useState<string>('')
  const [success, setSuccess] = useState(false)

  // Form state with defaults
  const [formData, setFormData] = useState({
    // Compulsory fields
    age: 30,
    weight: 70,
    height: 170,
    gender: 'Male' as 'Male' | 'Female',
    
    // Optional fields with defaults
    activity: 'medium' as 'low' | 'medium' | 'high',
    goal: 'Maintenance' as 'Weight Loss' | 'Weight Gain' | 'Muscle Gain' | 'Fat Loss' | 'PCOS Reversal' | 'Diabetes Control' | 'Thyroid Support' | 'Gut Health' | 'Maintenance' | 'Cholesterol Control',
    allergy: 'None' as 'None' | 'Dairy-Free' | 'Gluten-Sensitivity' | 'Peanut-Allergy' | 'Lactose Intolerant' | 'Seafood Allergy',
    regional: 'No Preference' as 'North Indian' | 'South Indian' | 'East Indian' | 'West Indian' | 'No Preference',
    state: 'Delhi',
    
    // Medical Conditions
    disease: 'None' as 'None' | 'Diabetes' | 'PCOS/PCOD' | 'Fat Loss / Overweight' | 'Fatty Liver' | 'Acidity / Gas' | 'Thyroid' | 'Kidney' | 'Heart',
    diabetes_type: 'None' as 'None' | 'Type 1' | 'Type 2' | 'Prediabetes',
    thyroid_type: 'None' as 'None' | 'Hypothyroid' | 'Hyperthyroid',
    bp_level: 'Normal' as 'Normal' | 'High' | 'Low',
    cholesterol_level: 'Normal' as 'Normal' | 'High' | 'Borderline',
    liver_stage: 'None' as 'None' | 'Grade 1' | 'Grade 2' | 'Grade 3',
    kidney_stage: 'None' as 'None' | 'Stage 1' | 'Stage 2' | 'Stage 3' | 'Stage 4' | 'Stage 5',
    gastric_issue: 'None' as 'None' | 'Acidity' | 'IBS' | 'Constipation',
    disease_duration: 'None' as 'None' | '< 6 months' | '6 months - 1 year' | '1-3 years' | '3-5 years' | '5+ years',
    tablet_times: 'None',
    
    // Diet & Lifestyle
    diet: 'Vegetarian' as 'Vegetarian' | 'Non-Vegetarian' | 'Vegan' | 'Eggetarian',
    workout_type: 'No Workout' as 'Cardio' | 'Strength' | 'Yoga' | 'No Workout',
    workout_duration: 0,
    oil_preference: 'Mustard' as 'Mustard' | 'Olive' | 'Sunflower' | 'Ghee',
    stress: 'Low' as 'Low' | 'Medium' | 'High',
    smoking: 'No' as 'No' | 'Occasionally' | 'Daily',
    alcohol: 'No' as 'No' | 'Occasionally' | 'Weekly' | 'Daily',
    
    // Meal Preferences
    breakfast: 'Normal',
    lunch: 'Normal',
    dinner: 'Normal',
    chapati_count: 2,
    eat_rice: 'yes' as 'yes' | 'no',
    rice_type: 'White' as 'White' | 'brown' | 'steamed' | 'basmati',
    rice_quantity: '1 plate' as '1/2 plate' | '1 plate' | '2 plates',
    rice_per_day: 1,
    
    // Protein Sources
    paneer_intake: 0,
    soy_intake: 0,
    egg_days: 0,
    eggs_per_day: 0,
    chicken_days: 0,
    chicken_grams: '0g',
    fish_days: 0,
    fish_grams: '0g',
    
    // Dairy
    milk_glass: 0,
    milk_type: 'None' as 'Low Fat' | 'Full Cream' | 'None',
    
    // Eating Out
    eat_out: 0,
    eat_out_food: 'None',
    
    // Calculated Field (optional)
    water_require: 0,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    if (type === 'number') {
      setFormData(prev => ({ ...prev, [name]: parseFloat(value) || 0 }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
  }

  const calculateWaterRequirement = () => {
    // Water requirement = weight × 0.035 (liters)
    const water = formData.weight * 0.035
    setFormData(prev => ({ ...prev, water_require: parseFloat(water.toFixed(2)) }))
    return water
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess(false)
    setMealPlan(null)

    try {
      // Auto-calculate water requirement if not set
      const waterRequirement = calculateWaterRequirement()
      
      // Prepare request data
      const requestData = {
        ...formData,
        water_require: waterRequirement
      }
      
      const response = await dietApi.generateAdultMealPlan(requestData)
      if (response.data.success) {
        setMealPlan(response.data)
        setSuccess(true)
      } else {
        setError(response.data.error || 'Failed to generate meal plan')
      }
    } catch (err: any) {
      setError(err.response?.data?.error || 'Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setFormData({
      age: 30,
      weight: 70,
      height: 170,
      gender: 'Male',
      activity: 'medium',
      goal: 'Maintenance',
      allergy: 'None',
      regional: 'No Preference',
      state: 'Delhi',
      disease: 'None',
      diabetes_type: 'None',
      thyroid_type: 'None',
      bp_level: 'Normal',
      cholesterol_level: 'Normal',
      liver_stage: 'None',
      kidney_stage: 'None',
      gastric_issue: 'None',
      disease_duration: 'None',
      tablet_times: 'None',
      diet: 'Vegetarian',
      workout_type: 'No Workout',
      workout_duration: 0,
      oil_preference: 'Mustard',
      stress: 'Low',
      smoking: 'No',
      alcohol: 'No',
      breakfast: 'Normal',
      lunch: 'Normal',
      dinner: 'Normal',
      chapati_count: 2,
      eat_rice: 'yes',
      rice_type: 'White',
      rice_quantity: '1 plate',
      rice_per_day: 1,
      paneer_intake: 0,
      soy_intake: 0,
      egg_days: 0,
      eggs_per_day: 0,
      chicken_days: 0,
      chicken_grams: '0g',
      fish_days: 0,
      fish_grams: '0g',
      milk_glass: 0,
      milk_type: 'None',
      eat_out: 0,
      eat_out_food: 'None',
      water_require: 0,
    })
    setMealPlan(null)
    setError('')
    setSuccess(false)
  }

  return (
    <div className="space-y-8">
      <div className="glass-card rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <User className="h-8 w-8 text-blue-500" />
          <h2 className="text-2xl font-bold text-gray-800">Adult Meal Plan Generator</h2>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Compulsory Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Age (years)</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                min="10"
                max="100"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Weight (kg)</label>
              <input
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                step="0.1"
                min="20"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Height (cm)</label>
              <input
                type="number"
                name="height"
                value={formData.height}
                onChange={handleChange}
                step="0.1"
                min="100"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
          </div>

          {/* Activity Level & Goal */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Activity Level</label>
              <select
                name="activity"
                value={formData.activity}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Goal</label>
              <select
                name="goal"
                value={formData.goal}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="Weight Loss">Weight Loss</option>
                <option value="Weight Gain">Weight Gain</option>
                <option value="Muscle Gain">Muscle Gain</option>
                <option value="Fat Loss">Fat Loss</option>
                <option value="PCOS Reversal">PCOS Reversal</option>
                <option value="Diabetes Control">Diabetes Control</option>
                <option value="Thyroid Support">Thyroid Support</option>
                <option value="Gut Health">Gut Health</option>
                <option value="Maintenance">Maintenance</option>
                <option value="Cholesterol Control">Cholesterol Control</option>
              </select>
            </div>
          </div>

          {/* Allergy & Regional Preferences */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Allergy / Intolerance</label>
              <select
                name="allergy"
                value={formData.allergy}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="None">None</option>
                <option value="Dairy-Free">Dairy-Free</option>
                <option value="Gluten-Sensitivity">Gluten-Sensitivity</option>
                <option value="Peanut-Allergy">Peanut-Allergy</option>
                <option value="Lactose Intolerant">Lactose Intolerant</option>
                <option value="Seafood Allergy">Seafood Allergy</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Regional Preference</label>
              <select
                name="regional"
                value={formData.regional}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="No Preference">No Preference</option>
                <option value="North Indian">North Indian</option>
                <option value="South Indian">South Indian</option>
                <option value="East Indian">East Indian</option>
                <option value="West Indian">West Indian</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">State / Region</label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., Delhi"
              />
            </div>
          </div>

          {/* Medical Conditions Section */}
          <div className="border-t pt-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Heart className="h-5 w-5 text-red-500" />
              Medical Conditions
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Disease</label>
                <select
                  name="disease"
                  value={formData.disease}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="None">None</option>
                  <option value="Diabetes">Diabetes</option>
                  <option value="PCOS/PCOD">PCOS/PCOD</option>
                  <option value="Fat Loss / Overweight">Fat Loss / Overweight</option>
                  <option value="Fatty Liver">Fatty Liver</option>
                  <option value="Acidity / Gas">Acidity / Gas</option>
                  <option value="Thyroid">Thyroid</option>
                  <option value="Kidney">Kidney</option>
                  <option value="Heart">Heart</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Diabetes Type</label>
                <select
                  name="diabetes_type"
                  value={formData.diabetes_type}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="None">None</option>
                  <option value="Type 1">Type 1</option>
                  <option value="Type 2">Type 2</option>
                  <option value="Prediabetes">Prediabetes</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Thyroid Type</label>
                <select
                  name="thyroid_type"
                  value={formData.thyroid_type}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="None">None</option>
                  <option value="Hypothyroid">Hypothyroid</option>
                  <option value="Hyperthyroid">Hyperthyroid</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Blood Pressure</label>
                <select
                  name="bp_level"
                  value={formData.bp_level}
                  onChange={handleChange}
                  className="w-full px3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="Normal">Normal</option>
                <option value="High">High</option>
                <option value="Low">Low</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Cholesterol Level</label>
              <select
                name="cholesterol_level"
                value={formData.cholesterol_level}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="Normal">Normal</option>
                <option value="High">High</option>
                <option value="Borderline">Borderline</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Liver Stage</label>
              <select
                name="liver_stage"
                value={formData.liver_stage}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="None">None</option>
                <option value="Grade 1">Grade 1</option>
                <option value="Grade 2">Grade 2</option>
                <option value="Grade 3">Grade 3</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Kidney Stage</label>
              <select
                name="kidney_stage"
                value={formData.kidney_stage}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              >
                <option value="None">None</option>
                <option value="Stage 1">Stage 1</option>
                <option value="Stage 2">Stage 2</option>
                <option value="Stage 3">Stage 3</option>
                <option value="Stage 4">Stage 4</option>
                <option value="Stage 5">Stage 5</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Gastric Issue</label>
              <select
                name="gastric_issue"
                value={formData.gastric_issue}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              >
                <option value="None">None</option>
                <option value="Acidity">Acidity</option>
                <option value="IBS">IBS</option>
                <option value="Constipation">Constipation</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Disease Duration</label>
              <select
                name="disease_duration"
                value={formData.disease_duration}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              >
                <option value="None">None</option>
                <option value="< 6 months">&lt; 6 months</option>
                <option value="6 months - 1 year">6 months - 1 year</option>
                <option value="1-3 years">1-3 years</option>
                <option value="3-5 years">3-5 years</option>
                <option value="5+ years">5+ years</option>
              </select>
            </div>
          </div>
        </div>

        {/* Diet & Lifestyle */}
        <div className="border-t pt-4">
          <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
            <Activity className="h-5 w-5 text-purple-500" />
            Diet & Lifestyle
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <select name="diet" value={formData.diet} onChange={handleChange} className="input">
              <option value="Vegetarian">Vegetarian</option>
              <option value="Non-Vegetarian">Non-Vegetarian</option>
              <option value="Vegan">Vegan</option>
              <option value="Eggetarian">Eggetarian</option>
            </select>

            <select name="workout_type" value={formData.workout_type} onChange={handleChange} className="input">
              <option value="No Workout">No Workout</option>
              <option value="Cardio">Cardio</option>
              <option value="Strength">Strength</option>
              <option value="Yoga">Yoga</option>
            </select>

            <input
              type="number"
              name="workout_duration"
              value={formData.workout_duration}
              onChange={handleChange}
              className="input"
              placeholder="Workout Duration (mins)"
            />
          </div>
        </div>

        {/* Water */}
        <div className="border-t pt-4">
          <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
            <Droplets className="h-5 w-5 text-blue-500" />
            Water Requirement
          </h3>

          <button
            type="button"
            onClick={calculateWaterRequirement}
            className="bg-blue-100 px-4 py-2 rounded-lg"
          >
            Calculate Water
          </button>

          {formData.water_require > 0 && (
            <p className="mt-2 text-blue-600">
              Daily Water Requirement: {formData.water_require} Liters
            </p>
          )}
        </div>

        {/* Submit */}
        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-blue-500 text-white py-3 rounded-lg flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="animate-spin" /> : 'Generate Meal Plan'}
          </button>

          <button
            type="button"
            onClick={resetForm}
            className="flex-1 bg-gray-200 py-3 rounded-lg"
          >
            Reset
          </button>
        </div>
      </form>

      {/* SUCCESS */}
      {success && mealPlan && (
        <div className="mt-6 bg-green-50 p-4 rounded-lg">
          <h3 className="font-bold mb-2">Meal Plan Generated</h3>
          <pre className="text-sm overflow-auto">
            {JSON.stringify(mealPlan, null, 2)}
          </pre>
        </div>
      )}

      {/* ERROR */}
      {error && (
        <div className="mt-4 text-red-500 flex items-center gap-2">
          <AlertCircle className="h-4 w-4" />
          {error}
        </div>
      )}
      </div>
    </div>
  )
}

export default AdultMealPlanForm;
