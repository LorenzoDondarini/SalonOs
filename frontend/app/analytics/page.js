"use client"

import { useEffect, useState } from "react"
import api from "@/lib/api"
import RevenueChart from "@/components/revenueChart"
import AppointmentsChart from "@/components/appointmentsChart"

export default function AnalyticsPage() {

  const [dashboard, setDashboard] = useState(null)
  const [segments, setSegments] = useState(null)

  const loadDashboard = async () => {
    try {
      const res = await api.get("/analytics/dashboard")
      setDashboard(res.data)
    } catch (err) {
      console.error("Dashboard error", err)
    }
  }

  const loadSegments = async () => {
    try {
      const res = await api.get("/analytics/client-segments")
      setSegments(res.data)
    } catch (err) {
      console.error("Segments error", err)
    }
  }

  useEffect(() => {
    loadDashboard()
    loadSegments()
  }, [])

  return (
    <div className="p-8 space-y-8">

      <h1 className="text-3xl font-bold">Analytics</h1>

      {/* KPI DASHBOARD */}

      <div className="grid grid-cols-4 gap-6">

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-gray-500 text-sm">Revenue</h3>
          <p className="text-2xl font-bold">
            €{dashboard?.revenue ?? 0}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-gray-500 text-sm">Appointments</h3>
          <p className="text-2xl font-bold">
            {dashboard?.appointments ?? 0}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-gray-500 text-sm">Clients</h3>
          <p className="text-2xl font-bold">
            {dashboard?.clients ?? 0}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-gray-500 text-sm">Average Ticket</h3>
          <p className="text-2xl font-bold">
            €{dashboard?.average_ticket ?? 0}
          </p>
        </div>

      </div>

      {/* CLIENT SEGMENTS */}

      <div>

        <h2 className="text-xl font-semibold mb-4">
          Client Segments
        </h2>

        <div className="grid grid-cols-4 gap-6">

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-gray-500 text-sm">VIP</h3>
            <p className="text-2xl font-bold">
              {segments?.vip?.length ?? 0}
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-gray-500 text-sm">Regular</h3>
            <p className="text-2xl font-bold">
              {segments?.regular?.length ?? 0}
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-gray-500 text-sm">At Risk</h3>
            <p className="text-2xl font-bold">
              {segments?.at_risk?.length ?? 0}
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-gray-500 text-sm">Inactive</h3>
            <p className="text-2xl font-bold">
              {segments?.inactive?.length ?? 0}
            </p>
          </div>

        </div>

      </div>

      {/* CHARTS */}

      <div className="grid grid-cols-2 gap-6">

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-lg font-semibold mb-4">
            Revenue Trend
          </h3>
          <RevenueChart />
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-lg font-semibold mb-4">
            Appointments
          </h3>
          <AppointmentsChart />
        </div>

      </div>

    </div>
  )
}