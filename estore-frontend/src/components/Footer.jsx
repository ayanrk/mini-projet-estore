export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="brand-foot">Maraya <em style={{color:'gray', fontStyle:'italic'}}> Store </em></div>
            <p>
             Chez Maraya Store, nous combinons qualité, innovation et simplicité pour vous offrir la meilleure expérience d’achat en ligne.
            </p>
          </div>
          <div>
            <h4>Navigation</h4>
            <p><a href="/">Accueil</a></p>
            <p><a href="/catalog">Catalogue</a></p>
            <p><a href="/cart">Panier</a></p>
            <p><a href="/orders">Mes commandes</a></p>
          </div>
          <div>
            <h4>Contact</h4>
            <p>Email:   support@estore.com</p>
            <p>Téléphone:  +212 612345678</p>
            <p>Adresse:    Casablanca,Maroc</p>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} E-Store · Mini-projet Full stack</span>
        </div>
      </div>
    </footer>
  )
}
