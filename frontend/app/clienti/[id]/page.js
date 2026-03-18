"use client"

import { useEffect, useState } from "react"
import api from "@/lib/api"

export default function ClientDetail({ params }) {

  const { id } = params

  const [client,setClient] = useState(null)
  const [value,setValue] = useState(null)

  const loadClient = async () => {

    const res = await api.get(`/clienti/${id}`)

    setClient(res.data)

  }

  const loadValue = async () => {

    const res = await api.get(`/analytics/client/${id}/value`)

    setValue(res.data)

  }

  useEffect(()=>{

    loadClient()
    loadValue()

  },[])

  if(!client) return null

  return(

    <div className="p-8 space-y-6">

      <h1 className="text-2xl font-bold">
        {client.name}
      </h1>

      <div className="grid grid-cols-3 gap-4">

        <div className="bg-white p-4 rounded-xl shadow">
          <h3>Total spent</h3>
          <p>€{value?.total_revenue}</p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <h3>Visits</h3>
          <p>{value?.visits}</p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <h3>Average ticket</h3>
          <p>€{value?.average_ticket}</p>
        </div>

      </div>

    </div>

  )

}