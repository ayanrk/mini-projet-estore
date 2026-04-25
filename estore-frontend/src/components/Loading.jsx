export default function Loading({ label = 'Chargement…' }) {
  return (
    <div className="loading-page">
      <div style={{ textAlign: 'center' }}>
        <div className="spinner" />
        <p style={{ marginTop: '1rem', color: 'var(--ink-mute)', fontSize: '0.9rem' }}>
          {label}
        </p>
      </div>
    </div>
  )
}
