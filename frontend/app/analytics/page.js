"use client"

import { useEffect, useState } from "react"
import axios from "axios"

export default function AnalyticsPage() {

  const [revenue, setRevenue] = useState(0)
  const [appointments, setAppointments] = useState(0)
  const [topServices, setTopServices] = useState([])
  const [customers, setCustomers] = useState([])
  const [team, setTeam] = useState([])
  const [margins, setMargins] = useState([])

  useEffect(() => {

    axios
      .get("http://localhost:8000/analytics/revenue/1")
      .then(res => setRevenue(res.data.total_revenue))

    axios
      .get("http://localhost:8000/analytics/appointments/1")
      .then(res => setAppointments(res.data.appointments))

    axios
      .get("http://localhost:8000/analytics/top-services/1")
      .then(res => setTopServices(res.data.top_services))

    axios
      .get("http://localhost:8000/analytics/customer-value/1")
      .then(res => setCustomers(res.data))

    axios
      .get("http://localhost:8000/analytics/team-performance/1")
      .then(res => setTeam(res.data))

    axios
      .get("http://localhost:8000/analytics/service-margin/1")
      .then(res => setMargins(res.data))

  }, [])

  return (
    <div className="p-10">

      <h1 className="text-3xl font-semibold mb-8">
        Analytics
      </h1>

      <div className="grid grid-cols-3 gap-6 mb-10">

        <div className="bg-white border rounded-xl p-6">
          <p className="text-sm text-neutral-500">Fatturato</p>
          <p className="text-2xl font-semibold">€{revenue}</p>
        </div>

        <div className="bg-white border rounded-xl p-6">
          <p className="text-sm text-neutral-500">Appuntamenti</p>
          <p className="text-2xl font-semibold">{appointments}</p>
        </div>

        <div className="bg-white border rounded-xl p-6">
          <p className="text-sm text-neutral-500">Clienti</p>
          <p className="text-2xl font-semibold">{customers.length}</p>
        </div>

      </div>

      <div className="bg-white border rounded-xl p-6 mb-10">

        <h2 className="text-lg font-semibold mb-4">
          Marginalità servizi
        </h2>

        <table className="w-full">

          <thead className="border-b">

            <tr className="text-left text-sm text-neutral-500">

              <th className="p-2">Servizio</th>
              <th className="p-2">Prezzo</th>
              <th className="p-2">Costo prodotti</th>
              <th className="p-2">Profitto</th>
              <th className="p-2">Margine %</th>

            </tr>

          </thead>

          <tbody>

            {margins.map(s => (

              <tr key={s.service_id} className="border-b">

                <td className="p-2">{s.name}</td>
                <td className="p-2">€{s.price}</td>
                <td className="p-2">€{s.product_cost}</td>
                <td className="p-2">€{s.profit}</td>
                <td className="p-2">{s.margin}%</td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  )
}