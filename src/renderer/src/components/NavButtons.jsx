/* eslint-disable react/prop-types */
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useContext } from 'react'
import { FaHome } from 'react-icons/fa'
import { LanguageContext } from '../LanguageContext'
import { Button } from '../ui/button'

// Composant pour afficher les boutons de navigation
export default function NavButtons() {
  const { selectedLanguage } = useContext(LanguageContext) // Utilisation du contexte pour obtenir la langue sélectionnée

  // Fonction pour gérer le clic sur le bouton de fermeture de la vue
  const handleCloseViewClick = () => window.electronAPI.closeCurrentView()

  // Fonction pour gérer le clic sur le bouton de retour
  const handleBackClick = () => window.electronAPI.navigateBack()

  // Fonction pour gérer le clic sur le bouton d'avance
  const handleForwardClick = () => window.electronAPI.navigateForward()

  return (
    <div className="flex gap-10 absolute top-0 left-0 right-0 px-10 py-5 bg-gradient-to-r from-bluelight to-blue">
      {/* Bouton pour revenir à l'accueil */}
      <Button onClick={handleCloseViewClick} className="text-xl" variant="outline">
        <FaHome className="h-7 w-7 mr-3 text-blue" />
        {selectedLanguage === 'francais' ? (
          <div className="text-blue font-semibold">Accueil</div>
        ) : (
          <div className="text-blue">Home</div>
        )}
      </Button>
      {/* Boutons de navigation arrière et avant */}
      <div className="flex gap-7">
        <Button onClick={handleBackClick} variant="outline" size="icon">
          <ChevronLeft className="h-4 w-4 font-bold text-blue" />
        </Button>
        <Button onClick={handleForwardClick} variant="outline" size="icon">
          <ChevronRight className="h-4 w-4 text-blue" />
        </Button>
      </div>
    </div>
  )
}
