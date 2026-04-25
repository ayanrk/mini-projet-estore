import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { cartApi } from '../api/cartApi'
import { useAuth } from './AuthContext'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const { user } = useAuth()
  const [cart, setCart] = useState(null)
  const [loading, setLoading] = useState(false)

  const refresh = useCallback(async () => {
    if (!user) { setCart(null); return }
    setLoading(true)
    try {
      const data = await cartApi.getCart(user.userId)
      setCart(data)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }, [user])

  useEffect(() => { refresh() }, [refresh])

  const add = async (productId, quantity = 1) => {
    if (!user) throw new Error('Vous devez être connecté')
    const data = await cartApi.addToCart(user.userId, productId, quantity)
    setCart(data)
    return data
  }

  const update = async (itemId, quantity) => {
    const data = await cartApi.updateQuantity(itemId, quantity)
    setCart(data)
    return data
  }

  const remove = async (itemId) => {
    await cartApi.removeItem(itemId)
    await refresh()
  }

  const clear = async () => {
    if (!user) return
    await cartApi.clearCart(user.userId)
    await refresh()
  }

  // Calculs dérivés
  const itemCount = cart?.items?.reduce((sum, it) => sum + it.quantity, 0) ?? 0
  const total = cart?.items?.reduce((sum, it) => sum + it.unitPrice * it.quantity, 0) ?? 0

  return (
    <CartContext.Provider value={{
      cart, loading, itemCount, total,
      refresh, add, update, remove, clear,
    }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
