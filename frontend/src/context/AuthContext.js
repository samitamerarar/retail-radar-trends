import { useState, useEffect, createContext } from 'react'
import axios from 'axios'

import { useRouter } from 'next/router'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [error, setError] = useState(null)

  const router = useRouter()

  useEffect(() => {
    if (!user) {
      loadUser()
    }
  }, [])

  // Register user
  const register = async ({ username, password }) => {
    try {
      setLoading(true)

      const res = await axios.post(`${process.env.API_URL}/register`, {
        username,
        password,
      })

      if (res.data.message) {
        setLoading(false)
        router.push('/login')
      }
    } catch (error) {
      setLoading(false)
      setError(
        error.response &&
          (error.response.data.message || error.response.data.status)
      )
    }
  }

  // Login user
  const login = async ({ username, password }) => {
    try {
      setLoading(true)
      const res = await axios.post('/api/auth/login', {
        username,
        password,
      })

      if (res.data.success) {
        loadUser()
        setIsAuthenticated(true)
        setLoading(false)
        // router.push('/')
      }
    } catch (error) {
      setLoading(false)
      setError(
        error.response &&
          (error.response.data.message || error.response.data.status)
      )
    }
  }

  // Load user
  const loadUser = async () => {
    try {
      setLoading(true)
      const res = await axios.get('/api/auth/user')
      if (res.data.user) {
        setIsAuthenticated(true)
        setLoading(false)
        setUser(res.data.user)
      }
    } catch (error) {
      setLoading(false)
      setIsAuthenticated(false)
      setUser(null)
      setError(
        error.response &&
          (error.response.data.message || error.response.data.status)
      )
    }
  }

  // Logout user
  const logout = async () => {
    try {
      const res = await axios.post('/api/auth/logout')
      if (res.data.success) {
        setIsAuthenticated(false)
        setUser(null)
      }
    } catch (error) {
      setLoading(false)
      setIsAuthenticated(false)
      setUser(null)
      setError(
        error.response &&
          (error.response.data.message || error.response.data.status)
      )
    }
  }

  // Clear errors
  const clearErrors = () => {
    setError(null)
  }

  return (
    <AuthContext.Provider
      value={{
        loading,
        user,
        error,
        isAuthenticated,
        login,
        logout,
        register,
        clearErrors,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
