import React from 'react'

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
  return (
    <article
      className={"card" + (selected ? ' selected' : '') + (game.completed ? ' completed' : '')}
      role="button"
      tabIndex={0}
      onClick={() => onSelect && onSelect(game)}
      onKeyDown={(e) => { if (e.key === 'Enter') onSelect && onSelect(game) }}
    >
      <div className="cover">
        <img
          src={game.cover}
          alt={`Portada de ${game.title}`}
          onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/default-cover.svg' }}
        />
        <button
          className={"complete-btn" + (game.completed ? ' done' : '')}
          onClick={(e) => { e.stopPropagation(); if (typeof game.onToggle === 'function') game.onToggle(game) }}
          aria-label={game.completed ? 'Marcar como no completado' : 'Marcar como completado'}
        >
          {game.completed ? '✓' : '○'}
        </button>
        {game.completed && <span className="completed-badge">Completado</span>}
      </div>

      <div className="card-body">
        <h3 className="game-title">{game.title}</h3>
        <Stars value={game.rating} onRate={onRate ? (v)=>onRate(v) : null} readOnly={!onRate} />
        <p className="review">{game.review}</p>
        <div className="meta">
          <span className="hours">⏱ {game.hours} h</span>
          <button className="details-btn" onClick={(e)=>{ e.stopPropagation(); onOpen && onOpen(game) }}>Ver detalles</button>
        </div>
      </div>
    </article>
  )
}
