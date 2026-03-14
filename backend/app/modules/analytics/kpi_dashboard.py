def generate_kpi_dashboard(appointments, payments, clients):

    revenue = sum([p.amount for p in payments])

    total_appointments = len(appointments)

    total_clients = len(clients)

    average_ticket = 0

    if payments:
        average_ticket = revenue / len(payments)

    return {
        "revenue": revenue,
        "appointments": total_appointments,
        "clients": total_clients,
        "average_ticket": average_ticket
    }