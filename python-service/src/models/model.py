from sqlalchemy import CHAR, JSON, Column, Integer, String, TIMESTAMP, text
from src.db import Base
from sqlalchemy.orm import relationship

class Model(Base):
    __tablename__ = "models"

    id = Column(Integer, primary_key=True, autoincrement=True)
    precision = Column(String(255))
    name = Column(String(255))
    model_name = Column(String(255))
    
    gender = Column(CHAR(1))
    age = Column(JSON)
    years_of_experience = Column(JSON)
    certificates = Column(JSON)
    communication = Column(JSON)
    leadership = Column(JSON)
    teamwork = Column(JSON)
    adaptability = Column(JSON)
    punctuality = Column(JSON)
    
    created_at = Column(TIMESTAMP, server_default=text("CURRENT_TIMESTAMP"))
    updated_at = Column(TIMESTAMP, nullable=True)