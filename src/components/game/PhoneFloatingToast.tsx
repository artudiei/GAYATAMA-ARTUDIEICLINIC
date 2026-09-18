import React from 'react';
import { useGameStore } from '../../store/useGameStore';
import { MessageSquare, ArrowRight, X, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const PhoneFloatingToast: React.FC = () => {
  const {
    phoneToastNotification,
    gameMode,
    isPhoneOpen,
    dismissPhoneToast,
    setPhoneOpen,
    setActiveChatId
  } = useGameStore();

  if (!phoneToastNotification || isPhoneOpen || (gameMode !== 'EXPLORATION' && gameMode !== 'ENDING')) {
    return null;
  }

  const handleOpenChat = () => {
    setActiveChatId(phoneToastNotification.id);
    setPhoneOpen(true);
    dismissPhoneToast();
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: 50, scale: 0.9 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        exit={{ opacity: 0, x: 50, scale: 0.9 }}
        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
        className="fixed top-20 right-4 sm:right-6 z-40 max-w-xs sm:max-w-sm"
      >
        <div className="bg-[#18120F]/98 border-2 border-[#FFB22C] rounded-2xl p-3.5 shadow-2xl backdrop-blur-xl text-[#F7F7F7] flex flex-col gap-2 relative overflow-hidden">
          {/* Subtle top amber glow indicator */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FFB22C] via-[#FFD382] to-[#FFB22C] animate-pulse" />

          {/* Header */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#FFB22C] text-[#120E0C] flex items-center justify-center font-bold shadow-sm">
                <MessageSquare className="w-4 h-4 animate-bounce" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-[#FFB22C] block uppercase font-bold tracking-wider">
                  Pesan Masuk Klien
                </span>
                <h4 className="text-xs font-bold text-[#F7F7F7] leading-tight truncate">
                  {phoneToastNotification.senderName}
                </h4>
              </div>
            </div>

            <button
              onClick={dismissPhoneToast}
              className="p-1 rounded-md text-[#F7F7F7]/50 hover:text-white hover:bg-[#2A1E19] transition-colors"
              title="Tutup Notifikasi"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Snippet text */}
          <p className="text-[11px] text-[#F7F7F7]/85 italic line-clamp-2 leading-relaxed bg-[#241B17] p-2 rounded-lg border border-[#854836]/40">
            "{phoneToastNotification.snippet}"
          </p>

          {/* Action button */}
          <button
            onClick={handleOpenChat}
            className="w-full py-1.5 px-3 rounded-xl bg-[#FFB22C] hover:bg-[#FFC45E] text-[#120E0C] text-xs font-bold transition-all shadow-md active:scale-95 flex items-center justify-center gap-1.5"
          >
            <span>Buka & Balas di HP</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
