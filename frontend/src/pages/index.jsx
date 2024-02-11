import Head from 'next/head'

import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'

export default function Home() {
  return (
    <>
      <Head>
        <title>App Name</title>
        <meta name="description" content="" />
      </Head>
      <main>
        <Hero />
      </main>
    </>
  )
}
