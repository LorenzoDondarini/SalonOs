from datetime import datetime, timedelta


def segment_clients(clients):

    segments = {
        "vip": [],
        "regular": [],
        "at_risk": [],
        "inactive": []
    }

    today = datetime.utcnow()

    for c in clients:

        last_visit = c.last_visit

        if not last_visit:
            segments["inactive"].append(c)
            continue

        days = (today - last_visit).days

        if c.total_spent > 1000:
            segments["vip"].append(c)

        elif days < 30:
            segments["regular"].append(c)

        elif days < 90:
            segments["at_risk"].append(c)

        else:
            segments["inactive"].append(c)

    return segments