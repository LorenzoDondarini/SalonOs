from datetime import datetime, timedelta


def generate_business_advice(
    clients,
    appointments,
    top_services_data,
    best_days_data
):

    advice = []

    # ---------------------------------------
    # CLIENTI INATTIVI
    # ---------------------------------------

    inactive = 0
    limit_date = datetime.utcnow() - timedelta(days=60)

    for c in clients:

        last = None

        client_appointments = [
            a for a in appointments if a.client_id == c.id
        ]

        if client_appointments:
            last = max(client_appointments, key=lambda x: x.start_time)

        if not last or last.start_time < limit_date:
            inactive += 1

    if inactive > 0:
        advice.append({
            "type": "warning",
            "message": f"Hai {inactive} clienti inattivi. Lancia una campagna di recupero."
        })

    # ---------------------------------------
    # SERVIZIO PIÙ REDDITIZIO
    # ---------------------------------------

    if top_services_data:

        best = top_services_data[0]

        advice.append({
            "type": "insight",
            "message": f"Il servizio '{best['service']}' è il più redditizio (€{best['revenue']}). Promuovilo di più."
        })

    # ---------------------------------------
    # GIORNO MIGLIORE
    # ---------------------------------------

    if best_days_data:

        best_day = best_days_data[0]

        advice.append({
            "type": "info",
            "message": f"Il giorno migliore è {best_day['day']}. Considera prezzi premium."
        })

    # ---------------------------------------
    # BUCHI IN AGENDA
    # ---------------------------------------

    if len(appointments) < 20:

        advice.append({
            "type": "warning",
            "message": "Hai pochi appuntamenti. Offri promozioni per riempire l’agenda."
        })

    return advice