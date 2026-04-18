import { createContext, useContext, useState } from 'react'
import translations from '../i18n/translations'

const LanguageContext = createContext()

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('en')

  const t = (path) => {
    const keys = path.split('.')
    let val = translations[lang]
    for (const k of keys) {
      if (val == null) return path
      val = val[k]
    }
    return val ?? path
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, translations: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLang() {
  return useContext(LanguageContext)
}
