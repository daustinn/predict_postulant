from fastapi import APIRouter
from src.db import SessionLocal
from src.models.model import Model
from src.models.analized import Analized

router = APIRouter()

@router.get("/dashboard")
def dashboard():
    db = SessionLocal()

    #models count
    modelsCount = db.query(Model).count()
    analizedCount = db.query(Analized).count()

    # Latest 10 analysis
    latestAnalized = db.query(Analized).order_by(Analized.created_at.desc()).limit(10).all()

    # Fit candidates
    fitCandidates = db.query(Analized).filter(Analized.suitable == 1).count()
    unfitCandidates = db.query(Analized).filter(Analized.suitable == 0).count()

    return {
        "models": modelsCount,
        "analized": analizedCount,
        "latest": latestAnalized,
        "fit_candidates": fitCandidates,
        "unfit_candidates": unfitCandidates
    }
