import '@/styles/tailwind.css'
import 'focus-visible'

import { AuthProvider } from '@/context/AuthContext'

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  )
}
