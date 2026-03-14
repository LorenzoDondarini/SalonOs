def calculate_customer_lifetime_value(payments):

    total = 0
    visits = len(payments)

    for p in payments:
        total += p.amount

    if visits == 0:
        return 0

    average_ticket = total / visits

    return {
        "total_revenue": total,
        "visits": visits,
        "average_ticket": average_ticket
    }