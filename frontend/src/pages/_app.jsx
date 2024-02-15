import '@/styles/tailwind.css'
import 'focus-visible'

import { useEffect, useRef } from 'react'
import Script from 'next/script'
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
        {/* google analytics -- Start */}
        <Script
          strategy="afterInteractive" // load after page renders
          src="https://www.googletagmanager.com/gtag/js?id=G-LLCPFRPC65"
        />

        <Script id="google-analytics" strategy="afterInteractive">
          {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-LLCPFRPC65');
            `}
        </Script>
        {/* google analytics -- End */}

        <Component previousPathname={previousPathname} {...pageProps} />
      </Layout>
    </AuthProvider>
  )
}

export default App
