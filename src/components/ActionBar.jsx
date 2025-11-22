import React from 'react'

function ActionButton({ children, onClick }) {
  return (
    <button className="action-btn" onClick={onClick} type="button">
      {children}
    </button>
  )
}

export default function ActionBar({ onAdd }) {
  return (
    <div className="actionbar container">
      <ActionButton onClick={onAdd}>Agregar juego</ActionButton>
      <ActionButton>Editar juego</ActionButton>
      <ActionButton>Marcar como completado</ActionButton>
    </div>
  )
}
