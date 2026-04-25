import { NavLink, Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'

export default function Header() {
  const { user, logout } = useAuth()
  const { itemCount } = useCart()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const initials = user
    ? `${user.firstName?.[0] ?? ''}${user.lastName?.[0] ?? ''}`.toUpperCase()
    : ''

  return (
    <header className="header">
      <div className="container nav">
        <Link to="/" className="brand">
          <span className="brand-mark">e</span>
          <span>Maison<span className="brand-amp">&amp;</span>Store</span>
        </Link>

        <ul className="nav-links">
          <li><NavLink to="/" end>Accueil</NavLink></li>
          <li><NavLink to="/catalog">Catalogue</NavLink></li>
          {user && <li><NavLink to="/orders">Commandes</NavLink></li>}
          {user && <li><NavLink to="/profile">Profil</NavLink></li>}
        </ul>

        <div className="nav-actions">
          {user ? (
            <>
              <Link to="/profile" className="user-chip">
                <span className="avatar">{initials || 'U'}</span>
                <span>{user.firstName}</span>
              </Link>
              <button onClick={handleLogout} className="btn btn-ghost btn-sm">
                Déconnexion
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-ghost btn-sm">Connexion</Link>
              <Link to="/register" className="btn btn-primary btn-sm">S'inscrire</Link>
            </>
          )}
          <Link to="/cart" className="cart-btn">
            <span>Panier</span>
            <span className="cart-count">{itemCount}</span>
          </Link>
        </div>
      </div>
    </header>
  )
}
