"use client"

import Link from "next/link"

export default function Layout({children}){

  const menu=[

    {name:"Dashboard",path:"/"},
    {name:"Agenda",path:"/agenda"},
    {name:"Agenda settimana",path:"/agenda/week"},
    {name:"Clienti",path:"/clienti"},
    {name:"Servizi",path:"/servizi"},
    {name:"Magazzino",path:"/magazzino"},
    {name:"Cassa",path:"/cassa"},
    {name:"Marketing",path:"/marketing"}

  ]

  return(

    <div className="flex h-screen bg-neutral-100">

      <div className="w-64 bg-white border-r">

        <div className="p-6 border-b">

          <h1 className="text-xl font-semibold">
            SalonOS
          </h1>

        </div>

        <div className="p-4 space-y-2">

          {menu.map(item=>(

            <Link
            key={item.path}
            href={item.path}
            className="block px-4 py-2 rounded-lg hover:bg-neutral-100"
            >

              {item.name}

            </Link>

          ))}

        </div>

      </div>

      <div className="flex-1 overflow-auto">

        <div className="p-10">

          {children}

        </div>

      </div>

    </div>

  )

}