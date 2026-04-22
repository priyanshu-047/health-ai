from fastapi import APIRouter
from app.api.routes import symptom, diet, report

router = APIRouter()

router.include_router(symptom.router)
router.include_router(diet.router)
router.include_router(report.router)