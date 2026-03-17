from collections import defaultdict
from datetime import datetime


def top_services(appointments, services):

    revenue = defaultdict(float)

    service_map = {s.id: s for s in services}

    for ap in appointments:

        service = service_map.get(ap.service_id)

        if service:
            revenue[service.name] += service.price

    result = sorted(
        revenue.items(),
        key=lambda x: x[1],
        reverse=True
    )

    return [
        {
            "service": name,
            "revenue": total
        }
        for name, total in result
    ]


def best_days(appointments):

    days = defaultdict(int)

    for ap in appointments:

        day = ap.start_time.strftime("%A")

        days[day] += 1

    result = sorted(
        days.items(),
        key=lambda x: x[1],
        reverse=True
    )

    return [
        {
            "day": day,
            "appointments": total
        }
        for day, total in result
    ]


def operator_performance(appointments):

    stats = defaultdict(int)

    for ap in appointments:

        stats[ap.operator_id] += 1

    result = sorted(
        stats.items(),
        key=lambda x: x[1],
        reverse=True
    )

    return [
        {
            "operator_id": op,
            "appointments": total
        }
        for op, total in result
    ]