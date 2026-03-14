"use client"

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"

export default function RevenueChart({ data }) {

  return (

    <div className="bg-white border rounded-xl p-6 h-[300px]">

      <h2 className="text-lg font-semibold mb-4">
        Fatturato settimanale
      </h2>

      <ResponsiveContainer width="100%" height="100%">

        <LineChart data={data}>

          <XAxis dataKey="day" />

          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#000"
            strokeWidth={3}
          />

        </LineChart>

      </ResponsiveContainer>

    </div>

  )

}