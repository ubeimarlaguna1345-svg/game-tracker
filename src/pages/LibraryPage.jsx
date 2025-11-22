import React from 'react'
import Header from '../components/Header'
import ActionBar from '../components/ActionBar'
import GameCard from '../components/GameCard'
import GameForm from './GameForm'
import { useState } from 'react'

const sampleGames = [
  {
    id: 1,
    title: 'The Witcher 3: Wild Hunt',
    cover: 'https://upload.wikimedia.org/wikipedia/en/0/0c/Witcher_3_cover_art.jpg',
    rating: 5,
    review: 'RPG épico con una narrativa excepcional y un mundo enorme para explorar.',
    hours: 120
  },
  {
    id: 2,
    title: 'Elden Ring',
    cover: 'https://upload.wikimedia.org/wikipedia/en/8/8a/Elden_Ring_cover.jpg',
    rating: 5,
    review: 'Desafiante, atmosférico y repleto de secretos por descubrir.',
    hours: 90
  },
  {
    id: 3,
    title: 'Hollow Knight',
    cover: 'https://upload.wikimedia.org/wikipedia/en/3/39/Hollow_Knight_cover.png',
    rating: 5,
    review: 'Metroidvania hermoso y difícil con un diseño de niveles sobresaliente.',
    hours: 60
  },
  {
    id: 4,
    title: 'Stardew Valley',
    cover: 'https://upload.wikimedia.org/wikipedia/en/8/83/Stardew_Valley_cover.jpg',
    rating: 5,
    review: 'Simulador de granja relajante y adictivo con mucho contenido.',
    hours: 80
  },
  {
    id: 5,
    title: 'Minecraft',
    cover: 'https://upload.wikimedia.org/wikipedia/en/5/51/Minecraft_cover.png',
    rating: 4,
    review: 'Construcción y exploración sin límites; ideal para creativos.',
    hours: 200
  },
  {
    id: 6,
    title: 'Grand Theft Auto V',
    cover: 'https://upload.wikimedia.org/wikipedia/en/a/a5/Grand_Theft_Auto_V.png',
    rating: 4,
    review: 'Mundo abierto con historia y multijugador muy activo.',
    hours: 70
  },
  {
    id: 7,
    title: 'Red Dead Redemption 2',
    cover: 'https://upload.wikimedia.org/wikipedia/en/4/44/Red_Dead_Redemption_II.jpg',
    rating: 5,
    review: 'Excelente narrativa y ambientación en el oeste americano.',
    hours: 100
  },
  {
    id: 8,
    title: 'The Legend of Zelda: Breath of the Wild',
    cover: 'https://upload.wikimedia.org/wikipedia/en/0/0b/The_Legend_of_Zelda_Breath_of_the_Wild.jpg',
    rating: 5,
    review: 'Exploración libre en un mundo abierto magnífico y creativo.',
    hours: 85
  },
  {
    id: 9,
    title: 'Mario Kart 8 Deluxe',
    cover: 'https://upload.wikimedia.org/wikipedia/en/0/0b/MarioKart8BoxArt.jpg',
    rating: 4,
    review: 'Carreras divertidas y perfectas para jugar con amigos y familia.',
    hours: 20
  },
  {
    id: 10,
    title: 'Overwatch',
    cover: 'https://upload.wikimedia.org/wikipedia/en/5/51/Overwatch_cover_art.jpg',
    rating: 4,
    review: 'Shooter de héroes con gameplay rápido y enfoque en equipo.',
    hours: 150
  },
  {
    id: 11,
    title: 'Cyberpunk 2077',
    cover: 'https://upload.wikimedia.org/wikipedia/en/9/9f/Cyberpunk_2077_box_art.jpg',
    rating: 3,
    review: 'Ambicioso mundo futurista con una narrativa cinematográfica.',
    hours: 50
  },
  {
    id: 12,
    title: 'Celeste',
    cover: 'https://upload.wikimedia.org/wikipedia/en/9/9a/Celeste_cover.jpg',
    rating: 5,
    review: 'Plataformas precisas con una historia emotiva y banda sonora excelente.',
    hours: 12
  }
]

export default function LibraryPage() {
  const [selectedGame, setSelectedGame] = useState(null)
  const [games, setGames] = useState(sampleGames)

  function handleAdd() {
    // open form with an empty game object in editable mode
    setSelectedGame({ id: null, title: '', cover: '', rating: 0, review: '', hours: 0, _isNew: true })
  }

  function handleSave(game) {
    if (game.id == null) {
      // new game: assign id
      const maxId = games.reduce((m, g) => Math.max(m, g.id || 0), 0)
      const newGame = { ...game, id: maxId + 1 }
      setGames(prev => [newGame, ...prev])
    } else {
      // update existing
      setGames(prev => prev.map(g => (g.id === game.id ? game : g)))
    }
    setSelectedGame(null)
  }

  if (selectedGame) {
    return (
      <div className="library-root">
        <Header />
        <main className="library-main container">
          <GameForm game={selectedGame} onBack={() => setSelectedGame(null)} onSave={handleSave} editable={true} />
        </main>
      </div>
    )
  }

  return (
    <div className="library-root">
      <Header />
      <ActionBar onAdd={handleAdd} />

      <main className="library-main container">
        <section className="grid">
          {games.map(game => (
            <GameCard key={game.id} game={game} onSelect={(g)=>setSelectedGame(g)} />
          ))}
        </section>
      </main>
    </div>
  )
}
