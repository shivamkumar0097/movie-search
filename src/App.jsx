import { useEffect, useRef, useState } from 'react'
import './App.css'

const KEY = import.meta.env.VITE_OMDB_KEY
const API = 'https://www.omdbapi.com/'
const IDEAS = ['Batman', 'Avengers', 'Interstellar', 'Harry Potter', 'Spider-Man', 'Inception']

// OMDb sends the text "N/A" when something is missing
const ok = (v) => v && v !== 'N/A'

function Poster({ src, title }) {
  if (ok(src)) return <img className="poster" src={src} alt={title + ' poster'} loading="lazy" />
  return (
    <div className="poster none" aria-label="No poster available">
      🎬
    </div>
  )
}

// The popup with full details of one movie
function Details({ id, onClose }) {
  const [m, setM] = useState(null)
  const [err, setErr] = useState('')

  // Get details of this movie
  useEffect(() => {
    let alive = true
    fetch(`${API}?apikey=${KEY}&i=${id}&plot=short`)
      .then((r) => r.json())
      .then((d) => {
        if (!alive) return
        if (d.Response === 'False') setErr(d.Error)
        else setM(d)
      })
      .catch(() => alive && setErr('Could not load details.'))
    return () => {
      alive = false
    }
  }, [id])

  // Close with the Escape key and stop the page behind from scrolling
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        <button className="close" onClick={onClose} aria-label="Close">
          ×
        </button>

        {err && <p className="note">{err}</p>}
        {!err && !m && <p className="note">Loading…</p>}

        {m && (
          <>
            <Poster src={m.Poster} title={m.Title} />
            <div className="info">
              <h2>{m.Title}</h2>
              <p className="meta">
                {[m.Year, ok(m.Rated) && m.Rated, ok(m.Runtime) && m.Runtime].filter(Boolean).join('  •  ')}
              </p>
              {ok(m.imdbRating) && <p className="rating">★ {m.imdbRating} / 10</p>}
              {ok(m.Genre) && (
                <div className="chips">
                  {m.Genre.split(', ').map((g) => (
                    <span key={g}>{g}</span>
                  ))}
                </div>
              )}
              {ok(m.Plot) && <p className="plot">{m.Plot}</p>}
              {ok(m.Director) && (
                <p className="line">
                  <b>Director:</b> {m.Director}
                </p>
              )}
              {ok(m.Actors) && (
                <p className="line">
                  <b>Cast:</b> {m.Actors}
                </p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default function App() {
  const [query, setQuery] = useState('')
  const [movies, setMovies] = useState([])
  const [status, setStatus] = useState('idle') // idle | loading | done | error
  const [message, setMessage] = useState('')
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [picked, setPicked] = useState(null) // id of the movie shown in the popup
  const lastSearch = useRef('')

  // Ask OMDb for movies. page 1 = new search, page 2+ = "Load more"
  const search = async (text, p = 1) => {
    const term = text.trim()
    if (!term) return
    if (!KEY) {
      setStatus('error')
      setMessage('API key is missing. Add VITE_OMDB_KEY to your .env file and restart npm run dev.')
      return
    }

    if (p === 1) setMovies([])
    setStatus('loading')

    try {
      const res = await fetch(`${API}?apikey=${KEY}&s=${encodeURIComponent(term)}&type=movie&page=${p}`)
      const data = await res.json()

      if (data.Response === 'False') {
        if (p === 1) {
          setStatus('error')
          setMessage(data.Error === 'Movie not found!' ? `No movies found for “${term}”.` : data.Error)
        } else {
          setStatus('done') // no more pages
        }
        return
      }

      // Remove duplicates (OMDb sometimes repeats a movie on the next page)
      setMovies((old) => {
        const all = p === 1 ? data.Search : [...old, ...data.Search]
        return [...new Map(all.map((m) => [m.imdbID, m])).values()]
      })
      setTotal(Number(data.totalResults))
      setPage(p)
      lastSearch.current = term
      setStatus('done')
    } catch (e) {
      setStatus('error')
      setMessage('Network problem. Check your internet and try again.')
    }
  }

  // Show something on the first visit
  useEffect(() => {
    search('Avengers')
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const onSubmit = (e) => {
    e.preventDefault()
    search(query)
  }

  const pickIdea = (idea) => {
    setQuery(idea)
    search(idea)
  }

  return (
    <div className="page">
      <div className="bg" aria-hidden="true">
        <i />
        <i />
      </div>

      <header>
        <h1>Movie Search</h1>
        <p className="sub">Find any movie, see its rating and story.</p>

        <form className="bar" onSubmit={onSubmit}>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search a movie, e.g. Interstellar"
            aria-label="Search movies"
          />
          <button type="submit">Search</button>
        </form>

        <div className="ideas">
          {IDEAS.map((i) => (
            <button key={i} onClick={() => pickIdea(i)}>
              {i}
            </button>
          ))}
        </div>
      </header>

      <main>
        {status === 'error' && <p className="note">{message}</p>}

        <div className="grid">
          {/* Loading placeholders */}
          {status === 'loading' &&
            movies.length === 0 &&
            Array.from({ length: 10 }).map((_, i) => <div className="skeleton" key={i} />)}

          {movies.map((m, i) => (
            <button
              className="movie"
              key={m.imdbID}
              style={{ '--i': i % 10 }}
              onClick={() => setPicked(m.imdbID)}
            >
              <Poster src={m.Poster} title={m.Title} />
              <div className="cap">
                <b>{m.Title}</b>
                <span>{m.Year}</span>
              </div>
            </button>
          ))}
        </div>

        {status === 'done' && movies.length > 0 && (
          <p className="count">
            Showing {movies.length} of {total} results
          </p>
        )}

        {movies.length > 0 && movies.length < total && (
          <button className="more" onClick={() => search(lastSearch.current, page + 1)} disabled={status === 'loading'}>
            {status === 'loading' ? 'Loading…' : 'Load more'}
          </button>
        )}
      </main>

      {picked && <Details id={picked} onClose={() => setPicked(null)} />}
    </div>
  )
}