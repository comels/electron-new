/* eslint-disable react/prop-types */
import { createContext, useState } from 'react'

// Création du contexte pour la gestion de la langue
export const LanguageContext = createContext()

// Fournisseur de contexte pour la langue sélectionnée
export const LanguageProvider = ({ children }) => {
  // État local pour stocker la langue sélectionnée, initialisé à 'english'
  const [selectedLanguage, setSelectedLanguage] = useState('francais')

  return (
    // Fournit la langue sélectionnée et la fonction pour la mettre à jour aux composants enfants
    <LanguageContext.Provider value={{ selectedLanguage, setSelectedLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}
