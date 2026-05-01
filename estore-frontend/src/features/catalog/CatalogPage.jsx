import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { catalogApi } from '../../api/catalogApi'
import { formatPrice } from '../../utils/format'
import Loading from '../../components/Loading'

export default function CatalogPage() {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()

  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // États de filtre
  const [searchInput, setSearchInput] = useState(searchParams.get('search') || '')
  const search = searchParams.get('search') || ''
  const categoryId = searchParams.get('categoryId') || ''

  // Charger les catégories une fois
  useEffect(() => {
    catalogApi.getCategories()
      .then(setCategories)
      .catch(err => console.error(err))
  }, [])

  // Charger les produits selon les filtres URL
  useEffect(() => {
    setLoading(true)
    setError('')
    catalogApi.getProducts({
      search: search || undefined,
      categoryId: categoryId || undefined,
    })
      .then(setProducts)
      .catch(err => setError(err.displayMessage || 'Erreur de chargement'))
      .finally(() => setLoading(false))
  }, [search, categoryId])

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    const next = new URLSearchParams(searchParams)
    if (searchInput.trim()) next.set('search', searchInput.trim())
    else next.delete('search')
    setSearchParams(next)
  }

  const setCategory = (id) => {
    const next = new URLSearchParams(searchParams)
    if (id) next.set('categoryId', id)
    else next.delete('categoryId')
    setSearchParams(next)
  }

  const clearFilters = () => {
    setSearchInput('')
    setSearchParams({})
  }

  return (
    <div className="page">
      <div className="container">
        <header className="page-head fade-in">
          
          <h1>Notre <em style={{ color: 'var(--terracotta)', fontStyle: 'italic' }}>catalogue</em></h1>
          <p className="lead" style={{ marginTop: '0.5rem' }}>
            Parcourez la sélection, recherchez par mot-clé, filtrez par catégorie.
          </p>
        </header>

        {/* Barre de recherche */}
        <form onSubmit={handleSearchSubmit} className="toolbar fade-in-d1">
          <input
            type="search"
            placeholder="Rechercher un produit…"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <button type="submit" className="btn btn-primary">Rechercher</button>
          {(search || categoryId) && (
            <button type="button" className="btn btn-ghost" onClick={clearFilters}>
              Réinitialiser
            </button>
          )}
        </form>

        {/* Pilules de catégories */}
        <div className="category-pills fade-in-d2">
          <button
            className={`pill ${!categoryId ? 'active' : ''}`}
            onClick={() => setCategory('')}
          >
            Toutes les catégories
          </button>
          {categories.map(c => (
            <button
              key={c.id}
              className={`pill ${String(categoryId) === String(c.id) ? 'active' : ''}`}
              onClick={() => setCategory(c.id)}
            >
              {c.name}
            </button>
          ))}
        </div>

        {/* Résultats */}
        {error && <div className="alert alert-error">{error}</div>}

        {loading ? (
          <Loading label="Chargement du catalogue…" />
        ) : products.length === 0 ? (
          <div className="empty">
            <h3>Aucun produit trouvé</h3>
            <p>Essayez de modifier vos critères de recherche.</p>
          </div>
        ) : (
          <>
            <p style={{ marginBottom: '1.5rem', color: 'var(--ink-mute)', fontSize: '0.9rem' }}>
              {products.length} produit{products.length > 1 ? 's' : ''}
              {search && <> · recherche : « <strong>{search}</strong> »</>}
            </p>
            <div className="product-grid">
              {products.map((p, i) => (
                <article
                  key={p.id}
                  className="product-card fade-in"
                  style={{ animationDelay: `${i * 0.04}s` }}
                  onClick={() => navigate(`/products/${p.id}`)}
                >
                  <div className="img-wrap">
                    <img src={p.imageUrl} alt={p.name} loading="lazy" />
                  </div>
                  <div className="body">
                    <span className="cat">{p.category?.name || 'Sans catégorie'}</span>
                    <h3 className="name">{p.name}</h3>
                    <div className="price">
                      {formatPrice(p.price)}
                      <span className="cur">MAD</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
