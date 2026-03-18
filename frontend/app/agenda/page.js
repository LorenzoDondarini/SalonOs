"use client"

import { useEffect, useState } from "react"
import api from "@/lib/api"
import SalonAgendaBoard from "@/components/salonAgendaBoard"

export default function AgendaPage() {

  const [suggestedSlots, setSuggestedSlots] = useState([])

  const loadSuggestions = async () => {

    const res = await api.get("/ai/suggest-slots?duration=30")
    setSuggestedSlots(res.data.suggested_slots)

  }

  useEffect(() => {
    loadSuggestions()
  }, [])

  return (

    <div className="space-y-6">

      <h1 className="text-3xl font-semibold">
        Agenda
      </h1>

      {/* SLOT AI */}

      <div className="bg-white p-4 rounded-xl border shadow-sm">

        <h2 className="text-sm text-neutral-500 mb-3">
          Slot suggeriti (AI)
        </h2>

        <div className="flex gap-2 flex-wrap">

          {suggestedSlots.map((slot, i) => (

            <button
              key={i}
              className="px-3 py-1 bg-neutral-100 hover:bg-neutral-200 rounded-lg text-sm"
            >
              {new Date(slot.start).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit"
              })}
            </button>

          ))}

        </div>

      </div>

      {/* AGENDA */}

      <SalonAgendaBoard />

    </div>

  )

}