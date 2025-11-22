import React, { useMemo } from 'react'

const DEFAULT_COVER = import.meta.env.BASE_URL + 'default-cover.svg'

function groupByDate(reviews) {
  const map = {}
  (reviews || []).forEach(r => {
    const d = r.fechaCreacion ? new Date(r.fechaCreacion).toISOString().slice(0,10) : (new Date()).toISOString().slice(0,10)
    map[d] = (map[d] || 0) + (Number(r.horasJugadas ?? r.horas ?? 0) || 0)
  })
  return map
}

function computeAchievements(game) {
  const ach = []
  if (game.completado ?? game.completed) ach.push('Completado')
  if ((game.rating ?? 0) >= 4) ach.push('Alta valoración')
  if ((game.horas ?? 0) >= 100) ach.push('Largo tiempo jugado')
  return ach
}

export default function EstadisticasPersonales({ games = [], reviews = [], onBack }) {
  try {
    // hours per day from reviews
    const hoursByDay = useMemo(() => groupByDate(reviews), [reviews])

  // mock user info (could be replaced with real auth/user data)
  const user = useMemo(() => ({
    name: 'Jugador Local',
    avatar: DEFAULT_COVER,
    memberSince: '2024-01-01'
  }), [])

  // aggregate stats from games + reviews
  const aggregates = useMemo(() => {
    const totalHoursGames = (games || []).reduce((s, g) => s + (Number(g.horas ?? g.hours ?? 0) || 0), 0)
    const totalHoursReviews = (reviews || []).reduce((s, r) => s + (Number(r.horasJugadas ?? r.horas ?? 0) || 0), 0)
    const totalHours = totalHoursGames + totalHoursReviews
    const completed = (games || []).filter(g => (g.completado ?? g.completed)).length
    const avgRating = (() => {
      const vals = (games || []).map(g => Number(g.rating ?? 0)).filter(v => v > 0)
      if (!vals.length) return 0
      return (vals.reduce((a,b)=>a+b,0)/vals.length).toFixed(2)
    })()
    // favorite genre (most frequent)
    const genreCount = {}
    (games || []).forEach(g => { const gen = g.genero ?? g.genre ?? 'Unknown'; genreCount[gen] = (genreCount[gen]||0)+1 })
    const favoriteGenre = Object.keys(genreCount).sort((a,b)=>genreCount[b]-genreCount[a])[0] || '—'
    return { totalHours, completed, avgRating, favoriteGenre }
  }, [games, reviews])

  // prepare last 7 days array
  const last7 = useMemo(() => {
    const arr = []
    for (let i=6;i>=0;i--) {
      const d = new Date()
      d.setDate(d.getDate()-i)
      const key = d.toISOString().slice(0,10)
      arr.push({ day: key, hours: hoursByDay[key] || 0 })
    }
    return arr
  }, [hoursByDay])

    const gamesWithAchievements = useMemo(() => games.map(g => ({ ...g, achievements: computeAchievements(g) })), [games])

    return (
      <div className="stats-root container">
        <button className="back-btn" onClick={onBack}>← Volver</button>
        <h2>Estadísticas Personales</h2>

        <section className="user-info" style={{display:'flex', gap:12, alignItems:'center', marginBottom:16}}>
          <img src={user.avatar} alt={user.name} style={{width:72,height:72,objectFit:'cover',borderRadius:10}} />
          <div>
            <div style={{fontSize:18,fontWeight:700}}>{user.name}</div>
            <div style={{fontSize:13,color:'#666'}}>Miembro desde {new Date(user.memberSince).toLocaleDateString()}</div>
            <div style={{marginTop:8,display:'flex',gap:12,fontSize:13}}>
              <div>Total horas: <strong>{aggregates.totalHours} h</strong></div>
              <div>Juegos completados: <strong>{aggregates.completed}</strong></div>
              <div>Valoración media: <strong>{aggregates.avgRating}</strong></div>
              <div>Género favorito: <strong>{aggregates.favoriteGenre}</strong></div>
            </div>
          </div>
        </section>

        <section className="hours-day">
          <h3>Horas jugadas (últimos 7 días)</h3>
          <div className="bars" style={{display:'flex', gap:8, alignItems:'end'}}>
            {last7.map(d => (
              <div key={d.day} style={{textAlign:'center'}}>
                <div style={{height: Math.min(150, d.hours * 3) + 'px', width:20, background:'#4f46e5', borderRadius:4, marginBottom:6}} title={`${d.hours} h`} />
                <div style={{fontSize:12}}>{d.day.slice(5)}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="achievements">
          <h3>Logros por videojuego</h3>
          <div className="ach-grid" style={{display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(220px,1fr))', gap:12}}>
            {gamesWithAchievements.map(g => (
              <div key={g._id ?? g.id} className="ach-card" style={{padding:12, border:'1px solid #ddd', borderRadius:8}}>
                <div style={{display:'flex', gap:8, alignItems:'center'}}>
                      <img src={g.imagenPortada ?? g.cover ?? DEFAULT_COVER} alt={g.titulo ?? g.title} style={{width:56, height:56, objectFit:'cover', borderRadius:6}} />
                  <div>
                    <strong>{g.titulo ?? g.title}</strong>
                    <div style={{fontSize:12, color:'#555'}}>{g.plataforma ?? g.platform}</div>
                  </div>
                </div>
                <div style={{marginTop:8}}>
                  <div style={{fontSize:13}}>Horas totales: <strong>{g.horas ?? g.hours ?? 0} h</strong></div>
                  <div style={{marginTop:6}}>
                    {g.achievements.length === 0 ? <div style={{fontSize:12, color:'#777'}}>Sin logros</div> : (
                      <ul style={{margin:0, paddingLeft:16}}>
                        {g.achievements.map(a => <li key={a}>{a}</li>)}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    )
  } catch (err) {
    return (
      <div className="stats-root container">
        <button className="back-btn" onClick={onBack}>← Volver</button>
        <h2>Estadísticas Personales</h2>
        <div style={{color:'red'}}>Se produjo un error al renderizar las estadísticas:</div>
        <pre style={{whiteSpace:'pre-wrap', background:'#fee', padding:8, borderRadius:6}}>{String(err && err.stack ? err.stack : err)}</pre>
        <div style={{marginTop:12}}>
          <strong>Debug:</strong>
          <div>Juegos: {Array.isArray(games) ? games.length : 'n/a'}</div>
          <div>Reseñas: {Array.isArray(reviews) ? reviews.length : 'n/a'}</div>
        </div>
      </div>
    )
  }
}
