import React, { useState, useEffect } from 'react'

const DEFAULT_COVER = import.meta.env.BASE_URL + 'default-cover.svg'

// Validation helper
function isValidURL(str) {
  try {
    new URL(str)
    return true
  } catch {
    return false
  }
}

export default function GameForm({ game, onBack, onSave, editable = false }) {
  if (!game) return null

  const [form, setForm] = useState({
    _id: game._id || game.id || null,
    titulo: '',
    genero: '',
    plataforma: '',
    anoLanzamiento: '',
    desarrollador: '',
    imagenPortada: '',
    descripcion: '',
    horas: 0,
    completado: false,
    fechaCreacion: ''
  })

  const [errors, setErrors] = useState({})

  useEffect(() => {
    // support legacy keys (title, cover, review, hours, rating)
    setForm({
      _id: game._id || game.id || null,
      titulo: game.titulo || game.title || '',
      genero: game.genero || game.genre || '',
      plataforma: game.plataforma || game.platform || '',
      anoLanzamiento: game.anoLanzamiento || game.year || game.añoLanzamiento || '',
      desarrollador: game.desarrollador || game.developer || '',
      imagenPortada: game.imagenPortada || game.cover || game.imagen || '',
      descripcion: game.descripcion || game.review || game.descripcion || '',
      horas: game.horas ?? game.hours ?? 0,
      completado: game.completado ?? game.completed ?? false,
      fechaCreacion: game.fechaCreacion || (game.fechaCreacion instanceof Date ? game.fechaCreacion.toISOString() : '') || ''
    })
  }, [game])

  function handleChange(e) {
    const { name, value, type, checked } = e.target
    let next
    if (type === 'checkbox') next = Boolean(checked)
    else next = value
    setForm(prev => ({ ...prev, [name]: next }))
  }

  function validate() {
    const err = {}
    if (!form.titulo || form.titulo.trim().length < 1) err.titulo = 'El título es requerido.'
    if (!form.genero || form.genero.trim().length < 1) err.genero = 'El género es requerido.'
    if (!form.plataforma || form.plataforma.trim().length < 1) err.plataforma = 'La plataforma es requerida.'
    const year = Number(form.anoLanzamiento)
    const currentYear = new Date().getFullYear()
    if (!form.anoLanzamiento || Number.isNaN(year) || year < 1950 || year > currentYear + 1) err.anoLanzamiento = 'Año inválido.'
    if (!form.desarrollador || form.desarrollador.trim().length < 1) err.desarrollador = 'El desarrollador es requerido.'
    if (!form.imagenPortada || !isValidURL(form.imagenPortada)) err.imagenPortada = 'URL de imagen inválida.'
    if (!form.descripcion || form.descripcion.trim().length < 5) err.descripcion = 'La descripción es demasiado corta.'
    const hrs = Number(form.horas)
    if (Number.isNaN(hrs) || hrs < 0 || hrs > 100000) err.horas = 'Horas inválidas.'
    setErrors(err)
    return Object.keys(err).length === 0
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!validate()) return
    const payload = {
      _id: form._id || `id_${Date.now()}`,
      titulo: form.titulo,
      genero: form.genero,
      plataforma: form.plataforma,
      anoLanzamiento: Number(form.anoLanzamiento),
      horas: Number(form.horas),
      desarrollador: form.desarrollador,
      imagenPortada: form.imagenPortada,
      descripcion: form.descripcion,
      completado: Boolean(form.completado),
      fechaCreacion: form.fechaCreacion ? new Date(form.fechaCreacion) : new Date()
    }
    if (onSave) onSave(payload)
  }

  return (
    <div className="form-root container">
      <div className="form-card">
        <button className="back-btn" onClick={onBack}>← Volver</button>

        <div className="form-inner">
          <div className="cover-preview">
            <img src={form.imagenPortada || DEFAULT_COVER} alt={`Portada de ${form.titulo}`} />
          </div>

          <form className="game-form" onSubmit={handleSubmit}>
            <label>
              <input name="completado" type="checkbox" checked={form.completado} onChange={handleChange} disabled={!editable} /> <strong>Completado</strong>
            </label>

            <label>Título</label>
            <input name="titulo" value={form.titulo} onChange={handleChange} readOnly={!editable} />
            {errors.titulo && <div className="field-error">{errors.titulo}</div>}

            <label>Género</label>
            <input name="genero" value={form.genero} onChange={handleChange} readOnly={!editable} />
            {errors.genero && <div className="field-error">{errors.genero}</div>}

            <label>Plataforma</label>
            <input name="plataforma" value={form.plataforma} onChange={handleChange} readOnly={!editable} />
            {errors.plataforma && <div className="field-error">{errors.plataforma}</div>}

            <label>Año de lanzamiento</label>
            <input name="anoLanzamiento" type="number" min="1950" max={new Date().getFullYear()+1} value={form.anoLanzamiento} onChange={handleChange} readOnly={!editable} />
            {errors.anoLanzamiento && <div className="field-error">{errors.anoLanzamiento}</div>}

            <label>Desarrollador</label>
            <input name="desarrollador" value={form.desarrollador} onChange={handleChange} readOnly={!editable} />
            {errors.desarrollador && <div className="field-error">{errors.desarrollador}</div>}

            <label>URL de portada</label>
            <input name="imagenPortada" value={form.imagenPortada} onChange={handleChange} readOnly={!editable} />
            {errors.imagenPortada && <div className="field-error">{errors.imagenPortada}</div>}

            <label>Descripción</label>
            <textarea name="descripcion" value={form.descripcion} onChange={handleChange} readOnly={!editable} />
            {errors.descripcion && <div className="field-error">{errors.descripcion}</div>}

            <label>Horas jugadas</label>
            <input name="horas" type="number" min="0" value={form.horas} onChange={handleChange} readOnly={!editable} />
            {errors.horas && <div className="field-error">{errors.horas}</div>}

            <label>Fecha de creación</label>
            <input name="fechaCreacion" type="date" value={form.fechaCreacion ? new Date(form.fechaCreacion).toISOString().slice(0,10) : ''} onChange={handleChange} readOnly={!editable} />

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
