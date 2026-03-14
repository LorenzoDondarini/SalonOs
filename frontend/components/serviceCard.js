"use client"

export default function ServiceCard({ service }) {

  return (
    <div className="bg-white border border-neutral-200 rounded-xl p-6 shadow-sm hover:shadow-md transition">

      <p className="text-lg font-semibold mb-2">
        {service.name}
      </p>

      {service.description && (
        <p className="text-sm text-neutral-500 mb-3">
          {service.description}
        </p>
      )}

      <div className="flex justify-between text-sm text-neutral-600">

        <span>
          ⏱ {service.duration_minutes} min
        </span>

        <span className="font-medium">
          €{service.price}
        </span>

      </div>

    </div>
  )
}