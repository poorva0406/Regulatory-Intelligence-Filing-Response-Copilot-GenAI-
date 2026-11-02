"""
SQLite / Relational Database Manager.
Initializes tables, supports incremental document upserts, duplicate detection, and dossier storage.
"""
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, Session
from database.models import Base, RegulatoryDocumentModel, DocumentChunkModel, FilingDossierModel
import os

DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./regulatory_copilot.db")

engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False} if "sqlite" in DATABASE_URL else {})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def init_db():
    Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
