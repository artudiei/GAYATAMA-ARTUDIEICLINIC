import React, { useState } from 'react';
import { useGameStore } from '../../store/useGameStore';
import { DialogueOption } from '../../types/game';
import { ClientPixelAvatar } from '../ui/ClientPixelAvatar';
import {
  Sparkles,
  ArrowRight,
  X,
  Heart,
  Activity,
  MessageSquare,
  BookOpen,
  ClipboardList,
  Brain,
  Layers,
  ChevronDown,
  ChevronUp,
  UserCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const DialogueOverlay: React.FC = () => {
  const {
    gameMode,
    currentClient,
    lastDecisionFeedback,
    setGameMode,
    handleDialogueChoice,
    advanceToNextPhase
  } = useGameStore();

  const [showFormulationModal, setShowFormulationModal] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [pendingChoice, setPendingChoice] = useState<DialogueOption | null>(null);
  const [showExitConfirm, setShowExitConfirm] = useState(false);

  if (gameMode !== 'DIALOGUE' || !currentClient) return null;

  const currentPhase = currentClient.phases[currentClient.currentPhaseIndex];

  const getApproachStyle = (index: number) => {
    switch (index % 3) {
      case 0: return { icon: '🌱', label: 'Mendengarkan', borderHover: 'hover:border-[#FFB22C]', accent: 'text-[#FFD382]', bgTag: 'bg-[#3D261B]', badgeBorder: 'border-[#FFB22C]/40' };
      case 1: return { icon: '🔍', label: 'Memeriksa Fakta', borderHover: 'hover:border-[#FFB22C]', accent: 'text-[#FFB22C]', bgTag: 'bg-[#48281E]', badgeBorder: 'border-[#854836]' };
      default: return { icon: '🤝', label: 'Solusi Bersama', borderHover: 'hover:border-[#FFB22C]', accent: 'text-[#F7F7F7]', bgTag: 'bg-[#2A1D17]', badgeBorder: 'border-[#FFB22C]/40' };
    }
  };

  const getReadinessStage = (phaseIdx: number) => {
    switch (phaseIdx) {
      case 0: return { stage: 'Pre-Contemplation', color: 'text-[#FFB22C]' };
      case 1: return { stage: 'Contemplation', color: 'text-[#FFD382]' };
      default: return { stage: 'Preparation & Aksi', color: 'text-[#F7F7F7]' };
    }
  };

  const readiness = getReadinessStage(currentClient.currentPhaseIndex);

  const handleChoiceWithPreview = (option: DialogueOption) => {
    setPendingChoice(option);
  };

  const handleConfirmChoice = () => {
    if (!pendingChoice) return;
    const chosen = pendingChoice;
    setPendingChoice(null);
    handleDialogueChoice(chosen);
  };

  return (
    <AnimatePresence>
      {/* 
        ── BOTTOM SHEET LAYOUT ──
        Semua konten dialog berada di bawah layar.
        Game canvas tetap terlihat di atas.
        pointer-events: none pada wrapper, auto pada panel itu sendiri.
      */}
      <div className="fixed inset-0 z-40 pointer-events-none flex flex-col justify-end">

        {/* ── TOP-RIGHT QUICK ACTIONS ── */}
        <div
          className="absolute top-16 right-2 sm:right-4 flex items-center gap-1.5 pointer-events-auto z-50"
        >
          <button
            onClick={() => setShowFormulationModal(true)}
            className="px-2 py-1 rounded-md bg-[#18120F]/95 border-2 border-[#854836] hover:border-[#FFB22C] text-[#FFD382] text-[10px] font-bold shadow-md flex items-center gap-1 transition-all active:scale-95"
            title="Catatan Klinis"
          >
            <ClipboardList className="w-3 h-3 text-[#FFB22C]" />
            <span className="hidden sm:inline">Catatan</span>
          </button>
          <button
            onClick={() => setShowExitConfirm(true)}
            className="p-1.5 rounded-md bg-[#18120F]/95 border-2 border-[#854836] hover:bg-[#9A342D] text-[#F7F7F7] shadow-md transition-all active:scale-95"
            title="Keluar sesi"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* ── BOTTOM SHEET PANEL ── */}
        <motion.div
          key="dialogue-bottom-sheet"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 40, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 340, damping: 32 }}
          className="pointer-events-auto w-full px-2 sm:px-4 pb-2 sm:pb-3 md:px-8 md:pb-5 flex flex-col gap-2 md:gap-3 max-w-7xl mx-auto max-h-[65vh] md:max-h-[78vh]"
        >

          {/* ─── CLIENT BUBBLE (compact di mobile, squarish & naik di desktop) ─── */}
          <motion.div
            key={`client-bubble-${currentClient.currentPhaseIndex}`}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.05, type: 'spring', stiffness: 380, damping: 30 }}
            className="self-start max-w-[85%] sm:max-w-[60%] md:w-[380px] lg:w-[420px] md:max-w-[420px] md:-translate-y-3 lg:-translate-y-5 md:mb-1 relative transition-transform duration-200"
          >
            <div className="bg-[#18120F]/95 border-2 border-[#854836] px-3 py-2 md:p-4 rounded-xl rounded-bl-sm shadow-xl backdrop-blur-xl text-[#F7F7F7] md:min-h-[170px] lg:min-h-[190px] flex flex-col justify-between">
              {/* Client header with Avatar & Persona info */}
              <div className="flex items-center justify-between gap-2 mb-1.5 md:mb-2.5">
                <div className="flex items-center gap-2 min-w-0">
                  <ClientPixelAvatar
                    client={currentClient}
                    size="sm"
                    className="shrink-0"
                  />
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[11px] md:text-xs font-extrabold text-[#F7F7F7] truncate">{currentClient.name}</span>
                      <span className="text-[9px] px-1 py-0.2 rounded font-bold bg-[#FFB22C]/20 text-[#FFD382] border border-[#FFB22C]/40">
                        {currentClient.gender === 'female' ? '♀ Puan' : '♂ Tuan'}
                      </span>
                    </div>
                    <span
                      className="text-[9px] md:text-[10px] text-[#FFB22C] font-semibold truncate block cursor-default"
                      title={currentClient.archetypeName}
                    >
                      {currentClient.archetypeName}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setShowDetails(d => !d)}
                  className="text-[9px] md:text-[10px] text-[#FFD382] flex items-center gap-0.5 bg-[#241B17] px-1.5 py-0.5 md:px-2 md:py-1 rounded border border-[#854836]/60 transition-colors shrink-0 hover:text-[#FFB22C]"
                >
                  {showDetails ? 'Tutup' : 'Petunjuk'}
                  {showDetails ? <ChevronUp className="w-2.5 h-2.5 md:w-3 md:h-3" /> : <ChevronDown className="w-2.5 h-2.5 md:w-3 md:h-3" />}
                </button>
              </div>

              {/* Speech text */}
              <div className="pl-2 md:pl-3 border-l-2 border-[#FFB22C] my-auto">
                <p className="text-[11px] md:text-[13px] text-[#F7F7F7] leading-snug md:leading-relaxed font-medium">
                  "{currentPhase?.clientSpeech}"
                </p>
              </div>

              {/* Expandable details */}
              <AnimatePresence>
                {showDetails && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.15 }}
                    className="overflow-hidden mt-1.5 md:mt-2.5 pt-1.5 md:pt-2 border-t border-[#3D2E27] flex flex-col gap-1 md:gap-1.5 text-[10px] md:text-[11px]"
                  >
                    <div className="flex items-start gap-1 p-1.5 md:p-2 rounded bg-[#241B17] border border-[#854836]/50 leading-tight">
                      <span className="shrink-0">👁️</span>
                      <div><strong className="text-[#FFB22C] mr-1">Bahasa Tubuh:</strong><span className="text-[#F7F7F7]/85">{currentPhase?.clientNonVerbal}</span></div>
                    </div>
                    <div className="flex items-start gap-1 p-1.5 md:p-2 rounded bg-[#241B17] border border-[#854836]/50 leading-tight">
                      <span className="shrink-0">💭</span>
                      <div><strong className="text-[#FFD382] mr-1">Dinamika Batin:</strong><span className="text-[#F7F7F7]/85">{currentPhase?.clientInnerDistress}</span></div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            {/* Bubble tail kiri bawah */}
            <div className="absolute -bottom-2 left-5 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[7px] border-t-[#854836]" />
            <div className="absolute -bottom-1 left-5 w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[6px] border-t-[#18120F]" />
          </motion.div>

          {/* ─── PSYCHOLOGIST ANSWER BUBBLE (pending) ─── */}
          <AnimatePresence>
            {pendingChoice && (
              <motion.div
                key="psy-answer-bubble"
                initial={{ opacity: 0, x: 10, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                className="self-end flex flex-col items-end gap-1.5 max-w-[85%] sm:max-w-[60%] md:w-[380px] lg:w-[420px] md:max-w-[420px] md:-translate-y-3 lg:-translate-y-5 md:mb-1 transition-transform duration-200"
              >
                <div className="flex items-center gap-1 text-[9px] md:text-[10px] text-[#FFD382]/70 font-semibold">
                  <UserCheck className="w-2.5 h-2.5 md:w-3 md:h-3" />
                  <span>Anda (Psikolog)</span>
                </div>
                <div className="w-full relative bg-[#FFB22C]/15 border-2 border-[#FFB22C]/60 px-3 py-2 md:p-4 rounded-xl rounded-tr-sm shadow-xl md:min-h-[120px] lg:min-h-[140px] flex flex-col justify-center">
                  <p className="text-[11px] md:text-[13px] text-[#FFD382] leading-snug md:leading-relaxed font-medium italic">
                    "{pendingChoice.text}"
                  </p>
                  <div className="absolute -top-2 right-4 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[7px] border-b-[#FFB22C]/60" />
                </div>
                <button
                  onClick={handleConfirmChoice}
                  className="flex items-center gap-1.5 px-3 py-1.5 md:px-4 md:py-2 rounded-lg bg-[#FFB22C] hover:bg-[#FFC45E] text-[#000000] text-[11px] md:text-xs font-extrabold shadow-md transition-all active:scale-95 cursor-pointer"
                >
                  <span>Kirim Respons</span>
                  <ArrowRight className="w-3 h-3 md:w-3.5 md:h-3.5" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ─── MAIN RESPONSE PANEL (Choices / Feedback / Waiting) ─── */}
          <AnimatePresence mode="wait">

            {lastDecisionFeedback ? (
              /* FEEDBACK after decision */
              <motion.div
                key="feedback-panel"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="bg-[#18120F]/98 border-2 border-[#FFB22C] p-2.5 sm:p-3 rounded-xl shadow-xl backdrop-blur-xl flex flex-col gap-2 overflow-y-auto"
                style={{ maxHeight: '35vh' }}
              >
                <div className="flex items-center justify-between border-b border-[#3D2E27] pb-1.5 text-[11px]">
                  <span className="font-bold text-[#FFB22C] flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-[#FFB22C] animate-pulse" /> Reaksi Klien:
                  </span>
                  <div className="flex items-center gap-2 font-mono font-bold text-[10px]">
                    <span className={lastDecisionFeedback.tensionDelta <= 0 ? 'text-[#10B981]' : 'text-[#EF4444]'}>
                      {lastDecisionFeedback.tensionDelta > 0 ? '+' : ''}{lastDecisionFeedback.tensionDelta}% Beban
                    </span>
                    <span className={lastDecisionFeedback.rapportDelta >= 0 ? 'text-[#FFB22C]' : 'text-[#EF4444]'}>
                      {lastDecisionFeedback.rapportDelta > 0 ? '+' : ''}{lastDecisionFeedback.rapportDelta}% Percaya
                    </span>
                  </div>
                </div>

                <div className="p-2 bg-[#120E0C] rounded-lg border border-[#854836]/70 italic text-[10px] sm:text-[11px] text-[#F7F7F7]">
                  🗣️ "{lastDecisionFeedback.clientReaction}"
                </div>

                <div className="p-2 bg-[#241B17] rounded-lg border border-[#854836]/60 text-[10px] sm:text-[11px] text-[#F7F7F7]/90 leading-snug">
                  <strong className="text-[#FFB22C] mr-1">💡 Observasi:</strong>
                  {lastDecisionFeedback.feedback}
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-1.5">
                  {lastDecisionFeedback.journalRef && (
                    <div className="flex items-center gap-1 p-1.5 bg-[#120E0C] border border-[#854836]/60 rounded-md flex-1 min-w-0">
                      <BookOpen className="w-3 h-3 text-[#FFB22C] shrink-0" />
                      <div className="text-[9px] truncate flex-1">
                        <span className="text-[#F7F7F7] font-semibold">{lastDecisionFeedback.journalRef.title} </span>
                        <span className="text-[#FFD382]/70">({lastDecisionFeedback.journalRef.citation})</span>
                      </div>
                      <a
                        href={lastDecisionFeedback.journalRef.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-1.5 py-0.5 rounded bg-[#854836] hover:bg-[#9F5742] text-[#F7F7F7] border border-[#FFB22C]/60 text-[9px] font-bold shrink-0 transition-all"
                      >
                        ↗
                      </a>
                    </div>
                  )}
                  <button
                    onClick={advanceToNextPhase}
                    className="px-4 py-2 rounded-lg bg-[#FFB22C] hover:bg-[#FFC45E] text-[#000000] font-extrabold text-[11px] flex items-center justify-center gap-1.5 shadow-md transition-all active:scale-95 shrink-0"
                  >
                    <span>Tahap Berikutnya</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>

            ) : pendingChoice ? (
              /* WAITING — jawaban sudah tampil, tunggu konfirmasi */
              <motion.div
                key="pending-hint"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="bg-[#18120F]/80 border-2 border-[#FFB22C]/30 px-3 py-2 rounded-xl backdrop-blur-xl flex items-center gap-2 text-[#FFD382]/70 text-[10px]"
              >
                <span>✍️</span>
                <span>Tinjau respons di atas, lalu tekan <strong className="text-[#FFB22C]">Kirim Respons</strong>.</span>
              </motion.div>

            ) : (
              /* ACTIVE CHOICES */
              <motion.div
                key="choices-panel"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="bg-[#18120F]/95 border-2 border-[#854836] p-2 rounded-xl shadow-lg backdrop-blur-xl flex flex-col gap-1.5"
              >
                {/* Header */}
                <div className="flex items-center justify-between border-b border-[#3D2E27] pb-1">
                  <span className="text-[10px] font-bold text-[#FFB22C] flex items-center gap-1">
                    <MessageSquare className="w-3 h-3" />
                    Respon Komunikasi:
                  </span>
                  <span className="text-[9px] text-[#F7F7F7]/50 font-mono">
                    <strong className={readiness.color}>{readiness.stage}</strong>
                  </span>
                </div>

                {/* 3 Cards — horizontal row di mobile (1 baris scroll), 3 kolom di md+ */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5">
                  {currentPhase?.options.map((option: DialogueOption, index: number) => {
                    const style = getApproachStyle(index);
                    return (
                      <button
                        key={option.id}
                        onClick={() => handleChoiceWithPreview(option)}
                        disabled={!!pendingChoice}
                        className={`p-2 text-left rounded-lg border transition-all duration-150 flex flex-col gap-1 relative group bg-[#1C1613] border-[#854836]/60 ${style.borderHover} hover:bg-[#261E1A] hover:-translate-y-0.5 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed`}
                      >
                        <div className={`text-[9px] font-bold px-1.5 py-0.5 rounded border ${style.badgeBorder} ${style.bgTag} ${style.accent} self-start inline-flex items-center gap-1`}>
                          {option.hotsTitle || `${style.icon} ${style.label}`}
                        </div>
                        <p className="text-[10px] sm:text-[11px] text-[#F7F7F7]/95 leading-snug flex-1">
                          "{option.text}"
                        </p>
                        <div className="pt-1 border-t border-[#3D2E27] flex items-center justify-between text-[9px] text-[#F7F7F7]/40 group-hover:text-[#FFB22C] transition-colors">
                          <span className="font-semibold">Pilih</span>
                          <ArrowRight className="w-2.5 h-2.5 group-hover:translate-x-0.5 transition-transform" />
                        </div>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </motion.div>
      </div>

      {/* ── EXIT CONFIRMATION MODAL ── */}
      <AnimatePresence>
        {showExitConfirm && (
          <motion.div
            key="exit-confirm-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.88, opacity: 0, y: 16 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.88, opacity: 0, y: 16 }}
              transition={{ type: 'spring', stiffness: 360, damping: 28 }}
              className="w-full max-w-sm bg-[#1C1613] border-2 border-[#FFB22C] rounded-2xl p-5 shadow-2xl text-[#F7F7F7] flex flex-col gap-4"
            >
              {/* Header */}
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-[#9A342D]/30 border-2 border-[#9A342D] flex items-center justify-center shrink-0">
                  <X className="w-4 h-4 text-[#EF4444]" />
                </div>
                <div>
                  <h4 className="text-sm font-extrabold text-[#FFB22C] leading-tight">Tinggalkan Sesi?</h4>
                  <p className="text-[10px] text-[#F7F7F7]/50 mt-0.5">Sesi konseling sedang berlangsung</p>
                </div>
              </div>

              {/* Warning body */}
              <div className="p-3 bg-[#241B17] border border-[#854836] rounded-xl text-[11px] leading-relaxed text-[#F7F7F7]/85 space-y-1.5">
                <p>⚠️ <strong className="text-[#FFD382]">Klien {currentClient?.name}</strong> masih menunggu respons Anda di sesi ini.</p>
                <p>Jika Anda keluar sekarang, progres sesi tidak hilang — Anda bisa kembali kapan saja dengan mendekati klien lagi.</p>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => setShowExitConfirm(false)}
                  className="w-full py-2.5 rounded-xl bg-[#FFB22C] hover:bg-[#FFC45E] text-[#000000] font-extrabold text-[12px] transition-all active:scale-95 shadow-md flex items-center justify-center gap-1.5"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  Lanjutkan Sesi Konseling
                </button>
                <button
                  onClick={() => { setShowExitConfirm(false); setGameMode('EXPLORATION'); }}
                  className="w-full py-2 rounded-xl bg-transparent border border-[#854836] hover:bg-[#9A342D]/30 text-[#F7F7F7]/60 hover:text-[#F7F7F7] font-semibold text-[11px] transition-all active:scale-95"
                >
                  Keluar & Eksplorasi Ruangan
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── CLINICAL CASE FORMULATION MODAL ── */}
      {showFormulationModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="w-full max-w-2xl bg-[#1C1613] border-2 border-[#854836] rounded-2xl p-5 shadow-2xl text-[#F7F7F7] flex flex-col gap-4 max-h-[85vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between border-b border-[#3D2E27] pb-2.5">
              <div className="flex items-center gap-2">
                <Brain className="w-4 h-4 text-[#FFB22C]" />
                <h3 className="font-bold text-sm text-[#F7F7F7]">Formulasi Kasus & Rekam Jejak Klinis</h3>
              </div>
              <button
                onClick={() => setShowFormulationModal(false)}
                className="text-xs px-2 py-1 rounded bg-[#241B17] border border-[#854836] hover:bg-[#9A342D] transition-colors text-white"
              >✕</button>
            </div>

            <div className="flex flex-col gap-3 text-xs">
              <div className="p-3 bg-[#241B17] border border-[#854836]/60 rounded-xl flex flex-col gap-2">
                <div><span className="text-[#FFB22C] font-bold block mb-0.5">Klien:</span><p className="text-[#F7F7F7]">{currentClient.name} ({currentClient.profession}) - {currentClient.archetypeName}</p></div>
                <div><span className="text-[#FFB22C] font-bold block mb-0.5">Keluhan Utama:</span><p className="text-[#F7F7F7]/85">"{currentClient.complaintTitle}"</p></div>
                <div><span className="text-[#FFD382] font-bold block mb-0.5">Kerangka Teori Rujukan:</span><p className="text-[#F7F7F7]/85">{currentClient.theoryConnection?.framework || 'CBT & Polyvagal Model'}</p></div>
              </div>

              <div className="p-3 bg-[#241B17] border border-[#854836]/60 rounded-xl flex flex-col gap-2">
                <div className="font-bold text-xs text-[#FFB22C] flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5" /> Rekam Jejak Keputusan Sesi Ini:
                </div>
                {currentClient.sessionHistory.length === 0 ? (
                  <p className="text-[#F7F7F7]/40 italic py-1 text-xs">Belum ada respon yang dipilih pada sesi ini.</p>
                ) : (
                  <div className="space-y-2">
                    {currentClient.sessionHistory.map((item, idx) => (
                      <div key={idx} className="p-2.5 bg-[#18120F] border border-[#854836]/50 rounded-lg flex flex-col gap-1">
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="font-bold text-[#FFB22C]">Tahap {idx + 1}: {item.phaseName}</span>
                          <span className="font-mono text-[#FFD382]">{item.resultingTension}% / {item.resultingRapport}%</span>
                        </div>
                        <p className="text-[11px] text-[#F7F7F7]/85">"{item.chosenOption.text}"</p>
                        <div className="text-[10px] text-[#FFD382] bg-[#241B17] p-1.5 rounded border border-[#854836]/40">
                          💡 {item.chosenOption.feedback}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-end pt-1">
              <button
                onClick={() => setShowFormulationModal(false)}
                className="px-4 py-2 rounded-lg bg-[#FFB22C] hover:bg-[#FFC45E] text-[#000000] font-bold text-xs"
              >
                Kembali ke Dialog
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
