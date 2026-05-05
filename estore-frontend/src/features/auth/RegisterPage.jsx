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

  // Style input réutilisable
  const inputStyle = (hasError) => ({
    background: '#eae6e1',
    border: hasError
      ? '1px solid rgba(181,51,36,0.6)'
      : '1px solid rgba(0,0,0,0.12)',
    borderRadius: '2px',
    padding: '0.8rem 1.2rem',
    color: '#1c1815',
    fontSize: '0.95rem',
    fontFamily: 'var(--sans)',
    outline: 'none',
    width: '100%',
    transition: 'border-color 0.2s, background 0.2s',
  })

  const labelStyle = {
    fontSize: '0.68rem',
    letterSpacing: '0.18em',
    textTransform: 'uppercase',
    color: 'rgba(0,0,0,0.45)',
    fontFamily: 'var(--sans)',
    fontWeight: 600,
  }

  const errorStyle = {
    fontSize: '0.78rem',
    color: '#b53324',
    fontFamily: 'var(--sans)',
  }

  return (
    <div style={{
      height: '100vh',
      overflow: 'hidden',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      background: 'rgb(219, 219, 219)',
    }}>

      {/* ── CÔTÉ GAUCHE — Image + texte ── */}
      <div style={{
        position: 'relative',
        overflow: 'hidden',
        height: '100vh',
        width: '100%',
      }}>
        <img
          src="/fashion.png"
          style={{
            width: '100%', height: '100%',
            objectFit: 'cover',
            objectPosition: 'center top',
          }}
        />

        {/* Dégradé bas */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 60%)',
        }} />

        {/* Logo en haut */}
        <Link to="/" style={{
          position: 'absolute', top: '2.5rem', left: '2.5rem',
          fontFamily: 'var(--serif)',
          fontSize: '1.5rem',
          fontWeight: 400,
          color: '#fff',
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          zIndex: 2,
        }}>
          Maraya Store
        </Link>

        {/* Texte bas gauche */}
        <div style={{
          position: 'absolute',
          bottom: '3rem', left: '3rem', right: '3rem',
          zIndex: 2,
        }}>
          <p style={{
            fontSize: '0.7rem',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: '#242323',
            marginBottom: '1rem',
            fontFamily: 'var(--sans)',
            fontWeight: 600,
          }}>
            Nouveau client
          </p>
          <h2 style={{
            fontFamily: 'var(--serif)',
            fontSize: 'clamp(2rem, 3.5vw, 3rem)',
            fontWeight: 300,
            color: '#fff',
            letterSpacing: '0.04em',
            lineHeight: 1.1,
            marginBottom: '1.2rem',
          }}>
            Rejoignez<br />
            <em style={{ fontStyle: 'italic', color: '#020202' }}>la maison.</em>
          </h2>
          <p style={{
            color: 'rgba(255,255,255,0.55)',
            fontSize: '0.92rem',
            fontFamily: 'var(--serif)',
            fontStyle: 'italic',
            lineHeight: 1.6,
            maxWidth: 380,
          }}>
            « Créer un compte, c'est gagner un endroit à soi —
            un panier, des commandes, une histoire de choix. »
          </p>
        </div>
      </div>

      {/* ── CÔTÉ DROIT — Formulaire ── */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '2.5rem 4rem',
        background: '#fffcfc',
        position: 'relative',
        overflowY: 'auto',
        height: '100vh',
      }}>

        {/* Décoration cercle fond */}
        <div style={{
          position: 'absolute',
          top: '-15%', right: '-15%',
          width: '500px', height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(192,83,63,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        {/* En-tête */}
        <div style={{ marginBottom: '1.8rem' }}>
          <p style={{
            fontSize: '0.7rem',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: '#030303',
            marginBottom: '1rem',
            fontFamily: 'var(--sans)',
            fontWeight: 600,
          }}>
            Inscription
          </p>
          <h1 style={{
            fontFamily: 'var(--serif)',
            fontSize: 'clamp(1.6rem, 2.5vw, 2.2rem)',
            fontWeight: 300,
            color: '#000000',
            letterSpacing: '0.03em',
            lineHeight: 1.1,
            marginBottom: '0.5rem',
          }}>
            Créez votre<br />
            <em style={{ fontStyle: 'italic', color: '#9e9797' }}>espace personnel.</em>
          </h1>
        </div>

        {/* Erreur serveur */}
        {serverError && (
          <div style={{
            padding: '1rem 1.2rem',
            background: 'rgba(181,51,36,0.06)',
            border: '1px solid rgba(181,51,36,0.25)',
            color: '#b53324',
            borderRadius: '2px',
            fontSize: '0.88rem',
            marginBottom: '1.5rem',
            fontFamily: 'var(--sans)',
          }}>
            {serverError}
          </div>
        )}

        {/* Formulaire */}
        <form onSubmit={handleSubmit} noValidate style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
        }}>

          {/* Prénom + Nom */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={labelStyle}>Prénom</label>
              <input
                id="fn"
                value={form.firstName}
                onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                placeholder="Youssef"
                style={inputStyle(errors.firstName)}
                onFocus={e => { e.target.style.borderColor = '#c0533f'; e.target.style.background = '#ffffff' }}
                onBlur={e => { e.target.style.borderColor = errors.firstName ? 'rgba(181,51,36,0.6)' : 'rgba(0,0,0,0.12)'; e.target.style.background = '#eae6e1' }}
              />
              {errors.firstName && <span style={errorStyle}>{errors.firstName}</span>}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={labelStyle}>Nom</label>
              <input
                id="ln"
                value={form.lastName}
                onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                placeholder="Alami"
                style={inputStyle(errors.lastName)}
                onFocus={e => { e.target.style.borderColor = '#c0533f'; e.target.style.background = '#ffffff' }}
                onBlur={e => { e.target.style.borderColor = errors.lastName ? 'rgba(181,51,36,0.6)' : 'rgba(0,0,0,0.12)'; e.target.style.background = '#eae6e1' }}
              />
              {errors.lastName && <span style={errorStyle}>{errors.lastName}</span>}
            </div>
          </div>

          {/* Email */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={labelStyle}>Adresse e-mail</label>
            <input
              id="em" type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="vous@exemple.com"
              style={inputStyle(errors.email)}
              onFocus={e => { e.target.style.borderColor = '#c0533f'; e.target.style.background = '#ffffff' }}
              onBlur={e => { e.target.style.borderColor = errors.email ? 'rgba(181,51,36,0.6)' : 'rgba(0,0,0,0.12)'; e.target.style.background = '#eae6e1' }}
            />
            {errors.email && <span style={errorStyle}>{errors.email}</span>}
          </div>

          {/* Mot de passe + Confirmer */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={labelStyle}>Mot de passe</label>
              <input
                id="pw" type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder="••••••••"
                style={inputStyle(errors.password)}
                onFocus={e => { e.target.style.borderColor = '#c0533f'; e.target.style.background = '#ffffff' }}
                onBlur={e => { e.target.style.borderColor = errors.password ? 'rgba(181,51,36,0.6)' : 'rgba(0,0,0,0.12)'; e.target.style.background = '#eae6e1' }}
              />
              {errors.password && <span style={errorStyle}>{errors.password}</span>}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={labelStyle}>Confirmer</label>
              <input
                id="cf" type="password"
                value={form.confirm}
                onChange={(e) => setForm({ ...form, confirm: e.target.value })}
                placeholder="••••••••"
                style={inputStyle(errors.confirm)}
                onFocus={e => { e.target.style.borderColor = '#c0533f'; e.target.style.background = '#ffffff' }}
                onBlur={e => { e.target.style.borderColor = errors.confirm ? 'rgba(181,51,36,0.6)' : 'rgba(0,0,0,0.12)'; e.target.style.background = '#eae6e1' }}
              />
              {errors.confirm && <span style={errorStyle}>{errors.confirm}</span>}
            </div>
          </div>

          {/* Bouton */}
          <button
            type="submit"
            disabled={loading}
            style={{
              marginTop: '0.3rem',
              padding: '0.9rem',
              background: loading ? 'rgba(0,0,0,0.1)' : '#1c1815',
              color: loading ? 'rgba(0,0,0,0.3)' : '#ffffff',
              border: '1px solid #1c1815',
              borderRadius: '2px',
              fontSize: '0.75rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              fontFamily: 'var(--sans)',
              fontWeight: 700,
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.25s',
            }}
            onMouseEnter={e => {
              if (!loading) {
                e.currentTarget.style.background = 'rgb(86, 86, 86)'
                e.currentTarget.style.borderColor = '#000000'
              }
            }}
            onMouseLeave={e => {
              if (!loading) {
                e.currentTarget.style.background = '#1c1815'
                e.currentTarget.style.borderColor = '#1c1815'
              }
            }}
          >
            {loading ? 'Création en cours…' : 'Créer mon compte'}
          </button>
        </form>

        

       
      </div>

      {/* Responsive mobile */}
      <style>{`
        @media (max-width: 768px) {
          div[style*="gridTemplateColumns"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  )
}