import { useEffect, useState } from 'react'
import { authApi } from '../../api/authApi'
import { useAuth } from '../../context/AuthContext'
import Loading from '../../components/Loading'

export default function ProfilePage() {
  const { user } = useAuth()
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState({ type: '', text: '' })

  const [form, setForm] = useState({
    phone: '', address: '', city: '', country: '',
  })

  useEffect(() => {
    if (!user) return
    authApi.getProfile(user.userId)
      .then(p => {
        setProfile(p)
        setForm({
          phone: p.phone || '',
          address: p.address || '',
          city: p.city || '',
          country: p.country || '',
        })
      })
      .catch(err => setMsg({ type: 'error', text: err.displayMessage || 'Erreur de chargement' }))
      .finally(() => setLoading(false))
  }, [user])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setMsg({ type: '', text: '' })
    try {
      const updated = await authApi.updateProfile(user.userId, form)
      setProfile(updated)
      setMsg({ type: 'success', text: '✓ Profil mis à jour avec succès' })
    } catch (err) {
      setMsg({ type: 'error', text: err.displayMessage || 'Échec de la mise à jour' })
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <Loading label="Chargement du profil…" />

  return (
    <div className="page">
      <div className="container" style={{ maxWidth: 800 }}>
        <header className="page-head">
          <span className="eyebrow">Customer</span>
          <h1>Mon <em style={{color:'var(--terracotta)', fontStyle:'italic'}}>profil</em></h1>
        </header>

        {/* Identité (lecture seule) */}
        <div className="card" style={{ marginBottom: '2rem' }}>
          <span className="eyebrow" style={{ color: 'var(--ink-mute)' }}>Identité</span>
          <h3 style={{ marginTop: '0.5rem', marginBottom: '0.3rem' }}>
            {user.firstName} {user.lastName}
          </h3>
          <p style={{ color: 'var(--ink-mute)' }}>{user.email}</p>
          <p style={{ marginTop: '0.6rem', fontSize: '0.82rem', color: 'var(--ink-mute)' }}>
            ID utilisateur : #{user.userId}
          </p>
        </div>

        {/* Coordonnées éditables */}
        <div className="card">
          <span className="eyebrow" style={{ color: 'var(--ink-mute)' }}>Coordonnées</span>
          <h3 style={{ marginTop: '0.5rem', marginBottom: '1.5rem' }}>
            Informations de contact
          </h3>

          {msg.text && (
            <div className={`alert alert-${msg.type}`}>{msg.text}</div>
          )}

          <form onSubmit={handleSubmit} className="form">
            <div className="field">
              <label htmlFor="phone">Téléphone</label>
              <input
                id="phone"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="0612345678"
              />
            </div>

            <div className="field">
              <label htmlFor="address">Adresse</label>
              <input
                id="address"
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                placeholder="Numéro, rue, complément"
              />
            </div>

            <div className="field-row">
              <div className="field">
                <label htmlFor="city">Ville</label>
                <input
                  id="city"
                  value={form.city}
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
                  placeholder="Casablanca"
                />
              </div>
              <div className="field">
                <label htmlFor="country">Pays</label>
                <input
                  id="country"
                  value={form.country}
                  onChange={(e) => setForm({ ...form, country: e.target.value })}
                  placeholder="Maroc"
                />
              </div>
            </div>

            <button type="submit" disabled={saving} className="btn btn-accent btn-lg">
              {saving ? 'Enregistrement…' : 'Enregistrer les modifications'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
