import React from 'react';
import { Globe } from 'lucide-react';
import { useTranslation, Language } from '../../i18n/useTranslation';

interface LanguageToggleProps {
  variant?: 'compact' | 'drawer' | 'navbar';
  className?: string;
}

export const LanguageToggle: React.FC<LanguageToggleProps> = ({
  variant = 'navbar',
  className = ''
}) => {
  const { language, setLanguage } = useTranslation();

  const handleSelect = (lang: Language) => {
    if (language !== lang) {
      setLanguage(lang);
    }
  };

  if (variant === 'drawer') {
    return (
      <div className={`flex flex-col gap-2 p-2.5 bg-[#241B17] border-2 border-[#854836] rounded-xl shadow-inner ${className}`}>
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold text-[#FFD382]/70 uppercase tracking-wider flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-[#FFB22C]" />
            {language === 'id' ? 'Bahasa / Language' : 'Language / Bahasa'}
          </span>
          <span className="text-[9px] font-mono font-bold text-[#FFB22C] uppercase">
            {language === 'id' ? 'Indonesia' : 'English'}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-1.5 bg-[#120E0C] p-1 rounded-lg border border-[#854836]/60">
          <button
            onClick={() => handleSelect('id')}
            className={`py-1.5 px-2 rounded-md text-xs font-bold transition-all flex items-center justify-center gap-1.5 active:scale-95 ${
              language === 'id'
                ? 'bg-[#FFB22C] text-[#120E0C] shadow-sm font-extrabold ring-1 ring-[#FFD382]'
                : 'text-[#F7F7F7]/70 hover:text-white hover:bg-[#241B17]'
            }`}
          >
            <span className="text-sm">🇮🇩</span>
            <span>Indonesia</span>
          </button>

          <button
            onClick={() => handleSelect('en')}
            className={`py-1.5 px-2 rounded-md text-xs font-bold transition-all flex items-center justify-center gap-1.5 active:scale-95 ${
              language === 'en'
                ? 'bg-[#FFB22C] text-[#120E0C] shadow-sm font-extrabold ring-1 ring-[#FFD382]'
                : 'text-[#F7F7F7]/70 hover:text-white hover:bg-[#241B17]'
            }`}
          >
            <Globe className="w-4 h-4 shrink-0" />
            <span>English</span>
          </button>
        </div>
      </div>
    );
  }

  // Navbar / Compact Variant (Desktop only — hidden on mobile via parent wrapper)
  return (
    <div
      className={`inline-flex items-center bg-white border-2 border-[#854836] rounded-lg p-0.5 shadow-sm shrink-0 select-none ${className}`}
      title={language === 'id' ? 'Ubah Bahasa (ID / EN)' : 'Switch Language (ID / EN)'}
    >
      <button
        onClick={() => handleSelect('id')}
        className={`px-1.5 py-0.5 sm:px-2 sm:py-1 rounded text-[10px] sm:text-[11px] font-bold font-mono transition-all flex items-center gap-1 active:scale-95 ${
          language === 'id'
            ? 'bg-[#FFB22C] text-[#120E0C] shadow-xs font-black ring-1 ring-[#854836]/30'
            : 'text-[#854836] hover:bg-[#FFB22C]/20 hover:text-[#120E0C]'
        }`}
      >
        <span className="text-[10px] leading-none">🇮🇩</span>
        <span className="font-extrabold">ID</span>
      </button>

      <div className="w-px h-3.5 bg-[#854836]/20 mx-0.5" />

      <button
        onClick={() => handleSelect('en')}
        className={`px-1.5 py-0.5 sm:px-2 sm:py-1 rounded text-[10px] sm:text-[11px] font-bold font-mono transition-all flex items-center gap-1 active:scale-95 ${
          language === 'en'
            ? 'bg-[#FFB22C] text-[#120E0C] shadow-xs font-black ring-1 ring-[#854836]/30'
            : 'text-[#854836] hover:bg-[#FFB22C]/20 hover:text-[#120E0C]'
        }`}
      >
        <Globe className="w-3 h-3 leading-none" />
        <span className="font-extrabold">EN</span>
      </button>
    </div>
  );
};

