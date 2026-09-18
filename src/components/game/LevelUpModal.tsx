import React, { useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Award, Sparkles, CheckCircle2 } from 'lucide-react';
import { useGameStore } from '../../store/useGameStore';

interface ParticleData {
  id: number;
  px: number;
  py: number;
  color: string;
  size: number;
  delay: string;
}

export const LevelUpModal: React.FC = React.memo(() => {
  const levelUpNotification = useGameStore(state => state.levelUpNotification);
  const dismissLevelUpNotification = useGameStore(state => state.dismissLevelUpNotification);

  // Auto-dismiss after 5 seconds
  useEffect(() => {
    if (levelUpNotification) {
      const timer = setTimeout(() => {
        dismissLevelUpNotification();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [levelUpNotification, dismissLevelUpNotification]);

  // Precompute particle GPU coordinates ONCE to eliminate JS main-thread interpolators
  const particles = useMemo<ParticleData[]>(() => {
    const colors = ['#FFB22C', '#FFD382', '#FFC45E', '#FFFFFF', '#22C55E', '#F59E0B'];
    const count = 12;
    return Array.from({ length: count }, (_, i) => {
      const angle = (i / count) * 360;
      const rad = (angle * Math.PI) / 180;
      const dist = 75 + (i % 3) * 18;
      return {
        id: i,
        px: Math.cos(rad) * dist,
        py: Math.sin(rad) * dist,
        color: colors[i % colors.length],
        size: i % 2 === 0 ? 8 : 6,
        delay: `${(i % 4) * 0.05}s`
      };
    });
  }, []);

  if (!levelUpNotification) return null;

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/60 pointer-events-auto"
        style={{ contain: 'layout paint' }}
      >
        {/* Hardware-accelerated lightweight container */}
        <motion.div
          key="levelup-card"
          initial={{ scale: 0.88, opacity: 0, y: 12 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: -10 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
          className="relative w-full max-w-sm transform-gpu will-change-transform"
        >
          {/* Confetti sparkle burst particles — 100% GPU Composited CSS */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
            {particles.map(p => (
              <div
                key={p.id}
                style={
                  {
                    '--px': `${p.px}px`,
                    '--py': `${p.py}px`,
                    width: `${p.size}px`,
                    height: `${p.size}px`,
                    backgroundColor: p.color,
                    animationDelay: p.delay
                  } as React.CSSProperties
                }
                className="absolute rounded-full border border-white/20 animate-particle-burst transform-gpu"
              />
            ))}
          </div>

          {/* Modal Card content */}
          <div className="relative z-10 bg-[#1A1412] border-4 border-[#FFB22C] rounded-3xl p-5 sm:p-6 text-center shadow-2xl overflow-hidden ring-2 ring-[#FFD382]/50">
            {/* Subtle radial background glow - zero GPU blur fill rate overhead */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#FFB22C]/20 via-transparent to-transparent pointer-events-none" />

            {/* Trophy Badge */}
            <div className="relative z-10 w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#FFB22C] border-2 border-[#FFD382] flex items-center justify-center mx-auto mb-3 shadow-lg transform-gpu animate-bounce">
              <Trophy className="w-8 h-8 sm:w-9 sm:h-9 text-[#120E0C]" />
              <Sparkles className="w-4 h-4 text-[#FFFFFF] absolute -top-1 -right-1 animate-pulse" />
            </div>

            {/* Header Title */}
            <h2 className="relative z-10 text-base sm:text-lg font-black text-[#FFD382] tracking-wider uppercase leading-tight">
              🎉 NAIK GELAR KONSELOR!
            </h2>
            <p className="relative z-10 text-[11px] text-[#F7F7F7]/70 font-mono mt-0.5">
              Pencapaian Profesional Psikologi
            </p>

            {/* Old Rank -> New Rank Comparison Box */}
            <div className="relative z-10 mt-3.5 p-3 bg-[#120D0B] border-2 border-[#854836]/60 rounded-2xl space-y-2">
              <div className="flex items-center justify-between text-[11px] font-mono text-[#F7F7F7]/60">
                <span>Gelar Sebelumnya:</span>
                <span className="font-bold text-[#F7F7F7]/80 line-through decoration-[#FFB22C]">
                  {levelUpNotification.oldRank}
                </span>
              </div>

              <div className="flex items-center justify-center gap-1.5 text-[#22C55E] text-xs font-extrabold uppercase tracking-wide">
                <span>⬆ Naikan Gelar Baru ⬆</span>
              </div>

              <div className="p-2.5 bg-[#0F2B18] border-2 border-[#22C55E] rounded-xl flex items-center justify-center gap-2 shadow-inner">
                <Award className="w-4 h-4 text-[#86EFAC] shrink-0" />
                <span className="text-xs sm:text-sm font-extrabold text-[#86EFAC] text-center">
                  {levelUpNotification.newRank}
                </span>
              </div>
            </div>

            {/* Total Reputation XP */}
            <div className="relative z-10 mt-3 text-[11px] font-mono text-[#FFB22C]">
              ✨ Total Reputasi Klinik: <strong className="text-white">{levelUpNotification.xp} XP</strong>
            </div>

            {/* Dismiss Button */}
            <button
              type="button"
              onClick={dismissLevelUpNotification}
              className="relative z-10 mt-4 w-full py-2.5 px-4 rounded-xl bg-[#FFB22C] hover:bg-[#FFC45E] active:scale-95 text-[#120E0C] font-extrabold text-xs sm:text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Terima Kasih & Lanjutkan!</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
});

LevelUpModal.displayName = 'LevelUpModal';
