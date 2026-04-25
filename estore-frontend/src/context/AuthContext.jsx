import { createContext, useContext, useState, useEffect } from 'react'
import { authApi } from '../api/authApi'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [ready, setReady] = useState(false)

  // Restaure l'utilisateur depuis le localStorage au montage
  useEffect(() => {
    try {
      const raw = localStorage.getItem('estore_user')
      if (raw) setUser(JSON.parse(raw))
    } catch (_) {}
    setReady(true)
  }, [])

  const persist = (u) => {
    setUser(u)
    if (u) localStorage.setItem('estore_user', JSON.stringify(u))
    else localStorage.removeItem('estore_user')
  }

  const login = async (email, password) => {
    const res = await authApi.login({ email, password })
    persist(res)
    return res
  }

  const register = async (data) => {
    const res = await authApi.register(data)
    persist(res)
    return res
  }

  const logout = () => persist(null)

  return (
    <AuthContext.Provider value={{ user, ready, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
