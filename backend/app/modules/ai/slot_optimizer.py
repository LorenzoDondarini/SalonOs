from datetime import datetime, timedelta


def generate_time_slots(start_hour=9, end_hour=19, interval=15):

    slots = []

    current = datetime(2000, 1, 1, start_hour, 0)
    end = datetime(2000, 1, 1, end_hour, 0)

    while current < end:
        slots.append(current.time())
        current += timedelta(minutes=interval)

    return slots


def suggest_slots(appointments, duration_minutes):

    slots = generate_time_slots()

    suggestions = []

    for slot in slots:

        start = datetime.combine(datetime.today(), slot)
        end = start + timedelta(minutes=duration_minutes)

        conflict = False

        for ap in appointments:

            if start < ap.end_time and end > ap.start_time:
                conflict = True
                break

        if not conflict:

            suggestions.append({
                "start": start,
                "score": score_slot(start)
            })

    suggestions.sort(key=lambda x: x["score"], reverse=True)

    return suggestions[:5]


def score_slot(start_time):

    hour = start_time.hour

    score = 0

    # slot più redditizi tipicamente
    if 10 <= hour <= 13:
        score += 2

    if 16 <= hour <= 19:
        score += 3

    # evitare slot troppo presto
    if hour < 9:
        score -= 1

    return score