"use client"

import { useEffect, useState } from "react"
import api from "@/lib/api"
import RevenueChart from "@/components/revenueChart"
import AppointmentsChart from "@/components/appointmentsChart"

export default function AnalyticsPage() {

  const [dashboard, setDashboard] = useState(null)
  const [segments, setSegments] = useState(null)
  const [advisor, setAdvisor] = useState([])

  const loadDashboard = async () => {

    try {

      const res = await api.get("/analytics/dashboard")
      setDashboard(res.data)

    } catch (err) {

      console.error(err)

    }

  }

  const loadSegments = async () => {

    try {

      const res = await api.get("/analytics/client-segments")
      setSegments(res.data)

    } catch (err) {

      console.error(err)

    }

  }

  const loadAdvisor = async () => {

    try {

      const res = await api.get("/analytics/advisor")
      setAdvisor(res.data.advice)

    } catch (err) {

      console.error(err)

    }

  }

  useEffect(() => {

    loadDashboard()
    loadSegments()
    loadAdvisor()

  }, [])

  return (

    <div className="p-8 space-y-8">

      <h1 className="text-3xl font-bold">
        Analytics Dashboard
      </h1>

      {/* KPI */}

      <div className="grid grid-cols-4 gap-6">

        <Card title="Revenue" value={`€${dashboard?.revenue ?? 0}`} />
        <Card title="Appointments" value={dashboard?.appointments ?? 0} />
        <Card title="Clients" value={dashboard?.clients ?? 0} />
        <Card title="Avg Ticket" value={`€${dashboard?.average_ticket ?? 0}`} />

      </div>

      {/* AI ADVISOR */}

      <div className="bg-white rounded-xl shadow p-6">

        <h2 className="text-lg font-semibold mb-4">
          AI Insights
        </h2>

        <div className="space-y-3">

          {advisor.map((a, i) => (

            <div
              key={i}
              className={`p-3 rounded-lg text-sm ${
                a.type === "warning"
                  ? "bg-red-100 text-red-700"
                  : a.type === "insight"
                  ? "bg-blue-100 text-blue-700"
                  : "bg-gray-100"
              }`}
            >
              {a.message}
            </div>

          ))}

        </div>

      </div>

      {/* SEGMENTS */}

      <div className="grid grid-cols-4 gap-6">

        <Card title="VIP" value={segments?.vip?.length ?? 0} />
        <Card title="Regular" value={segments?.regular?.length ?? 0} />
        <Card title="At Risk" value={segments?.at_risk?.length ?? 0} />
        <Card title="Inactive" value={segments?.inactive?.length ?? 0} />

      </div>

      {/* CHARTS */}

      <div className="grid grid-cols-2 gap-6">

        <ChartCard title="Revenue">
          <RevenueChart />
        </ChartCard>

        <ChartCard title="Appointments">
          <AppointmentsChart />
        </ChartCard>

      </div>

    </div>
  )
}

/* COMPONENTI INTERNI */

function Card({ title, value }) {

  return (

    <div className="bg-white p-6 rounded-xl shadow">

      <h3 className="text-gray-500 text-sm">
        {title}
      </h3>

      <p className="text-2xl font-bold mt-2">
        {value}
      </p>

    </div>

  )
}

function ChartCard({ title, children }) {

  return (

    <div className="bg-white p-6 rounded-xl shadow">

      <h3 className="text-lg font-semibold mb-4">
        {title}
      </h3>

      {children}

    </div>

  )
}