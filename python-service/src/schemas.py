from pydantic import BaseModel
from typing import Optional, List
from pydantic import BaseModel

class IndicatorSchema(BaseModel):
    name: str
    gender: Optional[str]
    age: List[int]
    years_of_experience: List[int]
    certificates: List[int]
    communication: List[int]
    leadership: List[int]
    teamwork: List[int]
    adaptability: List[int]
    punctuality: List[int]

    class Config:
        orm_mode = True

class CandidateSchema(BaseModel):
    model: int
    profession: str
    study_level: str
    name: str
    age: int
    gender: Optional[str] = None
    years_of_experience: int
    certificates: int
    communication: int
    leadership: int
    teamwork: int
    adaptability: int
    punctuality: int

class ModelSchema(BaseModel):
    name: str
    gender: Optional[str]
    age_from: Optional[int]
    age_to: Optional[int]
    experience_from: Optional[int]
    experience_to: Optional[int]
    certificates_from: Optional[int]
    certificates_to: Optional[int]
    communication_from: Optional[int]
    communication_to: Optional[int]
    leadership_from: Optional[int]
    leadership_to: Optional[int]
    teamwork_from: Optional[int]
    teamwork_to: Optional[int]
    adaptability_from: Optional[int]
    adaptability_to: Optional[int]
    punctuality_from: Optional[int]
    punctuality_to: Optional[int]