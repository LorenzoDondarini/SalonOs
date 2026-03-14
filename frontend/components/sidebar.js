"use client"

import Link from "next/link"
import { Calendar, Users, BarChart3, Package, Scissors, LineChart, Megaphone } from "lucide-react"

export default function Sidebar() {

  const menu = [
    {
      name: "Dashboard",
      path: "/",
      icon: BarChart3
    },
    {
      name: "Agenda",
      path: "/agenda",
      icon: Calendar
    },
    {
      name: "Clienti",
      path: "/clienti",
      icon: Users
    },
    {
      name: "Servizi",
      path: "/servizi",
      icon: Scissors
    },
    {
      name: "Magazzino",
      path: "/magazzino",
      icon: Package
    },
    {
      name: "Analytics",
      path: "/analytics",
      icon: LineChart
    },
    {
      name: "Marketing",
      path: "/marketing",
      icon: Megaphone
    }
  ]

  return (
    <div className="w-64 h-screen bg-white border-r border-neutral-200 p-6">

      <h2 className="text-xl font-semibold mb-8">
        SalonOS
      </h2>

      <nav className="space-y-3">

        {menu.map((item, i) => {

          const Icon = item.icon

          return (
            <Link
              key={i}
              href={item.path}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-neutral-100"
            >
              <Icon size={18} />
              {item.name}
            </Link>
          )
        })}

      </nav>

    </div>
  )
}