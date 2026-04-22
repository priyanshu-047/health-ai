from fastapi import APIRouter
from app.api.routes import symptom, diet, report
from fastapi import APIRouter
from app.schemas.symptom import SymptomRequest
from app.services.symptom_service import process_symptoms

router = APIRouter()

@router.post("/predict")
def predict_disease(request: SymptomRequest):

    result = process_symptoms(request.symptoms)

    return {
        "input": request.symptoms,
        "prediction": result
    }

router = APIRouter()

router.include_router(symptom.router)
router.include_router(diet.router)
router.include_router(report.router)