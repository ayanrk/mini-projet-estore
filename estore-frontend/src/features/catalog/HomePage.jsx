import { Link } from 'react-router-dom'

export default function HomePage() {
  return (
    <div className="page" style={{ paddingTop: 0 }}>
      {/* HERO */}
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <span className="eyebrow fade-in">Mini-projet · Full Stack 2025/26</span>
            <h1 className="fade-in-d1" style={{ marginTop: '1.5rem' }}>
              Une boutique <em>soignée</em>,<br/>
              du <em>backend</em> au panier.
            </h1>
            <p className="lead fade-in-d2">
              Catalogue, recherche, panier, commandes, avis :
              tout l'écosystème e-commerce orchestré par
              Spring Boot, JPA, MongoDB et React.
            </p>
            <div className="hero-actions fade-in-d3">
              <Link to="/catalog" className="btn btn-accent btn-lg">Parcourir le catalogue</Link>
              <Link to="/register" className="btn btn-outline btn-lg">Créer un compte</Link>
            </div>
          </div>
          <div className="hero-visual fade-in-d2"></div>
        </div>
      </section>

      {/* DOMAINES */}
      <section className="feature-strip">
        <div className="container">
          <span className="eyebrow">Architecture par domaines</span>
          <h2 style={{ margin: '0.5rem 0 2.5rem', maxWidth: 700 }}>
            Cinq domaines, une seule application — pensée comme un <em style={{color:'var(--terracotta)', fontStyle:'italic'}}>système</em>.
          </h2>
          <div className="feature-grid">
            <div className="feature">
              <span className="num">01</span>
              <h3>Customer</h3>
              <p>Inscription, connexion, profil utilisateur.</p>
            </div>
            <div className="feature">
              <span className="num">02</span>
              <h3>Catalog</h3>
              <p>Produits, catégories, recherche, filtres.</p>
            </div>
            <div className="feature">
              <span className="num">03</span>
              <h3>Inventory</h3>
              <p>Disponibilité, contrôle du stock.</p>
            </div>
            <div className="feature">
              <span className="num">04</span>
              <h3>Shopping</h3>
              <p>Panier, quantités, sous-totaux.</p>
            </div>
            <div className="feature">
              <span className="num">05</span>
              <h3>Billing</h3>
              <p>Commandes, historique, statuts.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '5rem 0' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: 720 }}>
          <span className="eyebrow">Démonstration</span>
          <h2 style={{ marginTop: '1rem' }}>
            Prêt à explorer la <em style={{color:'var(--terracotta)', fontStyle:'italic'}}>maison</em> ?
          </h2>
          <p className="lead" style={{ marginTop: '1rem', marginBottom: '2rem' }}>
            Connectez-vous avec un compte de test et parcourez les produits,
            ajoutez-les au panier, validez une commande, déposez un avis.
          </p>
          <Link to="/catalog" className="btn btn-primary btn-lg">Voir le catalogue</Link>
        </div>
      </section>
    </div>
  )
}
