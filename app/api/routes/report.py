from fastapi import APIRouter

router = APIRouter()

@router.get("/report-test")
def report_test():
    return {"message": "Report API working"}