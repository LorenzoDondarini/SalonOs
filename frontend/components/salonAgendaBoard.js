"use client"

import { useEffect, useState } from "react"
import api from "@/lib/api"

export default function SalonAgendaBoard() {

  const [appointments, setAppointments] = useState([])
  const [team, setTeam] = useState([])

  const startHour = 9
  const endHour = 19
  const hourHeight = 70
  const totalHours = endHour - startHour

  const loadData = async () => {

    const ap = await api.get("/agenda")
    const tm = await api.get("/team")

    setAppointments(ap.data)
    setTeam(tm.data)

  }

  useEffect(() => {
    loadData()
  }, [])

  const renderAppointments = (operatorId) => {

    return appointments
      .filter(a => a.operator_id === operatorId)
      .map(ap => {

        const date = new Date(ap.start_time)

        const hour = date.getHours()
        const minutes = date.getMinutes()

        const top =
          ((hour - startHour) * hourHeight) +
          (minutes / 60) * hourHeight

        const height = (ap.duration_minutes || 30) / 60 * hourHeight

        return (

          <div
            key={ap.id}
            draggable
            onDragStart={(e) =>
              e.dataTransfer.setData("appointmentId", ap.id)
            }
            className="absolute left-2 right-2 bg-blue-500 text-white rounded-lg p-2 text-xs shadow cursor-move"
            style={{
              top,
              height
            }}
          >

            <p className="font-medium truncate">
              {ap.client_name || "Cliente"}
            </p>

            <p className="opacity-70 truncate">
              {ap.service_name || ""}
            </p>

          </div>

        )

      })

  }

  return (

    <div className="bg-white rounded-xl border shadow-sm overflow-hidden">

      <div className="grid grid-cols-[80px_repeat(auto-fit,minmax(200px,1fr))]">

        {/* ORARI */}
        <div className="bg-neutral-50 border-r">

          {Array.from({ length: totalHours }).map((_, i) => {

            const hour = startHour + i

            return (

              <div
                key={hour}
                className="text-xs text-neutral-400 flex items-start justify-end pr-2 pt-1 border-b"
                style={{ height: hourHeight }}
              >
                {hour}:00
              </div>

            )

          })}

        </div>

        {/* OPERATORI */}
        {team.map(op => (

          <div key={op.id} className="border-r last:border-r-0">

            <div className="h-10 flex items-center justify-center font-medium border-b bg-white">
              {op.name}
            </div>

            <div
              className="relative bg-neutral-50"
              style={{ height: totalHours * hourHeight }}
            >

              {Array.from({ length: totalHours }).map((_, i) => (

                <div
                  key={i}
                  className="border-b border-neutral-200"
                  style={{ height: hourHeight }}
                />

              ))}

              {renderAppointments(op.id)}

            </div>

          </div>

        ))}

      </div>

    </div>

  )

}