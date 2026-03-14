"use client"

import { useEffect, useState } from "react"
import api from "@/lib/api"
import AppointmentCard from "./appointmentCard"

export default function SalonAgendaBoard() {

  const [appointments, setAppointments] = useState([])
  const [team, setTeam] = useState([])

  const hours = [
    "09:00","10:00","11:00","12:00",
    "13:00","14:00","15:00","16:00",
    "17:00","18:00","19:00"
  ]

  const loadAgenda = async () => {
    try {

      const res = await api.get("/agenda")
      setAppointments(res.data)

    } catch (err) {

      console.error("Agenda load error", err)

    }
  }

  const loadTeam = async () => {

    try {

      const res = await api.get("/team")
      setTeam(res.data)

    } catch (err) {

      console.error("Team load error", err)

    }

  }

  useEffect(() => {

    loadAgenda()
    loadTeam()

  }, [])

  const handleDrop = async (e, operatorId, hour) => {

    const appointmentId = e.dataTransfer.getData("appointmentId")

    try {

      await api.put(`/agenda/${appointmentId}`, {
        operator_id: operatorId,
        hour: hour
      })

      loadAgenda()

    } catch (err) {

      console.error("Update appointment error", err)

    }

  }

  const allowDrop = (e) => {
    e.preventDefault()
  }

  return (

    <div className="overflow-x-auto">

      <div className="grid grid-cols-[100px_repeat(auto-fit,minmax(220px,1fr))]">

        {/* HOURS COLUMN */}

        <div className="border-r">

          {hours.map((h) => (

            <div
              key={h}
              className="h-24 border-b flex items-start pt-2 pl-2 text-gray-400 text-sm"
            >
              {h}
            </div>

          ))}

        </div>

        {/* TEAM COLUMNS */}

        {team.map((operator) => (

          <div key={operator.id} className="border-r">

            <div className="h-12 flex items-center justify-center font-semibold border-b bg-gray-50">

              {operator.name}

            </div>

            {hours.map((hour) => {

              const slotAppointments = appointments.filter((a) => {

                const apHour = a.start_time?.slice(11, 16)

                return (
                  a.operator_id === operator.id &&
                  apHour === hour
                )

              })

              return (

                <div
                  key={hour}
                  onDrop={(e) => handleDrop(e, operator.id, hour)}
                  onDragOver={allowDrop}
                  className="h-24 border-b p-1"
                >

                  {slotAppointments.map((ap) => (

                    <AppointmentCard
                      key={ap.id}
                      appointment={ap}
                    />

                  ))}

                </div>

              )

            })}

          </div>

        ))}

      </div>

    </div>

  )

}