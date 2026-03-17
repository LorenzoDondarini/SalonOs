from twilio.rest import Client
from app.core.config import settings


client = Client(
    settings.TWILIO_ACCOUNT_SID,
    settings.TWILIO_AUTH_TOKEN
)


def send_whatsapp(phone: str, message: str):

    try:

        client.messages.create(
            from_=f"whatsapp:{settings.TWILIO_PHONE_NUMBER}",
            body=message,
            to=f"whatsapp:{phone}"
        )

        return {"status": "sent"}

    except Exception as e:

        print("WhatsApp error:", e)

        return {
            "status": "error",
            "error": str(e)
        }