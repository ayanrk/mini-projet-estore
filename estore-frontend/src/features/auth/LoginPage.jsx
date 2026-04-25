import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from || '/catalog'

  const [form, setForm] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [serverError, setServerError] = useState('')
  const [loading, setLoading] = useState(false)

  const validate = () => {
    const e = {}
    if (!form.email.trim()) e.email = 'Email requis'
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Email invalide'
    if (!form.password) e.password = 'Mot de passe requis'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (ev) => {
    ev.preventDefault()
    setServerError('')
    if (!validate()) return
    setLoading(true)
    try {
      await login(form.email, form.password)
      navigate(from, { replace: true })
    } catch (err) {
      setServerError(err.displayMessage || 'Identifiants incorrects')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-wrap">
      <aside className="auth-side">
        <div>
          <span className="eyebrow" style={{ color: 'var(--terracotta-soft)' }}>Bienvenue</span>
          <h2 style={{ marginTop: '1rem' }}>
            Retour parmi <em>nous</em>.
          </h2>
        </div>
        <p className="quote">
          « Un beau commerce ne se résume pas à une transaction —
          c'est une rencontre soignée entre des personnes et des objets choisis. »
        </p>
      </aside>

      <div className="auth-form-wrap">
        <h1>Connexion</h1>
        <p className="sub">Entrez vos identifiants pour accéder à votre espace.</p>

        {serverError && <div className="alert alert-error">{serverError}</div>}

        <form onSubmit={handleSubmit} className="form" noValidate>
          <div className="field">
            <label htmlFor="email">Adresse e-mail</label>
            <input
              id="email" type="email" autoComplete="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="vous@exemple.com"
            />
            {errors.email && <span className="field-error">{errors.email}</span>}
          </div>

          <div className="field">
            <label htmlFor="password">Mot de passe</label>
            <input
              id="password" type="password" autoComplete="current-password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder="••••••••"
            />
            {errors.password && <span className="field-error">{errors.password}</span>}
          </div>

          <button type="submit" disabled={loading} className="btn btn-primary btn-block btn-lg">
            {loading ? 'Connexion…' : 'Se connecter'}
          </button>
        </form>

        <p className="switch">
          Pas encore de compte ? <Link to="/register">Créer un compte</Link>
        </p>

        <div className="alert alert-info" style={{ marginTop: '2rem', fontSize: '0.82rem' }}>
          <strong>Comptes de démonstration :</strong><br/>
          admin@estore.com / admin123<br/>
          youssef@test.com / test123
        </div>
      </div>
    </div>
  )
}
