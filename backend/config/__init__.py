from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_name: str = "Chat CRM API"
    admin_email: str
    items_per_user: int = 50
    mongo_uri:str
    db_name:str
    is_dev:bool
    twillio_account_sid:str
    twillio_account_token:str
    algorithm:str
    access_token_expire_minutes: int = 50
    secret_key:str
    aws_access_key_id: str
    aws_secret_access_key: str
    aws_region: str
    s3_bucket: str
    model_config = SettingsConfigDict(env_file=".env")