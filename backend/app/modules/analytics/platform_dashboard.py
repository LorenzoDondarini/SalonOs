def platform_kpis(salons):

    total_salons = len(salons)

    total_revenue = 0

    for s in salons:
        total_revenue += s.revenue

    return {

        "salons": total_salons,
        "revenue": total_revenue

    }