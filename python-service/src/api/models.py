from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from src.db import SessionLocal
from src.models.model import Model
from src.schemas import ModelSchema
from src.train_model import train_model

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/models")
def create_model(data: ModelSchema, db: Session = Depends(get_db)):
    result = train_model(data)

    # register the model in the database
    model = Model(
        name=data.name, 
        model_name=result["model_name"], 
        precision=result["precision"],
       **result["indicators"]
    )
    db.add(model)
    db.commit()
    db.refresh(model)
    
    return {
        "message": "Model trained and registered successfully",
        "model": model,
        "precision": model.precision,
        "suitable": result["suitable"],
        "not_suitable": result["not_suitable"],
    }

@router.get("/models")
def list_models(db: Session = Depends(get_db)):
    # order by created_at descending
    models = db.query(Model).order_by(Model.created_at.desc()).all()
    return models

@router.get("/models/{id}")
def get_model(id: int, db: Session = Depends(get_db)):
    model = db.query(Model).get(id)
    if not model:
        raise HTTPException(status_code=404, detail="Not found")
    return model

@router.put("/models/{id}")
def update_model(id: int, data: ModelSchema, db: Session = Depends(get_db)):
    model = db.query(Model).get(id)
    if not model:
        raise HTTPException(status_code=404, detail="Not found")
    for key, value in data.dict().items():
        setattr(model, key, value)
    db.commit()
    return model

@router.delete("/models/{id}")
def delete_model(id: int, db: Session = Depends(get_db)):
    model = db.query(Model).get(id)
    if not model:
        raise HTTPException(status_code=404, detail="Not found")
    db.delete(model)
    db.commit()
    return {"message": "Deleted successfully"}
