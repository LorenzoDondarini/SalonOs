"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import api from "@/lib/api"

export default function ClientePage() {

  const { id } = useParams()

  const [cliente, setCliente] = useState(null)
  const [appointments, setAppointments] = useState([])
  const [customerValue, setCustomerValue] = useState(null)

  useEffect(() => {
    loadCliente()
    loadAppointments()
    loadCustomerValue()
  }, [])

  const loadCliente = async () => {
    try {
      const res = await api.get(`/clienti/${id}`)
      setCliente(res.data)
    } catch (err) {
      console.error(err)
    }
  }

  const loadAppointments = async () => {
    try {
      const res = await api.get(`/agenda/client/${id}`)
      setAppointments(res.data)
    } catch (err) {
      console.error(err)
    }
  }

  const loadCustomerValue = async () => {
    try {
      const res = await api.get(`/analytics/client/${id}/value`)
      setCustomerValue(res.data)
    } catch (err) {
      console.error(err)
    }
  }

  if (!cliente) {
    return <div className="p-6">Caricamento cliente...</div>
  }

  return (
    <div className="p-6 space-y-6">

      {/* HEADER CLIENTE */}
      <div className="bg-white p-6 rounded-xl shadow">

        <h1 className="text-2xl font-semibold">{cliente.nome}</h1>

        <p className="text-gray-500">{cliente.telefono}</p>

        {cliente.note && (
          <p className="mt-2 text-sm text-gray-600">{cliente.note}</p>
        )}

      </div>

      {/* CUSTOMER VALUE */}
      <div className="bg-white p-6 rounded-xl shadow">

        <h2 className="text-lg font-semibold mb-4">
          Customer Value
        </h2>

        <div className="grid grid-cols-3 gap-4">

          <div>
            <p className="text-sm text-gray-500">
              Totale speso
            </p>

            <p className="text-xl font-semibold">
              €{customerValue?.total_revenue ?? 0}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Visite
            </p>

            <p className="text-xl font-semibold">
              {customerValue?.visits ?? 0}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Ticket medio
            </p>

            <p className="text-xl font-semibold">
              €{customerValue?.average_ticket ?? 0}
            </p>
          </div>

        </div>

      </div>

      {/* STORICO APPUNTAMENTI */}
      <div className="bg-white p-6 rounded-xl shadow">

        <h2 className="text-lg font-semibold mb-4">
          Storico Appuntamenti
        </h2>

        {appointments.length === 0 && (
          <p className="text-gray-500">
            Nessun appuntamento trovato
          </p>
        )}

        <div className="space-y-3">

          {appointments.map((a) => (

            <div
              key={a.id}
              className="border rounded-lg p-3 flex justify-between"
            >

              <div>

                <p className="font-medium">
                  {a.service_name}
                </p>

                <p className="text-sm text-gray-500">
                  {a.start_time}
                </p>

              </div>

              <div className="text-right">

                <p className="text-sm text-gray-500">
                  Operatore
                </p>

                <p className="font-medium">
                  {a.team_member}
                </p>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  )
}