import { Power } from 'lucide-react'
import { useState } from 'react'
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

// Composant pour afficher un bouton de fermeture avec validation par mot de passe
export default function CloseButton() {
  // État local pour stocker le mot de passe et les messages d'erreur
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  // Gestion du changement de mot de passe
  const handlePasswordChange = (event) => setPassword(event.target.value)

  // Gestion de la soumission du mot de passe
  const handlePasswordSubmit = (event) => {
    event.preventDefault()

    // Vérification du mot de passe via l'API Electron
    if (password === "psg") {
      window.electronAPI.quitApp() // Quitter l'application si le mot de passe est correct
    } else {
      setErrorMessage('Mot de passe incorrect.') // Afficher un message d'erreur si le mot de passe est incorrect
      setPassword('') // Réinitialiser le champ de mot de passe

      // Effacer le message d'erreur après 5 secondes
      setTimeout(() => {
        setErrorMessage('')
      }, 5000)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        {/* Bouton pour ouvrir le dialogue de saisie du mot de passe */}
        <Button size="sm" variant="outline">
          <Power className="text-[#000091] cursor-pointer" size={16} />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-[#000091] text-xl">Action réservée aux agents</DialogTitle>
          <DialogDescription className="text-sm">Passible d&apos;amendes.</DialogDescription>
        </DialogHeader>
        {/* Formulaire pour la saisie et la validation du mot de passe */}
        <form onSubmit={handlePasswordSubmit} className="grid gap-4 py-4">
          <div className="flex flex-col gap-4">
            <Label className="text-base text-[#000091]" htmlFor="password">
              Mot de passe
            </Label>
            <Input id="password" type="password" value={password} onChange={handlePasswordChange} />
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
  )
}
