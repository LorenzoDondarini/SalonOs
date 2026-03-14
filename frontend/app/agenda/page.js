"use client"

import {Calendar, dateFnsLocalizer} from "react-big-calendar"
import {format, parse, startOfWeek, getDay} from "date-fns"
import it from "date-fns/locale/it"
import "react-big-calendar/lib/css/react-big-calendar.css"

import {useEffect,useState} from "react"
import api from "../../lib/api"

const locales = { it }

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales
})

export default function AgendaPage(){

  const [events,setEvents] = useState([])

  useEffect(()=>{

    loadAppointments()

  },[])

  async function loadAppointments(){

    const res = await api.get("/appointments/salon/1")

    const data = res.data.map(a=>({

      title: `Cliente ${a.client_id}`,
      start: new Date(a.start_time),
      end: new Date(a.end_time)

    }))

    setEvents(data)

  }

  return(

    <div>

      <h1 className="text-3xl font-semibold mb-6">
        Agenda
      </h1>

      <div style={{height:"80vh"}}>

        <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        views={["week","day"]}
        defaultView="week"
        />

      </div>

    </div>

  )

}