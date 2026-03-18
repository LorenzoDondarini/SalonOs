"use client"

import Sidebar from "./sidebar"

export default function Layout({ children }) {

  return (

    <div>

      {/* 🔴 TEST */}
      <h1 style={{ color: "red" }}>LAYOUT ATTIVO</h1>

      <div className="flex h-screen bg-neutral-100">

        {/* SIDEBAR */}
        <Sidebar />

        {/* MAIN */}
        <div className="flex-1 flex flex-col">

          <div className="h-16 bg-white border-b flex items-center px-6">
            <h1 className="text-lg font-semibold">
              SalonOS
            </h1>
          </div>

          <div className="flex-1 overflow-y-auto p-8">
            {children}
          </div>

        </div>

      </div>

    </div>

  )

}