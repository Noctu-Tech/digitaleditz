from pydantic import BaseModel, EmailStr, Field
from typing import List, Optional
from enum import Enum

class UserRole(str, Enum):
    CHIEF = "Chief"
    CLIENT = "Client"
    CUSTOMER = "Customer"

class Subscription(str, Enum):
    PREMIUM = "Premium"
    BASIC = "Basic"
    MID = "Mid"
    FREE="Free"
class Verified(str, Enum):
    VERIFIED = "VERIFIED"
    UNVERIFIED = "UNVERIFIED"

class Status(str, Enum):
    ACTIVATED = "ACTIVATED"
    DEACTIVATED = "DEACTIVATED"

class BusinessType(str, Enum):
    RESIDENTIAL = "residential"
    COMMERCIAL = "commercial"
    BOTH = "both"

class Services(str, Enum):
    RENTING = "RENTING"

class OnboardSchema(BaseModel):
    businessName: str 
    businessType: BusinessType
    description: str
    address: str
    phone: str
    city: str 
    state: str
    zip: str 
    services: Services
    whatsAppPhone: Optional[str]
    email: EmailStr 
class UserOnboardingSchema(OnboardSchema):
    u_pfp: str
    u_subscription: Subscription
    u_verified: Verified
    u_role: UserRole
    u_status: Status

    class Config:
        schema_extra = {
            "example": {
                "u_pfp": "https://example.com/profile.jpg",
                "u_subscription": "Premium",
                "u_verified": "VERIFIED",
                "u_role": "Client",
                "u_status": "ACTIVATED",
                "u_business_services": "RENTING",
                "u_business_name": "My Business",
                "u_business_description": "A brief business description.",
                "u_business_type": "residential",
                "u_business_address": "123 Main St",
                "u_business_phone": "1234567890",
                "city": "Los Angeles",
                "state": "CA",
                "zip": "123456",
                "services": ["plumbing", "electrical"],
                "whatsapp_phone": "0987654321",
                "email": "example@example.com"
            }
        }