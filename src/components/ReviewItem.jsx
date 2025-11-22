import React, { useState } from 'react'
import ReviewForm from './ReviewForm'

function fmtDate(d) {
  try { return new Date(d).toLocaleString() } catch { return '' }
}

export default function ReviewItem({ review, onEdit, onDelete }) {
  const [editing, setEditing] = useState(false)

  function handleUpdate(payload) {
    onEdit && onEdit(payload)
    setEditing(false)
  }

  return (
    <article className="review-item">
      {!editing ? (
        <div>
          <div className="review-meta">
            <strong>{review.puntuacion} ⭐</strong>
            <span className="review-difficulty">{review.dificultad}</span>
            <span className="review-hours">⏱ {review.horasJugadas || review.horas || 0} h</span>
            <span className="review-recommend">{review.recomendaria ? '👍 Recomendado' : '👎 No recomendado'}</span>
            <span className="review-dates">{fmtDate(review.fechaCreacion)}{review.fechaActualizacion ? ` · updated ${fmtDate(review.fechaActualizacion)}` : ''}</span>
          </div>
          <p className="review-text">{review.textoReseña}</p>
          <div className="review-actions">
            <button className="btn" onClick={() => setEditing(true)}>Editar</button>
            <button className="btn" onClick={() => onDelete && onDelete(review._id)}>Eliminar</button>
          </div>
        </div>
      ) : (
        <ReviewForm initial={review} onSubmit={handleUpdate} onCancel={() => setEditing(false)} submitLabel="Guardar" editable={true} />
      )}
    </article>
  )
}
