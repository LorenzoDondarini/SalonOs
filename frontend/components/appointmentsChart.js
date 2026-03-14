"use client"

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"

export default function AppointmentsChart({ data }) {

  return (

    <div className="bg-white border rounded-xl p-6 h-[300px]">

      <h2 className="text-lg font-semibold mb-4">
        Appuntamenti settimana
      </h2>

      <ResponsiveContainer width="100%" height="100%">

        <BarChart data={data}>

          <XAxis dataKey="day" />

          <YAxis />

          <Tooltip />

          <Bar dataKey="appointments" fill="#000" />

        </BarChart>

      </ResponsiveContainer>

    </div>

  )

}