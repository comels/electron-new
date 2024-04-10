import { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './assets/main.css'
import { LanguageProvider } from './components/CardsQr'
import Veille from './components/Veille'
import Home from './pages/Home'

const App = () => {
  const [isActive, setIsActive] = useState(true)

  useEffect(() => {
    // Fonctions pour gérer l'activité et l'inactivité
    const handleInactivity = () => setIsActive(false)

    // Définir un délai pour l'inactivité
    let timeout = setTimeout(handleInactivity, 3000000) // 3000000 ms = 50 minutes

    // Ajouter des écouteurs pour divers événements d'activité
    window.addEventListener('mousemove', resetTimer)
    window.addEventListener('mousedown', resetTimer)
    window.addEventListener('keypress', resetTimer)
    window.addEventListener('scroll', resetTimer)

    function resetTimer() {
      clearTimeout(timeout)
      setIsActive(true)
      timeout = setTimeout(handleInactivity, 3000000) // 3000000 ms = 50 minutes
    }

    // Nettoyer les écouteurs d'événements
    return () => {
      window.removeEventListener('mousemove', resetTimer)
      window.removeEventListener('mousedown', resetTimer)
      window.removeEventListener('keypress', resetTimer)
      window.removeEventListener('scroll', resetTimer)
    }
  }, [])

  return (
    <LanguageProvider>
      <div>
        {isActive ? (
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </BrowserRouter>
        ) : (
          <Veille />
        )}
      </div>
    </LanguageProvider>
  )
}
export default App
