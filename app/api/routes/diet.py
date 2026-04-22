from fastapi import APIRouter

router = APIRouter()

@router.get("/diet-test")
def diet_test():
    return {"message": "Diet API working"}