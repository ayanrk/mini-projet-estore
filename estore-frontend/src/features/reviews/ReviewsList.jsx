import { formatDateShort } from '../../utils/format'

export default function ReviewsList({ reviews }) {
  if (!reviews || reviews.length === 0) {
    return (
      <div className="empty" style={{ padding: '2rem 0' }}>
        <h3>Aucun avis pour le moment</h3>
        <p>Soyez le premier à donner votre avis sur ce produit.</p>
      </div>
    )
  }

  // Moyenne
  const avg = reviews.reduce((s, r) => s + r.rating, 0) / reviews.length

  return (
    <div>
      <div style={{
        display: 'flex',
        alignItems: 'baseline',
        gap: '1rem',
        marginBottom: '1.5rem',
        paddingBottom: '1rem',
        borderBottom: '1px solid var(--line-soft)'
      }}>
        <span style={{
          fontFamily: 'var(--serif)',
          fontSize: '2rem',
          fontWeight: 500,
          color: 'var(--terracotta-deep)'
        }}>
          {avg.toFixed(1)}
        </span>
        
      </div>

      {reviews.map(r => (
        <div className="review" key={r.id}>
          <div className="review-head">
            <span className="review-author">{r.authorName || 'Anonyme'}</span>
            <span className="review-rating">
              {'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}
            </span>
            <span className="review-date">{formatDateShort(r.createdAt)}</span>
          </div>
          <p className="review-comment">{r.comment}</p>
        </div>
      ))}
    </div>
  )
}
