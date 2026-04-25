import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function RegisterPage() {
  const { register } = useAuth()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', password: '', confirm: '',
  })
  const [errors, setErrors] = useState({})
  const [serverError, setServerError] = useState('')
  const [loading, setLoading] = useState(false)

  const validate = () => {
    const e = {}
    if (!form.firstName.trim()) e.firstName = 'Prénom requis'
    if (!form.lastName.trim()) e.lastName = 'Nom requis'
    if (!form.email.trim()) e.email = 'Email requis'
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Email invalide'
    if (!form.password) e.password = 'Mot de passe requis'
    else if (form.password.length < 6) e.password = 'Au moins 6 caractères'
    if (form.password !== form.confirm) e.confirm = 'Les mots de passe ne correspondent pas'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (ev) => {
    ev.preventDefault()
    setServerError('')
    if (!validate()) return
    setLoading(true)
    try {
      const { confirm, ...payload } = form
      await register(payload)
      navigate('/catalog', { replace: true })
    } catch (err) {
      setServerError(err.displayMessage || 'Erreur lors de l\'inscription')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-wrap">
      <aside className="auth-side">
        <div>
          <span className="eyebrow" style={{ color: 'var(--terracotta-soft)' }}>Nouveau client</span>
          <h2 style={{ marginTop: '1rem' }}>
            Rejoignez la <em>maison</em>.
          </h2>
        </div>
        <p className="quote">
          « Créer un compte, c'est gagner un endroit à soi —
          un panier, des commandes, une histoire de choix. »
        </p>
      </aside>

      <div className="auth-form-wrap">
        <h1>Créer un compte</h1>
        <p className="sub">Quelques informations et le catalogue s'ouvre à vous.</p>

        {serverError && <div className="alert alert-error">{serverError}</div>}

        <form onSubmit={handleSubmit} className="form" noValidate>
          <div className="field-row">
            <div className="field">
              <label htmlFor="fn">Prénom</label>
              <input id="fn" value={form.firstName}
                onChange={(e) => setForm({ ...form, firstName: e.target.value })} />
              {errors.firstName && <span className="field-error">{errors.firstName}</span>}
            </div>
            <div className="field">
              <label htmlFor="ln">Nom</label>
              <input id="ln" value={form.lastName}
                onChange={(e) => setForm({ ...form, lastName: e.target.value })} />
              {errors.lastName && <span className="field-error">{errors.lastName}</span>}
            </div>
          </div>

          <div className="field">
            <label htmlFor="em">Adresse e-mail</label>
            <input id="em" type="email" value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })} />
            {errors.email && <span className="field-error">{errors.email}</span>}
          </div>

          <div className="field-row">
            <div className="field">
              <label htmlFor="pw">Mot de passe</label>
              <input id="pw" type="password" value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })} />
              {errors.password && <span className="field-error">{errors.password}</span>}
            </div>
            <div className="field">
              <label htmlFor="cf">Confirmer</label>
              <input id="cf" type="password" value={form.confirm}
                onChange={(e) => setForm({ ...form, confirm: e.target.value })} />
              {errors.confirm && <span className="field-error">{errors.confirm}</span>}
            </div>
          </div>

          <button type="submit" disabled={loading} className="btn btn-accent btn-block btn-lg">
            {loading ? 'Création…' : 'Créer mon compte'}
          </button>
        </form>

        <p className="switch">
          Déjà inscrit ? <Link to="/login">Se connecter</Link>
        </p>
      </div>
    </div>
  )
}
