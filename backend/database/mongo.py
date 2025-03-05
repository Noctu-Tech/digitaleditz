from pymongo import MongoClient
from config import Settings
settings=Settings()
mongo_uri=settings.mongo_uri
db_name=settings.db_name
client = MongoClient(mongo_uri)

def get_database(collection_name:str):
    db=client[db_name]
    collection=db[collection_name]
    return collection