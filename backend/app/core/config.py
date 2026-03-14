from pydantic_settings import BaseSettings


class Settings(BaseSettings):

    APP_NAME: str = "SalonOS"

    SECRET_KEY: str = "supersecretkey"

    STRIPE_SECRET: str = "sk_test_xxxxxxxxx"

settings = Settings()