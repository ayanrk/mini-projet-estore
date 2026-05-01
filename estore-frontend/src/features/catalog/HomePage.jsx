import { Link } from 'react-router-dom'

export default function HomePage() {
  return (
    <div style={{ paddingTop: 0, background: '#070707', minHeight: '100vh' }}>

      {/* ── HERO SPLIT-SCREEN ── */}
      <section style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        height: 'calc(100vh - 0px)',
        overflow: 'hidden',
        position: 'relative',
      }}>

        {/* Panneau gauche */}
        <div style={{
          position: 'relative',
          overflow: 'hidden',
          cursor: 'pointer',
        }}
          onMouseEnter={e => e.currentTarget.querySelector('img').style.transform = 'scale(1.04)'}
          onMouseLeave={e => e.currentTarget.querySelector('img').style.transform = 'scale(1)'}
        >
          <img
<<<<<<< Updated upstream
            src="/b1.webp"
            alt="Collection Femme"
            style={{
              width: '100%', height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.8s ease',
              filter: 'brightness(0.7)',
=======
            src="/public/b1.webp.jpeg"
            alt="Collection Femme"
            style={{
              width: '  100%', height: '100vh',
              objectFit: 'cover',
              transition: 'transform 0.8s ease',
              filter: 'brightness(0.7)',
          
>>>>>>> Stashed changes
            }}
          />
          {/* Overlay dégradé bas */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to top, rgba(0, 0, 0, 0.75) 0%, transparent 50%)',
          }} />
          {/* Texte bas gauche */}
          <div style={{
            position: 'absolute', bottom: '2.5rem', left: '2.5rem', right: '2.5rem',
            color: '#fff',
          }}>
            <p style={{
              fontSize: '0.72rem', letterSpacing: '0.2em',
<<<<<<< Updated upstream
              textTransform: 'uppercase', marginBottom: '0.6rem',
=======
              textTransform: 'uppercase', marginBottom: '0.8rem',
>>>>>>> Stashed changes
              opacity: 0.85, fontFamily: 'var(--sans)',
            }}>
              NOUVELLE COLLECTION
            </p>
            <h2 style={{
              fontFamily: 'var(--serif)', fontWeight: 300,
              fontSize: 'clamp(1.6rem, 2.5vw, 2.4rem)',
              letterSpacing: '0.04em', textTransform: 'uppercase',
              lineHeight: 1.15, marginBottom: '1.2rem',
            }}>
              Collection<br/>Printemps
            </h2>
            <Link to="/catalog" style={{
              display: 'inline-block',
              padding: '0.7rem 1.8rem',
              border: '1px solid rgba(255,255,255,0.7)',
              color: '#fff',
              fontSize: '0.78rem',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              fontFamily: 'var(--sans)',
              fontWeight: 600,
              transition: 'all 0.25s',
              backdropFilter: 'blur(4px)',
              background: 'rgba(255,255,255,0.08)',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = '#000' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = '#fff' }}
            >
              Découvrir
            </Link>
          </div>
        </div>

        {/* Panneau droit */}
        <div style={{
          position: 'relative',
          overflow: 'hidden',
          cursor: 'pointer',
        }}
          onMouseEnter={e => e.currentTarget.querySelector('img').style.transform = 'scale(1.04)'}
          onMouseLeave={e => e.currentTarget.querySelector('img').style.transform = 'scale(1)'}
        >
          <img
<<<<<<< Updated upstream
            src="/b2.webp"
            alt="Collection Homme"
            style={{
              width: '100%', height: '100%',
              objectFit:'cover',
           
=======
            src="/public/b2.webp.jpeg"
            alt="Collection Homme"
            style={{
              width: '100%', height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.8s ease',
              filter: 'brightness(0.65)',
>>>>>>> Stashed changes
            }}
          />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 50%)',
          }} />
          <div style={{
            position: 'absolute', bottom: '2.5rem', left: '2.5rem', right: '2.5rem',
<<<<<<< Updated upstream
            color: '#fff',
=======
            color: '#fae8e8',
>>>>>>> Stashed changes
          }}>
            <p style={{
              fontSize: '0.72rem', letterSpacing: '0.2em',
              textTransform: 'uppercase', marginBottom: '0.6rem',
              opacity: 0.85, fontFamily: 'var(--sans)',
            }}>
              TENDANCES DU MOMENT
            </p>
            <h2 style={{
              fontFamily: 'var(--serif)', fontWeight: 300,
              fontSize: 'clamp(1.6rem, 2.5vw, 2.4rem)',
              letterSpacing: '0.04em', textTransform: 'uppercase',
<<<<<<< Updated upstream
              lineHeight: 1.15,color: '#b5b5b5', marginBottom: '1.2rem',
            }}>
              
              Collection<br/>confort et style
             
            </h2>
            {/*<Link to="/catalog" style={{
              display: 'inline-block',
              padding: '0.7rem 1.8rem',
              border: '1px solid rgba(255,255,255,0.7)',
              color: '#fff',
              fontSize: '0.78rem',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              fontFamily: 'var(--sans)',
              fontWeight: 600,
              transition: 'all 0.25s',
              backdropFilter: 'blur(4px)',
              background: 'rgba(255,255,255,0.08)',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = '#000' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = '#fff' }}
            >
              Explorer
            </Link> */}
=======
              lineHeight: 1.15, marginBottom: '1.2rem',
              color: '#a5a4a4',
            }}>
              Collection  <br/> Confort et style
            </h2>
           
>>>>>>> Stashed changes
          </div>
        </div>

        {/* Titre centré en overlay — comme "DOLCE & GABBANA" */}
        {/*  <div style={{
          position: 'absolute',
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 10,
          textAlign: 'center',
          pointerEvents: 'none',
          width: '100%',
          padding: '0 2rem',
        }}>
           <h1 style={{
            fontFamily: 'var(--serif)',
            fontSize: 'clamp(3.5rem, 9vw, 9rem)',
            fontWeight: 300,
            color: '#fff',
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            lineHeight: 0.9,
            textShadow: '0 2px 40px rgba(0,0,0,0.5)',
          }}> 
            Maison<br/>
            <span style={{ fontStyle: 'italic', fontWeight: 400, color: '#e8b9ad' }}>
              &amp; Store
            </span>
          </h1> 
        </div>
        */}
        {/* Ligne verticale centrale */}
        <div style={{
          position: 'absolute',
          left: '50%', top: 0, bottom: 0,
          width: '1px',
          background: 'rgba(255,255,255,0.25)',
          zIndex: 5,
        }} />
      </section>

<<<<<<< Updated upstream
      {/* ── BANDE DE CATÉGORIES ── 
      <section style={{
        background: '#111',
        borderTop: '1px solid #222',
        borderBottom: '1px solid #222',
        padding: '3.1rem 0',
        overflow: 'hidden',
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '3rem',
          flexWrap: 'wrap',
          padding: '0 2rem',
        }}>
          {['NEW IN', 'INFORMATIQUE', 'SPORT', 'LIVRES', 'VÊTEMENTS', 'MAISON'].map(cat => (
            <Link key={cat} to="/catalog" style={{
              color: '#aaa',
              fontSize: '0.72rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              fontFamily: 'var(--sans)',
              fontWeight: 600,
              transition: 'color 0.2s',
              whiteSpace: 'nowrap',
            }}
              onMouseEnter={e => e.currentTarget.style.color = '#fff'}
              onMouseLeave={e => e.currentTarget.style.color = '#aaa'}
            >
              {cat}
            </Link>
          ))}
        </div>
      </section>
      */}
=======
    
>>>>>>> Stashed changes

      {/* ── SECTION ÉDITORIAL 3 COLONNES ── */}
      <section style={{
        background: '#ffffff',
        padding: '5rem 2rem',
        maxWidth: 1280,
        margin: '0 auto',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1.5rem',
        }}>
          {[
            {
<<<<<<< Updated upstream
              img: '/watch.jpg',
=======
              img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80',
>>>>>>> Stashed changes
              label: 'ACCESSOIRES',
              title: 'Montres & Style',
            },
            {
<<<<<<< Updated upstream
              img: '/shoes.jpg',
              label: 'SPORT',
              title: 'Fit & Sport' ,
            },
            {
              img: '/camera.jpg',
              label: 'TECHNOLOGIE',
              title: 'High & Tech',
=======
              img: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=600&q=80',
              label: 'SPORT',
              title: 'Performance & Design',
            },
            {
              img: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=600&q=80',
              label: 'TECHNOLOGIE',
              title: 'Innovation Quotidienne',
>>>>>>> Stashed changes
            },
          ].map((item) => (
            <Link key={item.label} to="/catalog" style={{
              display: 'block',
              position: 'relative',
              overflow: 'hidden',
              aspectRatio: '3/4',
            }}
              onMouseEnter={e => {
                e.currentTarget.querySelector('img').style.transform = 'scale(1.06)'
                e.currentTarget.querySelector('.overlay').style.opacity = '1'
              }}
              onMouseLeave={e => {
                e.currentTarget.querySelector('img').style.transform = 'scale(1)'
                e.currentTarget.querySelector('.overlay').style.opacity = '0'
              }}
            >
              <img src={item.img} alt={item.title} style={{
                width: '100%', height: '100%',
                objectFit: 'cover',
                filter: 'brightness(0.75)',
                transition: 'transform 0.7s ease',
              }} />
              <div className="overlay" style={{
                position: 'absolute', inset: 0,
                background: 'rgba(0,0,0,0.3)',
                opacity: 0,
                transition: 'opacity 0.3s',
              }} />
              <div style={{
                position: 'absolute', bottom: '1.8rem', left: '1.8rem',
                color: '#fff',
              }}>
                <p style={{
                  fontSize: '0.65rem', letterSpacing: '0.2em',
                  opacity: 0.8, marginBottom: '0.4rem',
                  fontFamily: 'var(--sans)', fontWeight: 600,
                }}>
                  {item.label}
                </p>
                <h3 style={{
                  fontFamily: 'var(--serif)',
                  fontSize: '1.4rem',
                  fontWeight: 300,
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                }}>
                  {item.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── BANDEAU BAS CTA ── */}
      <section style={{
        background: '#f2f2f2',
        padding: '5rem 2rem',
        textAlign: 'center',
        borderTop: '1px solid #222',
      }}>
        <p style={{
          fontSize: '0.72rem', letterSpacing: '0.25em',
          textTransform: 'uppercase', color: '#0f0f0f',
          marginBottom: '1.5rem', fontFamily: 'var(--sans)',
        }}>
          Printemps · Été 2026
        </p>
        <h2 style={{
          fontFamily: 'var(--serif)',
          fontSize: 'clamp(2rem, 5vw, 4rem)',
          fontWeight: 300,
          color: '#0f0f0f',
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          marginBottom: '2.5rem',
          lineHeight: 1.1,
        }}>
<<<<<<< Updated upstream
           L’excellence à portée <br />
          <em style={{ fontStyle: 'italic', color: '#b7b4b3' }}>de main</em>
=======
          L'excellence à portée<br />
          <em style={{ fontStyle: 'italic', color: '#e8b9ad' }}>de panier</em>
>>>>>>> Stashed changes
        </h2>
        <Link to="/catalog" style={{
          display: 'inline-block',
          padding: '1rem 3rem',
          border: '1px solid #0b0b0b',
          color: '#090909',
          fontSize: '0.78rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          fontFamily: 'var(--sans)',
          fontWeight: 600,
          transition: 'all 0.25s',
        }}
          onMouseEnter={e => { e.currentTarget.style.background = '#6b6b6b'; e.currentTarget.style.color = '#000' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#0c0c0c' }}
        >
<<<<<<< Updated upstream
          Découvrez le catalogue entier
=======
          Voir le catalogue complet
>>>>>>> Stashed changes
        </Link>
      </section>

    </div>
  )
}