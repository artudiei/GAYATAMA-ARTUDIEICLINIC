import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logoImg from './assets/logo-artudieiclinic.png';
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
import { SplashScreen } from './components/ui/SplashScreen';
import { useGameStore } from './store/useGameStore';
import { useShallow } from 'zustand/react/shallow';
import { PixelBadge, PixelButton } from './components/ui/PixelComponents';
import { LanguageToggle } from './components/ui/LanguageToggle';
import { useTranslation } from './i18n/useTranslation';
import { tDialogue } from './i18n/dialogueTranslator';
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
  Music2,
  Smartphone,
  Store,
  Menu,
  X
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

  const { t, language } = useTranslation();

  const [showSplash, setShowSplash] = useState(true);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
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
      {/* --- SPLASH SCREEN VIDEO OVERLAY --- */}
      <AnimatePresence>
        {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
      </AnimatePresence>

      {/* Background Audio Player */}
      <audio
        ref={audioRef}
        src="/assets/backsound/backsound.wav"
        loop
        preload="auto"
      />

      {/* --- TOP HUD BAR --- */}
      <header
        className="fixed top-0 left-0 right-0 z-40 h-14 sm:h-16 bg-[#F7F7F7] border-b-4 border-[#854836] shadow-md px-2 sm:px-4 flex items-center justify-between gap-1.5 sm:gap-3 select-none"
      >
        {/* LEFT: Clinic Title & Rank */}
        <div className="flex items-center gap-1.5 sm:gap-2 min-w-0 shrink">
          <div className="w-8 h-8 sm:w-9 sm:h-9 bg-[#FFB22C] border-2 border-[#854836] rounded-lg flex items-center justify-center shadow-sm shrink-0 overflow-hidden p-0.5">
            <img src={logoImg} alt="ARTUDIEI Clinic Logo" className="w-full h-full object-contain" />
          </div>
          <div className="min-w-0 flex flex-col justify-center">
            <h1 className="text-[11px] sm:text-sm font-extrabold tracking-wider text-[#120E0C] whitespace-nowrap leading-tight">
              ARTUDIEI CLINIC
            </h1>
            {/* Rank badge with 3-second highlight styling */}
            <div
              className={`flex items-center gap-1 text-[8.5px] xs:text-[9.5px] sm:text-[10px] font-mono whitespace-nowrap leading-tight transition-all duration-300 rounded px-1 xs:px-1.5 py-0.5 ${isRankHighlighted
                ? 'bg-[#FFB22C] text-[#120E0C] font-extrabold shadow-md ring-2 ring-[#FFD382] animate-pulse scale-105 border border-[#854836]'
                : 'text-[#854836]'
                }`}
            >
              <Award className={`w-2.5 h-2.5 sm:w-3 sm:h-3 shrink-0 ${isRankHighlighted ? 'text-[#120E0C] animate-bounce' : ''}`} />
              <span className="font-bold whitespace-nowrap" title={counselorRank}>
                <span className="inline sm:hidden">{counselorRank.split(' (')[0]}</span>
                <span className="hidden sm:inline">{counselorRank}</span>
              </span>
            </div>
          </div>
        </div>

        {/* CENTER: Client pill — hidden on mobile, visible from sm+ */}
        <div className="hidden sm:flex items-center justify-center min-w-0 overflow-hidden px-1">
          {currentClient && (
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-white border-2 border-[#854836] rounded-xl shadow-sm min-w-0 max-w-full overflow-hidden">
              {/* Name */}
              <span className="text-[11px] sm:text-xs font-bold text-[#120E0C] whitespace-nowrap shrink-0">
                {tDialogue(currentClient.name, language)}
              </span>
              {/* Archetype badge */}
              <span
                className="px-1.5 py-0.5 text-[9px] font-bold bg-[#FFB22C] text-[#120E0C] border border-[#854836] rounded-md truncate shrink cursor-default"
                title={t.archetypes?.[currentClient.archetypeId]?.name || currentClient.archetypeName}
              >
                {t.archetypes?.[currentClient.archetypeId]?.name || currentClient.archetypeName}
              </span>
              {/* Stats on md+ */}
              <div className="hidden md:flex items-center gap-1.5 shrink-0">
                <div className="h-3.5 w-px bg-[#854836]/30" />
                <span className="text-[#EF4444] flex items-center gap-0.5 text-[9px] font-bold font-mono" title={t.common.tension}>
                  <Activity className="w-2.5 h-2.5" /> {currentClient.currentTension}%
                </span>
                <span className="text-[#D97706] flex items-center gap-0.5 text-[9px] font-bold font-mono" title={t.common.rapport}>
                  <Heart className="w-2.5 h-2.5" /> {currentClient.currentRapport}%
                </span>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT: Action Buttons Cluster */}
        {/* DESKTOP VIEW (md+): Full Action Buttons Cluster */}
        <div className="hidden md:flex items-center gap-1 sm:gap-1.5 shrink-0">
          {/* Language Switcher */}
          <LanguageToggle variant="navbar" />

          {/* Counselor Smartphone Button */}
          <button
            onClick={() => setPhoneOpen(true)}
            className="relative p-1.5 sm:px-2.5 sm:py-1.5 bg-white border-2 border-[#854836] rounded-lg hover:bg-[#FFB22C] transition-all flex items-center gap-1 text-[11px] font-bold text-[#854836] shadow-sm active:scale-95"
            title={t.nav.phoneTitle}
          >
            <Smartphone className="w-3.5 h-3.5 shrink-0 text-[#854836]" />
            <span className="hidden md:inline">{t.nav.phone}</span>
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
            title={t.nav.shopTitle}
          >
            <Store className="w-3.5 h-3.5 shrink-0 text-[#854836]" />
            <span className="hidden md:inline">{t.nav.shop}</span>
            <span className="hidden xl:inline text-[9px] bg-[#FFB22C] text-[#120E0C] px-1 py-0.2 rounded font-mono font-extrabold">
              {reputationXP} {t.common.xp}
            </span>
          </button>

          {/* Lo-Fi Music Radio Button */}
          <button
            onClick={toggleRadio}
            className={`p-1.5 sm:px-2 sm:py-1.5 border-2 border-[#854836] rounded-lg transition-all flex items-center gap-1 text-[11px] font-bold shadow-sm active:scale-95 ${isRadioPlaying
              ? 'bg-[#FFB22C] text-[#120E0C] ring-2 ring-[#FFB22C]/60'
              : 'bg-white text-[#854836] hover:bg-[#FFB22C]'
              }`}
            title={isRadioPlaying ? t.nav.musicStopTitle : t.nav.musicPlayTitle}
          >
            <Music2 className={`w-3.5 h-3.5 shrink-0 ${isRadioPlaying ? 'animate-bounce text-[#120E0C]' : ''}`} />
            <span className="hidden 2xl:inline">{isRadioPlaying ? t.nav.musicOn : t.nav.musicOff}</span>
          </button>

          {/* Theory Reference Button */}
          <button
            onClick={() => setGameMode('REFERENCE')}
            className="p-1.5 sm:px-2 sm:py-1.5 bg-white border-2 border-[#854836] rounded-lg hover:bg-[#FFB22C] transition-all flex items-center gap-1 text-[11px] font-bold text-[#854836] shadow-sm active:scale-95"
            title={t.nav.theoryTitle}
          >
            <BookOpen className="w-3.5 h-3.5 shrink-0" />
            <span className="hidden lg:inline">{t.nav.theory}</span>
          </button>

          {/* New Case Button */}
          <button
            onClick={generateNewClientCase}
            className="p-1.5 sm:px-2 sm:py-1.5 bg-white border-2 border-[#854836] rounded-lg hover:bg-[#FFB22C] transition-all flex items-center gap-1 text-[11px] font-bold text-[#854836] shadow-sm active:scale-95"
            title={t.nav.newCaseTitle}
          >
            <RotateCcw className="w-3.5 h-3.5 shrink-0" />
            <span className="hidden lg:inline">{t.nav.newCase}</span>
          </button>

          {/* Help Button */}
          <button
            onClick={() => setShowHelpModal(true)}
            className="p-1.5 sm:p-2 bg-white border-2 border-[#854836] rounded-lg hover:bg-[#FFB22C] transition-all text-[#854836] shadow-sm active:scale-95"
            title={t.nav.helpTitle}
          >
            <HelpCircle className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* MOBILE HYBRID VIEW (<md): Primary Action (HP) + Hamburger Drawer Trigger */}
        {/* Language Toggle is only in the hamburger drawer on mobile */}
        <div className="flex md:hidden items-center gap-1 sm:gap-1.5 shrink-0">
          {/* Counselor Smartphone Quick Access (Badged) */}
          <button
            onClick={() => setPhoneOpen(true)}
            className="relative px-2 py-1.5 bg-white border-2 border-[#854836] rounded-lg hover:bg-[#FFB22C] transition-all flex items-center gap-1 text-[11px] font-bold text-[#854836] shadow-sm active:scale-95"
            title={t.nav.phoneTitle}
          >
            <Smartphone className="w-4 h-4 shrink-0 text-[#854836]" />
            <span className="text-[10px] font-extrabold text-[#854836]">{t.nav.phoneShort}</span>
            {unreadPhoneCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 px-1.5 py-0.2 bg-[#EF4444] text-white text-[9px] font-black rounded-full border border-white animate-bounce shadow-md">
                {unreadPhoneCount}
              </span>
            )}
          </button>

          {/* Hamburger Menu Drawer Trigger */}
          <button
            onClick={() => setShowMobileMenu(true)}
            className="p-1.5 bg-[#FFB22C] hover:bg-[#FFC45E] border-2 border-[#854836] rounded-lg transition-all flex items-center justify-center text-[#120E0C] shadow-sm active:scale-95"
            title={t.nav.openMenuTitle}
          >
            <Menu className="w-5 h-5 text-[#120E0C]" />
          </button>
        </div>
      </header>

      {/* --- PSYCHOLOGIST POV BRIEFING BANNER (only during EXPLORATION or ENTERING) --- */}
      {(gameMode === 'EXPLORATION' || gameMode === 'ENTERING') && showPovBanner && (
        <div className="fixed top-16 left-3 right-3 sm:right-auto sm:left-6 z-20 w-auto sm:max-w-md bg-[#18120F]/95 border-2 border-[#FFB22C]/80 rounded-xl p-3 shadow-xl backdrop-blur-md text-[#F7F7F7]">
          <div className="flex items-start justify-between gap-2 border-b border-[#854836]/60 pb-1.5 mb-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#FFC45E]">
              <UserCheck className="w-3.5 h-3.5 text-[#FFB22C]" />
              <span>{t.povBanner.title}</span>
            </div>
            <button
              onClick={() => setShowPovBanner(false)}
              className="text-[10px] text-[#F7F7F7]/60 hover:text-white px-1.5 py-0.5 rounded bg-[#221B17] hover:bg-[#9A342D] transition-colors"
              title={t.povBanner.close}
            >
              ✕
            </button>
          </div>
          <p className="text-[11px] text-[#F7F7F7]/90 leading-relaxed">
            {t.povBanner.desc}
          </p>
          <div className="mt-2 pt-1.5 border-t border-[#854836]/60 flex items-center justify-between text-[10px] text-[#FFB22C]">
            <span>{t.povBanner.tip}</span>
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
          className="fixed bottom-24 sm:bottom-6 right-3 sm:right-5 z-30 animate-in slide-in-from-right-4 duration-500 max-w-[210px] xs:max-w-[240px] sm:max-w-xs"
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
            className="flex items-center gap-2.5 px-3 py-2.5 bg-[#18120F]/98 border-2 border-[#FFB22C] rounded-2xl shadow-2xl backdrop-blur-xl"
            style={{ animation: 'pulseGlow 2.2s ease-in-out infinite' }}
          >
            {/* Avatar / icon */}
            <div className="shrink-0 w-8 h-8 rounded-full bg-[#FFB22C]/20 border-2 border-[#FFB22C]/60 flex items-center justify-center">
              <MessageSquare className="w-3.5 h-3.5 text-[#FFB22C]" />
            </div>

            {/* Text */}
            <div className="flex-1 min-w-0">
              <p className="text-[9px] text-[#FFD382]/70 font-semibold leading-tight">{t.returnNotif.subtitle}</p>
              <p className="text-[11px] font-extrabold text-[#F7F7F7] leading-snug truncate">
                {currentClient.name} {t.returnNotif.waiting}
              </p>
            </div>

            {/* Dismiss */}
            <button
              onClick={() => setReturnNotifDismissed(true)}
              className="shrink-0 text-[#F7F7F7]/40 hover:text-[#F7F7F7] transition-colors text-[11px] p-1 rounded"
              title={t.returnNotif.dismiss}
            >
              ✕
            </button>
          </div>

          {/* Tombol kembali ke sesi */}
          <button
            onClick={() => startWalkToClient()}
            className="mt-1.5 w-full flex items-center justify-center gap-1.5 px-3 py-2 bg-[#FFB22C] hover:bg-[#FFC45E] text-[#000000] font-extrabold text-[11px] rounded-xl shadow-lg transition-all active:scale-95"
          >
            <span>{t.returnNotif.button}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* --- COMPLETED SESSION QUICK BAR DURING ROOM EXPLORATION --- */}
      {gameMode === 'EXPLORATION' && evaluationResult && (
        <div className="fixed bottom-3 sm:bottom-4 left-3 right-3 sm:left-1/2 sm:-translate-x-1/2 sm:w-auto max-w-xl z-30 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 px-3.5 py-2.5 bg-[#18120F]/95 border-2 border-[#FFB22C] rounded-xl shadow-2xl backdrop-blur-md text-xs mx-auto">
          <div className="flex items-center gap-2 text-center sm:text-left min-w-0">
            <Award className="w-4 h-4 text-[#FFB22C] shrink-0 animate-bounce" />
            <span className="text-[#F7F7F7] text-[11px] sm:text-xs truncate">
              {t.sessionBar.finished} <strong>{currentClient?.name}</strong> {t.sessionBar.finishedSuffix} ({t.sessionBar.grade} {evaluationResult.grade} - {evaluationResult.score}/100)
            </span>
          </div>
          <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto justify-center">
            <button
              onClick={() => setGameMode('ENDING')}
              className="flex-1 sm:flex-initial px-3 py-1.5 rounded-lg bg-[#FFB22C] hover:bg-[#FFC45E] text-[#000000] font-bold text-[11px] sm:text-xs transition-all active:scale-95 shadow-md flex items-center justify-center gap-1.5"
            >
              <Award className="w-3.5 h-3.5" />
              <span>{t.sessionBar.openReport}</span>
            </button>
            <button
              onClick={generateNewClientCase}
              className="flex-1 sm:flex-initial px-2.5 py-1.5 rounded-lg bg-[#3D261B] hover:bg-[#523324] text-[#FFD382] border border-[#854836] font-bold text-[11px] sm:text-xs transition-all active:scale-95 flex items-center justify-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5 text-[#FFB22C]" />
              <span>{t.sessionBar.newCase}</span>
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
                {t.helpModal.header}
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
                  <UserCheck className="w-4 h-4 text-[#FFB22C]" /> {t.helpModal.roleTitle}
                </strong>
                <p className="text-[11px] leading-relaxed text-[#F7F7F7]/85">
                  {t.helpModal.roleDesc}
                </p>
              </div>

              {/* Exploration Controls */}
              <div className="p-2.5 bg-[#241B17] border border-[#854836]/60 rounded-lg">
                <strong className="text-[#FFB22C] block mb-1">{t.helpModal.navTitle}</strong>
                <ul className="space-y-1 list-disc list-inside">
                  <li><strong>Desktop:</strong> {t.helpModal.navDesktop}</li>
                  <li><strong>HP / Tablet:</strong> {t.helpModal.navMobile}</li>
                </ul>
              </div>

              {/* Counseling Tips */}
              <div className="p-2.5 bg-[#241B17] border border-[#854836]/60 rounded-lg">
                <strong className="text-[#FFB22C] block mb-1">{t.helpModal.tipsTitle}</strong>
                <ul className="space-y-1 list-disc list-inside">
                  <li>{t.helpModal.tip1}</li>
                  <li>{t.helpModal.tip2}</li>
                  <li>{t.helpModal.tip3}</li>
                  <li>{t.helpModal.tip4}</li>
                </ul>
              </div>
            </div>

            <div className="flex justify-end pt-1">
              <PixelButton variant="primary" size="sm" onClick={() => setShowHelpModal(false)}>
                {t.helpModal.button}
              </PixelButton>
            </div>
          </div>
        </div>
      )}

      {/* --- MOBILE NAVIGATION DRAWER (HYBRID MOBILE MENU) --- */}
      <AnimatePresence>
        {showMobileMenu && (
          <>
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowMobileMenu(false)}
              className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs md:hidden"
            />

            {/* Slide-in Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 280 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-[85%] max-w-[320px] bg-[#18120F] border-l-4 border-[#854836] shadow-2xl backdrop-blur-xl p-4 flex flex-col justify-between overflow-y-auto text-[#F7F7F7] md:hidden"
            >
              {/* Drawer Content Wrapper */}
              <div className="flex flex-col gap-3">
                {/* Drawer Header */}
                <div className="flex items-center justify-between border-b-2 border-[#854836] pb-3">
                  <div className="flex items-center gap-2">
                    <Compass className="w-4 h-4 text-[#FFB22C]" />
                    <span className="text-xs font-black tracking-wider text-[#FFB22C]">
                      {t.mobileDrawer.title}
                    </span>
                  </div>
                  <button
                    onClick={() => setShowMobileMenu(false)}
                    className="p-1 bg-[#241B17] hover:bg-[#9A342D] border border-[#854836] rounded text-[#F7F7F7] transition-colors"
                    title={t.mobileDrawer.close}
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Counselor Rank Banner */}
                <div className="flex items-center gap-2.5 p-2.5 bg-[#241B17] border-2 border-[#854836] rounded-xl shadow-inner">
                  <div className="w-7 h-7 rounded-lg bg-[#FFB22C]/20 border border-[#FFB22C]/40 flex items-center justify-center shrink-0">
                    <Award className="w-4 h-4 text-[#FFB22C]" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-[9px] text-[#FFD382]/70 font-bold uppercase tracking-wider">
                      {t.mobileDrawer.counselorRank}
                    </span>
                    <span className="text-xs font-extrabold text-white leading-tight truncate" title={counselorRank}>
                      {counselorRank}
                    </span>
                  </div>
                </div>

                {/* Language Switcher in Drawer */}
                <LanguageToggle variant="drawer" />

                {/* Client Info Card (Mobile Quick Status) */}
                {currentClient && (
                  <div className="p-3 bg-[#241B17] border-2 border-[#854836] rounded-xl flex flex-col gap-2 shadow-inner">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-[#FFD382]/70 font-semibold uppercase tracking-wider">
                        {t.mobileDrawer.currentClient}
                      </span>
                      <span className="px-1.5 py-0.5 text-[9px] font-bold bg-[#FFB22C] text-[#120E0C] border border-[#854836] rounded">
                        {t.archetypes?.[currentClient.archetypeId]?.name || currentClient.archetypeName}
                      </span>
                    </div>
                    <p className="text-xs font-extrabold text-white truncate">{tDialogue(currentClient.name, language)}</p>

                    {/* Stats Progress Bars */}
                    <div className="grid grid-cols-2 gap-2 pt-1 border-t border-[#854836]/40 text-[10px]">
                      <div className="flex flex-col gap-0.5">
                        <div className="flex items-center justify-between text-[#EF4444] font-bold">
                          <span className="flex items-center gap-1">
                            <Activity className="w-2.5 h-2.5" /> {t.common.tension}
                          </span>
                          <span>{currentClient.currentTension}%</span>
                        </div>
                        <div className="w-full bg-[#120E0C] h-1.5 rounded-full overflow-hidden border border-[#854836]/60">
                          <div
                            className="bg-[#EF4444] h-full transition-all duration-300"
                            style={{ width: `${Math.min(100, Math.max(0, currentClient.currentTension))}%` }}
                          />
                        </div>
                      </div>

                      <div className="flex flex-col gap-0.5">
                        <div className="flex items-center justify-between text-[#D97706] font-bold">
                          <span className="flex items-center gap-1">
                            <Heart className="w-2.5 h-2.5" /> {t.common.rapport}
                          </span>
                          <span>{currentClient.currentRapport}%</span>
                        </div>
                        <div className="w-full bg-[#120E0C] h-1.5 rounded-full overflow-hidden border border-[#854836]/60">
                          <div
                            className="bg-[#FFB22C] h-full transition-all duration-300"
                            style={{ width: `${Math.min(100, Math.max(0, currentClient.currentRapport))}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation Items List */}
                <div className="flex flex-col gap-2 mt-1">
                  <span className="text-[10px] font-bold text-[#FFD382]/60 uppercase tracking-wider px-1">
                    {t.mobileDrawer.gameModules}
                  </span>

                  {/* Toko Renovasi & Dekorasi */}
                  <button
                    onClick={() => {
                      setShopOpen(true);
                      setShowMobileMenu(false);
                    }}
                    className="w-full p-2.5 bg-[#241B17] hover:bg-[#854836]/40 border-2 border-[#854836] rounded-xl flex items-center justify-between text-left transition-all active:scale-98 group"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-[#FFB22C]/20 border border-[#FFB22C]/40 flex items-center justify-center shrink-0">
                        <Store className="w-4 h-4 text-[#FFB22C]" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-white group-hover:text-[#FFB22C] transition-colors">
                          {t.mobileDrawer.shopTitle}
                        </p>
                        <p className="text-[10px] text-[#F7F7F7]/60">{t.mobileDrawer.shopDesc}</p>
                      </div>
                    </div>
                    <span className="text-[9px] bg-[#FFB22C] text-[#120E0C] px-1.5 py-0.5 rounded font-mono font-black shrink-0">
                      {reputationXP} {t.common.xp}
                    </span>
                  </button>

                  {/* Lo-Fi Radio Toggle */}
                  <button
                    onClick={() => {
                      toggleRadio();
                    }}
                    className="w-full p-2.5 bg-[#241B17] hover:bg-[#854836]/40 border-2 border-[#854836] rounded-xl flex items-center justify-between text-left transition-all active:scale-98 group"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className={`w-7 h-7 rounded-lg border flex items-center justify-center shrink-0 ${isRadioPlaying ? 'bg-[#FFB22C] border-[#FFB22C]' : 'bg-[#FFB22C]/20 border-[#FFB22C]/40'}`}>
                        <Music2 className={`w-4 h-4 ${isRadioPlaying ? 'text-[#120E0C] animate-bounce' : 'text-[#FFB22C]'}`} />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-white group-hover:text-[#FFB22C] transition-colors">
                          {t.mobileDrawer.musicTitle}
                        </p>
                        <p className="text-[10px] text-[#F7F7F7]/60">
                          {isRadioPlaying ? t.mobileDrawer.musicPlayingDesc : t.mobileDrawer.musicOffDesc}
                        </p>
                      </div>
                    </div>
                    <span className={`text-[9px] px-2 py-0.5 rounded font-bold font-mono shrink-0 ${isRadioPlaying ? 'bg-[#FFB22C] text-[#120E0C]' : 'bg-[#120E0C] text-[#F7F7F7]/50 border border-[#854836]'}`}>
                      {isRadioPlaying ? t.nav.musicPlaying : t.nav.musicStopped}
                    </span>
                  </button>

                  {/* Teori Psikologi */}
                  <button
                    onClick={() => {
                      setGameMode('REFERENCE');
                      setShowMobileMenu(false);
                    }}
                    className="w-full p-2.5 bg-[#241B17] hover:bg-[#854836]/40 border-2 border-[#854836] rounded-xl flex items-center justify-between text-left transition-all active:scale-98 group"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-[#FFB22C]/20 border border-[#FFB22C]/40 flex items-center justify-center shrink-0">
                        <BookOpen className="w-4 h-4 text-[#FFB22C]" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-white group-hover:text-[#FFB22C] transition-colors">
                          {t.mobileDrawer.theoryTitle}
                        </p>
                        <p className="text-[10px] text-[#F7F7F7]/60">{t.mobileDrawer.theoryDesc}</p>
                      </div>
                    </div>
                  </button>

                  {/* Kasus Baru */}
                  <button
                    onClick={() => {
                      generateNewClientCase();
                      setShowMobileMenu(false);
                    }}
                    className="w-full p-2.5 bg-[#241B17] hover:bg-[#854836]/40 border-2 border-[#854836] rounded-xl flex items-center justify-between text-left transition-all active:scale-98 group"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-[#FFB22C]/20 border border-[#FFB22C]/40 flex items-center justify-center shrink-0">
                        <RotateCcw className="w-4 h-4 text-[#FFB22C]" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-white group-hover:text-[#FFB22C] transition-colors">
                          {t.mobileDrawer.newCaseTitle}
                        </p>
                        <p className="text-[10px] text-[#F7F7F7]/60">{t.mobileDrawer.newCaseDesc}</p>
                      </div>
                    </div>
                  </button>

                  {/* Petunjuk & Panduan Bermain */}
                  <button
                    onClick={() => {
                      setShowHelpModal(true);
                      setShowMobileMenu(false);
                    }}
                    className="w-full p-2.5 bg-[#241B17] hover:bg-[#854836]/40 border-2 border-[#854836] rounded-xl flex items-center justify-between text-left transition-all active:scale-98 group"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-[#FFB22C]/20 border border-[#FFB22C]/40 flex items-center justify-center shrink-0">
                        <HelpCircle className="w-4 h-4 text-[#FFB22C]" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-white group-hover:text-[#FFB22C] transition-colors">
                          {t.mobileDrawer.helpTitle}
                        </p>
                        <p className="text-[10px] text-[#F7F7F7]/60">{t.mobileDrawer.helpDesc}</p>
                      </div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Drawer Footer */}
              <div className="mt-4 pt-3 border-t border-[#854836]/50 text-center">
                <p className="text-[9px] text-[#FFD382]/60 font-mono">{t.mobileDrawer.version}</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
export default App;
