import { NavLink, Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'
import { useEffect, useState } from 'react'

export default function Header() {
  const { user, logout } = useAuth()
  const { itemCount } = useCart()
  const navigate = useNavigate()

  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const initials = user
    ? `${user.firstName?.[0] ?? ''}${user.lastName?.[0] ?? ''}`.toUpperCase()
    : ''

  return (
    <header className={scrolled ? "header scrolled" : "header"}>
      <div className="container nav">
        <Link to="/" className="brand">
<<<<<<< Updated upstream
          <img  src="/Logo gray.png"
            alt="Collection Femme" 
            width="50px"
            height="50px">
          {/* <span className="brand-mark">
            
            e
            </span>
          */}
            </img>
          <span className="brand-amp">
          <span>Maraya<span className="brand-amp"> </span>Store</span>
          </span>
=======
         <img src="/logo.png" alt="logo" className="brand-mark" />
          <span>Maison<span className="brand-amp">&amp;</span>Store</span>
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
            </>
          )}
          <Link to="/cart" className="cart-btn" >
            <img src="/icone paniers.png" alt="panier" className='cart-icon' />
            <span className="cart-count" >{itemCount}</span>
          </Link>
=======
              
            </>
          )}
          <Link to="/cart" className="cart-btn">
            <img src="/icon panier (2).png" alt="Panier" className="cart-icon" />
            <span className="cart-count">{itemCount}</span>
         </Link>
>>>>>>> Stashed changes
        </div>
      </div>
    </header>
  )
}