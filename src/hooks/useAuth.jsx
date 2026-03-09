import { createContext, useContext, useState } from 'react'

const Ctx = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)

  const signIn = async (email, password) => {
    setLoading(true)
    await new Promise(r => setTimeout(r, 900))
    setUser({ email, name: email.split('@')[0] })
    setLoading(false)
    return { ok: true }
  }

  const signUp = async (email, password, name) => {
    setLoading(true)
    await new Promise(r => setTimeout(r, 1000))
    setUser({ email, name })
    setLoading(false)
    return { ok: true }
  }

  const signOut = () => setUser(null)

  return <Ctx.Provider value={{ user, loading, signIn, signUp, signOut }}>{children}</Ctx.Provider>
}

export const useAuth = () => useContext(Ctx)
