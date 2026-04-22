from fastapi import APIRouter
from app.services.symptom_service import analyze_symptoms

router = APIRouter()

@router.post("/symptom-check")
def symptom_check(data: dict):
    return analyze_symptoms(data)