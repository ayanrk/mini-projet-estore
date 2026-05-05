import { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useNavigate, Link } from 'react-router-dom'
import { catalogApi } from '../../api/catalogApi'
import api from '../../api/axios'
import { formatPrice, formatDate } from '../../utils/format'

export default function AdminPage() {
  const { user } = useAuth()
  const navigate = useNavigate()

  const [tab, setTab] = useState('products')
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [msg, setMsg] = useState({ type: '', text: '' })
  const [showForm, setShowForm] = useState(false)

  const [productForm, setProductForm] = useState({
    name: '', description: '', price: '',
    imageUrl: '', categoryId: '', stock: ''
  })
  const [catForm, setCatForm] = useState({ name: '', description: '' })

  useEffect(() => {
    if (!user) { navigate('/login'); return }
    if (user.email !== 'admin@estore.com') { navigate('/'); return }
    loadData()
  }, [user])

  const loadData = async () => {
    setLoading(true)
    try {
      const [prods, cats] = await Promise.all([
        catalogApi.getProducts(),
        catalogApi.getCategories(),
      ])
      setProducts(prods)
      setCategories(cats)
      const ord = await api.get('/orders').then(r => r.data).catch(() => [])
      setOrders(ord)
    } catch {
      setMsg({ type: 'error', text: 'Erreur de chargement' })
    } finally {
      setLoading(false)
    }
  }

  const handleCreateProduct = async (e) => {
    e.preventDefault()
    setMsg({ type: '', text: '' })
    try {
      const prod = await api.post('/products', {
        name: productForm.name,
        description: productForm.description,
        price: parseFloat(productForm.price),
        imageUrl: productForm.imageUrl,
        category: { id: parseInt(productForm.categoryId) }
      }).then(r => r.data)

      if (productForm.stock) {
        await api.post('/inventory', {
          productId: prod.id,
          quantity: parseInt(productForm.stock)
        }).catch(() => {})
      }

      setMsg({ type: 'success', text: `✓ Produit "${prod.name}" créé` })
      setProductForm({ name: '', description: '', price: '', imageUrl: '', categoryId: '', stock: '' })
      setShowForm(false)
      loadData()
    } catch (err) {
      setMsg({ type: 'error', text: err.displayMessage || 'Erreur création produit' })
    }
  }

  const handleDeleteProduct = async (id, name) => {
    if (!window.confirm(`Supprimer "${name}" ?`)) return
    try {
      await api.delete(`/products/${id}`)
      setMsg({ type: 'success', text: '✓ Produit supprimé' })
      loadData()
    } catch (err) {
      setMsg({ type: 'error', text: err.displayMessage || 'Erreur suppression' })
    }
  }

  const handleUpdateStock = async (productId, currentQty) => {
    const newQty = window.prompt('Nouveau stock :', currentQty)
    if (newQty === null || isNaN(newQty)) return
    try {
      await api.put(`/inventory/${productId}?quantity=${parseInt(newQty)}`)
      setMsg({ type: 'success', text: `✓ Stock mis à jour : ${newQty} unités` })
      loadData()
    } catch (err) {
      setMsg({ type: 'error', text: err.displayMessage || 'Erreur stock' })
    }
  }

  const handleCreateCategory = async (e) => {
    e.preventDefault()
    try {
      await api.post('/categories', catForm)
      setMsg({ type: 'success', text: `✓ Catégorie "${catForm.name}" créée` })
      setCatForm({ name: '', description: '' })
      loadData()
    } catch (err) {
      setMsg({ type: 'error', text: err.displayMessage || 'Erreur catégorie' })
    }
  }

  const totalRevenue = orders.reduce((s, o) => s + (o.totalAmount || 0), 0)

  return (
    <div className="admin-wrap">

      {/* Header admin */}
      <div className="admin-header">
        <div >
          <h2>Panneau <em style={{ color: 'var(--terracotta)', fontStyle: 'italic'  }}>d'administration</em></h2>
          
        </div>
        <div className="admin-header-right">
          <span className="admin-user-label">
            Admin : {user?.firstName} {user?.lastName}
          </span>
          <Link to="/" className="admin-back-btn">← Boutique</Link>
        </div>
      </div>

      {/* Stats */}
      <div className="admin-stats">
        <div className="admin-stat">
          <div className="admin-stat-value">{products.length}</div>
          <div className="admin-stat-label">Produits</div>
        </div>
        <div className="admin-stat">
          <div className="admin-stat-value">{categories.length}</div>
          <div className="admin-stat-label">Catégories</div>
        </div>
        <div className="admin-stat">
          <div className="admin-stat-value accent">{orders.length}</div>
          <div className="admin-stat-label">Commandes</div>
        </div>
        <div className="admin-stat">
          <div className="admin-stat-value green">{formatPrice(totalRevenue)}</div>
          <div className="admin-stat-label">Revenus MAD</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="admin-tabs">
        {[
          { key: 'products',   label: 'Produits' },
          { key: 'stock',      label: 'Stock' },
          { key: 'orders',     label: 'Commandes' },
          { key: 'categories', label: 'Catégories' },
        ].map(t => (
          <button
            key={t.key}
            className={`admin-tab ${tab === t.key ? 'active' : ''}`}
            onClick={() => setTab(t.key)}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Body */}
      <div className="admin-body">

        {msg.text && (
          <div className={`admin-alert ${msg.type}`}>{msg.text}</div>
        )}

        {/* ── PRODUITS ── */}
        {tab === 'products' && (
          <div>
            <div className="admin-section-head">
              <h2>Gestion des produits <span>{products.length} produits</span></h2>
              <button
                className="admin-btn"
                onClick={() => setShowForm(!showForm)}
              >
                {showForm ? '✕ Annuler' : '+ Nouveau produit'}
              </button>
            </div>

            {showForm && (
              <form className="admin-form" onSubmit={handleCreateProduct}>
                <h3>Nouveau produit</h3>

                <div className="admin-field">
                  <label>Nom *</label>
                  <input required value={productForm.name}
                    onChange={e => setProductForm({...productForm, name: e.target.value})}
                    placeholder="Laptop HP 15…" />
                </div>

                <div className="admin-field">
                  <label>Prix (MAD) *</label>
                  <input required type="number" value={productForm.price}
                    onChange={e => setProductForm({...productForm, price: e.target.value})}
                    placeholder="1299.00" />
                </div>

                <div className="admin-field full">
                  <label>Description</label>
                  <textarea value={productForm.description}
                    onChange={e => setProductForm({...productForm, description: e.target.value})}
                    placeholder="Description du produit…" />
                </div>

                <div className="admin-field">
                  <label>URL Image</label>
                  <input value={productForm.imageUrl}
                    onChange={e => setProductForm({...productForm, imageUrl: e.target.value})}
                    placeholder="https://images.unsplash.com/…" />
                </div>

                <div className="admin-field">
                  <label>Catégorie *</label>
                  <select required value={productForm.categoryId}
                    onChange={e => setProductForm({...productForm, categoryId: e.target.value})}>
                    <option value="">-- Choisir --</option>
                    {categories.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div className="admin-field">
                  <label>Stock initial</label>
                  <input type="number" value={productForm.stock}
                    onChange={e => setProductForm({...productForm, stock: e.target.value})}
                    placeholder="100" />
                </div>

                <div className="form-actions">
                  <button type="button" className="admin-btn outline"
                    onClick={() => setShowForm(false)}>
                    Annuler
                  </button>
                  <button type="submit" className="admin-btn">
                    Créer le produit
                  </button>
                </div>
              </form>
            )}

            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Image</th>
                    <th>Nom</th>
                    <th>Catégorie</th>
                    <th>Prix</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(p => (
                    <tr key={p.id}>
                      <td className="td-id">#{p.id}</td>
                      <td>
                        <img src={p.imageUrl} alt={p.name} />
                      </td>
                      <td className="td-name">{p.name}</td>
                      <td className="td-muted">{p.category?.name}</td>
                      <td className="td-price">{formatPrice(p.price)} MAD</td>
                      <td>
                        <div className="td-actions">
                          <Link to={`/products/${p.id}`} className="admin-btn outline">
                            Voir
                          </Link>
                          <button
                            className="admin-btn danger"
                            onClick={() => handleDeleteProduct(p.id, p.name)}
                          >
                            Supprimer
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── STOCK ── */}
        {tab === 'stock' && (
          <div>
            <div className="admin-section-head">
              <h2>Gestion du stock</h2>
            </div>
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Produit</th>
                    <th>Catégorie</th>
                    <th>Prix</th>
                    <th>Stock actuel</th>
                    <th>Statut</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(p => (
                    <StockRow
                      key={p.id}
                      product={p}
                      onUpdate={handleUpdateStock}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── COMMANDES ── */}
        {tab === 'orders' && (
          <div>
            <div className="admin-section-head">
              <h2>Toutes les commandes <span>{orders.length} commandes</span></h2>
            </div>

            {orders.length === 0 ? (
              <div className="admin-empty">Aucune commande pour le moment.</div>
            ) : (
              <div className="admin-table-wrap">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Client</th>
                      <th>Date</th>
                      <th>Articles</th>
                      <th>Total</th>
                      <th>Statut</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map(o => (
                      <tr key={o.id}>
                        <td className="td-id">#{o.id}</td>
                        <td>
                          <span className="td-name">
                            {o.user?.firstName} {o.user?.lastName}
                          </span>
                          <br />
                          <span className="td-muted">{o.user?.email}</span>
                        </td>
                        <td className="td-muted">{formatDate(o.orderDate)}</td>
                        <td className="td-muted">{(o.items || []).length} article(s)</td>
                        <td className="td-price">{formatPrice(o.totalAmount)} MAD</td>
                        <td>
                          <span className="admin-badge confirmed">
                            {o.status || 'PENDING'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* ── CATÉGORIES ── */}
        {tab === 'categories' && (
          <div>
            <div className="admin-section-head">
              <h2>Gestion des catégories</h2>
            </div>

            <form className="admin-cat-form" onSubmit={handleCreateCategory}>
              <div className="admin-field">
                <label>Nom *</label>
                <input required value={catForm.name}
                  onChange={e => setCatForm({...catForm, name: e.target.value})}
                  placeholder="Électronique…" />
              </div>
              <div className="admin-field">
                <label>Description</label>
                <input value={catForm.description}
                  onChange={e => setCatForm({...catForm, description: e.target.value})}
                  placeholder="Description…" />
              </div>
              <button type="submit" className="admin-btn">+ Ajouter</button>
            </form>

            <div className="admin-cat-grid">
              {categories.map(c => (
                <div key={c.id} className="admin-cat-card">
                  <div className="cat-id">#{c.id}</div>
                  <h3>{c.name}</h3>
                  <p>{c.description}</p>
                  <div className="cat-count">
                    {products.filter(p => p.category?.id === c.id).length} produit(s)
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  )
}

/* Ligne stock avec fetch async */
function StockRow({ product, onUpdate }) {
  const [stock, setStock] = useState(null)

  useEffect(() => {
    fetch(`http://localhost:8080/api/inventory/${product.id}`)
      .then(r => r.json())
      .then(d => setStock(d.quantity))
      .catch(() => setStock(null))
  }, [product.id])

  const badgeClass =
    stock === null ? '' :
    stock === 0    ? 'rupture' :
    stock < 10     ? 'low' : 'ok'

  const badgeLabel =
    stock === null ? '—' :
    stock === 0    ? 'Rupture' :
    stock < 10     ? 'Faible' : 'OK'

  return (
    <tr>
      <td className="td-name">{product.name}</td>
      <td className="td-muted">{product.category?.name}</td>
      <td className="td-price">{product.price} MAD</td>
      <td style={{ fontFamily: 'var(--serif)', fontWeight: 600, fontSize: '1.1rem' }}>
        {stock ?? '—'}
      </td>
      <td>
        <span className={`admin-badge ${badgeClass}`}>{badgeLabel}</span>
      </td>
      <td>
        <button
          className="admin-btn outline"
          onClick={() => onUpdate(product.id, stock ?? 0)}
        >
          Modifier
        </button>
      </td>
    </tr>
  )
}