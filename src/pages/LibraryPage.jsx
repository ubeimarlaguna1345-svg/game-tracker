import React from 'react'
import Header from '../components/Header'
import ActionBar from '../components/ActionBar'
import GameCard from '../components/GameCard'

const sampleGames = [
  {
    id: 1,
    title: 'The Legend of Aventura',
    cover: 'https://via.placeholder.com/640x360.png?text=Portada+1',
    rating: 4,
    review: 'Una aventura emocionante con paisajes increíbles y narrativa cautivadora.',
    hours: 42
  },
  {
    id: 2,
    title: 'Carrera Turbo X',
    cover: 'https://via.placeholder.com/640x360.png?text=Portada+2',
    rating: 3,
    review: 'Velocidad pura y pistas bien diseñadas. Muy entretenido en multijugador.',
    hours: 16
  },
  {
    id: 3,
    title: 'Estratega Supremo',
    cover: 'https://via.placeholder.com/640x360.png?text=Portada+3',
    rating: 5,
    review: 'Profundo, desafiante y adictivo: una joya para los fans del género.',
    hours: 120
  }
]

export default function LibraryPage() {
  return (
    <div className="library-root">
      <Header />
      <ActionBar />

      <main className="library-main container">
        <section className="grid">
          {sampleGames.map(game => (
            <GameCard key={game.id} game={game} />
          ))}
        </section>
      </main>
    </div>
  )
}
