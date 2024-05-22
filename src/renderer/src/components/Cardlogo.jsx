/* eslint-disable react/prop-types */
import { ArrowRight } from 'lucide-react'
import { useContext } from 'react'
import { LanguageContext } from '../LanguageContext'

// Composant Cardlogo pour afficher les cartes des sites
const Cardlogo = ({ site }) => {
  // Utilisation du contexte pour obtenir la langue sélectionnée
  const { selectedLanguage } = useContext(LanguageContext)

  // Choix de l'URL, du nom, du texte et de l'image en fonction de la langue sélectionnée
  const url = selectedLanguage === 'francais' ? site.href : site.hrefEnglish
  const name = selectedLanguage === 'francais' ? site.name : site.englishName
  const text = selectedLanguage === 'francais' ? site.text : site.englishText
  const imageSrc = selectedLanguage === 'francais' ? site.imageSrc : site.imageSrcEn

  // Fonction pour gérer le clic sur le bouton et ouvrir une nouvelle fenêtre
  const handleButtonClick = (url) => window.electronAPI.openNewWindow(url)

  return (
    <button
      onClick={() => handleButtonClick(url)}
      className="h-full mx-auto min-w-[530px] min-h-[380px]"
      aria-label={`Open ${name}`}
    >
      <div className="bg-white bg-opacity-80 hover:bg-opacity-60 rounded-md w-full max-w-lg h-full flex flex-col p-2">
        <div className="bg-[#000091] bg-opacity-80 min-h-52 mb-3 flex-grow gap-3 flex px-5">
          <div className="w-2/3 flex justify-center items-center">
            {/* Logo principal du site */}
            <img src={site.logo} alt={name} className="rounded-xl max-h-36" loading="lazy" />
          </div>
          <div className="w-1/3 flex justify-center items-center">
            {/* Image secondaire en fonction de la langue */}
            <img src={imageSrc} alt={name} className="max-h-28" loading="lazy" />
          </div>
        </div>
        <div className="p-3 flex flex-col justify-between flex-grow">
          <div>
            {/* Nom du site */}
            <h1 className="text-2xl mb-1 text-left font-semibold text-[#000091]">{name}</h1>
            {/* Description du site */}
            <p className="text-lg text-left text-gray-600">{text}</p>
          </div>
          {/* Icône de flèche indiquant l'action */}
          <div className="flex justify-end">
            <ArrowRight className="text-[#000091] mt-4 mx-2" />
          </div>
        </div>
      </div>
    </button>
  )
}

export default Cardlogo
