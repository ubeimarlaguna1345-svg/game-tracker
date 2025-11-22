import React from 'react'

function ActionButton({ children, onClick }) {
  return (
    <button className="action-btn" onClick={onClick} type="button">
      {children}
    </button>
  )
}

export default function ActionBar({ onAdd, onEdit, onMarkComplete, onStats }) {
  return (
    <div className="actionbar container">
      <ActionButton onClick={onAdd}>Agregar juego</ActionButton>
      <ActionButton onClick={onEdit}>Editar juego</ActionButton>
      <ActionButton onClick={onMarkComplete}>Marcar como completado</ActionButton>
      <ActionButton onClick={onStats}>Estadísticas</ActionButton>
    </div>
  )
}
