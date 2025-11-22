import React, { useState, useEffect } from 'react'
import Header from '../components/Header'
import ActionBar from '../components/ActionBar'
import GameCard from '../components/GameCard'
import GameForm from './GameForm'
import ReviewList from '../components/ReviewList'
 

const sampleGames = [
  {
    _id: 'g1',
    titulo: 'The Witcher 3: Wild Hunt',
    genero: 'RPG',
    plataforma: 'PC, PS4, Xbox One, Nintendo Switch',
    imagenPortada: 'https://upload.wikimedia.org/wikipedia/en/0/0c/Witcher_3_cover_art.jpg',
    rating: 5,
    descripcion: 'RPG épico con una narrativa excepcional y un mundo enorme para explorar.',
    horas: 120,
    anoLanzamiento: 2015,
    desarrollador: 'CD Projekt',
    completado: false,
    fechaCreacion: new Date().toISOString()
  },
  {
    _id: 'g2',
    titulo: 'Elden Ring',
    genero: 'Action RPG',
    plataforma: 'PC, PS4, PS5, Xbox One, Xbox Series X/S',
    imagenPortada: 'https://upload.wikimedia.org/wikipedia/en/8/8a/Elden_Ring_cover.jpg',
    rating: 5,
    descripcion: 'Desafiante, atmosférico y repleto de secretos por descubrir.',
    horas: 90,
    anoLanzamiento: 2022,
    desarrollador: 'FromSoftware',
    completado: false,
    fechaCreacion: new Date().toISOString()
  },
  {
    _id: 'g3',
    titulo: 'Hollow Knight',
    genero: 'Metroidvania',
    plataforma: 'PC, Nintendo Switch, PS4, Xbox One',
    imagenPortada: 'https://upload.wikimedia.org/wikipedia/en/3/39/Hollow_Knight_cover.png',
    rating: 5,
    descripcion: 'Metroidvania hermoso y difícil con un diseño de niveles sobresaliente.',
    horas: 60,
    anoLanzamiento: 2017,
    desarrollador: 'Team Cherry',
    completado: false,
    fechaCreacion: new Date().toISOString()
  },
  {
    _id: 'g4',
    titulo: 'Stardew Valley',
    genero: 'Simulación / RPG',
    plataforma: 'PC, Nintendo Switch, PS4, PS5, Xbox One, Mobile',
    imagenPortada: 'https://upload.wikimedia.org/wikipedia/en/8/83/Stardew_Valley_cover.jpg',
    rating: 5,
    descripcion: 'Simulador de granja relajante y adictivo con mucho contenido.',
    horas: 80,
    anoLanzamiento: 2016,
    desarrollador: 'ConcernedApe',
    completado: false,
    fechaCreacion: new Date().toISOString()
  },
  {
    _id: 'g5',
    titulo: 'Minecraft',
    genero: 'Sandbox / Supervivencia',
    plataforma: 'PC, Consolas, Mobile',
    imagenPortada: 'https://upload.wikimedia.org/wikipedia/en/5/51/Minecraft_cover.png',
    rating: 4,
    descripcion: 'Construcción y exploración sin límites; ideal para creativos.',
    horas: 200,
    anoLanzamiento: 2011,
    desarrollador: 'Mojang',
    completado: false,
    fechaCreacion: new Date().toISOString()
  },
  {
    _id: 'g6',
    titulo: 'Grand Theft Auto V',
    genero: 'Mundo abierto / Acción',
    plataforma: 'PC, PS4, PS5, Xbox One, Xbox Series X/S',
    imagenPortada: 'https://upload.wikimedia.org/wikipedia/en/a/a5/Grand_Theft_Auto_V.png',
    rating: 4,
    descripcion: 'Mundo abierto con historia y multijugador muy activo.',
    horas: 70,
    anoLanzamiento: 2013,
    desarrollador: 'Rockstar North',
    completado: false,
    fechaCreacion: new Date().toISOString()
  },
  {
    _id: 'g7',
    titulo: 'Red Dead Redemption 2',
    genero: 'Acción/Aventura',
    plataforma: 'PS4, Xbox One, PC',
    imagenPortada: 'https://upload.wikimedia.org/wikipedia/en/4/44/Red_Dead_Redemption_II.jpg',
    rating: 5,
    descripcion: 'Excelente narrativa y ambientación en el oeste americano.',
    horas: 100,
    anoLanzamiento: 2018,
    desarrollador: 'Rockstar Games',
    completado: false,
    fechaCreacion: new Date().toISOString()
  },
  {
    _id: 'g8',
    titulo: 'The Legend of Zelda: Breath of the Wild',
    genero: 'Aventura / Mundo abierto',
    plataforma: 'Nintendo Switch',
    imagenPortada: 'https://upload.wikimedia.org/wikipedia/en/0/0b/The_Legend_of_Zelda_Breath_of_the_Wild.jpg',
    rating: 5,
    descripcion: 'Exploración libre en un mundo abierto magnífico y creativo.',
    horas: 85,
    anoLanzamiento: 2017,
    desarrollador: 'Nintendo',
    completado: false,
    fechaCreacion: new Date().toISOString()
  },
  {
    _id: 'g9',
    titulo: 'Mario Kart 8 Deluxe',
    genero: 'Carreras',
    plataforma: 'Nintendo Switch',
    imagenPortada: 'https://upload.wikimedia.org/wikipedia/en/0/0b/MarioKart8BoxArt.jpg',
    rating: 4,
    descripcion: 'Carreras divertidas y perfectas para jugar con amigos y familia.',
    horas: 20,
    anoLanzamiento: 2017,
    desarrollador: 'Nintendo',
    completado: false,
    fechaCreacion: new Date().toISOString()
  },
  {
    _id: 'g10',
    titulo: 'Overwatch',
    genero: 'Shooter de héroes',
    plataforma: 'PC, Consolas',
    imagenPortada: 'https://upload.wikimedia.org/wikipedia/en/5/51/Overwatch_cover_art.jpg',
    rating: 4,
    descripcion: 'Shooter de héroes con gameplay rápido y enfoque en equipo.',
    horas: 150,
    anoLanzamiento: 2016,
    desarrollador: 'Blizzard Entertainment',
    completado: false,
    fechaCreacion: new Date().toISOString()
  },
  {
    _id: 'g11',
    titulo: 'Cyberpunk 2077',
    genero: 'RPG',
    plataforma: 'PC, PS4, PS5, Xbox One, Xbox Series X/S',
    imagenPortada: 'https://upload.wikimedia.org/wikipedia/en/9/9f/Cyberpunk_2077_box_art.jpg',
    rating: 3,
    descripcion: 'Ambicioso mundo futurista con una narrativa cinematográfica.',
    horas: 50,
    anoLanzamiento: 2020,
    desarrollador: 'CD Projekt',
    completado: false,
    fechaCreacion: new Date().toISOString()
  },
  {
    _id: 'g12',
    titulo: 'Celeste',
    genero: 'Plataformas',
    plataforma: 'PC, Nintendo Switch, PS4, Xbox One',
    imagenPortada: 'https://upload.wikimedia.org/wikipedia/en/9/9a/Celeste_cover.jpg',
    rating: 5,
    descripcion: 'Plataformas precisas con una historia emotiva y banda sonora excelente.',
    horas: 12,
    anoLanzamiento: 2018,
    desarrollador: 'Matt Makes Games',
    completado: false,
    fechaCreacion: new Date().toISOString()
  }
]

const STORAGE_KEY = 'game-tracker:games'
const STORAGE_REVIEWS = 'game-tracker:reviews'

const sampleReviews = [
  {
    _id: 'r1',
    juegoId: 'g1',
    puntuacion: 5,
    textoReseña: 'Increíble, una historia memorable y horas de contenido.',
    horasJugadas: 120,
    dificultad: 'Normal',
    recomendaria: true,
    fechaCreacion: new Date().toISOString(),
    fechaActualizacion: new Date().toISOString()
  },
  {
    _id: 'r2',
    juegoId: 'g3',
    puntuacion: 4,
    textoReseña: 'Gran juego de plataformas con buen ritmo, algo difícil en secciones.',
    horasJugadas: 45,
    dificultad: 'Difícil',
    recomendaria: true,
    fechaCreacion: new Date().toISOString(),
    fechaActualizacion: new Date().toISOString()
  }
  ,
  {
    _id: 'r3',
    juegoId: 'g2',
    puntuacion: 5,
    textoReseña: 'Elden Ring ofrece libertad total y combate satisfactorio.',
    horasJugadas: 90,
    dificultad: 'Difícil',
    recomendaria: true,
    fechaCreacion: new Date().toISOString(),
    fechaActualizacion: new Date().toISOString()
  },
  {
    _id: 'r4',
    juegoId: 'g5',
    puntuacion: 4,
    textoReseña: 'Minecraft es perfecto para creatividad y construcción casual.',
    horasJugadas: 200,
    dificultad: 'Fácil',
    recomendaria: true,
    fechaCreacion: new Date().toISOString(),
    fechaActualizacion: new Date().toISOString()
  },
  {
    _id: 'r5',
    juegoId: 'g9',
    puntuacion: 4,
    textoReseña: 'Mario Kart es ideal para partidas rápidas con amigos.',
    horasJugadas: 30,
    dificultad: 'Normal',
    recomendaria: true,
    fechaCreacion: new Date().toISOString(),
    fechaActualizacion: new Date().toISOString()
  },
  {
    _id: 'r6',
    juegoId: 'g12',
    puntuacion: 5,
    textoReseña: 'Celeste es desafiante y emotivo; una joya de plataformas.',
    horasJugadas: 15,
    dificultad: 'Difícil',
    recomendaria: true,
    fechaCreacion: new Date().toISOString(),
    fechaActualizacion: new Date().toISOString()
  }
]

export default function LibraryPage() {
  const [selectedGame, setSelectedGame] = useState(null)
  const [games, setGames] = useState(sampleGames)
  const [reviews, setReviews] = useState(sampleReviews)
  const [selectedId, setSelectedId] = useState(null)

  // Load saved games from localStorage on mount (fallback to sampleGames)
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const parsed = JSON.parse(raw)
        if (Array.isArray(parsed) && parsed.length) {
          setGames(parsed)
        }
      }
    } catch (err) {
      // ignore and keep sampleGames
      // eslint-disable-next-line no-console
      console.error('Failed to load games from localStorage', err)
    }
  }, [])

  // Persist games to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(games))
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Failed to save games to localStorage', err)
    }
  }, [games])

  // Load & persist reviews
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_REVIEWS)
      if (raw) {
        const parsed = JSON.parse(raw)
        if (Array.isArray(parsed) && parsed.length) setReviews(parsed)
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Failed to load reviews from localStorage', err)
    }
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_REVIEWS, JSON.stringify(reviews))
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Failed to save reviews to localStorage', err)
    }
  }, [reviews])

  const getId = (g) => (g && (g._id ?? g.id))

  function handleAdd() {
    // open form with an empty game object in editable mode
    setSelectedGame({ _id: null, titulo: '', imagenPortada: '', rating: 0, descripcion: '', horas: 0, completado: false, _isNew: true })
  }

  function handleSave(game) {
    const incomingId = game._id ?? game.id
    if (!incomingId) {
      // new game: assign a simple unique _id (string)
      const newId = String(Date.now())
      const newGame = { ...game, _id: newId }
      setGames(prev => [newGame, ...prev])
    } else {
      // update existing - match by _id or id
      setGames(prev => prev.map(g => ((getId(g) === incomingId) ? { ...g, ...game } : g)))
    }
    setSelectedGame(null)
  }

  function handleSelect(game) {
    setSelectedId(getId(game))
  }

  function handleOpen(game) {
    setSelectedGame(game)
  }

  function handleEditAction() {
    const g = games.find(x => getId(x) === selectedId)
    if (!g) {
      // user hasn't selected a game
      alert('Selecciona primero una tarjeta para editar (haz click sobre la tarjeta).')
      return
    }
    handleOpen(g)
  }

  function handleToggleCompleteById(id) {
    setGames(prev => prev.map(g => (getId(g) === id ? { ...g, completado: !(g.completado ?? g.completed ?? false) } : g)))
  }

  // Reviews handlers
  function handleAddReview(review) {
    const r = {
      ...review,
      _id: review._id || `r_${Date.now()}`,
      fechaCreacion: (review.fechaCreacion && (new Date(review.fechaCreacion)).toISOString()) || new Date().toISOString(),
      fechaActualizacion: (review.fechaActualizacion && (new Date(review.fechaActualizacion)).toISOString()) || new Date().toISOString()
    }
    setReviews(prev => [r, ...prev])
  }

  function handleEditReview(updated) {
    const u = { ...updated, fechaActualizacion: new Date().toISOString() }
    setReviews(prev => prev.map(r => (r._id === u._id ? { ...r, ...u } : r)))
  }

  function handleDeleteReview(id) {
    setReviews(prev => prev.filter(r => r._id !== id))
  }

  function handleMarkCompleteAction() {
    if (selectedId) {
      handleToggleCompleteById(selectedId)
    } else {
      // mark all as completed
      setGames(prev => prev.map(g => ({ ...g, completado: true })))
    }
  }
  
  function handleRate(id, value) {
    setGames(prev => prev.map(g => (getId(g) === id ? { ...g, rating: value } : g)))
  }

  if (selectedGame) {
    return (
      <div className="library-root">
        <Header />
        <main className="library-main container">
          <GameForm game={selectedGame} onBack={() => setSelectedGame(null)} onSave={handleSave} editable={true} />
          <ReviewList
            juegoId={getId(selectedGame)}
            reviews={reviews}
            onAdd={handleAddReview}
            onEdit={handleEditReview}
            onDelete={handleDeleteReview}
          />
        </main>
      </div>
    )
  }

  return (
    <div className="library-root">
      <Header />
      <ActionBar onAdd={handleAdd} onEdit={handleEditAction} onMarkComplete={handleMarkCompleteAction} />

      <main className="library-main container">
        <section className="grid">
          {games.map(game => {
            const id = getId(game)
            return (
              <GameCard
                key={id}
                game={{ ...game, onToggle: (gid) => handleToggleCompleteById(gid) }}
                onSelect={handleSelect}
                onOpen={handleOpen}
                selected={selectedId === id}
                onRate={(gid, value) => handleRate(gid, value)}
              />
            )
          })}
        </section>
      </main>
    </div>
  )
}
