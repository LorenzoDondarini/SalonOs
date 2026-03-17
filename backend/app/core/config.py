from pydantic_settings import BaseSettings


class Settings(BaseSettings):

    # APP
    APP_NAME: str = "SalonOS"
    APP_VERSION: str = "0.1.0"

    # DATABASE
    DATABASE_URL: str = "sqlite:///./salonos.db"

    # AUTH
    JWT_SECRET: str = "super-secret-key"
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24

    # STRIPE
    STRIPE_SECRET: str = "sk_test_placeholder"

    # TWILIO
    TWILIO_ACCOUNT_SID: str = "twilio_sid_placeholder"
    TWILIO_AUTH_TOKEN: str = "twilio_token_placeholder"
    TWILIO_PHONE_NUMBER: str = "+10000000000"

    class Config:
        env_file = ".env"


settings = Settings()