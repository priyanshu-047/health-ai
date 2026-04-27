import httpx
import json
from typing import Dict, Any
from app.schemas.diet import ChildDietPlanRequest, ChildDietPlanResponse, AdultMealPlanRequest, AdultMealPlanResponse


async def generate_child_diet_plan(request: ChildDietPlanRequest) -> ChildDietPlanResponse:
    """
    Call external API to generate child diet plan
    """
    external_api_url = "http://3.108.65.53:8000/chi-generate-diet-plan"
    
    # Prepare request payload
    payload = {
        "age": request.age,
        "gender": request.gender,
        "height_cm": request.height_cm,
        "weight_kg": request.weight_kg,
        "behaviour": request.behaviour,
        "goals": request.goals,
        "diet_type": request.diet_type,
        "food_region": request.food_region,
        "sleep_hours": request.sleep_hours,
        "activity_level": request.activity_level,
        "milk_qty": request.milk_qty,
        "food_intake": request.food_intake,
        "allergies": request.allergies,
        "breakfast": request.breakfast,
        "school_tiffin": request.school_tiffin,
        "lunch": request.lunch,
        "dinner": request.dinner
    }
    
    try:
        async with httpx.AsyncClient(timeout=30.0) as client:
            response = await client.post(
                external_api_url,
                json=payload,
                headers={"Content-Type": "application/json"}
            )
            
            if response.status_code == 200:
                data = response.json()
                return ChildDietPlanResponse(
                    success=data.get("success", False),
                    diet_plan=data.get("diet_plan", ""),
                    prompt_used=data.get("prompt_used"),
                    error=data.get("error")
                )
            else:
                return ChildDietPlanResponse(
                    success=False,
                    diet_plan="",
                    prompt_used=None,
                    error=f"External API returned status {response.status_code}: {response.text}"
                )
                
    except httpx.TimeoutException:
        return ChildDietPlanResponse(
            success=False,
            diet_plan="",
            prompt_used=None,
            error="Request timeout: External API took too long to respond"
        )
    except httpx.RequestError as e:
        return ChildDietPlanResponse(
            success=False,
            diet_plan="",
            prompt_used=None,
            error=f"Request error: {str(e)}"
        )
    except Exception as e:
        return ChildDietPlanResponse(
            success=False,
            diet_plan="",
            prompt_used=None,
            error=f"Unexpected error: {str(e)}"
        )


async def generate_adult_meal_plan(request: AdultMealPlanRequest) -> AdultMealPlanResponse:
    """
    Call external API to generate adult meal plan
    """
    external_api_url = "http://13.201.21.89:8000/generate-meal-plan"
    
    # Calculate water requirement if not provided
    if request.water_require is None:
        water_require = request.weight * 0.035
    else:
        water_require = request.water_require
    
    # Prepare request payload
    payload = {
        "age": request.age,
        "weight": request.weight,
        "height": request.height,
        "gender": request.gender,
        "activity": request.activity,
        "goal": request.goal,
        "allergy": request.allergy,
        "regional": request.regional,
        "state": request.state,
        "disease": request.disease,
        "diabetes_type": request.diabetes_type,
        "thyroid_type": request.thyroid_type,
        "bp_level": request.bp_level,
        "cholesterol_level": request.cholesterol_level,
        "liver_stage": request.liver_stage,
        "kidney_stage": request.kidney_stage,
        "gastric_issue": request.gastric_issue,
        "disease_duration": request.disease_duration,
        "tablet_times": request.tablet_times,
        "diet": request.diet,
        "workout_type": request.workout_type,
        "workout_duration": request.workout_duration,
        "oil_preference": request.oil_preference,
        "stress": request.stress,
        "smoking": request.smoking,
        "alcohol": request.alcohol,
        "breakfast": request.breakfast,
        "lunch": request.lunch,
        "dinner": request.dinner,
        "chapati_count": request.chapati_count,
        "eat_rice": request.eat_rice,
        "rice_type": request.rice_type,
        "rice_quantity": request.rice_quantity,
        "rice_per_day": request.rice_per_day,
        "paneer_intake": request.paneer_intake,
        "soy_intake": request.soy_intake,
        "egg_days": request.egg_days,
        "eggs_per_day": request.eggs_per_day,
        "chicken_days": request.chicken_days,
        "chicken_grams": request.chicken_grams,
        "fish_days": request.fish_days,
        "fish_grams": request.fish_grams,
        "milk_glass": request.milk_glass,
        "milk_type": request.milk_type,
        "eat_out": request.eat_out,
        "eat_out_food": request.eat_out_food,
        "water_require": water_require
    }
    
    try:
        async with httpx.AsyncClient(timeout=30.0) as client:
            response = await client.post(
                external_api_url,
                json=payload,
                headers={"Content-Type": "application/json"}
            )
            
            if response.status_code == 200:
                data = response.json()
                return AdultMealPlanResponse(
                    success=data.get("success", False),
                    bmi=data.get("bmi"),
                    bmr=data.get("bmr"),
                    tdee=data.get("tdee"),
                    daily_calories=data.get("daily_calories"),
                    protein_g=data.get("protein_g"),
                    carbs_g=data.get("carbs_g"),
                    fats_g=data.get("fats_g"),
                    water_requirement=data.get("water_requirement"),
                    goal=data.get("goal"),
                    meal_plan=data.get("meal_plan", ""),
                    error=data.get("error")
                )
            else:
                return AdultMealPlanResponse(
                    success=False,
                    meal_plan="",
                    error=f"External API returned status {response.status_code}: {response.text}"
                )
                
    except httpx.TimeoutException:
        return AdultMealPlanResponse(
            success=False,
            meal_plan="",
            error="Request timeout: External API took too long to respond"
        )
    except httpx.RequestError as e:
        return AdultMealPlanResponse(
            success=False,
            meal_plan="",
            error=f"Request error: {str(e)}"
        )
    except Exception as e:
        return AdultMealPlanResponse(
            success=False,
            meal_plan="",
            error=f"Unexpected error: {str(e)}"
        )