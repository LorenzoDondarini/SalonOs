from sqlalchemy.orm import Session
from datetime import datetime, timedelta

from app.modules.clienti.models import Client
from app.modules.agenda.models import Appointment
from app.modules.servizi.models import Service
from app.modules.notifications.whatsapp import send_whatsapp


def clients_to_recover(db: Session, salon_id: int):

    limit_date = datetime.utcnow() - timedelta(days=90)

    clients = db.query(Client).filter(
        Client.salon_id == salon_id
    ).all()

    result = []

    for c in clients:

        last = db.query(Appointment).filter(
            Appointment.client_id == c.id
        ).order_by(
            Appointment.start_time.desc()
        ).first()

        if last and last.start_time < limit_date:

            message = f"Ciao {c.first_name}, è passato un po' dall'ultima visita. Vuoi fissare un nuovo appuntamento?"

            result.append({
                "id": c.id,
                "name": f"{c.first_name} {c.last_name or ''}".strip(),
                "phone": c.phone,
                "last_visit": last.start_time,
                "message": message
            })

    return result


def upcoming_reminders(db: Session, salon_id: int):

    now = datetime.utcnow()
    tomorrow = now + timedelta(hours=24)

    appointments = db.query(Appointment).filter(
        Appointment.salon_id == salon_id,
        Appointment.start_time >= now,
        Appointment.start_time <= tomorrow
    ).all()

    reminders = []

    for a in appointments:

        client = db.query(Client).filter(
            Client.id == a.client_id
        ).first()

        service = db.query(Service).filter(
            Service.id == a.service_id
        ).first()

        if client:

            service_name = service.name if service else "servizio"

            message = f"Ciao {client.first_name}, ti ricordiamo il tuo appuntamento per {service_name} il {a.start_time.strftime('%d/%m/%Y alle %H:%M')}."

            reminders.append({
                "appointment_id": a.id,
                "client_id": a.client_id,
                "client_name": f"{client.first_name} {client.last_name or ''}".strip(),
                "phone": client.phone,
                "time": a.start_time,
                "service": service_name,
                "message": message
            })

    return reminders


def send_reminder(phone: str, message: str):

    try:

        send_whatsapp(phone, message)

        return {"status": "sent"}

    except Exception as e:

        return {
            "status": "error",
            "error": str(e)
        }


# ---------------------------------------------------------
# NUOVE FUNZIONI INTEGRATE
# ---------------------------------------------------------

def send_recovery_campaign(db: Session, salon_id: int):

    """
    Invia messaggi WhatsApp ai clienti inattivi
    """

    clients = clients_to_recover(db, salon_id)

    results = []

    for c in clients:

        try:

            send_whatsapp(c["phone"], c["message"])

            results.append({
                "client_id": c["id"],
                "status": "sent"
            })

        except Exception as e:

            results.append({
                "client_id": c["id"],
                "status": "error",
                "error": str(e)
            })

    return results


def send_daily_reminders(db: Session, salon_id: int):

    """
    Invia automaticamente i reminder per gli appuntamenti di domani
    """

    reminders = upcoming_reminders(db, salon_id)

    results = []

    for r in reminders:

        try:

            send_whatsapp(r["phone"], r["message"])

            results.append({
                "appointment_id": r["appointment_id"],
                "status": "sent"
            })

        except Exception as e:

            results.append({
                "appointment_id": r["appointment_id"],
                "status": "error",
                "error": str(e)
            })

    return results