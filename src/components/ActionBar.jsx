import React from 'react'

function ActionButton({ children }) {
  return <button className="action-btn">{children}</button>
}

export default function ActionBar() {
  return (
    <div className="actionbar container">
      <ActionButton>Agregar juego</ActionButton>
      <ActionButton>Editar juego</ActionButton>
      <ActionButton>Marcar como completado</ActionButton>
    </div>
  )
}
