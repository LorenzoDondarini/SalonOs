"use client"

import { Calendar, momentLocalizer } from "react-big-calendar"
import moment from "moment"

import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop"

import "react-big-calendar/lib/addons/dragAndDrop/styles.css"

const localizer = momentLocalizer(moment)

const DnDCalendar = withDragAndDrop(Calendar)

export default function DragCalendar({ events, onMove }) {

  return (

    <DnDCalendar
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
      onEventDrop={onMove}
      resizable
      style={{ height: "100%" }}
    />

  )

}