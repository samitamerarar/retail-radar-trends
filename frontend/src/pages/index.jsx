import React, { useContext } from 'react'
import Head from 'next/head'

import AuthContext from '@/context/AuthContext'

import { Hero } from '@/components/Hero'

export default function Home() {
  const { isAuthenticated } = useContext(AuthContext)

  return (
    <>
      <Head>
        <title>App Name</title>
        <meta name="description" content="" />
      </Head>
      <main>
        <Hero authenticated={isAuthenticated} />
      </main>
    </>
  )
}
