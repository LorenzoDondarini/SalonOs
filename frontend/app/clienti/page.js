"use client"

import { useEffect, useState } from "react"
import api from "@/lib/api"

export default function ClientPage(){

  const [clients, setClients] = useState([])

  const loadClients = async () => {

    try {

      const res = await api.get("/clienti")
      setClients(res.data)

    } catch (err) {

      console.error(err)

    }

  }

  useEffect(() => {
    loadClients()
  }, [])

  return (

    <div className="space-y-6">

      <h1 className="text-2xl font-semibold">
        Clienti
      </h1>

      <div className="grid gap-4">

        {clients.map(c => (

          <div
            key={c.id}
            className="bg-white p-4 rounded-xl shadow-sm border"
          >
            <p className="font-medium">
              {c.first_name} {c.last_name}
            </p>

            <p className="text-sm text-neutral-500">
              {c.phone}
            </p>
          </div>

        ))}

      </div>

    </div>

  )

}