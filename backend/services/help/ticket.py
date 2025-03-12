from database.mongo import get_database
from bson import ObjectId
from models.help.query import HelpModel
from datetime import datetime

# Get the help collection
help_collection = get_database("help_collection")

def verify_user_auth(user_id: str, help_id: str) -> bool:
    """
    Verify if user is authorized to access/modify the help document
    """
    doc = help_collection.find_one({"_id": ObjectId(help_id)})
    return doc and str(doc.get("user_id")) == user_id

def insert_help(help_data: HelpModel) -> str:
    """
    Insert a new help document into the collection
    Returns the inserted document's ID
    """
    help_dict = help_data.dict()
    result = help_collection.insert_one(help_dict)
    return str(result.inserted_id)

def delete_help(help_id: str, user_id: str) -> bool:
    """
    Delete a help document by its ID if user is authorized
    Returns True if successful, False otherwise
    """
    if not verify_user_auth(user_id, help_id):
        return False
    result = help_collection.delete_one({"_id": ObjectId(help_id)})
    return result.deleted_count > 0

def update_help(help_id: str, update_data: HelpModel, user_id: str) -> bool:
    """
    Update a help document by its ID if user is authorized
    Returns True if successful, False otherwise
    """
    if not verify_user_auth(user_id, help_id):
        return False
    update_dict = update_data.dict(exclude_unset=True)
    result = help_collection.update_one(
        {"_id": ObjectId(help_id)},
        {"$set": update_dict}
    )
    return result.modified_count > 0

def fetch_help_by_id(help_id: str, user_id: str) -> HelpModel:
    """
    Fetch a single help document by its ID if user is authorized
    Returns the document or None if not found or unauthorized
    """
    if not verify_user_auth(user_id, help_id):
        return None
    doc = help_collection.find_one({"_id": ObjectId(help_id)})
    return HelpModel(**doc) if doc else None

def fetch_all_help(query: dict = None, user_id: str = None) -> list[HelpModel]:
    """
    Fetch all help documents matching the query
    If user_id is provided, only fetch documents for that user
    """
    if query is None:
        query = {}
    if user_id:
        query["user_id"] = user_id
    docs = help_collection.find(query)
    return [HelpModel(**doc) for doc in docs]