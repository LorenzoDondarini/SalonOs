export default function Button({ children, onClick, variant = "primary" }) {

  const base = "px-4 py-2 rounded-xl text-sm font-medium transition"

  const styles = {
    primary: "bg-black text-white hover:bg-neutral-800",
    secondary: "bg-neutral-100 hover:bg-neutral-200"
  }

  return (

    <button
      onClick={onClick}
      className={`${base} ${styles[variant]}`}
    >
      {children}
    </button>

  )

}