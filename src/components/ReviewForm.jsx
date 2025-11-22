import React, { useState, useEffect } from 'react'

export default function ReviewForm({ initial = {}, onSubmit, onCancel, submitLabel = 'Enviar', editable = true }) {
  const [form, setForm] = useState({
    _id: initial._id || null,
    juegoId: initial.juegoId || null,
    puntuacion: initial.puntuacion ?? 5,
    textoReseña: initial.textoReseña || '',
    horasJugadas: initial.horasJugadas ?? initial.horas ?? 0,
    dificultad: initial.dificultad || 'Normal',
    recomendaria: initial.recomendaria ?? false
  })

  const [errors, setErrors] = useState({})

  useEffect(() => {
    setForm({
      _id: initial._id || null,
      juegoId: initial.juegoId || null,
      puntuacion: initial.puntuacion ?? 5,
      textoReseña: initial.textoReseña || '',
      horasJugadas: initial.horasJugadas ?? initial.horas ?? 0,
      dificultad: initial.dificultad || 'Normal',
      recomendaria: initial.recomendaria ?? false
    })
  }, [initial])

  function handleChange(e) {
    const { name, value, type, checked } = e.target
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? Boolean(checked) : value }))
  }

  function validate() {
    const err = {}
    const p = Number(form.puntuacion)
    if (!p || Number.isNaN(p) || p < 1 || p > 5) err.puntuacion = 'Puntuación inválida (1-5).'
    if (!form.textoReseña || form.textoReseña.trim().length < 5) err.textoReseña = 'Escribe al menos 5 caracteres.'
    const h = Number(form.horasJugadas)
    if (Number.isNaN(h) || h < 0) err.horasJugadas = 'Horas inválidas.'
    if (!['Fácil','Facil','Normal','Difícil','Dificil'].includes(form.dificultad)) err.dificultad = 'Dificultad inválida.'
    setErrors(err)
    return Object.keys(err).length === 0
  }

  function handleSubmit(e) {
    e && e.preventDefault()
    if (!validate()) return
    const now = new Date()
    const payload = {
      _id: form._id || `r_${Date.now()}`,
      juegoId: form.juegoId,
      puntuacion: Number(form.puntuacion),
      textoReseña: form.textoReseña,
      horasJugadas: Number(form.horasJugadas),
      dificultad: form.dificultad,
      recomendaria: Boolean(form.recomendaria),
      fechaCreacion: form._id ? (initial.fechaCreacion ? new Date(initial.fechaCreacion) : now) : now,
      fechaActualizacion: now
    }
    onSubmit && onSubmit(payload)
  }

  return (
    <form className="review-form" onSubmit={handleSubmit}>
      <div className="row">
        <label>Puntuación</label>
        <select name="puntuacion" value={form.puntuacion} onChange={handleChange} disabled={!editable}>
          {[1,2,3,4,5].map(n => <option key={n} value={n}>{n} ⭐</option>)}
        </select>
        {errors.puntuacion && <div className="field-error">{errors.puntuacion}</div>}
      </div>

      <div className="row">
        <label>Texto de la reseña</label>
        <textarea name="textoReseña" value={form.textoReseña} onChange={handleChange} readOnly={!editable} />
        {errors.textoReseña && <div className="field-error">{errors.textoReseña}</div>}
      </div>

      <div className="row">
        <label>Horas jugadas</label>
        <input name="horasJugadas" type="number" min="0" value={form.horasJugadas} onChange={handleChange} readOnly={!editable} />
        {errors.horasJugadas && <div className="field-error">{errors.horasJugadas}</div>}
      </div>

      <div className="row">
        <label>Dificultad</label>
        <select name="dificultad" value={form.dificultad} onChange={handleChange} disabled={!editable}>
          <option>Fácil</option>
          <option>Normal</option>
          <option>Difícil</option>
        </select>
        {errors.dificultad && <div className="field-error">{errors.dificultad}</div>}
      </div>

      <div className="row">
        <label>
          <input name="recomendaria" type="checkbox" checked={form.recomendaria} onChange={handleChange} disabled={!editable} /> Recomendaria
        </label>
      </div>

      <div className="form-actions">
        {onCancel && <button type="button" className="btn" onClick={onCancel}>Cancelar</button>}
        <button type="submit" className="btn primary">{submitLabel}</button>
      </div>
    </form>
  )
}
