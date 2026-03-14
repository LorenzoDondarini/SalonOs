"use client"

import { useEffect, useState } from "react"
import api from "../../../lib/api"

export default function WeekAgenda(){

  const [appointments,setAppointments] = useState([])

  useEffect(()=>{

    load()

  },[])

  async function load(){

    const res = await api.get("/appointments/salon/1")

    setAppointments(res.data)

  }

  return(

    <div>

      <h1 className="text-3xl font-semibold mb-6">
        Agenda settimanale
      </h1>

      <div className="grid grid-cols-7 gap-4">

        {["Lun","Mar","Mer","Gio","Ven","Sab","Dom"].map(day=>(

          <div key={day} className="bg-white border rounded-xl p-4">

            <p className="font-medium mb-3">
              {day}
            </p>

            {appointments.map(a=>(

              <div key={a.id} className="border p-2 mb-2 rounded text-sm">

                Cliente {a.client_id}

              </div>

            ))}

          </div>

        ))}

      </div>

    </div>

  )

}