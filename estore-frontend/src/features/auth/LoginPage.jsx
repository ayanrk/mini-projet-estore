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
            Espace client
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
            Retour parmi<br />
            <em style={{ fontStyle: 'italic', color: '#020202' }}>les vôtres.</em>
          </h2>
          <p style={{
            color: 'rgba(255,255,255,0.55)',
            fontSize: '0.92rem',
            fontFamily: 'var(--serif)',
            fontStyle: 'italic',
            lineHeight: 1.6,
            maxWidth: 380,
          }}>
            « Un beau commerce ne se résume pas à une transaction —
            c'est une rencontre soignée entre des personnes et des objets choisis. »
          </p>
        </div>
      </div>

      {/* ── CÔTÉ DROIT — Formulaire blanc ── */}
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

        {/* En-tête formulaire */}
        <div style={{ marginBottom: '2rem' }}>
          <p style={{
            fontSize: '0.7rem',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: '#030303',
            marginBottom: '1rem',
            fontFamily: 'var(--sans)',
            fontWeight: 600,
          }}>
            Connexion
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
            Accédez à votre<br />
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

          {/* Champ email */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{
              fontSize: '0.68rem',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'rgba(0,0,0,0.45)',
              fontFamily: 'var(--sans)',
              fontWeight: 600,
            }}>
              Adresse e-mail
            </label>
            <input
              id="email" type="email" autoComplete="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="vous@exemple.com"
              style={{
                background: '#eae6e1',
                border: errors.email
                  ? '1px solid rgba(181,51,36,0.6)'
                  : '1px solid rgba(0,0,0,0.12)',
                borderRadius: '2px',
                padding: '0.8rem 1.2rem',
                color: '#1c1815',
                fontSize: '0.95rem',
                fontFamily: 'var(--sans)',
                outline: 'none',
                transition: 'border-color 0.2s, background 0.2s',
              }}
              onFocus={e => {
                e.target.style.borderColor = '#c0533f'
                e.target.style.background = '#ffffff'
              }}
              onBlur={e => {
                e.target.style.borderColor = errors.email
                  ? 'rgba(181,51,36,0.6)'
                  : 'rgba(0,0,0,0.12)'
                e.target.style.background = '#f5f0ea'
              }}
            />
            {errors.email && (
              <span style={{ fontSize: '0.78rem', color: '#b53324', fontFamily: 'var(--sans)' }}>
                {errors.email}
              </span>
            )}
          </div>

          {/* Champ mot de passe */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{
              fontSize: '0.68rem',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'rgba(0,0,0,0.45)',
              fontFamily: 'var(--sans)',
              fontWeight: 600,
            }}>
              Mot de passe
            </label>
            <input
              id="password" type="password" autoComplete="current-password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder="••••••••"
              style={{
                background: '#eae6e1',
                border: errors.password
                  ? '1px solid rgba(181,51,36,0.6)'
                  : '1px solid rgba(0,0,0,0.12)',
                borderRadius: '2px',
                padding: '0.8rem 1.2rem',
                color: '#1c1815',
                fontSize: '0.95rem',
                fontFamily: 'var(--sans)',
                outline: 'none',
                transition: 'border-color 0.2s, background 0.2s',
              }}
              onFocus={e => {
                e.target.style.borderColor = '#c0533f'
                e.target.style.background = '#ffffff'
              }}
              onBlur={e => {
                e.target.style.borderColor = errors.password
                  ? 'rgba(181,51,36,0.6)'
                  : 'rgba(0,0,0,0.12)'
                e.target.style.background = '#f5f0ea'
              }}
            />
            {errors.password && (
              <span style={{ fontSize: '0.78rem', color: '#b53324', fontFamily: 'var(--sans)' }}>
                {errors.password}
              </span>
            )}
          </div>

          {/* Bouton connexion */}
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
            {loading ? 'Connexion en cours…' : 'Se connecter'}
          </button>
        </form>

        {/* Lien inscription */}
        <div style={{
          marginTop: '1.2rem',
          paddingTop: '1.2rem',
          borderTop: '1px solid rgba(0,0,0,0.1)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
        }}>
          <p style={{
            color: 'rgba(0, 0, 0, 0.4)',
            fontSize: '0.85rem',
            fontFamily: 'var(--sans)',
          }}>
            Pas encore de compte ?
          </p>
          <Link to="/register" style={{
            fontSize: '0.72rem',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: '#0d0d0d',
            fontFamily: 'var(--sans)',
            fontWeight: 700,
            border: '1px solid rgba(0, 0, 0, 0.4)',
            padding: '0.6rem 1.4rem',
            borderRadius: '2px',
            transition: 'all 0.25s',
          }}
            onMouseEnter={e => {
              e.currentTarget.style.background = '#1e1d1d'
              e.currentTarget.style.color = '#fff'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.color = '#000000'
            }}
          >
            Créer un compte
          </Link>
        </div>

        {/* Retour accueil */}
        <Link to="/" style={{
          position: 'absolute',
          bottom: '2rem', right: '2.5rem',
          fontSize: '0.7rem',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: 'rgba(0,0,0,0.25)',
          fontFamily: 'var(--sans)',
          fontWeight: 600,
          transition: 'color 0.2s',
        }}
          onMouseEnter={e => e.currentTarget.style.color = 'rgba(0,0,0,0.6)'}
          onMouseLeave={e => e.currentTarget.style.color = 'rgba(0,0,0,0.25)'}
        >
          ← Retour à l'accueil
        </Link>
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