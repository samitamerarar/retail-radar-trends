import { useContext } from 'react'
import Head from 'next/head'

import AuthContext from '@/context/AuthContext'

import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'

export default function Home() {
  const { loading, user } = useContext(AuthContext)
  return (
    <>
      <Head>
        <title>App Name</title>
        <meta name="description" content="" />
      </Head>
      <Header user={user} loading={loading} />
      <main>
        <Hero />
      </main>
      <Footer />
    </>
  )
}
