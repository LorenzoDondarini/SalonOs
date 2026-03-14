from datetime import datetime, timedelta


def find_inactive_clients(clients):

    inactive = []

    today = datetime.utcnow()

    for c in clients:

        if not c.last_visit:
            continue

        days = (today - c.last_visit).days

        if days > 60:
            inactive.append(c)

    return inactive