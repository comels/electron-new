import { useEffect, useRef } from 'react'
import { MdTouchApp } from 'react-icons/md'
import logo from '../assets/images/logo1.png' // Assurez-vous que le chemin vers votre logo est correct

const Veille = () => {
  const width = 500 // Largeur du logo, ajustez selon les besoins
  const posX = useRef(0)
  const posY = useRef(0)
  const velocityX = useRef(1.5) // Vitesse initiale sur l'axe X, ajustez selon les besoins
  const velocityY = useRef(1.5) // Vitesse initiale sur l'axe Y, ajustez selon les besoins
  const logoRef = useRef(null) // Référence pour l'élément img

  useEffect(() => {
    const moveLogo = () => {
      if (logoRef.current) {
        const { height } = logoRef.current.getBoundingClientRect()

        // Mise à jour des positions en fonction de la vitesse
        posX.current += velocityX.current
        posY.current += velocityY.current

        // Vérification des collisions avec les bords de l'écran
        if (posX.current + width >= window.innerWidth || posX.current <= 0) {
          velocityX.current *= -1 // Inverser la direction sur l'axe X
        }
        if (posY.current + height >= window.innerHeight || posY.current <= 0) {
          velocityY.current *= -1 // Inverser la direction sur l'axe Y
        }

        // Mise à jour du style pour déplacer le logo
        logoRef.current.style.left = `${posX.current}px`
        logoRef.current.style.top = `${posY.current}px`
      }

      requestAnimationFrame(moveLogo)
    }

    moveLogo()
  }, [width])

  return (
    <div className="bg-gradient-to-r from-bluelight to-blue min-h-screen">
      <img
        ref={logoRef}
        src={logo}
        alt="logo"
        className="fixed z-10"
        style={{
          width: `${width}px`
        }}
      />
      <MdTouchApp className="text-white bottom-20 right-20 absolute animate-pulse" size={130} />
    </div>
  )
}

export default Veille
