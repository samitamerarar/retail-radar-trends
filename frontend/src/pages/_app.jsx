import '@/styles/tailwind.css'
import 'focus-visible'

import { AuthProvider } from '@/context/AuthContext'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Layout from '@/components/Layout'

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <ToastContainer />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  )
}
