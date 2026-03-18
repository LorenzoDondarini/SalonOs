export function PageTitle({ children }) {

  return (
    <h1 className="text-3xl font-semibold tracking-tight">
      {children}
    </h1>
  )

}

export function SectionTitle({ children }) {

  return (
    <h2 className="text-lg font-medium text-neutral-700">
      {children}
    </h2>
  )

}