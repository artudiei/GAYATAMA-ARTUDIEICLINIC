import React, { useState, useEffect } from 'react';
import { useGameStore } from '../../store/useGameStore';
import { CLINIC_DECORATIONS } from '../../data/decorations';
import { DecorationItem } from '../../types/game';
import { 
  Store, 
  X, 
  Sparkles, 
  Check, 
  Sun, 
  Waves, 
  Flower2, 
  LayoutGrid, 
  Image, 
  Armchair, 
  Wind, 
  ChevronLeft,
  ChevronRight,
  ShieldAlert,
  HeartHandshake,
  CheckCircle2,
  Lock,
  PackageCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ICON_MAP: Record<string, React.FC<{ className?: string }>> = {
  Sun,
  Waves,
  Flower2,
  LayoutGrid,
  Image,
  Armchair,
  Wind
};

export const DecorationShopModal: React.FC = () => {
  const {
    isShopOpen,
    reputationXP,
    counselorRank,
    unlockedDecorations,
    equippedDecorations,
    setShopOpen,
    buyDecoration,
    toggleEquipDecoration
  } = useGameStore();

  // 3 Filter tabs as requested: all, owned, unowned
  const [filterTab, setFilterTab] = useState<'all' | 'owned' | 'unowned'>('all');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [confirmItem, setConfirmItem] = useState<DecorationItem | null>(null);
  const [direction, setDirection] = useState<number>(0);

  // Compute filtered items
  const filteredItems = CLINIC_DECORATIONS.filter((item) => {
    const isOwned = unlockedDecorations.includes(item.id);
    if (filterTab === 'owned') return isOwned;
    if (filterTab === 'unowned') return !isOwned;
    return true;
  });

  // Clamp index when filter changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [filterTab]);

  // Keyboard navigation (Arrow keys)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isShopOpen || confirmItem) return;
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'Escape') setShopOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isShopOpen, filteredItems.length, currentIndex, confirmItem]);

  if (!isShopOpen) return null;

  const handleNext = () => {
    if (filteredItems.length === 0) return;
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % filteredItems.length);
  };

  const handlePrev = () => {
    if (filteredItems.length === 0) return;
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
  };

  const currentItem: DecorationItem | undefined = filteredItems[currentIndex];
  const isCurrentUnlocked = currentItem ? unlockedDecorations.includes(currentItem.id) : false;
  const isCurrentEquipped = currentItem ? equippedDecorations[currentItem.category] === currentItem.id : false;
  const canAffordCurrent = currentItem ? reputationXP >= currentItem.costXP : false;

  const handleConfirmPurchase = () => {
    if (!confirmItem) return;
    buyDecoration(confirmItem.id);
    setConfirmItem(null);
  };

  // Variants for Morph Slider transitions
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 80 : -80,
      opacity: 0,
      scale: 0.94,
      filter: 'blur(4px)'
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        x: { type: 'spring', stiffness: 350, damping: 28 },
        opacity: { duration: 0.25 },
        scale: { duration: 0.25 },
        filter: { duration: 0.2 }
      }
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 80 : -80,
      opacity: 0,
      scale: 0.94,
      filter: 'blur(4px)',
      transition: { duration: 0.2 }
    })
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-hidden select-none">
      <motion.div
        initial={{ scale: 0.93, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.93, opacity: 0, y: 20 }}
        className="w-full max-w-3xl bg-[#140F0D] border-3 border-[#854836] rounded-[26px] shadow-2xl text-[#F7F7F7] overflow-hidden flex flex-col max-h-[92vh] relative"
      >
        {/* Top Header Bar */}
        <div className="bg-[#100C0A] border-b border-[#854836]/60 px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#FFB22C] text-[#120E0C] flex items-center justify-center font-bold shadow-sm">
              <Store className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <h2 className="font-extrabold text-xs sm:text-sm text-[#F7F7F7] tracking-wider uppercase">
                KATALOG DEKORASI KLINIK
              </h2>
              <span className="text-[10px] text-[#FFB22C] font-mono block">
                PILIH & TATA ELEMEN TERAPEUTIK RUANGAN
              </span>
            </div>
          </div>

          {/* XP Currency Balance & Close */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="bg-[#201713] border border-[#FFB22C]/80 px-2.5 sm:px-3 py-1 rounded-xl flex items-center gap-1.5 shadow-inner">
              <Sparkles className="w-3.5 h-3.5 text-[#FFB22C] animate-pulse" />
              <div className="text-right">
                <span className="text-[8px] text-[#FFD382]/80 block font-mono leading-none">SALDO XP</span>
                <span className="text-xs sm:text-sm font-extrabold text-[#FFB22C] font-mono leading-tight">
                  {reputationXP} XP
                </span>
              </div>
            </div>

            <button
              onClick={() => setShopOpen(false)}
              className="p-1.5 rounded-xl bg-[#221B17] hover:bg-[#9A342D] text-white transition-colors"
              title="Tutup Toko"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* --- 3 FILTER TABS AS REQUESTED --- */}
        <div className="bg-[#18120F] px-4 sm:px-6 py-2 border-b border-[#854836]/40 flex items-center justify-center gap-2">
          <button
            onClick={() => setFilterTab('all')}
            className={`px-3 sm:px-4 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              filterTab === 'all'
                ? 'bg-[#FFB22C] text-[#120E0C] shadow-md'
                : 'bg-[#221B17] text-[#F7F7F7]/70 hover:text-white hover:bg-[#2F211B]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Semua Koleksi</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-black/20 font-mono">
              {CLINIC_DECORATIONS.length}
            </span>
          </button>

          <button
            onClick={() => setFilterTab('owned')}
            className={`px-3 sm:px-4 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              filterTab === 'owned'
                ? 'bg-[#22C55E] text-[#120E0C] shadow-md font-extrabold'
                : 'bg-[#221B17] text-[#F7F7F7]/70 hover:text-white hover:bg-[#2F211B]'
            }`}
          >
            <PackageCheck className="w-3.5 h-3.5" />
            <span>Dimiliki</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-black/20 font-mono">
              {unlockedDecorations.length}
            </span>
          </button>

          <button
            onClick={() => setFilterTab('unowned')}
            className={`px-3 sm:px-4 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              filterTab === 'unowned'
                ? 'bg-[#E11D48] text-[#FFFFFF] shadow-md font-extrabold'
                : 'bg-[#221B17] text-[#F7F7F7]/70 hover:text-white hover:bg-[#2F211B]'
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Belum Dimiliki</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-black/20 font-mono">
              {CLINIC_DECORATIONS.length - unlockedDecorations.length}
            </span>
          </button>
        </div>

        {/* --- MAIN MORPH SLIDER STAGE --- */}
        <div className="flex-1 relative flex flex-col justify-between p-4 sm:p-6 overflow-hidden min-h-[300px] sm:min-h-[360px]">
          {filteredItems.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-xs text-[#F7F7F7]/60">
              <PackageCheck className="w-12 h-12 text-[#854836] opacity-40 mb-2" />
              <p className="font-bold text-sm text-[#F7F7F7]">Tidak ada barang di kategori ini.</p>
              <p className="text-[11px] text-[#FFD382] mt-1">Pilih tab "Semua Koleksi" untuk melihat dekorasi lainnya.</p>
            </div>
          ) : (
            <>
              {/* Left & Right Nav Arrows */}
              <button
                onClick={handlePrev}
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#18120F]/90 border border-[#FFB22C]/70 hover:bg-[#FFB22C] hover:text-[#120E0C] text-[#FFB22C] transition-all flex items-center justify-center shadow-xl active:scale-90"
                title="Sebelumnya (Panah Kiri)"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={handleNext}
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#18120F]/90 border border-[#FFB22C]/70 hover:bg-[#FFB22C] hover:text-[#120E0C] text-[#FFB22C] transition-all flex items-center justify-center shadow-xl active:scale-90"
                title="Berikutnya (Panah Kanan)"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Central Morphing Card Animation Container */}
              <div className="flex-1 flex items-center justify-center relative w-full overflow-hidden px-8 sm:px-14">
                <AnimatePresence initial={false} custom={direction} mode="wait">
                  {currentItem && (
                    <motion.div
                      key={currentItem.id}
                      custom={direction}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      drag="x"
                      dragConstraints={{ left: 0, right: 0 }}
                      dragElastic={0.2}
                      onDragEnd={(_, { offset, velocity }) => {
                        const swipe = offset.x;
                        if (swipe < -50 || velocity.x < -400) {
                          handleNext();
                        } else if (swipe > 50 || velocity.x > 400) {
                          handlePrev();
                        }
                      }}
                      className="w-full max-w-lg rounded-2xl p-4 sm:p-5 relative flex flex-col items-center border-2 border-[#854836]/80 shadow-2xl overflow-hidden cursor-grab active:cursor-grabbing"
                      style={{
                        background: `linear-gradient(145deg, #1C1512 0%, #251B17 50%, #150F0D 100%)`
                      }}
                    >
                      {/* Ambient colored glowing backdrop matching item */}
                      <div
                        className="absolute -top-16 -right-16 w-48 h-48 rounded-full blur-3xl opacity-25 pointer-events-none"
                        style={{ backgroundColor: currentItem.previewColor }}
                      />

                      {/* Morphing Visual Card Preview Area */}
                      <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl flex items-center justify-center shadow-2xl border-2 border-white/20 mb-3 relative overflow-hidden group">
                        <div
                          className="absolute inset-0 opacity-85 group-hover:scale-110 transition-transform duration-500"
                          style={{ backgroundColor: currentItem.previewColor }}
                        />
                        {React.createElement(ICON_MAP[currentItem.iconName] || Sparkles, {
                          className: 'w-12 h-12 sm:w-14 sm:h-14 text-white relative z-10 drop-shadow-md'
                        })}
                      </div>

                      {/* Item Badges */}
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2.5 py-0.5 rounded-full bg-[#FFB22C]/20 border border-[#FFB22C] text-[#FFB22C] font-mono text-[10px] font-bold uppercase tracking-wider">
                          Kategori: {currentItem.category}
                        </span>

                        {isCurrentEquipped ? (
                          <span className="px-2.5 py-0.5 rounded-full bg-[#22C55E]/20 border border-[#22C55E] text-[#22C55E] font-mono text-[10px] font-bold">
                            ● SEDANG TERPASANG
                          </span>
                        ) : isCurrentUnlocked ? (
                          <span className="px-2.5 py-0.5 rounded-full bg-[#3B82F6]/20 border border-[#3B82F6] text-[#60A5FA] font-mono text-[10px] font-bold">
                            ✓ SUDAH DIBELI
                          </span>
                        ) : (
                          <span className="px-2.5 py-0.5 rounded-full bg-[#E11D48]/20 border border-[#E11D48] text-[#FDA4AF] font-mono text-[10px] font-bold">
                            🔒 BELUM DIBELI
                          </span>
                        )}
                      </div>

                      {/* Scientific Psychological Benefit Note */}
                      <div className="w-full bg-[#120E0C]/90 p-2 sm:p-2.5 rounded-xl border border-[#854836]/40 text-center">
                        <p className="text-[10px] sm:text-[11px] text-[#FFD382] leading-tight">
                          🌱 <strong>Manfaat Terapeutik:</strong> {currentItem.clinicalBenefit}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Slider Dots Pagination */}
              <div className="flex items-center justify-center gap-1.5 py-2">
                {filteredItems.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setDirection(i > currentIndex ? 1 : -1);
                      setCurrentIndex(i);
                    }}
                    className={`transition-all rounded-full ${
                      i === currentIndex
                        ? 'w-6 h-2 bg-[#FFB22C] shadow-sm'
                        : 'w-2 h-2 bg-[#854836]/60 hover:bg-[#FFB22C]/50'
                    }`}
                  />
                ))}
              </div>

              {/* --- BOTTOM SECTION: LEFT BRIEF DESCRIPTION & RIGHT ACTION BUTTON (AS REQUESTED) --- */}
              {currentItem && (
                <div className="bg-[#120E0C] border-2 border-[#854836]/70 rounded-2xl p-3 sm:p-4 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xl">
                  {/* LEFT: Concise text description & bonus */}
                  <div className="w-full sm:w-2/3 text-left">
                    <div className="flex items-center gap-2 mb-0.5">
                      <h3 className="text-xs sm:text-sm font-extrabold text-[#F7F7F7]">
                        {currentItem.name}
                      </h3>
                      <span className="text-[10px] font-mono text-[#FFB22C] font-semibold">
                        ({currentIndex + 1}/{filteredItems.length})
                      </span>
                    </div>
                    <p className="text-[10px] sm:text-[11px] text-[#F7F7F7]/85 line-clamp-1 leading-snug">
                      {currentItem.description}
                    </p>
                    <span className="text-[9px] sm:text-[10px] text-[#22C55E] font-mono font-bold block mt-0.5">
                      ✨ Efek Ruangan: {currentItem.passiveBonusText}
                    </span>
                  </div>

                  {/* RIGHT: Action Button & Price */}
                  <div className="w-full sm:w-auto flex items-center justify-end gap-2 shrink-0">
                    {isCurrentUnlocked ? (
                      <button
                        onClick={() => toggleEquipDecoration(currentItem.id)}
                        className={`w-full sm:w-auto px-4 sm:px-5 py-2.5 rounded-xl text-xs font-extrabold transition-all shadow-md flex items-center justify-center gap-1.5 active:scale-95 ${
                          isCurrentEquipped
                            ? 'bg-[#143B22] hover:bg-[#1E5230] text-[#86EFAC] border border-[#22C55E]'
                            : 'bg-[#FFB22C] hover:bg-[#FFC45E] text-[#120E0C]'
                        }`}
                      >
                        {isCurrentEquipped ? (
                          <>
                            <Check className="w-4 h-4" />
                            <span>Terpasang (Lepas)</span>
                          </>
                        ) : (
                          <span>Pasang di Klinik</span>
                        )}
                      </button>
                    ) : (
                      <button
                        disabled={!canAffordCurrent}
                        onClick={() => setConfirmItem(currentItem)}
                        className={`w-full sm:w-auto px-4 sm:px-5 py-2.5 rounded-xl text-xs font-extrabold transition-all shadow-md flex items-center justify-center gap-1.5 active:scale-95 ${
                          canAffordCurrent
                            ? 'bg-[#FFB22C] hover:bg-[#FFC45E] text-[#120E0C]'
                            : 'bg-[#241B17] text-[#F7F7F7]/40 border border-[#854836]/40 cursor-not-allowed'
                        }`}
                      >
                        <Sparkles className="w-4 h-4" />
                        <span>Beli ({currentItem.costXP} XP)</span>
                      </button>
                    )}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* --- CONFIRMATION RECHECK MODAL BEFORE BUYING (AS REQUESTED) --- */}
        <AnimatePresence>
          {confirmItem && (
            <div className="absolute inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
              <motion.div
                initial={{ scale: 0.88, opacity: 0, y: 15 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.88, opacity: 0, y: 15 }}
                className="w-full max-w-sm bg-[#18120F] border-3 border-[#FFB22C] p-5 rounded-2xl shadow-2xl text-center flex flex-col gap-3"
              >
                <div className="w-12 h-12 rounded-full bg-[#FFB22C]/20 border-2 border-[#FFB22C] text-[#FFB22C] flex items-center justify-center mx-auto shadow-inner">
                  <ShieldAlert className="w-6 h-6 animate-pulse" />
                </div>

                <div>
                  <h4 className="font-extrabold text-sm text-[#F7F7F7]">
                    Konfirmasi Pembelian Dekorasi
                  </h4>
                  <p className="text-xs text-[#F7F7F7]/85 mt-1 leading-relaxed">
                    Apakah Anda yakin ingin menukar <strong className="text-[#FFB22C]">{confirmItem.costXP} XP</strong> untuk membeli:
                  </p>
                  <p className="text-xs font-bold text-[#FFD382] mt-0.5">
                    "{confirmItem.name}"?
                  </p>
                </div>

                {/* Balance preview */}
                <div className="bg-[#120E0C] p-2.5 rounded-xl border border-[#854836]/60 text-[11px] font-mono space-y-1">
                  <div className="flex justify-between text-[#F7F7F7]/70">
                    <span>Saldo Sekarang:</span>
                    <span className="font-bold text-[#F7F7F7]">{reputationXP} XP</span>
                  </div>
                  <div className="flex justify-between text-[#EF4444]">
                    <span>Harga Barang:</span>
                    <span className="font-bold">-{confirmItem.costXP} XP</span>
                  </div>
                  <div className="border-t border-[#854836]/40 pt-1 flex justify-between text-[#22C55E] font-bold">
                    <span>Sisa Saldo Nanti:</span>
                    <span>{reputationXP - confirmItem.costXP} XP</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="grid grid-cols-2 gap-2 mt-1">
                  <button
                    onClick={() => setConfirmItem(null)}
                    className="py-2 rounded-xl bg-[#251B17] hover:bg-[#38261E] border border-[#854836] text-xs font-bold text-[#F7F7F7] transition-all active:scale-95"
                  >
                    Batal
                  </button>
                  <button
                    onClick={handleConfirmPurchase}
                    className="py-2 rounded-xl bg-[#FFB22C] hover:bg-[#FFC45E] text-[#120E0C] text-xs font-extrabold transition-all shadow-md active:scale-95 flex items-center justify-center gap-1"
                  >
                    <Check className="w-4 h-4" />
                    <span>Ya, Beli Sekarang</span>
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
