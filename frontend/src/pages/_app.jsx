import '@/styles/tailwind.css'
import 'focus-visible'

import { useEffect, useRef } from 'react'
import { AuthProvider } from '@/context/AuthContext'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Layout from '@/components/Layout'

function usePrevious(value) {
  let ref = useRef()

  useEffect(() => {
    ref.current = value
  }, [value])

  return ref.current
}

const App = ({ Component, pageProps, router }) => {
  let previousPathname = usePrevious(router.pathname)
  return (
    <AuthProvider>
      <ToastContainer />
      <Layout>
        <Component previousPathname={previousPathname} {...pageProps} />
      </Layout>
    </AuthProvider>
  )
}

export default App
