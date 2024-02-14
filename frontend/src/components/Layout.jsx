import React from 'react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Container } from '@/components/Container'

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <div className="overflow-hidden py-20 sm:py-32 lg:pb-32 xl:pb-36">
        <Container>
          <main>{children}</main>
        </Container>
      </div>
      <Footer />
    </>
  )
}
