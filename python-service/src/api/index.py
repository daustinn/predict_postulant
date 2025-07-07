from datetime import datetime
from fastapi import APIRouter, Query, Form, UploadFile, File
from src.schemas import CandidateSchema
from src.predict_model import predict_candidate, predict_candidate_file
from src.api.models import router as models_router
from src.api.dashboard import router as dashboard_router


router = APIRouter()

@router.get("/ping")
def ping():
    return {
        "message": "Pong with FastAPI",
        "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
    }

@router.post("/predictions")
def predict(candidate: CandidateSchema, threshold: float = Query(50.0)):
    return predict_candidate(candidate, threshold)

@router.post("/predictions/file")
def predict_file(
    model: int = Form(...),
    file: UploadFile = File(...),
    threshold: float = Query(50.0)
):
    return predict_candidate_file(file=file.file, model_id=model, threshold=threshold)

router.include_router(models_router)
router.include_router(dashboard_router)

