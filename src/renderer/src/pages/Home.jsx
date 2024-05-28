/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import logo from '../assets/images/logo1.png'
import Cardlogo from '../components/Cardlogo'
import CloseButton from '../components/CloseButton'
import LanguageSelector from '../components/LanguageSelector'
import NavButtons from '../components/NavButtons'
import { sites } from '../data'

// Composant principal pour afficher la page d'accueil
const Home = () => {
  // État local pour déterminer si une vue spécifique est ouverte
  const [isViewOpen, setIsViewOpen] = useState(false)

  // Effet pour gérer les mises à jour du statut de la vue via l'API Electron
  useEffect(() => {
    // Fonction pour mettre à jour le statut de la vue
    const updateViewStatus = (status) => setIsViewOpen(status)

    // Écouter l'événement 'update-view-status' depuis l'API Electron
    window.electronAPI.on('update-view-status', updateViewStatus)

    // Nettoyer l'écouteur d'événement lors du démontage du composant
    return () => {
      window.electronAPI.removeListener('update-view-status', updateViewStatus)
    }
  }, [])

  return (
    <div>
      {/* Affiche la sélection de langue et les logos des sites si aucune vue spécifique n'est ouverte */}
      {!isViewOpen && (
        <div className="relative select-none bg-gradient-to-r from-bluelight to-blue min-h-screen flex flex-col justify-center px-28">
          {/* Composant pour sélectionner la langue */}
          <LanguageSelector />
          {/* Grille pour afficher le logo principal et les logos des sites */}
          <div className="grid grid-cols-3 gap-y-12 gap-x-10">
            <img src={logo} alt="Logo-PN" className="h-full max-w-[450px] object-contain mx-auto" />
            {sites.map((site) => (
              <Cardlogo key={site.id} site={site} />
            ))}
          </div>
          {/* Bouton pour fermer l'application */}
          <div className="absolute right-5 bottom-5">
            <CloseButton />
          </div>
        </div>
      )}
      {/* Affiche les boutons de navigation si une vue spécifique est ouverte */}
      {isViewOpen && <NavButtons />}
    </div>
  )
}

export default Home
