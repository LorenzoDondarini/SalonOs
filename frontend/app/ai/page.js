"use client"

import { useEffect, useState } from "react"
import axios from "axios"

export default function AIDashboard() {

  const [forecast, setForecast] = useState(null)
  const [clientsRisk, setClientsRisk] = useState([])
  const [ghostClients, setGhostClients] = useState([])
  const [pricing, setPricing] = useState([])
  const [slots, setSlots] = useState([])

  useEffect(() => {

    axios
      .get("http://localhost:8000/ai/forecast/1")
      .then(res => setForecast(res.data.forecast_next_week))

    axios
      .get("http://localhost:8000/ai/clients-risk/1")
      .then(res => setClientsRisk(res.data))

    axios
      .get("http://localhost:8000/ai/ghost-clients/1")
      .then(res => setGhostClients(res.data))

    axios
      .get("http://localhost:8000/ai/pricing/1")
      .then(res => setPricing(res.data))

    axios
      .get("http://localhost:8000/ai/free-slots/1")
      .then(res => setSlots(res.data.suggested_slots))

  }, [])

  return (
    <div className="p-10">

      <h1 className="text-3xl font-semibold mb-8">
        AI Business
      </h1>

      <div className="grid grid-cols-4 gap-6 mb-10">

        <div className="bg-white border rounded-xl p-6">
          <p className="text-sm text-neutral-500">
            Previsione fatturato
          </p>
          <p className="text-2xl font-semibold">
            €{forecast || 0}
          </p>
        </div>

        <div className="bg-white border rounded-xl p-6">
          <p className="text-sm text-neutral-500">
            Clienti a rischio
          </p>
          <p className="text-2xl font-semibold">
            {clientsRisk.length}
          </p>
        </div>

        <div className="bg-white border rounded-xl p-6">
          <p className="text-sm text-neutral-500">
            Clienti fantasma
          </p>
          <p className="text-2xl font-semibold">
            {ghostClients.length}
          </p>
        </div>

        <div className="bg-white border rounded-xl p-6">
          <p className="text-sm text-neutral-500">
            Servizi da aumentare
          </p>
          <p className="text-2xl font-semibold">
            {pricing.length}
          </p>
        </div>

      </div>

      <div className="bg-white border rounded-xl p-6 mb-6">

        <h2 className="font-semibold mb-4">
          Slot liberi oggi
        </h2>

        <div className="flex flex-wrap gap-2">

          {slots.map((s,i) => (

            <span
              key={i}
              className="bg-neutral-100 px-3 py-1 rounded-lg text-sm"
            >
              {s}
            </span>

          ))}

        </div>

      </div>

      <div className="bg-white border rounded-xl p-6 mb-6">

        <h2 className="font-semibold mb-4">
          Clienti fantasma
        </h2>

        {ghostClients.map(c => (

          <p key={c.client_id}>
            {c.name}
          </p>

        ))}

      </div>

      <div className="bg-white border rounded-xl p-6">

        <h2 className="font-semibold mb-4">
          Suggerimenti prezzi
        </h2>

        {pricing.map((p, i) => (

          <div key={i} className="flex justify-between">

            <span>{p.service}</span>

            <span>
              €{p.current_price} → €{p.suggested_price}
            </span>

          </div>

        ))}

      </div>

    </div>
  )
}