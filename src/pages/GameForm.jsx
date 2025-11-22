import React, { useState, useEffect } from 'react'

export default function GameForm({ game, onBack, onSave, editable = false }) {
  if (!game) return null

  const [form, setForm] = useState({
    title: '',
    cover: '',
    rating: 0,
    review: '',
    hours: 0
  })

  useEffect(() => {
    setForm({
      title: game.title || '',
      cover: game.cover || '',
      rating: game.rating ?? 0,
      review: game.review || '',
      hours: game.hours ?? 0
    })
  }, [game])

  function handleChange(e) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: name === 'rating' || name === 'hours' ? Number(value) : value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (onSave) {
      const payload = { ...game, ...form }
      onSave(payload)
    }
  }

  return (
    <div className="form-root container">
      <div className="form-card">
        <button className="back-btn" onClick={onBack}>← Volver</button>

        <div className="form-inner">
          <div className="cover-preview">
            <img src={form.cover} alt={`Portada de ${form.title}`} />
          </div>

          <form className="game-form" onSubmit={handleSubmit}>
            <label>Nombre del juego</label>
            <input name="title" value={form.title} onChange={handleChange} readOnly={!editable} />

            <label>URL de portada</label>
            <input name="cover" value={form.cover} onChange={handleChange} readOnly={!editable} />

            <label>Puntuación</label>
            <input name="rating" type="number" min="0" max="5" value={form.rating} onChange={handleChange} readOnly={!editable} />

            <label>Horas jugadas</label>
            <input name="hours" type="number" min="0" value={form.hours} onChange={handleChange} readOnly={!editable} />

            <label>Reseña</label>
            <textarea name="review" value={form.review} onChange={handleChange} readOnly={!editable} />

            <div className="form-actions">
              <button type="button" className="btn" onClick={onBack}>Cancelar</button>
              <button type="submit" className="btn primary">{editable ? 'Guardar' : 'Guardar (visual)'}</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
