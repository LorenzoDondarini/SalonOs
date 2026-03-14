"use client"

export default function AppointmentHistory({ appointments }) {

  return (
    <div className="bg-white border rounded-xl p-6">

      <h2 className="text-lg font-semibold mb-4">
        Storico appuntamenti
      </h2>

      <table className="w-full">

        <thead className="border-b">

          <tr className="text-left text-sm text-neutral-500">

            <th className="p-2">Data</th>
            <th className="p-2">Servizio</th>
            <th className="p-2">Operatore</th>
            <th className="p-2">Stato</th>

          </tr>

        </thead>

        <tbody>

          {appointments.map(a => (

            <tr key={a.id} className="border-b">

              <td className="p-2">
                {new Date(a.start_time).toLocaleDateString()}
              </td>

              <td className="p-2">
                {a.service_id}
              </td>

              <td className="p-2">
                {a.user_id}
              </td>

              <td className="p-2">
                {a.status}
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  )
}