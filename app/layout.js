import './globals.css'

export const metadata = {
  title: 'Libaas — Pakistan\'s First Creator Storefront Platform',
  description: 'Build your personal fashion storefront. Curate products from Pakistan\'s top brands. Earn commission on every sale — paid in PKR.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
