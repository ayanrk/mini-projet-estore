import { useEffect, useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { orderApi } from '../../api/orderApi'
import { useAuth } from '../../context/AuthContext'
import { formatPrice, formatDate } from '../../utils/format'
import Loading from '../../components/Loading'

export default function OrdersPage() {
  const { user } = useAuth()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [params] = useSearchParams()
  const justPlaced = params.get('just')

  useEffect(() => {
    if (!user) return
    setLoading(true)
    orderApi.getUserOrders(user.userId)
      .then(setOrders)
      .catch(err => setError(err.displayMessage || 'Erreur de chargement'))
      .finally(() => setLoading(false))
  }, [user])

  if (loading) return <Loading label="Chargement de vos commandes…" />

  const statusClass = (status) => {
    switch ((status || '').toUpperCase()) {
      case 'CONFIRMED': return 'status-confirmed'
      case 'SHIPPED': return 'status-shipped'
      default: return 'status-pending'
    }
  }

  const statusLabel = (status) => {
    switch ((status || '').toUpperCase()) {
      case 'CONFIRMED': return 'Confirmée'
      case 'SHIPPED': return 'Expédiée'
      case 'DELIVERED': return 'Livrée'
      case 'CANCELLED': return 'Annulée'
      default: return 'En attente'
    }
  }

  return (
    <div className="page">
      <div className="container">
        <header className="page-head">
          <span className="eyebrow">  
            
          </span>
          <h1>Mes <em style={{color:'var(--terracotta)', fontStyle:'italic'}}>commandes</em></h1>
          <p className="lead" style={{ marginTop: '0.5rem' }}>
            Historique complet de vos achats sur la boutique.
          </p>
        </header>

        {justPlaced && (
          <div className="alert alert-success">
            ✓ Votre commande #{justPlaced} a bien été enregistrée.
            Le stock a été mis à jour et votre panier vidé.
          </div>
        )}

        {error && <div className="alert alert-error">{error}</div>}

        {orders.length === 0 ? (
          <div className="empty">
            <h3>Aucune commande pour l'instant</h3>
            <p>Vos achats apparaîtront ici une fois validés.</p>
            <Link to="/catalog" className="btn btn-primary" style={{ marginTop: '1.5rem' }}>
              Découvrir le catalogue
            </Link>
          </div>
        ) : (
          orders.map((o, idx) => (
            <article key={o.id} className="order fade-in" style={{ animationDelay: `${idx * 0.05}s` }}>
              <div className="order-head">
                <div>
                  <div className="num">Commande {o.id}</div>
                  <div className="date">{formatDate(o.orderDate)}</div>
                </div>
                <span className={`status ${statusClass(o.status)}`}>
                  {statusLabel(o.status)}
                </span>
              </div>

              <div className="order-items">
                {(o.items || []).map(it => (
                  <div className="order-item-line" key={it.id}>
                    <span>
                      {it.product?.name}{' '}
                      <span style={{ color: 'var(--ink-mute)' }}>× {it.quantity}</span>
                    </span>
                    <span>{formatPrice(it.unitPrice * it.quantity)} MAD</span>
                  </div>
                ))}
              </div>

              <div className="order-foot">
                <span style={{ fontSize: '0.85rem', color: 'var(--ink-mute)' }}>
                  {(o.items || []).length} article(s)
                </span>
                <span className="total">
                  Total : {formatPrice(o.totalAmount)} MAD
                </span>
              </div>
            </article>
          ))
        )}
      </div>
    </div>
  )
}
