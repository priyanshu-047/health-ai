import { Apple, Flame, Droplets, CheckCircle, TrendingUp, Baby, Users, Loader2, Settings } from 'lucide-react'
import { useState, useEffect } from 'react'
import ChildDietPlanForm from '../components/ChildDietPlanForm'
import AdultMealPlanForm from '../components/AdultMealPlanForm'
import { dietApi } from '../services/api'

const DietPlanner = () => {
  const [selectedDay, setSelectedDay] = useState('Today')
  const [activeTab, setActiveTab] = useState('adult') // 'adult' or 'child'
  const [showAdultForm, setShowAdultForm] = useState(false) // Toggle for adult meal plan form

  // Adult meal plan data
  const [adultMealPlanData, setAdultMealPlanData] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [waterIntake, setWaterIntake] = useState(5) // glasses consumed today
  const [waterGoal, setWaterGoal] = useState(8) // default, will be updated from API

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

  // Fetch adult meal plan data on mount
  useEffect(() => {
    const fetchAdultMealPlan = async () => {
      if (activeTab !== 'adult') return
      setLoading(true)
      try {
        // Default request parameters (could be replaced with user profile)
        const request = {
          age: 30,
          weight: 70,
          height: 170,
          gender: 'Male' as const,
          activity: 'medium' as const,
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
          rice_quantity: 'Medium',
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
          water_require: undefined,
        }
        const response = await dietApi.generateAdultMealPlan(request)
        if (response.data.success) {
          setAdultMealPlanData(response.data)
          // Update water goal based on API response (convert liters to glasses approx)
          if (response.data.water_requirement) {
            // Assuming 1 glass = 250ml, convert liters to glasses
            const glasses = Math.round(response.data.water_requirement * 4)
            setWaterGoal(glasses)
          }
        } else {
          console.error('Failed to fetch meal plan:', response.data.error)
        }
      } catch (error) {
        console.error('Error fetching adult meal plan:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchAdultMealPlan()
  }, [activeTab])

  // Parse meal plan from API response or use default
  const parseMealPlan = () => {
    if (!adultMealPlanData?.meal_plan) {
      // Return default meals if no meal plan data
      return {
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
    }

    // Try to parse the meal plan string (this is a simple example)
    // In a real implementation, you would parse the actual structure
    // const mealPlanText = adultMealPlanData.meal_plan // Unused for now
    // For now, we'll use the nutrition data to create proportional meals
    const totalCalories = adultMealPlanData.daily_calories || 2000
    const proteinG = adultMealPlanData.protein_g || 90
    const carbsG = adultMealPlanData.carbs_g || 250
    const fatsG = adultMealPlanData.fats_g || 65

    // Distribute across meals (breakfast 25%, lunch 35%, dinner 30%, snacks 10%)
    return {
      breakfast: {
        name: 'Balanced Breakfast',
        calories: Math.round(totalCalories * 0.25),
        protein: `${Math.round(proteinG * 0.25)}g`,
        carbs: `${Math.round(carbsG * 0.25)}g`,
        fats: `${Math.round(fatsG * 0.25)}g`,
      },
      lunch: {
        name: 'Nutritious Lunch',
        calories: Math.round(totalCalories * 0.35),
        protein: `${Math.round(proteinG * 0.35)}g`,
        carbs: `${Math.round(carbsG * 0.35)}g`,
        fats: `${Math.round(fatsG * 0.35)}g`,
      },
      dinner: {
        name: 'Healthy Dinner',
        calories: Math.round(totalCalories * 0.30),
        protein: `${Math.round(proteinG * 0.30)}g`,
        carbs: `${Math.round(carbsG * 0.30)}g`,
        fats: `${Math.round(fatsG * 0.30)}g`,
      },
      snacks: {
        name: 'Light Snack',
        calories: Math.round(totalCalories * 0.10),
        protein: `${Math.round(proteinG * 0.10)}g`,
        carbs: `${Math.round(carbsG * 0.10)}g`,
        fats: `${Math.round(fatsG * 0.10)}g`,
      },
    }
  }

  const meals = parseMealPlan()

  const generateAdultPDF = () => {
    if (!adultMealPlanData) return
    
    const printWindow = window.open('', '_blank')
    if (!printWindow) return
    
    const mealPlanText = adultMealPlanData.meal_plan || 'No detailed meal plan available.'
    const nutritionSummary = `
      Daily Calories: ${adultMealPlanData.daily_calories || 2000} cal
      Protein: ${adultMealPlanData.protein_g || 90}g
      Carbs: ${adultMealPlanData.carbs_g || 250}g
      Fats: ${adultMealPlanData.fats_g || 65}g
      Water Requirement: ${adultMealPlanData.water_requirement || 2}L
    `
    
    const formattedContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Adult Meal Plan</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 40px; line-height: 1.6; }
          h1 { color: #1e40af; border-bottom: 2px solid #1e40af; padding-bottom: 10px; }
          h2 { color: #374151; margin-top: 30px; }
          .header { margin-bottom: 30px; }
          .date { color: #666; font-size: 14px; }
          .content { white-space: pre-wrap; font-size: 14px; }
          .section { margin-bottom: 20px; padding: 15px; border-left: 4px solid #1e40af; background: #f8fafc; }
          .meal { margin-bottom: 15px; padding: 10px; border: 1px solid #e5e7eb; border-radius: 8px; }
          .footer { margin-top: 40px; font-size: 12px; color: #666; text-align: center; }
          @media print {
            body { margin: 20px; }
            .no-print { display: none; }
          }
          table { width: 100%; border-collapse: collapse; margin: 15px 0; }
          th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
          th { background-color: #f3f4f6; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Adult Meal Plan</h1>
          <div class="date">Generated on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}</div>
        </div>
        
        <div class="section">
          <h2>Nutrition Summary</h2>
          <pre>${nutritionSummary}</pre>
        </div>
        
        <div class="section">
          <h2>Today's Meal Plan</h2>
          <table>
            <thead>
              <tr>
                <th>Meal</th>
                <th>Food</th>
                <th>Calories</th>
                <th>Protein</th>
                <th>Carbs</th>
                <th>Fats</th>
              </tr>
            </thead>
            <tbody>
              ${Object.entries(meals).map(([meal, data]: [string, any]) => `
                <tr>
                  <td><strong>${meal}</strong></td>
                  <td>${data.name}</td>
                  <td>${data.calories} cal</td>
                  <td>${data.protein}</td>
                  <td>${data.carbs}</td>
                  <td>${data.fats}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
        
        <div class="section">
          <h2>Detailed Meal Plan</h2>
          <div class="content">${mealPlanText.replace(/\n/g, '<br>')}</div>
        </div>
        
        <div class="section">
          <h2>Water Intake Goal</h2>
          <p>Daily target: ${waterGoal} glasses (approx ${Math.round(waterGoal * 0.25)}L)</p>
        </div>
        
        <div class="footer">
          <p>Generated by Health AI Diet Planner</p>
          <button class="no-print" onclick="window.print()" style="padding: 10px 20px; background: #1e40af; color: white; border: none; border-radius: 5px; cursor: pointer;">Print / Save as PDF</button>
        </div>
        <script>
          window.onload = function() {
            window.print();
            setTimeout(() => window.close(), 1000);
          }
        </script>
      </body>
      </html>
    `
    
    printWindow.document.write(formattedContent)
    printWindow.document.close()
  }

  

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Diet Planner</h1>
          <p className="text-gray-600">Personalized nutrition plans and tracking</p>
        </div>
        
        {/* Tab Switcher */}
        <div className="flex bg-gray-100 rounded-xl p-1">
          <button
            onClick={() => setActiveTab('adult')}
            className={`px-6 py-2 rounded-lg font-medium flex items-center gap-2 ${
              activeTab === 'adult'
                ? 'bg-white text-primary-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Users className="h-4 w-4" />
            Adult Plan
          </button>
          <button
            onClick={() => setActiveTab('child')}
            className={`px-6 py-2 rounded-lg font-medium flex items-center gap-2 ${
              activeTab === 'child'
                ? 'bg-white text-primary-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Baby className="h-4 w-4" />
            Child Plan
          </button>
        </div>
      </div>

      {activeTab === 'adult' ? (
        loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary-500" />
            <span className="ml-3 text-gray-600">Loading meal plan...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Meal Plan */}
          <div className="lg:col-span-2">
            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                
                <div className="flex items-center space-x-4">
                  <div className="flex space-x-2">
                    
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setShowAdultForm(!showAdultForm)}
                      className="flex items-center gap-2 px-4 py-2 bg-primary-50 text-primary-700 hover:bg-primary-100 rounded-xl font-medium transition-colors"
                    >
                      <Settings className="h-4 w-4" />
                      {showAdultForm ? 'Hide Customization' : 'Customize Plan'}
                    </button>
                    <button
                      onClick={() => generateAdultPDF()}
                      className="flex items-center gap-2 px-4 py-2 bg-success-50 text-success-700 hover:bg-success-100 rounded-xl font-medium transition-colors"
                      disabled={!adultMealPlanData}
                    >
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                      </svg>
                      Download PDF
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Adult Meal Plan Form */}
              {showAdultForm && (
                <div className="mb-8 p-6 bg-gray-50 rounded-2xl border border-gray-200">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Customize Your Meal Plan</h4>
                  <AdultMealPlanForm
                    onSuccess={(data) => {
                      setAdultMealPlanData(data);
                      setShowAdultForm(false);
                      // Update water goal if present
                      if (data.water_requirement) {
                        const glasses = Math.round(data.water_requirement * 4);
                        setWaterGoal(glasses);
                      }
                    }}
                  />
                </div>
              )}

              
            </div>

            {/* Weekly Progress */}
           
          </div>

          {/* Right Column - Nutrition & Goals */}
          
        </div>
      )) : (
        <ChildDietPlanForm />
      )}
    </div>
  )
}

export default DietPlanner