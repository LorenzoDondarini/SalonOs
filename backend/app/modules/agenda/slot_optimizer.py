from datetime import datetime, timedelta


def generate_time_slots(start_hour: int = 9, end_hour: int = 19, interval: int = 15):
    """
    Genera tutti gli slot della giornata
    """
    slots = []

    current = datetime(2000, 1, 1, start_hour, 0)
    end = datetime(2000, 1, 1, end_hour, 0)

    while current < end:
        slots.append(current.time())
        current += timedelta(minutes=interval)

    return slots


def suggest_available_slots(appointments, duration_minutes: int):
    """
    Suggerisce slot disponibili evitando sovrapposizioni.

    appointments: lista oggetti con
        start_time
        end_time
    """

    slots = generate_time_slots()

    suggestions = []

    for slot in slots:

        start = datetime.combine(datetime.today(), slot)
        end = start + timedelta(minutes=duration_minutes)

        overlap = False

        for ap in appointments:

            ap_start = ap.start_time
            ap_end = ap.end_time

            if start < ap_end and end > ap_start:
                overlap = True
                break

        if not overlap:
            suggestions.append(slot.strftime("%H:%M"))

    return suggestions