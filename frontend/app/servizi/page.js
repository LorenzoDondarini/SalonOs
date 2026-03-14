"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import ServiceCard from "../../components/serviceCard"

export default function ServiziPage() {

  const [services, setServices] = useState([])

  useEffect(() => {

    axios
      .get("http://localhost:8000/services/salon/1")
      .then(res => {
        setServices(res.data)
      })

  }, [])

  return (
    <div className="p-10">

      <h1 className="text-3xl font-semibold mb-8">
        Servizi
      </h1>

      <div className="grid grid-cols-3 gap-4">

        {services.map(service => (
          <ServiceCard
            key={service.id}
            service={service}
          />
        ))}

      </div>

    </div>
  )
}