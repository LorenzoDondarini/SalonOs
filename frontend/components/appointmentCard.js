"use client"

export default function AppointmentCard({ appointment }) {

  return (
    <div className="bg-white border border-neutral-200 rounded-lg p-4 shadow-sm">

      <p className="text-sm text-neutral-500 mb-1">
        {new Date(appointment.start_time).toLocaleTimeString()}
      </p>

      <p className="font-medium">
        Cliente #{appointment.client_id}
      </p>

      <p className="text-sm text-neutral-500">
        Operatore #{appointment.user_id}
      </p>

    </div>
  )
}