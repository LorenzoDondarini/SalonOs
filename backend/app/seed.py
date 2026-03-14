from sqlalchemy.orm import Session
from datetime import datetime, timedelta

from app.core.database import SessionLocal, engine, Base

# IMPORTA TUTTI I MODELLI
from app.modules.tenant.models import Salon
from app.modules.users.models import User
from app.modules.team.models import TeamMember
from app.modules.clienti.models import Client
from app.modules.servizi.models import Service
from app.modules.agenda.models import Appointment
from app.modules.cassa.models import Payment
from app.modules.magazzino.models import Product


def seed():

    db: Session = SessionLocal()

    # crea salone
    salon = Salon(
        name="Salon Demo",
        owner_email="demo@salon.com"
    )

    db.add(salon)
    db.commit()
    db.refresh(salon)

    # team
    team = [
        TeamMember(name="Marco", role="Parrucchiere", salon_id=salon.id),
        TeamMember(name="Anna", role="Colorista", salon_id=salon.id),
        TeamMember(name="Luca", role="Barber", salon_id=salon.id)
    ]

    db.add_all(team)
    db.commit()

    # clienti
    clients = [
        Client(first_name="Giulia", last_name="Rossi", phone="333111", salon_id=salon.id),
        Client(first_name="Luca", last_name="Bianchi", phone="333222", salon_id=salon.id),
        Client(first_name="Sara", last_name="Verdi", phone="333333", salon_id=salon.id)
    ]

    db.add_all(clients)
    db.commit()

    # servizi
    services = [
        Service(name="Taglio", duration_minutes=30, price=25, salon_id=salon.id),
        Service(name="Colore", duration_minutes=60, price=60, salon_id=salon.id),
        Service(name="Piega", duration_minutes=40, price=30, salon_id=salon.id)
    ]

    db.add_all(services)
    db.commit()

    now = datetime.now()

    appointments = [

        Appointment(
            salon_id=salon.id,
            client_id=clients[0].id,
            user_id=team[0].id,
            service_id=services[0].id,
            start_time=now + timedelta(hours=1),
            end_time=now + timedelta(hours=1, minutes=30)
        ),

        Appointment(
            salon_id=salon.id,
            client_id=clients[1].id,
            user_id=team[1].id,
            service_id=services[1].id,
            start_time=now + timedelta(hours=2),
            end_time=now + timedelta(hours=3)
        )

    ]

    db.add_all(appointments)
    db.commit()

    print("Database popolato con dati demo")


if __name__ == "__main__":

    Base.metadata.create_all(bind=engine)
    seed()