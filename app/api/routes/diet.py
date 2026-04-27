from fastapi import APIRouter
from app.schemas.diet import ChildDietPlanRequest, ChildDietPlanResponse, AdultMealPlanRequest, AdultMealPlanResponse
from app.services.diet_service import generate_child_diet_plan, generate_adult_meal_plan

router = APIRouter()

@router.get("/diet-test")
def diet_test():
    return {"message": "Diet API working"}

@router.post("/child-diet-plan", response_model=ChildDietPlanResponse)
async def create_child_diet_plan(request: ChildDietPlanRequest):
    """
    Generate a personalized diet plan for children using external API
    """
    return await generate_child_diet_plan(request)

@router.post("/adult-meal-plan", response_model=AdultMealPlanResponse)
async def create_adult_meal_plan(request: AdultMealPlanRequest):
    """
    Generate a personalized meal plan for adults using external API
    """
    return await generate_adult_meal_plan(request)