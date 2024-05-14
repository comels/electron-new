/* eslint-disable react/prop-types */
import { ArrowRight } from 'lucide-react'

const Cardlogo = ({ site, onClick, language }) => {
  // Choix de l'URL et du texte en fonction de la langue
  const url = language === 'francais' ? site.href : site.hrefEnglish
  const name = language === 'francais' ? site.name : site.englishName
  const text = language === 'francais' ? site.text : site.englishText
  const imageSrc = language === 'francais' ? site.imageSrc : site.imageSrcEn

  return (
    <button
      onClick={() => onClick(url)}
      className="h-full mx-auto min-w-[530px] min-h-[380px]"
      aria-label={`Open ${name}`}
    >
      <div className="bg-white bg-opacity-80 hover:bg-opacity-60 rounded-md w-full max-w-lg h-full flex flex-col p-2">
        <div className="bg-[#000091] bg-opacity-80 min-h-52 mb-3 flex-grow gap-3 flex px-5">
          <div className="w-2/3 flex justify-center items-center">
            <img src={site.logo} alt={name} className="rounded-xl max-h-36" loading="lazy" />
          </div>
          <div className="w-1/3 flex justify-center items-center">
            <img src={imageSrc} alt={name} className="max-h-28" loading="lazy" />
          </div>
        </div>
        <div className="p-3 flex flex-col justify-between flex-grow">
          <div>
            <h1 className="text-2xl text-left font-semibold text-[#000091]">{name}</h1>
            <p className="text-base text-left text-gray-600">{text}</p>
          </div>
          <div className="flex justify-end">
            <ArrowRight className="text-[#000091] mt-4 mx-2" />
          </div>
        </div>
      </div>
    </button>
  )
}

export default Cardlogo