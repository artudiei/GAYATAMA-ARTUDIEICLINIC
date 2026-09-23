import { useGameStore } from '../store/useGameStore';
import { translations, Language, Translations } from './translations';

export const useTranslation = () => {
  const language = useGameStore((state) => state.language);
  const setLanguage = useGameStore((state) => state.setLanguage);
  const toggleLanguage = useGameStore((state) => state.toggleLanguage);

  const t: Translations = translations[language] || translations.id;

  return {
    t,
    language,
    setLanguage,
    toggleLanguage
  };
};

export * from './translations';
