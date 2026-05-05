import { createContext, useContext, useState, useEffect } from 'react'

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser]       = useState(null)
  const [loading, setLoading] = useState(false)
  const [checking, setChecking] = useState(true)   // initial auth check

  // On mount — check if cookie session is still valid
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch(`${API}/profile`, { credentials: 'include' })
        if (res.ok) {
          const data = await res.json()
          setUser(data.user)
        }
      } catch {
        // not authenticated — fine
      } finally {
        setChecking(false)
      }
    }
    checkAuth()
  }, [])

  const signUp = async (email, password, name) => {
    setLoading(true)
    try {
      const res = await fetch(`${API}/register`, {
        method:      'POST',
        headers:     { 'Content-Type': 'application/json' },
        credentials: 'include',
        body:        JSON.stringify({ name, email, password }),
      })
      const data = await res.json()
      if (res.ok) {
        setUser(data.user)
        return { ok: true, user: data.user }
      }
      return { ok: false, message: data.message || 'Registration failed.' }
    } catch {
      return { ok: false, message: 'Network error. Please try again.' }
    } finally {
      setLoading(false)
    }
  }

  const signIn = async (email, password) => {
    setLoading(true)
    try {
      const res = await fetch(`${API}/login`, {
        method:      'POST',
        headers:     { 'Content-Type': 'application/json' },
        credentials: 'include',
        body:        JSON.stringify({ email, password }),
      })
      const data = await res.json()
      if (res.ok) {
        setUser(data.user)
        return { ok: true, user: data.user }
      }
      return { ok: false, message: data.message || 'Login failed.' }
    } catch {
      return { ok: false, message: 'Network error. Please try again.' }
    } finally {
      setLoading(false)
    }
  }

  const signOut = async () => {
    try {
      await fetch(`${API}/logout`, { method: 'POST', credentials: 'include' })
    } catch { /* ignore */ }
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, checking, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
