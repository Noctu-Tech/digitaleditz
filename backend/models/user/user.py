from pydantic import BaseModel, EmailStr, Field, HttpUrl, validator
from typing import List, Optional
from enum import Enum
from datetime import datetime

class BusinessType(str, Enum):
    RESIDENTIAL = "residential"
    COMMERCIAL = "commercial"
    AGRICULTURAL = "agricultural"
    ALL = "all"  # Changed from "both" to "all" to match zod schema

class EmployeeRange(str, Enum):
    SMALL = "1-10"
    MEDIUM = "10-50"
    LARGE = "50-200"
    ENTERPRISE = "200+"

class SocialMedia(BaseModel):
    linkedin: Optional[str] = None
    instagram: Optional[str] = None

class OnboardSchema(BaseModel):
    businessName: str = Field(..., min_length=2)
    businessType: BusinessType
    description: str = Field(..., min_length=10)
    foundedYear: str = Field(..., pattern=r'^\d{4}$')
    employees: EmployeeRange
    website:str
    socialMedia: SocialMedia
    address: str = Field(..., min_length=5)
    city: str = Field(..., min_length=2)
    state: str = Field(..., min_length=2)
    zip: str = Field(..., pattern=r'^\d{6}$')
    services: List[str] = Field(..., min_items=1)
    phone: str = Field(..., pattern=r'^\d{10}$')
    whatsAppPhone: Optional[str] = Field(None, pattern=r'^\d{10}$')
    email: EmailStr

    @validator('foundedYear')
    def validate_founded_year(cls, value):
        year = int(value)
        if year < 1900 or year > datetime.now().year:
            raise ValueError(f'Year must be between 1900 and {datetime.now().year}')
        return value
    
    class Config:
        schema_extra = {
            "example": {
                "businessName": "Acme Inc",
                "businessType": "commercial",
                "description": "A company that makes everything",
                "foundedYear": "1985",
                "employees": "10-50",
                "website": "https://acme.com",
                "socialMedia": {
                    "linkedin": "acme-inc",
                    "instagram": "acmeinc"
                },
                "address": "123 Main St",
                "city": "Springfield",
                "state": "IL",
                "zip": "123456",
                "services": ["consulting", "manufacturing"],
                "phone": "1234567890",
                "whatsAppPhone": "9876543210",
                "email": "contact@acme.com"
            }
        }