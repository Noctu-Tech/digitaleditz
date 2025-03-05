from pymongo import MongoClient
from config import Settings
settings=Settings()
mongo_uri=settings.mongo_uri
client = MongoClient(mongo_uri)

def get_database():
    return 0
