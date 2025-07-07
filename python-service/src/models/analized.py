from sqlalchemy import CHAR, Column, Integer, String, TIMESTAMP, text
from src.db import Base

class Analized(Base):
    __tablename__ = "analized"

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(255), nullable=True)
    profession = Column(String(255), nullable=True)
    study_level = Column(String(255), nullable=True)
    gender = Column(CHAR(1), nullable=True)
    age = Column(Integer, nullable=True)
    years_of_experience = Column(Integer, nullable=True)
    certificates = Column(Integer, nullable=True)
    communication = Column(Integer, nullable=True)
    leadership = Column(Integer, nullable=True)
    teamwork = Column(Integer, nullable=True)
    adaptability = Column(Integer, nullable=True)
    punctuality = Column(Integer, nullable=True)
    probability = Column(Integer, nullable=True)
    suitable = Column(Integer, nullable=True)  # 1 for suitable, 0 for not suitable
    created_at = Column(TIMESTAMP, server_default=text("CURRENT_TIMESTAMP"))
    updated_at = Column(TIMESTAMP, nullable=True)