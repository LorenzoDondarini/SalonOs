"use client"

export default function ClientCard({ client }) {

  return (
    <div className="bg-white border border-neutral-200 rounded-xl p-5 shadow-sm hover:shadow-md transition">

      <p className="font-semibold text-lg">
        {client.first_name} {client.last_name}
      </p>

      <p className="text-sm text-neutral-500 mt-1">
        📞 {client.phone || "Nessun telefono"}
      </p>

      <p className="text-sm text-neutral-500">
        ✉️ {client.email || "Nessuna email"}
      </p>

      {client.notes && (
        <p className="text-sm text-neutral-400 mt-2">
          {client.notes}
        </p>
      )}

    </div>
  )
}