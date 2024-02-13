import React, { useState, useContext, useEffect } from 'react'
import { useRouter } from 'next/router'

import AuthContext from '@/context/AuthContext'
import { toast } from 'react-toastify'

import Head from 'next/head'
import Link from 'next/link'

import { AuthLayout } from '@/components/AuthLayout'
import { Button } from '@/components/Button'
import { TextField } from '@/components/Fields'

export default function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const router = useRouter()

  const {
    loading,
    error,
    success,
    isAuthenticated,
    register,
    clearErrorsAndMessages,
  } = useContext(AuthContext)

  useEffect(() => {
    if (error && !loading) {
      toast.error(error)
      clearErrorsAndMessages()
    }

    if (isAuthenticated && !loading) {
      toast.success(success)
      clearErrorsAndMessages()
      router.push('/')
    }
  }, [loading, error, isAuthenticated])

  const handleRegister = (e) => {
    e.preventDefault()
    register({ username: email, password })
  }
  return (
    <>
      <Head>
        <title>Sign Up - App Name</title>
      </Head>
      <AuthLayout
        title="Sign up for an account"
        subtitle={
          <>
            Already registered?{' '}
            <Link href="/login" className="text-cyan-600">
              Sign in
            </Link>{' '}
            to your account.
          </>
        }
      >
        <form onSubmit={handleRegister}>
          <div className="grid grid-cols-2 gap-6">
            <TextField
              label="First name"
              id="first_name"
              name="first_name"
              type="text"
              autoComplete="given-name"
              disabled={true}
            />
            <TextField
              label="Last name"
              id="last_name"
              name="last_name"
              type="text"
              autoComplete="family-name"
              disabled={true}
            />
            <TextField
              className="col-span-full"
              label="Email address"
              id="email"
              name="email"
              type="Your email is invalid"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />
            <TextField
              className="col-span-full"
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
            Register
          </Button>
        </form>
      </AuthLayout>
    </>
  )
}
