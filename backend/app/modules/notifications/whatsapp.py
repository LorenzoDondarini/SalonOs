from twilio.rest import Client

account_sid = "TWILIO_SID"
auth_token = "TWILIO_TOKEN"

client = Client(account_sid, auth_token)


def send_whatsapp(phone,message):

    client.messages.create(
        body=message,
        from_="whatsapp:+14155238886",
        to=f"whatsapp:{phone}"
    )