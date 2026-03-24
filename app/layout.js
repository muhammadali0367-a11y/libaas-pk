import './globals.css'

export const metadata = {
  title: 'Libaas — Pakistan\'s First Creator Storefront Platform',
  description: 'Build your personal fashion storefront. Curate products from Pakistan\'s top brands. Earn 10–15% commission on every sale.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
