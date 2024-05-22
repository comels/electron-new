import { useContext } from 'react'
import { LanguageContext } from '../LanguageContext'
import en from '../assets/images/EN.png'
import fr from '../assets/images/FR.png'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../ui/select'

// Composant pour sélectionner la langue de l'application
export default function LanguageSelector() {
  // Utilisation du contexte pour obtenir et définir la langue sélectionnée
  const { selectedLanguage, setSelectedLanguage } = useContext(LanguageContext)

  return (
    <div className="flex absolute top-0 left-0 right-0 mx-10 py-4">
      {/* Composant Select pour choisir la langue */}
      <Select
        onValueChange={(value) => {
          setSelectedLanguage(value) // Met à jour la langue sélectionnée dans le contexte
        }}
        defaultValue={selectedLanguage} // Définit la langue sélectionnée par défaut
      >
        <SelectTrigger className="w-[80px]">
          {/* Affiche la valeur sélectionnée */}
          <SelectValue placeholder="Select a language" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {/* Option pour la langue française */}
            <SelectItem className="text-2xl" value="francais">
              <img src={fr} alt="FR" className="h-7 w-7" />
            </SelectItem>
            {/* Option pour la langue anglaise */}
            <SelectItem className="text-2xl" value="english">
              <img src={en} alt="EN" className="h-7 w-7" />
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}
