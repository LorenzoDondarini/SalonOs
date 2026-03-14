"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import api from "../../../lib/api"

export default function ClientPage(){

  const {id} = useParams()

  const [profile,setProfile] = useState(null)

  const [notes,setNotes] = useState("")
  const [tags,setTags] = useState("")

  useEffect(()=>{

    loadProfile()

  },[id])

  async function loadProfile(){

    const res = await api.get(`/analytics/client-profile/${id}`)

    setProfile(res.data)

    setNotes(res.data.client.notes || "")
    setTags(res.data.client.tags || "")

  }

  async function saveNotes(){

    await api.put(`/clients/${id}/notes`,null,{
      params:{notes}
    })

    loadProfile()

  }

  async function saveTags(){

    await api.put(`/clients/${id}/tags`,null,{
      params:{tags}
    })

    loadProfile()

  }

  if(!profile) return <p className="p-10">Caricamento...</p>

  const client = profile.client

  return(

    <div className="p-10 space-y-10">

      <h1 className="text-3xl font-semibold">

        {client.first_name} {client.last_name}

      </h1>

      <div className="grid grid-cols-3 gap-6">

        <div className="bg-white border rounded-xl p-6">

          <p className="text-sm text-neutral-500">
            Visite
          </p>

          <p className="text-3xl font-semibold">
            {profile.visits}
          </p>

        </div>

        <div className="bg-white border rounded-xl p-6">

          <p className="text-sm text-neutral-500">
            Spesa totale
          </p>

          <p className="text-3xl font-semibold">
            €{profile.total_spent}
          </p>

        </div>

        <div className="bg-white border rounded-xl p-6">

          <p className="text-sm text-neutral-500">
            Ticket medio
          </p>

          <p className="text-3xl font-semibold">
            €{profile.avg_ticket}
          </p>

        </div>

      </div>

      <div className="bg-white border rounded-xl p-6">

        <h2 className="text-lg font-semibold mb-4">
          Note tecniche cliente
        </h2>

        <textarea
        value={notes}
        onChange={(e)=>setNotes(e.target.value)}
        className="border w-full p-3 rounded-lg h-32"
        />

        <button
        onClick={saveNotes}
        className="mt-4 bg-black text-white px-4 py-2 rounded"
        >
          Salva note
        </button>

      </div>

      <div className="bg-white border rounded-xl p-6">

        <h2 className="text-lg font-semibold mb-4">
          Tag cliente
        </h2>

        <input
        value={tags}
        onChange={(e)=>setTags(e.target.value)}
        className="border w-full p-3 rounded-lg"
        placeholder="VIP, colore, barba, extension"
        />

        <button
        onClick={saveTags}
        className="mt-4 bg-black text-white px-4 py-2 rounded"
        >
          Salva tag
        </button>

      </div>

      <div className="bg-white border rounded-xl p-6">

        <h2 className="text-lg font-semibold mb-4">
          Storico servizi
        </h2>

        <table className="w-full">

          <thead>

            <tr className="border-b text-left text-sm text-neutral-500">

              <th className="p-3">Data</th>
              <th className="p-3">Servizio</th>
              <th className="p-3">Operatore</th>

            </tr>

          </thead>

          <tbody>

            {profile.history.map(item => (

              <tr key={item.id} className="border-b">

                <td className="p-3">
                  {new Date(item.date).toLocaleDateString()}
                </td>

                <td className="p-3">
                  {item.service}
                </td>

                <td className="p-3">
                  {item.operator}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  )

}