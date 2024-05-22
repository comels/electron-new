import maprocurationlogo from './assets/images/MaProcuration-logo.png'
import masecuritelogo from './assets/images/MaSecurite-logo.png'
import otvlogo from './assets/images/OTV-logo.png'
import rdvlogo from './assets/images/RDV-logo.png'
import qrcodeOTV from './assets/images/qrcode-OTV.png'
import qrcodeRDV from './assets/images/qrcode-RDV.png'
import qrcodeThesee from './assets/images/qrcode-THESEE.png'
import qrcodeEn from './assets/images/qrcode-en.png'
import qrcodeProcuration from './assets/images/qrcode-procuration.png'
import qrcodeSecurite from './assets/images/qrcode-securite.png'
import theseelogo from './assets/images/theseeblanc-logo.png'

export const sites = [
  {
    id: 1,
    href: 'https://www.maprocuration.gouv.fr/',
    hrefEnglish: 'https://www.maprocuration.gouv.fr/',
    logo: maprocurationlogo,
    imageSrc: qrcodeProcuration,
    imageSrcEn: qrcodeEn,
    name: 'Ma procuration',
    englishName: 'My voting proxy',
    text: 'Je souhaite déposer une demande de procuration.',
    englishText: 'I would like to request a proxy.'
  },
  {
    id: 2,
    href: 'https://www.service-public.fr/particuliers/vosdroits/R43241',
    hrefEnglish: 'https://www.service-public.fr/particuliers/vosdroits/R43241?lang=en',
    logo: otvlogo,
    imageSrc: qrcodeOTV,
    imageSrcEn: qrcodeEn,
    name: 'Opération tranquillité vacances',
    englishName: 'Operation Vacation Tranquility',
    text: 'Je souhaite signaler mon absence pour la surveillance de mon domicile.',
    englishText: 'I would like to report my absence for home surveillance.'
  },
  {
    id: 3,
    href: 'https://www.masecurite.interieur.gouv.fr/fr/m-orienter?PRDV=1',
    hrefEnglish: 'https://www.masecurite.interieur.gouv.fr/en/guide-yourself',
    logo: rdvlogo,
    imageSrc: qrcodeRDV,
    imageSrcEn: qrcodeEn,
    name: 'Rendez-vous',
    englishName: 'Appointment',
    text: 'Je souhaite prendre rendez-vous dans un commissariat.',
    englishText: 'I would like to make an appointment at a police station.'
  },
  {
    id: 4,
    href: 'https://www.service-public.fr/particuliers/vosdroits/N31138',
    hrefEnglish: 'https://www.service-public.fr/particuliers/vosdroits/N31138?lang=en',
    logo: theseelogo,
    imageSrc: qrcodeThesee,
    imageSrcEn: qrcodeEn,
    name: 'Plainte pour escroqueries',
    englishName: 'Complaint for fraud',
    text: 'Je souhaite porter plainte pour escroqueries sur internet.',
    englishText: 'I would like to file a complaint for internet scams.'
  },
  {
    id: 5,
    href: 'https://www.masecurite.interieur.gouv.fr/fr',
    hrefEnglish: 'https://www.masecurite.interieur.gouv.fr/en',
    logo: masecuritelogo,
    imageSrc: qrcodeSecurite,
    imageSrcEn: qrcodeEn,
    name: 'Ma sécurité',
    englishName: 'My security',
    text: 'Je suis victime / Je m’informe.',
    englishText: "I'm a victim / I'm informed."
  }
]
