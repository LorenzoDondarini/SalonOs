"use client"

export default function AppointmentCard({ appointment }) {

  const handleDragStart = (e) => {

    e.dataTransfer.setData("appointmentId", appointment.id)

  }

  return (

    <div
      draggable
      onDragStart={handleDragStart}
      className="bg-blue-500 text-white p-2 rounded text-sm cursor-move"
    >
      {appointment.client_name || "Cliente"}
    </div>

  )

}