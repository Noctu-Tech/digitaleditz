from bson import ObjectId
from models.user.user import OnboardSchema as UserOnboardingSchema
from database.mongo import get_database as db

async def Onboard(data: UserOnboardingSchema, id: str):
    try:
        profile_collection = db("profile")
        
        # Check if profile already exists
        existing_profile = profile_collection.find_one({"user_id": ObjectId(id)})
        if existing_profile:
            return {"status": "error", "message": "Profile already exists"}
            
        # Create document
        profile_doc = {**data.model_dump(), "user_id": ObjectId(id)}
        # Insert into database
        result = profile_collection.insert_one(profile_doc)
        
        return {"status": "success", "message": "Profile created successfully","id":str(result.inserted_id)}
    except Exception as e:
        return {"status": "error", "message": str(e)}
