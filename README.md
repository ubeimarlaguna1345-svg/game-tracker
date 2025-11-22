# proyecto q 10

Pequeña aplicación cliente en React (Vite) llamada "BibliotecaJuegos" para gestionar una colección personal de videojuegos,
reseñas y estadísticas personales. El proyecto es una SPA ligera y está pensado para uso local o despliegue en GitHub Pages.

Características principales
- Interfaz para listar juegos con tarjeta (`GameCard`).
- Añadir, editar y eliminar juegos desde un formulario (`GameForm`).
- Guardado local en `localStorage` (persistencia simple).
- Reseñas por juego: añadir/editar/eliminar reseñas y asociarlas a un `juegoId`.
- Valoraciones con estrellas, marcar juegos como completados y horas jugadas.
- Página de "Estadísticas Personales" con horas por día y logros por juego.
- Deploy listo para GitHub Pages (configurado en `vite.config.js`).

Tecnologías
- React 18
- Vite 5
- JavaScript (ESM)
- gh-pages (para despliegue automático a GitHub Pages)

Instalación y ejecución (Windows PowerShell)

```powershell
cd C:\repositorios\game-tracker
npm install
npm run dev
# Abre http://localhost:5173/ en el navegador
```

Construir y desplegar (GitHub Pages)

El proyecto ya incluye scripts en `package.json` para desplegar a GitHub Pages.

```powershell
cd C:\repositorios\game-tracker
npm run build    # genera la carpeta `dist`
npm run deploy   # usa gh-pages para publicar `dist` en la rama gh-pages
```

Notas importantes para GitHub Pages
- `vite.config.js` está configurado con `base: '/game-tracker/'` para que los assets funcionen en la URL `https://<usuario>.github.io/game-tracker/`.
- Si cambias el nombre del repositorio, ajusta `base` en `vite.config.js` y vuelve a desplegar.

Persistencia y claves de `localStorage`
- Juegos: `game-tracker:games`
- Reseñas: `game-tracker:reviews`

Estructura relevante del proyecto

```
game-tracker/
  package.json
  vite.config.js
  public/
    default-cover.svg   # imagen por defecto usada como fallback
  src/
    main.jsx
    App.jsx
    src/pages/
      LibraryPage.jsx
      GameForm.jsx
      EstadisticasPersonales.jsx
    src/components/
      Header.jsx
      ActionBar.jsx
      GameCard.jsx
      ReviewList.jsx
      ReviewItem.jsx
      ReviewForm.jsx
```


