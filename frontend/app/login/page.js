"use client"

import {useState} from "react"
import api from "../../lib/api"

export default function Login(){

  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")

  async function login(){

    const res = await api.post("/auth/login",{

      email,
      password

    })

    localStorage.setItem("token",res.data.token)

    window.location="/"

  }

  return(

    <div className="h-screen flex items-center justify-center bg-neutral-100">

      <div className="bg-white p-8 rounded-xl w-96 space-y-4">

        <h1 className="text-xl font-semibold">
          Login SalonOS
        </h1>

        <input
        placeholder="Email"
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
        className="border p-2 w-full"
        />

        <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
        className="border p-2 w-full"
        />

        <button
        onClick={login}
        className="bg-black text-white w-full py-2 rounded"
        >
          Login
        </button>

      </div>

    </div>

  )

}