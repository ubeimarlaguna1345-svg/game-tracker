import React from 'react'

function Stars({ value = 0, max = 5 }) {
  const stars = []
  for (let i = 1; i <= max; i++) {
    const on = i <= value
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
  return <div className="stars">{stars}</div>
}

export default function GameCard({ game, onSelect }) {
  return (
    <article
      className="card"
      role="button"
      tabIndex={0}
      onClick={() => onSelect && onSelect(game)}
      onKeyDown={(e) => { if (e.key === 'Enter') onSelect && onSelect(game) }}
    >
      <div className="cover">
        <img src={game.cover} alt={`Portada de ${game.title}`} />
      </div>

      <div className="card-body">
        <h3 className="game-title">{game.title}</h3>
        <Stars value={game.rating} />
        <p className="review">{game.review}</p>
        <div className="meta">
          <span className="hours">⏱ {game.hours} h</span>
          <button className="details-btn" onClick={(e)=>{ e.stopPropagation(); onSelect && onSelect(game) }}>Ver detalles</button>
        </div>
      </div>
    </article>
  )
}
