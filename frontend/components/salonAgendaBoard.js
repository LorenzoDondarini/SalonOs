"use client"

const HOURS = [
  "09:00","09:30","10:00","10:30",
  "11:00","11:30","12:00","12:30",
  "13:00","13:30","14:00","14:30",
  "15:00","15:30","16:00","16:30",
  "17:00","17:30","18:00","18:30"
]

function formatHour(date){
  const d = new Date(date)
  return d.toLocaleTimeString([], {hour:"2-digit",minute:"2-digit"})
}

function getColor(serviceId){

  const colors=[
    "bg-blue-500",
    "bg-green-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-orange-500"
  ]

  return colors[serviceId % colors.length]

}

export default function SalonAgendaBoard({
  team,
  appointments,
  clients,
  onSelectSlot,
  onMoveAppointment
}){

  function findAppointment(hour,userId){

    return appointments.find(a=>{
      return formatHour(a.start_time)===hour && a.user_id===userId
    })

  }

  function getClientName(clientId){

    const client=clients.find(c=>c.id===clientId)

    if(!client) return "Cliente"

    return client.first_name+" "+(client.last_name||"")

  }

  function handleDrop(e,hour,userId){

    const appointmentId=e.dataTransfer.getData("appointmentId")

    onMoveAppointment(appointmentId,hour,userId)

  }

  return(

    <div className="overflow-x-auto bg-white border rounded-xl">

      <table className="w-full">

        <thead>

          <tr className="border-b">

            <th className="p-3 text-left text-sm text-neutral-500">
              Ora
            </th>

            {team.map(member=>(
              <th key={member.id} className="p-3 text-left">
                {member.name}
              </th>
            ))}

          </tr>

        </thead>

        <tbody>

          {HOURS.map(hour=>(

            <tr key={hour} className="border-b">

              <td className="p-3 text-sm text-neutral-500">
                {hour}
              </td>

              {team.map(member=>{

                const appointment=findAppointment(hour,member.id)

                return(

                  <td
                  key={member.id}
                  className="p-2"
                  onClick={()=>onSelectSlot(hour,member.id)}
                  onDragOver={(e)=>e.preventDefault()}
                  onDrop={(e)=>handleDrop(e,hour,member.id)}
                  >

                    {appointment ? (

                      <div
                      draggable
                      onDragStart={(e)=>e.dataTransfer.setData("appointmentId",appointment.id)}
                      className={`${getColor(appointment.service_id)} text-white rounded-lg p-2 text-sm cursor-move`}
                      >

                        {getClientName(appointment.client_id)}

                      </div>

                    ) : (

                      <div className="h-14 bg-neutral-100 rounded-lg hover:bg-neutral-200"/>

                    )}

                  </td>

                )

              })}

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  )

}