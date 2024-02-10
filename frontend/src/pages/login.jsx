import React, { useState, useContext, useEffect } from 'react'
import { useRouter } from 'next/router'

import AuthContext from '@/context/AuthContext'
import { toast } from 'react-toastify'

import Head from 'next/head'
import Link from 'next/link'

import { AuthLayout } from '@/components/AuthLayout'
import { Button } from '@/components/Button'
import { TextField } from '@/components/Fields'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const router = useRouter()

  const { loading, error, isAuthenticated, login } = useContext(AuthContext)

  useEffect(() => {
    if (error && !loading) {
      toast.error(error)
    }

    if (isAuthenticated && !loading) {
      router.push('/')
    }
  }, [loading, error, isAuthenticated])

  const handleSubmit = (e) => {
    e.preventDefault()
    login({ username: email, password })
  }

  return (
    <>
      <Head>
        <title>Sign In - App Name</title>
      </Head>
      <ToastContainer />
      <AuthLayout
        title="Sign in to account"
        subtitle={
          <>
            Don’t have an account?{' '}
            <Link href="/register" className="text-cyan-600">
              Sign up
            </Link>
          </>
        }
      >
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <TextField
              label="Email address"
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              title="Your email is invalid"
              required
            />
            <TextField
              label="Password"
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit" color="cyan" className="mt-8 w-full">
            {loading ? 'Authenticating...' : 'Log in'}
          </Button>
        </form>
      </AuthLayout>
    </>
  )
}
