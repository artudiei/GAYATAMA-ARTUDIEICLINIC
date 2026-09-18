import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GameCanvas } from './components/canvas/GameCanvas';
import { VirtualJoystick } from './components/controls/VirtualJoystick';
import { InteractionPrompt } from './components/controls/InteractionPrompt';
import { DialogueOverlay } from './components/game/DialogueOverlay';
import { ReferenceBoard } from './components/game/ReferenceBoard';
import { EndingScreen } from './components/game/EndingScreen';
import { RelaxationModal } from './components/game/RelaxationModal';
import { CounselorPhoneModal } from './components/game/CounselorPhoneModal';
import { DecorationShopModal } from './components/game/DecorationShopModal';
import { PhoneFloatingToast } from './components/game/PhoneFloatingToast';
import { LevelUpModal } from './components/game/LevelUpModal';
import { useGameStore } from './store/useGameStore';
import { useShallow } from 'zustand/react/shallow';
import { PixelBadge, PixelButton } from './components/ui/PixelComponents';
import {
  BookOpen,
  RotateCcw,
  HelpCircle,
  Sparkles,
  Heart,
  Activity,
  MessageSquare,
  Award,
  Compass,
  UserCheck,
  Info,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Radio,
  Smartphone,
  Store
} from 'lucide-react';

export const App: React.FC = () => {
  const {
    gameMode,
    currentClient,
    evaluationResult,
    totalClientsHelped,
    reputationXP,
    counselorRank,
    isRadioPlaying,
    unreadPhoneCount,
    isRankHighlighted,
    toggleRadio,
    setGameMode,
    generateNewClientCase,
    startWalkToClient,
    setPhoneOpen,
    setShopOpen,
    clearRankHighlight
  } = useGameStore(
    useShallow(state => ({
      gameMode: state.gameMode,
      currentClient: state.currentClient,
      evaluationResult: state.evaluationResult,
      totalClientsHelped: state.totalClientsHelped,
      reputationXP: state.reputationXP,
      counselorRank: state.counselorRank,
      isRadioPlaying: state.isRadioPlaying,
      unreadPhoneCount: state.unreadPhoneCount,
      isRankHighlighted: state.isRankHighlighted,
      toggleRadio: state.toggleRadio,
      setGameMode: state.setGameMode,
      generateNewClientCase: state.generateNewClientCase,
      startWalkToClient: state.startWalkToClient,
      setPhoneOpen: state.setPhoneOpen,
      setShopOpen: state.setShopOpen,
      clearRankHighlight: state.clearRankHighlight
    }))
  );

  const [showHelpModal, setShowHelpModal] = useState(false);
  const [showPovBanner, setShowPovBanner] = useState(true);
  const [showReturnNotif, setShowReturnNotif] = useState(false);
  const [returnNotifDismissed, setReturnNotifDismissed] = useState(false);
  // Hanya true setelah user pernah masuk ke sesi dialog (DIALOGUE mode) minimal sekali
  const [hasEnteredDialogue, setHasEnteredDialogue] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // 3-Detik Rank Highlight Timer saat naik level / rank
  useEffect(() => {
    if (isRankHighlighted) {
      const timer = setTimeout(() => {
        clearRankHighlight();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isRankHighlighted, clearRankHighlight]);

  // Sync background audio playback with isRadioPlaying state
  useEffect(() => {
    if (audioRef.current) {
      if (isRadioPlaying) {
        audioRef.current.play().catch(err => {
          console.log('Audio playback waiting for interaction:', err);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isRadioPlaying]);

  // Tandai bahwa user sudah pernah berinteraksi di dialog konsultasi
  useEffect(() => {
    if (gameMode === 'DIALOGUE') {
      setHasEnteredDialogue(true);
    }
  }, [gameMode]);

  // Reset flag saat kasus baru di-generate (currentClient berubah)
  useEffect(() => {
    setHasEnteredDialogue(false);
    setShowReturnNotif(false);
    setReturnNotifDismissed(false);
  }, [currentClient?.id]);

  // Tampilkan notifikasi "kembali ke sesi" hanya jika user sudah pernah masuk dialog,
  // lalu keluar ke EXPLORATION dan sesi belum selesai
  useEffect(() => {
    if (gameMode === 'EXPLORATION' && currentClient && !evaluationResult && hasEnteredDialogue) {
      // Delay sedikit agar transisi terasa natural
      const timer = setTimeout(() => {
        setShowReturnNotif(true);
        setReturnNotifDismissed(false);
      }, 800);
      return () => clearTimeout(timer);
    } else {
      setShowReturnNotif(false);
    }
  }, [gameMode, currentClient, evaluationResult, hasEnteredDialogue]);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#120E0C] select-none font-sans text-[#F7F7F7]">
      {/* Background Audio Player */}
      <audio
        ref={audioRef}
        src="/assets/backsound/guide2.wav"
        loop
        preload="auto"
      />

      {/* --- TOP HUD BAR --- */}
      <header
        className="fixed top-0 left-0 right-0 z-40 h-14 sm:h-16 bg-[#F7F7F7] border-b-4 border-[#854836] shadow-md overflow-hidden"
        style={{ display: 'grid', gridTemplateColumns: 'auto 1fr auto', alignItems: 'center', gap: '6px', padding: '0 10px' }}
      >
        {/* LEFT: Clinic Title & Rank */}
        <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
          <div className="w-8 h-8 sm:w-9 sm:h-9 bg-[#FFB22C] border-2 border-[#854836] rounded-lg flex items-center justify-center shadow-sm shrink-0">
            <Sparkles className="w-4 h-4 text-[#000000] animate-pulse" />
          </div>
          <div className="min-w-0">
            <h1 className="text-[11px] sm:text-sm font-extrabold tracking-wider text-[#120E0C] whitespace-nowrap leading-tight">
              ARTUDIEI CLINIC
            </h1>
            {/* Rank badge with 3-second highlight styling */}
            <div
              className={`flex items-center gap-1 text-[9px] sm:text-[10px] font-mono whitespace-nowrap leading-tight transition-all duration-300 rounded px-1.5 py-0.5 ${
                isRankHighlighted
                  ? 'bg-[#FFB22C] text-[#120E0C] font-extrabold shadow-md ring-2 ring-[#FFD382] animate-pulse scale-105 border border-[#854836]'
                  : 'text-[#854836]'
              }`}
            >
              <Award className={`w-2.5 h-2.5 sm:w-3 sm:h-3 shrink-0 ${isRankHighlighted ? 'text-[#120E0C] animate-bounce' : ''}`} />
              <span className="font-bold truncate max-w-[80px] sm:max-w-none">{counselorRank}</span>
            </div>
          </div>
        </div>

        {/* CENTER: Client pill — hidden on xs, visible from sm+ */}
        <div className="flex items-center justify-center min-w-0 overflow-hidden px-1">
          {currentClient && (
            <div className="hidden sm:flex items-center gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 bg-white border-2 border-[#854836] rounded-xl shadow-sm min-w-0 max-w-full overflow-hidden">
              {/* Name */}
              <span className="text-[10px] sm:text-xs font-bold text-[#120E0C] whitespace-nowrap shrink-0">
                {currentClient.name}
              </span>
              {/* Archetype badge — truncates at container level */}
              <span
                className="px-1.5 py-0.5 text-[9px] font-bold bg-[#FFB22C] text-[#120E0C] border border-[#854836] rounded-md truncate shrink cursor-default"
                title={currentClient.archetypeName}
              >
                {currentClient.archetypeName}
              </span>
              {/* Divider + Stats — only md+ */}
              <div className="hidden md:flex items-center gap-1.5 shrink-0">
                <div className="h-3.5 w-px bg-[#854836]/30" />
                <span className="text-[#EF4444] flex items-center gap-0.5 text-[9px] font-bold font-mono" title="Beban">
                  <Activity className="w-2.5 h-2.5" /> {currentClient.currentTension}%
                </span>
                <span className="text-[#D97706] flex items-center gap-0.5 text-[9px] font-bold font-mono" title="Percaya">
                  <Heart className="w-2.5 h-2.5" /> {currentClient.currentRapport}%
                </span>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT: Action Buttons */}
        <div className="flex items-center gap-1 shrink-0">
          {/* Counselor Smartphone Button */}
          <button
            onClick={() => setPhoneOpen(true)}
            className="relative p-1.5 sm:px-2.5 sm:py-1.5 bg-white border-2 border-[#854836] rounded-lg hover:bg-[#FFB22C] transition-all flex items-center gap-1 text-[11px] font-bold text-[#854836] shadow-sm active:scale-95"
            title="HP Konselor & Pesan Klien"
          >
            <Smartphone className="w-3.5 h-3.5 shrink-0 text-[#854836]" />
            <span className="hidden md:inline">HP Klien</span>
            {unreadPhoneCount > 0 && (
              <span className="absolute -top-1.5 -right-1 px-1.5 py-0.2 bg-[#EF4444] text-white text-[9px] font-black rounded-full border border-white animate-bounce shadow-md">
                {unreadPhoneCount}
              </span>
            )}
          </button>

          {/* Clinic Decoration Shop Button */}
          <button
            onClick={() => setShopOpen(true)}
            className="p-1.5 sm:px-2.5 sm:py-1.5 bg-white border-2 border-[#854836] rounded-lg hover:bg-[#FFB22C] transition-all flex items-center gap-1 text-[11px] font-bold text-[#854836] shadow-sm active:scale-95"
            title="Toko Renovasi & Dekorasi Klinik (XP)"
          >
            <Store className="w-3.5 h-3.5 shrink-0 text-[#854836]" />
            <span className="hidden md:inline">Toko</span>
            <span className="hidden xl:inline text-[9px] bg-[#FFB22C] text-[#120E0C] px-1 py-0.2 rounded font-mono font-extrabold">
              {reputationXP} XP
            </span>
          </button>

          <button
            onClick={toggleRadio}
            className={`p-1.5 sm:px-2 sm:py-1.5 border-2 border-[#854836] rounded-lg transition-all flex items-center gap-1 text-[11px] font-bold shadow-sm active:scale-95 ${
              isRadioPlaying
                ? 'bg-[#FFB22C] text-[#120E0C] ring-2 ring-[#FFB22C]/60'
                : 'bg-white text-[#854836] hover:bg-[#FFB22C]'
            }`}
            title={isRadioPlaying ? 'Matikan Musik' : 'Putar Musik'}
          >
            <Radio className={`w-3.5 h-3.5 shrink-0 ${isRadioPlaying ? 'animate-pulse text-[#120E0C]' : ''}`} />
            <span className="hidden 2xl:inline">{isRadioPlaying ? 'Musik: ON' : 'Musik: OFF'}</span>
          </button>

          <button
            onClick={() => setGameMode('REFERENCE')}
            className="p-1.5 sm:px-2 sm:py-1.5 bg-white border-2 border-[#854836] rounded-lg hover:bg-[#FFB22C] transition-all flex items-center gap-1 text-[11px] font-bold text-[#854836] shadow-sm active:scale-95"
            title="Buku Referensi Teori Psikologi"
          >
            <BookOpen className="w-3.5 h-3.5 shrink-0" />
            <span className="hidden lg:inline">Teori</span>
          </button>

          <button
            onClick={generateNewClientCase}
            className="p-1.5 sm:px-2 sm:py-1.5 bg-white border-2 border-[#854836] rounded-lg hover:bg-[#FFB22C] transition-all flex items-center gap-1 text-[11px] font-bold text-[#854836] shadow-sm active:scale-95"
            title="Kasus Klien Baru"
          >
            <RotateCcw className="w-3.5 h-3.5 shrink-0" />
            <span className="hidden lg:inline">Kasus Baru</span>
          </button>

          <button
            onClick={() => setShowHelpModal(true)}
            className="p-1.5 sm:p-2 bg-white border-2 border-[#854836] rounded-lg hover:bg-[#FFB22C] transition-all text-[#854836] shadow-sm active:scale-95"
            title="Petunjuk & Kontrol"
          >
            <HelpCircle className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* --- PSYCHOLOGIST POV BRIEFING BANNER (only during EXPLORATION or ENTERING) --- */}
      {(gameMode === 'EXPLORATION' || gameMode === 'ENTERING') && showPovBanner && (
        <div className="fixed top-16 left-3 sm:left-6 z-20 max-w-sm sm:max-w-md bg-[#18120F]/95 border-2 border-[#FFB22C]/80 rounded-xl p-3 shadow-xl backdrop-blur-md text-[#F7F7F7]">
          <div className="flex items-start justify-between gap-2 border-b border-[#854836]/60 pb-1.5 mb-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#FFC45E]">
              <UserCheck className="w-3.5 h-3.5 text-[#FFB22C]" />
              <span>SUDUT PANDANG (POV): ANDA SEBAGAI PSIKOLOG</span>
            </div>
            <button
              onClick={() => setShowPovBanner(false)}
              className="text-[10px] text-[#F7F7F7]/60 hover:text-white px-1.5 py-0.5 rounded bg-[#221B17] hover:bg-[#9A342D] transition-colors"
              title="Tutup banner"
            >
              ✕
            </button>
          </div>
          <p className="text-[11px] text-[#F7F7F7]/90 leading-relaxed">
            Karakter yang Anda gerakkan adalah seorang <strong>Psikolog Konseling</strong> di Klinik ARTUDIEI. Klien di sofa memiliki <em>aura gelap/suram</em> lembut yang menandakan beban pikiran & kecemasan yang sedang dialaminya.
          </p>
          <div className="mt-2 pt-1.5 border-t border-[#854836]/60 flex items-center justify-between text-[10px] text-[#FFB22C]">
            <span>💡 Dekati klien lalu tekan <strong>[E]</strong> atau tombol <strong>Bicara</strong>.</span>
          </div>
        </div>
      )}

      {/* --- MAIN GAME CANVAS VIEWPORT --- */}
      <main className="w-full h-full pt-14 pb-16">
        <GameCanvas />
      </main>

      {/* --- INTERACTION PROMPTS & HUD OVERLAYS --- */}
      <InteractionPrompt />
      <VirtualJoystick />
      <DialogueOverlay />
      <ReferenceBoard />
      <EndingScreen />
      <RelaxationModal />
      <CounselorPhoneModal />
      <DecorationShopModal />
      <PhoneFloatingToast />

      {/* --- RETURN TO SESSION FLOATING NOTIFICATION --- */}
      {gameMode === 'EXPLORATION' && currentClient && !evaluationResult && hasEnteredDialogue && showReturnNotif && !returnNotifDismissed && (
        <div
          className="fixed bottom-20 sm:bottom-6 right-3 sm:right-5 z-30 animate-in slide-in-from-right-4 duration-500"
          style={{ animation: 'slideInRight 0.45s cubic-bezier(.34,1.56,.64,1) both' }}
        >
          <style>{`
            @keyframes slideInRight {
              from { opacity: 0; transform: translateX(60px) scale(0.92); }
              to { opacity: 1; transform: translateX(0) scale(1); }
            }
            @keyframes pulseGlow {
              0%, 100% { box-shadow: 0 0 0 0 rgba(255,178,44,0.4); }
              50% { box-shadow: 0 0 0 8px rgba(255,178,44,0); }
            }
          `}</style>
          <div
            className="flex items-center gap-3 px-3.5 py-3 bg-[#18120F]/98 border-2 border-[#FFB22C] rounded-2xl shadow-2xl backdrop-blur-xl max-w-[220px] sm:max-w-xs"
            style={{ animation: 'pulseGlow 2.2s ease-in-out infinite' }}
          >
            {/* Avatar / icon */}
            <div className="shrink-0 w-9 h-9 rounded-full bg-[#FFB22C]/20 border-2 border-[#FFB22C]/60 flex items-center justify-center">
              <MessageSquare className="w-4 h-4 text-[#FFB22C]" />
            </div>

            {/* Text */}
            <div className="flex-1 min-w-0">
              <p className="text-[10px] text-[#FFD382]/70 font-semibold leading-tight">Sesi belum selesai</p>
              <p className="text-[12px] font-extrabold text-[#F7F7F7] leading-snug truncate">
                {currentClient.name} menunggu...
              </p>
            </div>

            {/* Dismiss */}
            <button
              onClick={() => setReturnNotifDismissed(true)}
              className="shrink-0 text-[#F7F7F7]/30 hover:text-[#F7F7F7]/80 transition-colors text-[10px] px-1 py-0.5 rounded"
              title="Tutup notifikasi"
            >
              ✕
            </button>
          </div>

          {/* Tombol kembali ke sesi */}
          <button
            onClick={() => startWalkToClient()}
            className="mt-1.5 w-full flex items-center justify-center gap-1.5 px-3.5 py-2 bg-[#FFB22C] hover:bg-[#FFC45E] text-[#000000] font-extrabold text-[11px] rounded-xl shadow-lg transition-all active:scale-95"
          >
            <span>Kembali ke Sesi</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* --- COMPLETED SESSION QUICK BAR DURING ROOM EXPLORATION --- */}
      {gameMode === 'EXPLORATION' && evaluationResult && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-30 flex flex-wrap items-center justify-center gap-3 px-4 py-2.5 bg-[#18120F]/95 border-2 border-[#FFB22C] rounded-xl shadow-2xl backdrop-blur-md text-xs">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-[#FFB22C] animate-bounce" />
            <span className="text-[#F7F7F7]">
              Sesi konseling <strong>{currentClient?.name}</strong> telah selesai (Predikat {evaluationResult.grade} - {evaluationResult.score}/100)
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setGameMode('ENDING')}
              className="px-3.5 py-1.5 rounded-lg bg-[#FFB22C] hover:bg-[#FFC45E] text-[#000000] font-bold transition-all active:scale-95 shadow-md flex items-center gap-1.5"
            >
              <Award className="w-3.5 h-3.5" />
              <span>Buka Laporan Hasil Sesi</span>
            </button>
            <button
              onClick={generateNewClientCase}
              className="px-3 py-1.5 rounded-lg bg-[#3D261B] hover:bg-[#523324] text-[#FFD382] border border-[#854836] font-bold transition-all active:scale-95 flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5 text-[#FFB22C]" />
              <span>Terima Klien Baru</span>
            </button>
          </div>
        </div>
      )}

      {/* --- LEVEL UP CELEBRATORY NOTIFICATION MODAL --- */}
      <LevelUpModal />

      {/* --- HOW TO PLAY / CONTROLS HELP MODAL --- */}
      {showHelpModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-[#1C1613] border-4 border-[#FFB22C] p-5 shadow-pixel-lg text-[#F7F7F7] flex flex-col gap-4 rounded-xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#854836] pb-2">
              <h3 className="font-bold text-sm text-[#FFB22C] flex items-center gap-2">
                <Compass className="w-4 h-4 text-[#FFB22C]" />
                PANDUAN PERAN PSIKOLOG & CARA BERMAIN
              </h3>
              <button
                onClick={() => setShowHelpModal(false)}
                className="text-xs px-2 py-0.5 bg-[#120E0C] border border-[#854836] hover:bg-[#9A342D] rounded"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs leading-relaxed text-[#F7F7F7]/90">
              {/* POV Role Explanation */}
              <div className="p-3 bg-[#241B17] border border-[#854836] rounded-lg">
                <strong className="text-[#FFC45E] flex items-center gap-1.5 mb-1.5 text-xs">
                  <UserCheck className="w-4 h-4 text-[#FFB22C]" /> Peran Anda: Psikolog Konseling (Point of View)
                </strong>
                <p className="text-[11px] leading-relaxed text-[#F7F7F7]/85">
                  Dalam simulasi ini, Anda berperan langsung sebagai <strong>Psikolog / Terapis Konseling</strong>. Klien datang dengan masalah emosional dan dinamika batin yang tergambar dari <em>aura suram/gelap tipis</em> di sekelilingnya. Tugas Anda adalah menciptakan ruang aman (safe space), menyimak secara aktif, dan meredakan ketegangan klien melalui respon komunikasi yang tepat.
                </p>
              </div>

              {/* Exploration Controls */}
              <div className="p-2.5 bg-[#241B17] border border-[#854836]/60 rounded-lg">
                <strong className="text-[#FFB22C] block mb-1">🎮 Navigasi & Eksplorasi:</strong>
                <ul className="space-y-1 list-disc list-inside">
                  <li><strong>Desktop:</strong> Gunakan <code>W, A, S, D</code> atau tombol Panah. Tekan <code>[E]</code> atau <code>[SPASI]</code> untuk bicara dengan klien, membaca rak buku, menyeduh teh, atau menyetel radio lofi di meja.</li>
                  <li><strong>HP / Tablet:</strong> Gunakan Virtual Joystick di kiri bawah dan tombol <strong>AKSI</strong> di kanan bawah.</li>
                </ul>
              </div>

              {/* Counseling Tips */}
              <div className="p-2.5 bg-[#241B17] border border-[#854836]/60 rounded-lg">
                <strong className="text-[#FFB22C] block mb-1">🌱 Prinsip Komunikasi Terapeutik:</strong>
                <ul className="space-y-1 list-disc list-inside">
                  <li>Pahami dulu cerita dan beban klien sebelum buru-buru menyuruhnya berubah.</li>
                  <li>Pilih dari 3 kartu pendekatan (Mendengarkan, Memeriksa Fakta, Solusi Bersama) yang paling pas untuk situasi klien.</li>
                  <li>Gunakan <strong>Kartu Strategi</strong> di bar bawah jika ingin memberikan dorongan empati atau pernapasan ekstra.</li>
                  <li>Ketika kepercayaan klien naik dan ketegangannya turun, aura suram di sekelilingnya akan berangsur sirna menjadi cahaya hangat yang menenangkan.</li>
                </ul>
              </div>
            </div>

            <div className="flex justify-end pt-1">
              <PixelButton variant="primary" size="sm" onClick={() => setShowHelpModal(false)}>
                Mengerti, Lanjutkan Praktik Konseling!
              </PixelButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default App;
