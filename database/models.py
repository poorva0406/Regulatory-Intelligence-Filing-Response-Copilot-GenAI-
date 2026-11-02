"""
Database schema models for Regulatory Intelligence & Filing Copilot.
Uses SQLAlchemy for SQLite / PostgreSQL compatibility.
"""
from sqlalchemy import Column, Integer, String, Text, DateTime, Boolean, ForeignKey
from sqlalchemy.orm import declarative_base, relationship
from datetime import datetime

Base = declarative_base()

class RegulatoryDocumentModel(Base):
    __tablename__ = "regulatory_documents"

    id = Column(String, primary_key=True)
    name = Column(String, nullable=False)
    document_type = Column(String, nullable=False)
    state = Column(String, nullable=False)
    jurisdiction = Column(String, nullable=False)
    regulatory_authority = Column(String, nullable=False)
    product_category = Column(String, nullable=False)
    publication_date = Column(String, nullable=False)
    source_url = Column(String, nullable=False)
    citation = Column(String, nullable=False)
    summary = Column(Text, nullable=False)
    full_text = Column(Text, nullable=False)
    page_count = Column(Integer, default=1)
    created_at = Column(DateTime, default=datetime.utcnow)

    chunks = relationship("DocumentChunkModel", back_populates="document")

class DocumentChunkModel(Base):
    __tablename__ = "document_chunks"

    id = Column(String, primary_key=True)
    document_id = Column(String, ForeignKey("regulatory_documents.id"))
    state = Column(String, nullable=False)
    page_number = Column(Integer, default=1)
    section_heading = Column(String)
    content = Column(Text, nullable=False)

    document = relationship("RegulatoryDocumentModel", back_populates="chunks")

class FilingDossierModel(Base):
    __tablename__ = "filing_dossiers"

    id = Column(String, primary_key=True)
    filing_reference = Column(String, nullable=False)
    state = Column(String, nullable=False)
    insurance_product = Column(String, nullable=False)
    raw_objection = Column(Text, nullable=False)
    draft_response = Column(Text, nullable=False)
    amended_endorsement = Column(Text, nullable=False)
    confidence_score = Column(Integer, default=95)
    human_status = Column(String, default="Pending Review")
    reviewed_by = Column(String)
    reviewed_at = Column(DateTime)
    created_at = Column(DateTime, default=datetime.utcnow)
