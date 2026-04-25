import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { catalogApi } from '../../api/catalogApi'
import { inventoryApi } from '../../api/inventoryApi'
import { reviewApi } from '../../api/reviewApi'
import { useCart } from '../../context/CartContext'
import { useAuth } from '../../context/AuthContext'
import { formatPrice } from '../../utils/format'
import Loading from '../../components/Loading'
import ReviewsList from '../reviews/ReviewsList'
import ReviewForm from '../reviews/ReviewForm'

export default function ProductDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const { add } = useCart()

  const [product, setProduct] = useState(null)
  const [stock, setStock] = useState(null)
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [quantity, setQuantity] = useState(1)
  const [adding, setAdding] = useState(false)
  const [addMsg, setAddMsg] = useState({ type: '', text: '' })

  useEffect(() => {
    setLoading(true)
    setError('')
    Promise.all([
      catalogApi.getProduct(id),
      inventoryApi.getStock(id).catch(() => null), // si pas dispo, on continue
      reviewApi.getByProduct(id).catch(() => []),
    ])
      .then(([p, inv, rvs]) => {
        setProduct(p)
        setStock(inv)
        setReviews(rvs || [])
      })
      .catch(err => setError(err.displayMessage || 'Produit introuvable'))
      .finally(() => setLoading(false))
  }, [id])

  const handleAdd = async () => {
    if (!user) {
      navigate('/login', { state: { from: `/products/${id}` } })
      return
    }
    setAddMsg({ type: '', text: '' })
    setAdding(true)
    try {
      await add(Number(id), quantity)
      setAddMsg({ type: 'success', text: `${quantity} article(s) ajouté(s) au panier` })
    } catch (err) {
      setAddMsg({ type: 'error', text: err.displayMessage || 'Stock insuffisant ou erreur' })
    } finally {
      setAdding(false)
    }
  }

  const onReviewAdded = (r) => setReviews([r, ...reviews])

  if (loading) return <Loading label="Chargement du produit…" />
  if (error || !product) {
    return (
      <div className="page">
        <div className="container">
          <div className="alert alert-error">{error || 'Produit introuvable'}</div>
          <Link to="/catalog" className="btn btn-outline">← Retour au catalogue</Link>
        </div>
      </div>
    )
  }

  const stockQty = stock?.quantity ?? null
  const inStock = stockQty === null ? true : stockQty > 0
  const maxQty = stockQty === null ? 99 : Math.max(1, stockQty)

  return (
    <div className="page">
      <div className="container">
        <Link to="/catalog" className="btn btn-ghost btn-sm" style={{ marginBottom: '2rem' }}>
          ← Retour au catalogue
        </Link>

        <div className="detail-grid">
          <div className="detail-img fade-in">
            <img src={product.imageUrl} alt={product.name} />
          </div>

          <div className="detail-info fade-in-d1">
            <span className="cat">{product.category?.name || 'Sans catégorie'}</span>
            <h1>{product.name}</h1>

            <div className="price-row">
              <span className="price">
                {formatPrice(product.price)} <span style={{ fontSize: '0.8rem', color: 'var(--ink-mute)' }}>MAD</span>
              </span>
              {stockQty !== null && (
                <span className={`stock ${!inStock ? 'empty' : ''}`}>
                  {inStock ? `${stockQty} en stock` : 'Rupture de stock'}
                </span>
              )}
            </div>

            <p className="desc">{product.description}</p>

            {addMsg.text && (
              <div className={`alert alert-${addMsg.type}`}>{addMsg.text}</div>
            )}

            <div className="qty-row">
              <div className="qty">
                <button
                  type="button"
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  disabled={!inStock}
                >−</button>
                <span>{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity(q => Math.min(maxQty, q + 1))}
                  disabled={!inStock || quantity >= maxQty}
                >+</button>
              </div>
              <button
                onClick={handleAdd}
                disabled={!inStock || adding}
                className="btn btn-accent btn-lg"
              >
                {adding ? 'Ajout…' : (inStock ? 'Ajouter au panier' : 'Indisponible')}
              </button>
            </div>

            <p style={{ fontSize: '0.85rem', color: 'var(--ink-mute)' }}>
              Référence : #{product.id} · Catégorie : {product.category?.name || '—'}
            </p>
          </div>
        </div>

        {/* Section avis (MongoDB) */}
        <section className="reviews-section">
          <span className="eyebrow">Mongo · Reviews</span>
          <h2 style={{ margin: '0.5rem 0 2rem' }}>Avis des clients</h2>

          <ReviewForm productId={id} onAdded={onReviewAdded} />
          <ReviewsList reviews={reviews} />
        </section>
      </div>
    </div>
  )
}
