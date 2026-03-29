import './globals.css'

export const metadata = {
  title: 'Libaas — Pakistan\'s First Creator Storefront Platform',
  description: 'Build your personal fashion storefront. Curate products from Pakistan\'s top brands. Earn commission on every sale — paid in PKR.',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
}
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
