from pydantic import BaseModel, Field
from typing import List, Optional, Literal


class ChildDietPlanRequest(BaseModel):
    age: int
    gender: str
    height_cm: float
    weight_kg: float
    behaviour: List[str]
    goals: List[str]
    diet_type: str
    food_region: str
    sleep_hours: int
    activity_level: str
    milk_qty: int
    food_intake: str
    allergies: List[str]
    breakfast: str
    school_tiffin: str
    lunch: str
    dinner: str


class ChildDietPlanResponse(BaseModel):
    success: bool
    diet_plan: str
    prompt_used: Optional[str] = None
    error: Optional[str] = None


# Adult Meal Plan API Schemas
class AdultMealPlanRequest(BaseModel):
    # Compulsory fields (4)
    age: int = Field(..., ge=10, le=100, description="Age in years (10-100)")
    weight: float = Field(..., gt=0, description="Weight in kilograms")
    height: float = Field(..., gt=0, description="Height in centimeters")
    gender: Literal["Male", "Female"] = Field(..., description="Gender")
    
    # Optional fields with defaults
    activity: Literal["low", "medium", "high"] = "medium"
    goal: Literal["Weight Loss", "Weight Gain", "Muscle Gain", "Fat Loss", "PCOS Reversal",
                  "Diabetes Control", "Thyroid Support", "Gut Health", "Maintenance",
                  "Cholesterol Control"] = "Maintenance"
    allergy: Literal["None", "Dairy-Free", "Gluten-Sensitivity", "Peanut-Allergy",
                     "Lactose Intolerant", "Seafood Allergy"] = "None"
    regional: Literal["North Indian", "South Indian", "East Indian", "West Indian",
                      "No Preference"] = "Indian"
    state: str = "Delhi"
    
    # Medical Conditions
    disease: Literal["None", "Diabetes", "PCOS/PCOD", "Fat Loss / Overweight", "Fatty Liver",
                     "Acidity / Gas", "Thyroid", "Kidney", "Heart"] = "None"
    diabetes_type: Literal["None", "Type 1", "Type 2", "Prediabetes"] = "None"
    thyroid_type: Literal["None", "Hypothyroid", "Hyperthyroid"] = "None"
    bp_level: Literal["Normal", "High", "Low"] = "Normal"
    cholesterol_level: Literal["Normal", "High", "Borderline"] = "Normal"
    liver_stage: Literal["None", "Grade 1", "Grade 2", "Grade 3"] = "None"
    kidney_stage: Literal["None", "Stage 1", "Stage 2", "Stage 3", "Stage 4", "Stage 5"] = "None"
    gastric_issue: Literal["None", "Acidity", "IBS", "Constipation"] = "None"
    disease_duration: Literal["None", "< 6 months", "6 months - 1 year", "1-3 years",
                              "3-5 years", "5+ years"] = "None"
    tablet_times: str = "None"
    
    # Diet & Lifestyle
    diet: Literal["Vegetarian", "Non-Vegetarian", "Vegan", "Eggetarian"] = "Vegetarian"
    workout_type: Literal["Cardio", "Strength", "Yoga", "No Workout"] = "No Workout"
    workout_duration: int = Field(0, ge=0, le=180, description="Minutes per day (0-180)")
    oil_preference: Literal["Mustard", "Olive", "Sunflower", "Ghee"] = "Mustard"
    stress: Literal["Low", "Medium", "High"] = "Low"
    smoking: Literal["No", "Occasionally", "Daily"] = "No"
    alcohol: Literal["No", "Occasionally", "Weekly", "Daily"] = "No"
    
    # Meal Preferences
    breakfast: str = "Normal"
    lunch: str = "Normal"
    dinner: str = "Normal"
    chapati_count: int = Field(2, ge=0, le=10, description="Number of chapatis")
    eat_rice: Literal["yes", "no"] = "yes"
    rice_type: Literal["White", "brown", "steamed", "basmati"] = "White"
    rice_quantity: Literal["1/2 plate", "1 plate", "2 plates"] = "Medium"
    rice_per_day: int = Field(1, ge=0, le=3, description="Times per day (0-3)")
    
    # Protein Sources
    paneer_intake: int = Field(0, ge=0, le=7, description="Times per week (0-7)")
    soy_intake: int = Field(0, ge=0, le=7, description="Times per week (0-7)")
    egg_days: int = Field(0, ge=0, le=7, description="Days per week (0-7)")
    eggs_per_day: int = Field(0, ge=0, le=6, description="Eggs per day (0-6)")
    chicken_days: int = Field(0, ge=0, le=7, description="Days per week (0-7)")
    chicken_grams: str = "0g"
    fish_days: int = Field(0, ge=0, le=7, description="Days per week (0-7)")
    fish_grams: str = "0g"
    
    # Dairy
    milk_glass: int = Field(0, ge=0, le=5, description="Glasses per day (0-5)")
    milk_type: Literal["Low Fat", "Full Cream", "None"] = "None"
    
    # Eating Out
    eat_out: int = Field(0, ge=0, le=14, description="Times eat outside per day (0-14)")
    eat_out_food: str = "None"
    
    # Calculated Field (optional, will be auto-calculated if not provided)
    water_require: Optional[float] = None


class AdultMealPlanResponse(BaseModel):
    success: bool
    bmi: Optional[float] = None
    bmr: Optional[float] = None
    tdee: Optional[float] = None
    daily_calories: Optional[float] = None
    protein_g: Optional[float] = None
    carbs_g: Optional[float] = None
    fats_g: Optional[float] = None
    water_requirement: Optional[float] = None
    goal: Optional[str] = None
    meal_plan: str
    error: Optional[str] = None