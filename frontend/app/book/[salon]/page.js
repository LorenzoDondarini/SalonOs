"use client"

import { useEffect,useState } from "react"
import { useParams } from "next/navigation"
import api from "../../../lib/api"

export default function BookingPage(){

  const {salon} = useParams()

  const [services,setServices] = useState([])

  const [name,setName] = useState("")
  const [phone,setPhone] = useState("")
  const [serviceId,setServiceId] = useState("")

  useEffect(()=>{

    loadServices()

  },[])

  async function loadServices(){

    const res = await api.get(`/services/salon/${salon}`)

    setServices(res.data)

  }

  async function createBooking(){

    const client = await api.post("/clients/",{

      first_name:name,
      last_name:"",
      phone,
      salon_id:parseInt(salon)

    })

    const now = new Date()

    const end = new Date(now.getTime()+30*60000)

    await api.post("/appointments/",{

      salon_id:parseInt(salon),
      client_id:client.data.id,
      user_id:1,
      service_id:parseInt(serviceId),
      start_time:now,
      end_time:end

    })

    alert("Prenotazione confermata!")

  }

  return(

    <div className="max-w-xl mx-auto p-10 space-y-6">

      <h1 className="text-3xl font-semibold">
        Prenota appuntamento
      </h1>

      <input
      placeholder="Nome"
      value={name}
      onChange={(e)=>setName(e.target.value)}
      className="border p-3 w-full rounded"
      />

      <input
      placeholder="Telefono"
      value={phone}
      onChange={(e)=>setPhone(e.target.value)}
      className="border p-3 w-full rounded"
      />

      <select
      value={serviceId}
      onChange={(e)=>setServiceId(e.target.value)}
      className="border p-3 w-full rounded"
      >

        <option value="">
          Seleziona servizio
        </option>

        {services.map(s=>(

          <option key={s.id} value={s.id}>
            {s.name}
          </option>

        ))}

      </select>

      <button
      onClick={createBooking}
      className="bg-black text-white w-full py-3 rounded"
      >
        Prenota
      </button>

    </div>

  )

}