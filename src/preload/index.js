import { contextBridge, ipcRenderer } from 'electron'
const dotenv = require('dotenv')

// Chargement des variables d'environnement
dotenv.config()

// Liste des chaînes de canal autorisées pour la communication dans les deux sens
const validChannels = ['update-view-status']

const api = {
  // Ouvrir une nouvelle fenêtre avec l'URL spécifiée
  openNewWindow: (url) => ipcRenderer.send('open-new-window', url),
  // Fermer la vue courante
  closeCurrentView: () => ipcRenderer.send('close-current-view'),
  // Naviguer vers l'arrière
  navigateBack: () => ipcRenderer.send('navigate-back'),
  // Naviguer vers l'avant
  navigateForward: () => ipcRenderer.send('navigate-forward'),
  // Appeler des méthodes du processus principal et attendre une réponse
  invoke: (channel, ...args) => ipcRenderer.invoke(channel, ...args),
  // Signaler une activité détectée
  sendActivityDetected: () => ipcRenderer.send('activity-detected'),
  // Quitter l'application
  quitApp: () => ipcRenderer.send('quit-app'),
  // Obtenir le mot de passe à partir des variables d'environnement
  getPassword: () => process.env.VITE_PASSWORD,
  // S'abonner à des événements du processus principal
  on: (channel, func) => {
    if (validChannels.includes(channel)) {
      ipcRenderer.on(channel, (event, ...args) => func(...args))
    }
  },
  // Se désabonner des événements du processus principal
  removeListener: (channel, func) => {
    if (validChannels.includes(channel)) {
      ipcRenderer.removeListener(channel, func)
    }
  }
}

// Exposer l'API dans le monde principal de manière sécurisée
if (process.contextIsolated) {
  contextBridge.exposeInMainWorld('electronAPI', api)
} else {
  console.error(
    "Le contexte d'isolation est désactivé, ce qui peut entraîner des risques de sécurité."
  )
  if (typeof window !== 'undefined') {
    window.electronAPI = api // Fallback pour les versions plus anciennes ou pour le développement
  }
}
