"use client"

import {useEffect,useState} from "react"
import api from "../../lib/api"

export default function CassaPage(){

  const [payments,setPayments] = useState([])

  useEffect(()=>{

    loadPayments()

  },[])

  async function loadPayments(){

    const res = await api.get("/payments/")

    setPayments(res.data)

  }

  return(

    <div>

      <h1 className="text-3xl font-semibold mb-6">
        Cassa
      </h1>

      <div className="bg-white border rounded-xl">

        {payments.map(p=>(

          <div key={p.id} className="border-b p-4">

            €{p.amount}

          </div>

        ))}

      </div>

    </div>

  )

}