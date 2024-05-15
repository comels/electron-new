import { useEffect, useState } from 'react'
import './assets/main.css'
// import Home, { LanguageProvider } from './pages/Home' // Page d'accueil de l'application
import Home, { LanguageProvider } from './pages/Home' // Page d'accueil de l'application
import Veille from './pages/Veille' // Composant affiché en mode veille

/**
 * Composant App principal qui gère l'affichage de la page d'accueil ou du mode veille
 * en fonction de l'activité de l'utilisateur et de l'état de la vue.
 */
const App = () => {
  // État pour suivre si l'application est en mode actif ou veille
  const [isActive, setIsActive] = useState(true)

  useEffect(() => {
    let timeout = null

    const resetTimer = () => {
      clearTimeout(timeout) // Arrête le timer précédent
      setIsActive(true) // Réactive l'état actif
      timeout = setTimeout(handleInactivity, 60000) // Déclenche la vérification d'inactivité après 1 minute
    }

    /**
     * Gère l'inactivité de l'utilisateur.
     * Vérifie si une vue spécifique est ouverte et passe en mode veille si nécessaire.
     */
    const handleInactivity = async () => {
      // Vérifie l'état de la vue via l'API Electron
      const isViewOpen = await window.electronAPI.invoke('get-current-view')
      if (!isViewOpen) {
        setIsActive(false) // Passe en mode veille si aucune vue n'est ouverte
      } else {
        resetTimer() // Réinitialise le timer si une vue est ouverte
      }
    }

    // Ajout des écouteurs d'événements pour réinitialiser le timer lors des activités de l'utilisateur
    window.addEventListener('mousemove', resetTimer)
    window.addEventListener('mousedown', resetTimer)
    window.addEventListener('keypress', resetTimer)
    window.addEventListener('scroll', resetTimer)

    // Suppression des écouteurs d'événements au démontage du composant
    return () => {
      window.removeEventListener('mousemove', resetTimer)
      window.removeEventListener('mousedown', resetTimer)
      window.removeEventListener('keypress', resetTimer)
      window.removeEventListener('scroll', resetTimer)
    }
  }, [])

  // Rendu conditionnel du composant Home ou Veille basé sur l'état isActive
  return (
    <LanguageProvider>
      <div>{isActive ? <Home /> : <Veille />}</div>
    </LanguageProvider>
  )
}

export default App // Exportation du composant App
