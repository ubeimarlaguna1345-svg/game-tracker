import React, { useState } from 'react'
import ReviewItem from './ReviewItem'
import ReviewForm from './ReviewForm'

export default function ReviewList({ juegoId, reviews = [], onAdd, onEdit, onDelete }) {
  const [showNew, setShowNew] = useState(false)

  const filtered = (reviews || []).filter(r => String(r.juegoId) === String(juegoId)).sort((a,b) => new Date(b.fechaCreacion) - new Date(a.fechaCreacion))

  function handleAdd(payload) {
    const p = { ...payload, juegoId: juegoId }
    onAdd && onAdd(p)
    setShowNew(false)
  }

  return (
    <section className="review-list">
      <h3>Reseñas</h3>
      <div className="review-controls">
        <button className="btn" onClick={() => setShowNew(s => !s)}>{showNew ? 'Cerrar' : 'Agregar reseña'}</button>
      </div>

      {showNew && <ReviewForm onSubmit={handleAdd} onCancel={() => setShowNew(false)} submitLabel="Agregar reseña" editable={true} />}

      {filtered.length === 0 ? <p>No hay reseñas para este juego.</p> : (
        <div className="reviews-grid">
          {filtered.map(r => (
            <ReviewItem key={r._id} review={r} onEdit={onEdit} onDelete={onDelete} />
          ))}
        </div>
      )}
    </section>
  )
}
