"use client"

import { useEffect, useState } from "react"
import api from "../lib/api"

export default function Dashboard() {
  const [revenue, setRevenue] = useState(0)
  const [appointments, setAppointments] = useState(0)
  const [clients, setClients] = useState(0)
  const [recover, setRecover] = useState(0)

  useEffect(() => {
    loadData()
  }, [])

  async function loadData() {
    const [r, a, c, rc] = await Promise.all([
      api.get("/analytics/revenue/1"),
      api.get("/analytics/appointments/1"),
      api.get("/clients/salon/1"),
      api.get("/marketing/recover/1")
    ])

    setRevenue(r.data.total_revenue)
    setAppointments(a.data.appointments)
    setClients(c.data.length)
    setRecover(rc.data.length)
  }

  return (
    <div>
      <h1 className="text-3xl font-semibold mb-8">
        Dashboard
      </h1>

      <div className="grid grid-cols-4 gap-6">
        <div className="bg-white border rounded-2xl p-6">
          <p className="text-sm text-neutral-500">
            Fatturato
          </p>
          <p className="text-3xl font-semibold">
            €{revenue}
          </p>
        </div>

        <div className="bg-white border rounded-2xl p-6">
          <p className="text-sm text-neutral-500">
            Appuntamenti
          </p>
          <p className="text-3xl font-semibold">
            {appointments}
          </p>
        </div>

        <div className="bg-white border rounded-2xl p-6">
          <p className="text-sm text-neutral-500">
            Clienti
          </p>
          <p className="text-3xl font-semibold">
            {clients}
          </p>
        </div>

        <div className="bg-white border rounded-2xl p-6">
          <p className="text-sm text-neutral-500">
            Da recuperare
          </p>
          <p className="text-3xl font-semibold">
            {recover}
          </p>
        </div>
      </div>
    </div>
  )
}