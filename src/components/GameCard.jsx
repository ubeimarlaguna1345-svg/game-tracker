import React from 'react'

const DEFAULT_COVER = import.meta.env.BASE_URL + 'default-cover.svg'

function Stars({ value = 0, max = 5, onRate, readOnly = true }) {
  const stars = []
  for (let i = 1; i <= max; i++) {
    const on = i <= value
    if (onRate && !readOnly) {
      // interactive star button
      stars.push(
        <button
          key={i}
          type="button"
          className={on ? 'star on star-btn' : 'star star-btn'}
          aria-label={`${i} estrellas`}
          onClick={(e) => { e.stopPropagation(); onRate(i) }}
          onKeyDown={(e) => { if (e.key === 'Enter') { e.stopPropagation(); onRate(i) } }}
        >
          <svg viewBox="0 0 20 20" width="16" height="16" fill="currentColor" aria-hidden>
            <path d="M10 1.6l2.2 4.46 4.93.72-3.57 3.48.84 4.9L10 13.77 5.58 15.16l.84-4.9L2.85 6.78l4.93-.72L10 1.6z" />
          </svg>
        </button>
      )
    } else {
      stars.push(
        <svg
          key={i}
          className={on ? 'star on' : 'star'}
          viewBox="0 0 20 20"
          width="16"
          height="16"
          fill="currentColor"
          aria-hidden
        >
          <path d="M10 1.6l2.2 4.46 4.93.72-3.57 3.48.84 4.9L10 13.77 5.58 15.16l.84-4.9L2.85 6.78l4.93-.72L10 1.6z" />
        </svg>
      )
    }
  }
  return <div className="stars">{stars}</div>
}

export default function GameCard({ game, onSelect, onOpen, selected, onRate }) {
  const id = game._id ?? game.id
  const titulo = game.titulo ?? game.title ?? 'Sin título'
  const imagen = game.imagenPortada ?? game.cover ?? DEFAULT_COVER
  const descripcion = game.descripcion ?? game.review ?? ''
  const rating = typeof game.rating === 'number' ? game.rating : 0
  const completed = game.completado ?? game.completed ?? false
  const ano = game.anoLanzamiento ?? game.year ?? null
  const horas = game.horas ?? game.hours ?? null

  return (
    <article
      className={"card" + (selected ? ' selected' : '') + (completed ? ' completed' : '')}
      role="button"
      tabIndex={0}
      onClick={() => onSelect && onSelect(game)}
      onKeyDown={(e) => { if (e.key === 'Enter') onSelect && onSelect(game) }}
    >
      <div className="cover">
        <img
          src={imagen}
          alt={`Portada de ${titulo}`}
          onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = DEFAULT_COVER }}
        />
        <button
          className={"complete-btn" + (completed ? ' done' : '')}
          onClick={(e) => { e.stopPropagation(); if (typeof game.onToggle === 'function') game.onToggle(id) }}
          aria-label={completed ? 'Marcar como no completado' : 'Marcar como completado'}
        >
          {completed ? '✓' : '○'}
        </button>
        {completed && <span className="completed-badge">Completado</span>}
      </div>

      <div className="card-body">
        <h3 className="game-title">{titulo}</h3>
        <Stars value={rating} onRate={onRate ? (v) => onRate(id, v) : null} readOnly={!onRate} />
        <p className="review">{descripcion}</p>
        <div className="meta">
          {ano ? <span className="year">📅 {ano}</span> : null}
          {horas ? <span className="hours">⏱ {horas} h</span> : null}
          <button className="details-btn" onClick={(e) => { e.stopPropagation(); onOpen && onOpen(game) }}>Ver detalles</button>
        </div>
      </div>
    </article>
  )
}
