export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="brand-foot">Maison <em style={{color:'var(--terracotta-soft)', fontStyle:'italic'}}>&amp;</em> Store</div>
            <p>
              Une boutique en ligne pédagogique réalisée dans le cadre du
              module Full Stack — Spring Boot, JPA, MongoDB &amp; React.
              Faculté des Sciences Ben M'Sick — Université Hassan II.
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
            <h4>Domaines</h4>
            <p>Customer · Catalog</p>
            <p>Inventory · Shopping</p>
            <p>Billing · Reviews</p>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} E-Store · Mini-projet académique</span>
          <span>Encadrant : Pr. Omar Zahour</span>
        </div>
      </div>
    </footer>
  )
}
