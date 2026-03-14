"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import axios from "axios"
import AppointmentHistory from "../../../components/appointmentHistory"

export default function ClientDetailPage() {

  const { id } = useParams()

  const [client, setClient] = useState(null)
  const [appointments, setAppointments] = useState([])

  useEffect(() => {

    axios
      .get(`http://localhost:8000/clients/${id}`)
      .then(res => setClient(res.data))

    axios
      .get(`http://localhost:8000/appointments/client/${id}`)
      .then(res => setAppointments(res.data))

  }, [id])

  if (!client) return <p className="p-10">Caricamento...</p>

  return (
    <div className="p-10">

      <h1 className="text-3xl font-semibold mb-8">
        {client.first_name} {client.last_name}
      </h1>

      <div className="grid grid-cols-3 gap-6 mb-10">

        <div className="bg-white border rounded-xl p-6">

          <p className="text-sm text-neutral-500">
            Telefono
          </p>

          <p className="font-medium">
            {client.phone || "Non disponibile"}
          </p>

        </div>

        <div className="bg-white border rounded-xl p-6">

          <p className="text-sm text-neutral-500">
            Email
          </p>

          <p className="font-medium">
            {client.email || "Non disponibile"}
          </p>

        </div>

        <div className="bg-white border rounded-xl p-6">

          <p className="text-sm text-neutral-500">
            Note
          </p>

          <p className="font-medium">
            {client.notes || "Nessuna nota"}
          </p>

        </div>

      </div>

      <AppointmentHistory appointments={appointments} />

    </div>
  )
}