from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_name: str = "Awesome API"
    admin_email: str
    items_per_user: int = 50
    mongo_uri:str
    db_name:str
    model_config = SettingsConfigDict(env_file=".env")