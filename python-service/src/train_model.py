import pandas as pd
import joblib
from sklearn.linear_model import LogisticRegression
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import accuracy_score
from src.schemas import ModelSchema

def meets_indicators(row, indicators):
    for column, criterion in indicators.items():
        if criterion is None:
            continue
        value = pd.to_numeric(row[column], errors='coerce')
        if isinstance(criterion, list):
            try:
                min_val = float(criterion[0])
                max_val = float(criterion[1]) if len(criterion) > 1 and criterion[1] is not None else float('inf')
            except Exception:
                continue 
            if not (min_val <= value <= max_val):
                return 0
        else:
            try:
                if value < float(criterion):
                    return 0
            except Exception:
                continue
    return 1

def train_model(data: ModelSchema):
    indicators = {
        "gender": data.gender if data.gender is not None else None,
        "age": [data.age_from, data.age_to],
        "years_of_experience": [data.experience_from, data.experience_to],
        "certificates": [data.certificates_from, data.certificates_to],
        "communication": [data.communication_from, data.communication_to],
        "leadership": [data.leadership_from, data.leadership_to],
        "teamwork": [data.teamwork_from, data.teamwork_to],
        "adaptability": [data.adaptability_from, data.adaptability_to],
        "punctuality": [data.punctuality_from, data.punctuality_to],
    }

    df = pd.read_excel("data/dataset.xlsx")
    
    df_model = df.copy()
    df_model["Final Result"] = df_model.apply(lambda row: meets_indicators(row, indicators), axis=1)

    suitable = df_model["Final Result"].sum()
    not_suitable = df_model.shape[0] - suitable

    suitable_candidates = df_model[df_model["Final Result"] == 1].shape[0]
    if suitable_candidates < 5:
        aptos = df_model[df_model["Final Result"] == 1]
        df_model = pd.concat([df_model, aptos] * 10, ignore_index=True)

    features = [
        "age", "years_of_experience", "certificates",
        "communication", "leadership", "teamwork",
        "adaptability", "punctuality"
    ]

    if indicators["gender"] is not None:
        df_model["gender"] = df_model["gender"].map({"m": 1, "f": 0}).fillna(0)
        features.insert(1, "gender")

    classes = df_model["Final Result"].unique()
    if len(classes) < 2:
        raise ValueError("The dataset does not contain enough classes for training.")

    X = df_model[features]
    y = df_model["Final Result"]

    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X)

    model = LogisticRegression(max_iter=1000)
    model.fit(X_scaled, y)

    y_pred = model.predict(X_scaled)
    precision = accuracy_score(y, y_pred)

    randomModelName = f"model_{pd.Timestamp.now().strftime('%Y%m%d_%H%M%S')}"

    joblib.dump(model, f"models/{randomModelName}.pkl")
    joblib.dump(scaler, f"models/{randomModelName}_scaler.pkl")
    joblib.dump(features, f"models/{randomModelName}_features.pkl")

    return {
        "model_name": randomModelName,
        "precision": round(precision, 4),
        "suitable": int(suitable),
        "not_suitable": int(not_suitable),
        "indicators": indicators
    }
