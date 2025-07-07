import pandas as pd
import joblib
from src.db import SessionLocal
from src.models.model import Model
from src.models.analized import Analized
from src.schemas import CandidateSchema

def predict_candidate(data: CandidateSchema, threshold: float = 50.0):
  
    db = SessionLocal()
    modelDb =  db.query(Model).filter(Model.id == data.model).first()

    if not modelDb:
        raise ValueError("Model not found")

    model = joblib.load(f"models/{modelDb.model_name}.pkl")
    scaler = joblib.load(f"models/{modelDb.model_name}_scaler.pkl")
    features = joblib.load(f"models/{modelDb.model_name}_features.pkl")

    fields = {
        "age": data.age,
        "years_of_experience": data.years_of_experience,
        "certificates": data.certificates,
        "communication": data.communication,
        "leadership": data.leadership,
        "teamwork": data.teamwork,
        "adaptability": data.adaptability,
        "punctuality": data.punctuality
    }

    if modelDb.gender is not None:
        fields["gender"] = {"m": 1, "f": 0}.get(data.gender, 0)
        
    input_data = pd.DataFrame([fields])

    input_scaled = scaler.transform(input_data[features])
    probability = float(model.predict_proba(input_scaled)[0][1]) * 100

    # save to database
    analized = Analized(
        name=data.name,
        profession=data.profession,
        study_level=data.study_level,
        gender=data.gender,
        age=data.age,
        years_of_experience=data.years_of_experience,
        certificates=data.certificates,
        communication=data.communication,
        leadership=data.leadership,
        teamwork=data.teamwork,
        adaptability=data.adaptability,
        punctuality=data.punctuality,
        probability=probability,
        suitable=1 if probability >= threshold else 0
    )

    db.add(analized)
    db.commit()
    db.refresh(analized)

    return {
        'suitable': probability >= threshold,
        "result": "Suitable" if probability >= threshold else "Not suitable",
        "probability": round(probability, 2)
    }

def predict_candidate_file(file, model_id: int, threshold: float = 50.0):
  
    db = SessionLocal()
    modelDb =  db.query(Model).filter(Model.id == model_id).first()

    if not modelDb:
        raise ValueError("Model not found")

    model = joblib.load(f"models/{modelDb.model_name}.pkl")
    scaler = joblib.load(f"models/{modelDb.model_name}_scaler.pkl")
    features = joblib.load(f"models/{modelDb.model_name}_features.pkl")
    
    df = pd.read_excel(file)

    if modelDb.gender is not None:
        df["gender"] = df["gender"].map({"m": 1, "f": 0}).fillna(0)

    input_scaled = scaler.transform(df[features])
    probabilities = model.predict_proba(input_scaled)[:, 1] * 100
    predictions = (probabilities >= threshold).astype(int)

    df["probability"] = probabilities.round(2)
    df["result"] = ["Suitable" if p else "Not suitable" for p in predictions]

    fit = int((predictions == 1).sum())
    unfit = int((predictions == 0).sum())


    # save to database
    analized_records = [
        Analized(
            name=row["name"],
            profession=row["profession"],
            study_level=row["study_level"],
            gender=row["gender"],
            age=row["age"],
            years_of_experience=row["years_of_experience"],
            certificates=row["certificates"],
            communication=row["communication"],
            leadership=row["leadership"],
            teamwork=row["teamwork"],
            adaptability=row["adaptability"],
            punctuality=row["punctuality"],
            probability=row["probability"],
            suitable=row["result"] == "Suitable"
        )
        for _, row in df.iterrows()
    ]

    db.add_all(analized_records)
    db.commit()

    return {
        "fit": fit,
        "unfit": unfit,
        "candidates": df[features + ["probability", "result", "name", "profession", "study_level"]].to_dict(orient="records")
    }
