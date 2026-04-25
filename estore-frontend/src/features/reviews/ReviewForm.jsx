import { useState } from 'react'
import { reviewApi } from '../../api/reviewApi'
import { useAuth } from '../../context/AuthContext'
import { Link } from 'react-router-dom'

export default function ReviewForm({ productId, onAdded }) {
  const { user } = useAuth()
  const [rating, setRating] = useState(0)
  const [hover, setHover] = useState(0)
  const [comment, setComment] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  if (!user) {
    return (
      <div className="alert alert-info" style={{ marginBottom: '2rem' }}>
        <Link to="/login" style={{ color: 'var(--terracotta)', fontWeight: 600 }}>Connectez-vous</Link>
        {' '}pour laisser un avis sur ce produit.
      </div>
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (rating < 1 || rating > 5) { setError('Choisissez une note'); return }
    if (!comment.trim()) { setError('Écrivez un commentaire'); return }
    setSubmitting(true)
    try {
      const review = await reviewApi.addReview({
        productId: Number(productId),
        userId: user.userId,
        authorName: `${user.firstName} ${user.lastName}`,
        rating,
        comment: comment.trim(),
      })
      setRating(0); setComment('')
      onAdded?.(review)
    } catch (err) {
      setError(err.displayMessage || 'Erreur lors de l\'envoi')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form className="review-form" onSubmit={handleSubmit}>
      <h3 style={{ marginBottom: '1rem' }}>Laisser un avis</h3>
      {error && <div className="alert alert-error">{error}</div>}

      <div className="field">
        <label>Votre note</label>
        <div className="rating-input" onMouseLeave={() => setHover(0)}>
          {[1,2,3,4,5].map(n => (
            <button
              key={n}
              type="button"
              className={n <= (hover || rating) ? 'on' : ''}
              onClick={() => setRating(n)}
              onMouseEnter={() => setHover(n)}
              aria-label={`${n} étoile${n > 1 ? 's' : ''}`}
            >
              ★
            </button>
          ))}
        </div>
      </div>

      <div className="field">
        <label htmlFor="comment">Votre commentaire</label>
        <textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Partagez votre expérience avec ce produit…"
          rows={4}
        />
      </div>

      <button type="submit" disabled={submitting} className="btn btn-accent">
        {submitting ? 'Envoi…' : 'Publier mon avis'}
      </button>
    </form>
  )
}
