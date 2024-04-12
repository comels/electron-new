/* eslint-disable react/prop-types */
import { ChevronLeft, ChevronRight, Power } from 'lucide-react'
import { createContext, useContext, useEffect, useState } from 'react'
import en from '../assets/images/EN.png'
import fr from '../assets/images/FR.png'
//import eu from '../assets/images/EU.png'
import logo from '../assets/images/logo1.png'
import qrcodeEn from '../assets/images/qrcode-en.png'
import qrcode from '../assets/images/qrcode.png'
import Card from '../components/Card'
import { Button } from '../ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '../ui/dialog'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../ui/select'

const LanguageContext = createContext()

// Créez un fournisseur de contexte pour la langue sélectionnée
export const LanguageProvider = ({ children }) => {
  const [selectedLanguage, setSelectedLanguage] = useState('francais')

  return (
    <LanguageContext.Provider value={{ selectedLanguage, setSelectedLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

// Composant pour afficher les cartes
const Home = () => {
  const [isViewOpen, setIsViewOpen] = useState(false)
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const { selectedLanguage, setSelectedLanguage } = useContext(LanguageContext)

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handlePasswordSubmit = (event) => {
    event.preventDefault()

    if (password === window.electronAPI.getPassword()) {
      window.electronAPI.quitApp()
    } else {
      setErrorMessage('Mot de passe incorrect.')
      setPassword('')

      // Efface le message d'erreur après 3 secondes
      setTimeout(() => {
        setErrorMessage('')
      }, 5000)
    }
  }

  useEffect(() => {
    const updateViewStatus = (status) => {
      setIsViewOpen(status)
    }

    window.electronAPI.on('update-view-status', updateViewStatus)

    return () => {
      window.electronAPI.removeListener('update-view-status', updateViewStatus)
    }
  }, [])

  const handleButtonClick = (url) => {
    window.electronAPI.openNewWindow(url)
  }

  const handleCloseViewClick = () => {
    window.electronAPI.closeCurrentView()
  }

  const handleBackClick = () => {
    window.electronAPI.navigateBack()
  }

  const handleForwardClick = () => {
    window.electronAPI.navigateForward()
  }

  // Sites à afficher
  const sites = [
    {
      id: 1,
      href: 'https://www.maprocuration.gouv.fr/',
      hrefEnglish: 'https://www.maprocuration.gouv.fr/',
      imageSrc: qrcode,
      imageSrcEn: qrcodeEn,
      name: 'Ma procuration',
      englishName: 'My proxy',
      text: 'Je souhaite déposer une demande de procuration.',
      englishText: 'I want to submit a proxy request.'
    },
    {
      id: 2,
      href: 'https://www.service-public.fr/particuliers/vosdroits/R43241',
      hrefEnglish: 'https://www.service-public.fr/particuliers/vosdroits/R43241?lang=en',
      imageSrc: qrcode,
      imageSrcEn: qrcodeEn,
      name: 'Opération tranquillité vacances',
      englishName: 'Operation tranquility holidays',
      text: 'Je souhaite signaler mon absence pour des patrouilles de surveillance.',
      englishText: 'I want to report my absence for surveillance patrols.'
    },
    {
      id: 3,
      href: 'https://www.masecurite.interieur.gouv.fr/fr/m-orienter',
      hrefEnglish: 'https://www.masecurite.interieur.gouv.fr/en/guide-yourself',
      imageSrc: qrcode,
      imageSrcEn: qrcodeEn,
      name: "Je m'informe",
      englishName: 'I inform myself',
      text: 'Je souhaite obtenir des informations sur la sécurité.',
      englishText: 'I want to get information about security.'
    },
    {
      id: 4,
      href: 'https://www.masecurite.interieur.gouv.fr/fr',
      hrefEnglish: 'https://www.masecurite.interieur.gouv.fr/en',
      imageSrc: qrcode,
      imageSrcEn: qrcodeEn,
      name: 'Ma sécurité',
      englishName: 'My security',
      text: 'Je suis victime / Je signale / Je m’informe.',
      englishText: 'I am a victim / I report / I am informed.'
    },
    {
      id: 5,
      href: 'https://www.service-public.fr/particuliers/vosdroits/N31138',
      hrefEnglish: 'https://www.service-public.fr/particuliers/vosdroits/N31138?lang=en',
      imageSrc: qrcode,
      imageSrcEn: qrcodeEn,
      name: 'Plainte pour escroqueries',
      englishName: 'Complaint for fraud',
      text: "Je souhaite porter plainte pour escroqueries ou fraudes à l'adresse.",
      englishText: 'I want to report fraud or scams to the address.'
    }
  ]

  return (
    <div className="relative select-none bg-gradient-to-r from-[#8acff0] to-[#000091] min-h-screen flex flex-col justify-center px-20">
      {!isViewOpen && (
        // Sélecteur de langue
        <div className="flex absolute top-0 left-0 right-0 mx-10 py-4">
          <Select
            onValueChange={(value) => {
              setSelectedLanguage(value)
            }}
            defaultValue={selectedLanguage}
          >
            <SelectTrigger className="w-[80px]">
              <SelectValue placeholder="Select a language" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem className="text-2xl" value="francais">
                  <img src={fr} alt="FR" className="h-7 w-7" />
                </SelectItem>
                <SelectItem className="text-2xl" value="english">
                  <img src={en} alt="EN" className="h-7 w-7" />
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      )}
      {isViewOpen && (
        // Boutons de navigation
        <div className="flex justify-between absolute top-0 left-0 right-0 mx-10 py-4">
          <div className="flex gap-7">
            <Button onClick={handleBackClick} variant="outline" size="icon">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button onClick={handleForwardClick} variant="outline" size="icon">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <Button onClick={handleCloseViewClick} className="text-lg" variant="outline">
            {selectedLanguage === 'francais' ? "Retourner à l'accueil" : 'Back home'}
          </Button>
        </div>
      )}
      <div className="flex w-full justify-center bg-fixed bg-center">
        <div className="px-10">
          <div className="grid grid-cols-3 gap-y-12 gap-x-10">
            <div className="flex items-center flex-col mx-5">
              <img src={logo} alt="Logo-PN" className="h-full max-w-[450px] object-contain" />
              {/* <img
                src={eu}
                alt="Logo-EU"
                className="h-1/2 w-1/2 object-contain rounded-lg scale-100"
              /> */}
            </div>
            {sites.map((site) => (
              <Card
                key={site.id}
                site={site}
                onClick={handleButtonClick}
                language={selectedLanguage}
              />
            ))}
          </div>
        </div>
      </div>
      {/* Pour la saisie du mot de passe et fermer l'application */}
      <div className="absolute right-5 bottom-5">
        <Dialog>
          <DialogTrigger asChild>
            <Button size="sm" variant="outline">
              <Power className="text-[#000091] cursor-pointer" size={16} />
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="text-[#000091] text-xl">
                Action réservée aux agents
              </DialogTitle>
              <DialogDescription className=" text-sm">Passible d&apos;amendes.</DialogDescription>
            </DialogHeader>
            <form onSubmit={handlePasswordSubmit} className="grid gap-4 py-4">
              <div className="flex flex-col gap-4">
                <Label className="text-base text-[#000091]" htmlFor="password">
                  Mot de passe
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                />
                {errorMessage && <div className="text-red-500 text-xs">{errorMessage}</div>}
              </div>
              <DialogFooter>
                <Button className="text-base" type="submit">
                  Valider
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

export default Home
