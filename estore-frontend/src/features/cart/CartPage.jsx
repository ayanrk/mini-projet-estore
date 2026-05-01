import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import { useAuth } from '../../context/AuthContext'
import { orderApi } from '../../api/orderApi'
import { formatPrice } from '../../utils/format'
import Loading from '../../components/Loading'

export default function CartPage() {
  const { user } = useAuth()
  const { cart, loading, total, itemCount, update, remove, refresh } = useCart()
  const navigate = useNavigate()

  const [actionMsg, setActionMsg] = useState({ type: '', text: '' })
  const [placing, setPlacing] = useState(false)

  if (!user) {
    return (
      <div className="page">
        <div className="container">
          <div className="empty">
            <h3>Votre panier vous attend</h3>
            <p>Connectez-vous pour consulter votre panier.</p>
            <Link to="/login" className="btn btn-primary" style={{ marginTop: '1rem' }}>
              Se connecter
            </Link>
          </div>
        </div>
      </div>
    )
  }

  if (loading) return <Loading label="Chargement du panier…" />

  const items = cart?.items || []

  const handleUpdate = async (itemId, newQty) => {
    if (newQty < 1) return
    setActionMsg({ type: '', text: '' })
    try {
      await update(itemId, newQty)
    } catch (err) {
      setActionMsg({ type: 'error', text: err.displayMessage || 'Erreur de mise à jour' })
    }
  }

  const handleRemove = async (itemId) => {
    setActionMsg({ type: '', text: '' })
    try {
      await remove(itemId)
      setActionMsg({ type: 'success', text: 'Article retiré' })
    } catch (err) {
      setActionMsg({ type: 'error', text: err.displayMessage || 'Erreur' })
    }
  }

  const handleCheckout = async () => {
    if (items.length === 0) return
    setPlacing(true)
    setActionMsg({ type: '', text: '' })
    try {
      const order = await orderApi.placeOrder(user.userId)
      await refresh() // panier vidé côté backend
      navigate(`/orders?just=${order.id}`)
    } catch (err) {
      setActionMsg({ type: 'error', text: err.displayMessage || 'Échec de la commande' })
    } finally {
      setPlacing(false)
    }
  }

  return (
    <div className="page">
      <div className="container">
        <header className="page-head">
          
          <h1>Votre <em style={{color:'var(--terracotta)', fontStyle:'italic'}}>panier</em></h1>
        </header>

        {actionMsg.text && (
          <div className={`alert alert-${actionMsg.type}`}>{actionMsg.text}</div>
        )}

        {items.length === 0 ? (
          <div className="empty">
            <h3>Votre panier est vide</h3>
            <p>Parcourez le catalogue pour y ajouter des produits.</p>
            <Link to="/catalog" className="btn btn-primary" style={{ marginTop: '1.5rem' }}>
              Découvrir le catalogue
            </Link>
          </div>
        ) : (
          <div className="cart-grid">
            {/* Lignes du panier */}
            <div className="card" style={{ padding: '0.5rem 1.6rem' }}>
              {items.map(item => (
                <div className="cart-line" key={item.id}>
                  <img
                    src={item.product?.imageUrl}
                    alt={item.product?.name}
                  />
                  <div>
                    <div className="name">
                      <Link to={`/products/${item.product?.id}`} style={{ color: 'var(--ink)' }}>
                        {item.product?.name}
                      </Link>
                    </div>
                    <div className="meta">
                      {formatPrice(item.unitPrice)} MAD × {item.quantity}
                    </div>
                    <button
                      type="button"
                      className="remove-btn"
                      onClick={() => handleRemove(item.id)}
                      style={{ marginTop: '0.4rem' }}
                    >
                      Retirer
                    </button>
                  </div>
                  <div className="qty">
                    <button
                      type="button"
                      onClick={() => handleUpdate(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >−</button>
                    <span>{item.quantity}</span>
                    <button
                      type="button"
                      onClick={() => handleUpdate(item.id, item.quantity + 1)}
                    >+</button>
                  </div>
                  <div className="line-total">
                    {formatPrice(item.unitPrice * item.quantity)}
                  </div>
                </div>
              ))}
            </div>

            {/* Résumé */}
            <aside className="summary">
              <h3>Résumé</h3>
              <div className="row">
                <span>Articles ({itemCount})</span>
                <span>{formatPrice(total)} MAD</span>
              </div>
              <div className="row">
                <span>Livraison</span>
                <span style={{ fontStyle: 'italic', opacity: 0.7 }}>Offerte</span>
              </div>
              <div className="row total">
                <span>Total</span>
                <span>{formatPrice(total)} MAD</span>
              </div>
              <button
                className="checkout"
                onClick={handleCheckout}
                disabled={placing || items.length === 0}
                
              >
                {placing ? 'Validation…' : 'Valider la commande'}
              </button>
              <p style={{
                marginTop: '1rem',
                fontSize: '0.78rem',
                opacity: 0.6,
                textAlign: 'center'
              }}>
                Le stock sera décrémenté à la validation.
              </p>
            </aside>
          </div>
        )}
      </div>
    </div>
  )
}
