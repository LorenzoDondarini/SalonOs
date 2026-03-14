"use client"

import { useEffect, useState } from "react"
import api from "../../lib/api"

export default function MarketingPage() {
  const [recover, setRecover] = useState([])
  const [reminders, setReminders] = useState([])

  useEffect(() => {
    loadData()
  }, [])

  async function loadData() {
    const [r, m] = await Promise.all([
      api.get("/marketing/recover/1"),
      api.get("/marketing/reminders/1")
    ])

    setRecover(r.data)
    setReminders(m.data)
  }

  function copyText(text) {
    navigator.clipboard.writeText(text)
    alert("Messaggio copiato")
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold mb-2">
          Marketing clienti
        </h1>
        <p className="text-neutral-500">
          Promemoria pronti e clienti da recuperare
        </p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white border rounded-2xl p-6">
          <p className="text-sm text-neutral-500 mb-2">
            Promemoria da inviare
          </p>
          <p className="text-3xl font-semibold">
            {reminders.length}
          </p>
        </div>

        <div className="bg-white border rounded-2xl p-6">
          <p className="text-sm text-neutral-500 mb-2">
            Clienti da recuperare
          </p>
          <p className="text-3xl font-semibold">
            {recover.length}
          </p>
        </div>
      </div>

      <div className="bg-white border rounded-2xl p-6">
        <h2 className="text-lg font-semibold mb-4">
          Promemoria appuntamenti
        </h2>

        <div className="space-y-4">
          {reminders.map(item => (
            <div key={item.appointment_id} className="border rounded-xl p-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-medium">
                    {item.client_name}
                  </p>
                  <p className="text-sm text-neutral-500">
                    {item.phone || "Telefono non disponibile"}
                  </p>
                  <p className="text-sm text-neutral-500">
                    {new Date(item.time).toLocaleString()}
                  </p>
                  <p className="mt-3 text-sm">
                    {item.message}
                  </p>
                </div>

                <button
                  onClick={() => copyText(item.message)}
                  className="px-4 py-2 rounded-xl border hover:bg-neutral-50"
                >
                  Copia
                </button>
              </div>
            </div>
          ))}

          {reminders.length === 0 && (
            <p className="text-neutral-500">
              Nessun promemoria nelle prossime 24 ore.
            </p>
          )}
        </div>
      </div>

      <div className="bg-white border rounded-2xl p-6">
        <h2 className="text-lg font-semibold mb-4">
          Clienti da recuperare
        </h2>

        <div className="space-y-4">
          {recover.map(item => (
            <div key={item.id} className="border rounded-xl p-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-medium">
                    {item.name}
                  </p>
                  <p className="text-sm text-neutral-500">
                    {item.phone || "Telefono non disponibile"}
                  </p>
                  <p className="text-sm text-neutral-500">
                    Ultima visita: {new Date(item.last_visit).toLocaleDateString()}
                  </p>
                  <p className="mt-3 text-sm">
                    {item.message}
                  </p>
                </div>

                <button
                  onClick={() => copyText(item.message)}
                  className="px-4 py-2 rounded-xl border hover:bg-neutral-50"
                >
                  Copia
                </button>
              </div>
            </div>
          ))}

          {recover.length === 0 && (
            <p className="text-neutral-500">
              Nessun cliente da recuperare.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}