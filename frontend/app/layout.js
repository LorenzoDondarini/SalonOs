import "./globals.css"
import Layout from "@/components/layout"

export default function RootLayout({ children }) {
  return (
    <html lang="it">
      <body>
        <Layout>
          {children}
        </Layout>
      </body>
    </html>
  )
}