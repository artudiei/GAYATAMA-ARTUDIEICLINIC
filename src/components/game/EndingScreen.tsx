import React from 'react';
import { useGameStore } from '../../store/useGameStore';
import { ClientPixelAvatar } from '../ui/ClientPixelAvatar';
import { Award, RotateCcw, Activity, Heart, CheckCircle2, Sparkles, Quote, Library, ExternalLink, FileText, Smartphone } from 'lucide-react';
import { motion } from 'framer-motion';
import logoImg from '../../assets/logo-artudieiclinic.png';

export const EndingScreen: React.FC = () => {
  const {
    gameMode,
    evaluationResult,
    currentClient,
    totalClientsHelped,
    generateNewClientCase,
    setGameMode,
    setPhoneOpen
  } = useGameStore();

  if (gameMode !== 'ENDING' || !evaluationResult) return null;

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'S':
        return 'text-[#FFB22C] border-[#FFB22C] bg-[#2E1E16]';
      case 'A':
        return 'text-[#FFD382] border-[#FFB22C]/70 bg-[#251812]';
      case 'B':
        return 'text-[#F7F7F7] border-[#854836] bg-[#221B17]';
      case 'C':
        return 'text-[#FFC45E] border-[#854836] bg-[#1E1714]';
      default:
        return 'text-[#FFA8A8] border-[#9A342D] bg-[#2A1715]';
    }
  };

  const theory = evaluationResult.theoryConnection;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <motion.div
        initial={{ scale: 0.94, opacity: 0, y: 16 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="w-full max-w-3xl bg-[#18120F]/98 border-2 border-[#854836] shadow-2xl text-[#F7F7F7] flex flex-col overflow-hidden my-auto rounded-2xl backdrop-blur-xl"
      >
        {/* Top Clean Header */}
        <div className="bg-[#120E0C] border-b border-[#854836]/60 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FFB22C] border border-[#FFB22C]/60 flex items-center justify-center shadow-inner overflow-hidden p-0.5 shrink-0">
              <img src={logoImg} alt="ARTUDIEI Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <h2 className="font-bold text-base sm:text-lg text-[#F7F7F7] tracking-wide">
                Laporan Hasil Sesi & Refleksi Teori Ilmiah
              </h2>
              <span className="text-[11px] text-[#FFB22C]">
                ARTUDIEI CLINICAL OUTCOME REPORT
              </span>
            </div>
          </div>
          <div className="text-right">
            <span className="text-[11px] text-[#F7F7F7]/60 block font-mono">
              Total Sesi Selesai
            </span>
            <span className="text-sm font-bold text-[#FFB22C] font-mono">
              #{totalClientsHelped} Kasus
            </span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 flex flex-col gap-4 max-h-[70vh] overflow-y-auto">
          {/* Main Grade & Score Card */}
          <div className="bg-[#1C1613] border border-[#854836]/60 p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-xl">
            <div className="flex items-center gap-3.5">
              {/* Big Grade Badge */}
              <div
                className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl border-2 flex flex-col items-center justify-center shadow-md ${getGradeColor(
                  evaluationResult.grade
                )}`}
              >
                <span className="text-2xl sm:text-3xl font-extrabold">{evaluationResult.grade}</span>
                <span className="text-[9px] font-mono tracking-wider opacity-80">GRADE</span>
              </div>

              {/* Client Pixel Avatar Portrait */}
              {currentClient && (
                <ClientPixelAvatar
                  client={currentClient}
                  size="lg"
                  className="inline-flex shrink-0 rounded-2xl border-2 border-[#854836]/60 shadow-md"
                />
              )}

              <div>
                <div className="text-xs font-bold text-[#FFB22C] uppercase tracking-wider mb-0.5">
                  PREDIKAT TERCAPAI
                </div>
                <h3 className="text-base sm:text-lg font-bold text-[#F7F7F7]">
                  {evaluationResult.titleAchieved}
                </h3>
                <p className="text-xs text-[#FFD382] font-mono mt-0.5">
                  Klien: {evaluationResult.clientName} ({evaluationResult.archetype})
                </p>
                {currentClient?.accessory && (
                  <p className="text-[11px] text-[#F7F7F7]/70 mt-0.5">
                    ✨ Ciri Khas: {currentClient.accessory}
                  </p>
                )}
              </div>
            </div>

            {/* Score Number */}
            <div className="flex flex-col items-center sm:items-end px-4 py-2.5 bg-[#241B17] border border-[#854836] rounded-xl">
              <span className="text-[10px] text-[#F7F7F7]/70 uppercase font-bold tracking-wider">SKOR TERAPEUTIK</span>
              <span className="text-2xl sm:text-3xl font-mono font-bold text-[#FFB22C]">
                {evaluationResult.score}/100
              </span>
            </div>
          </div>

          {/* Outcome Gauges */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-[#1C1613] border border-[#854836]/60 p-4 flex flex-col gap-1.5 rounded-xl">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-[#F7F7F7] flex items-center gap-1.5">
                  <Activity className="w-4 h-4 text-[#EF4444]" />
                  Tingkat Ketegangan Emosi
                </span>
                <span className="font-mono text-[#FFB22C] font-bold">
                  {currentClient?.initialTension}% ➔ {evaluationResult.finalTension}%
                </span>
              </div>
              <div className="text-[11px] text-[#F7F7F7]/80">
                Reduksi beban emosional:{' '}
                <strong className="text-[#FFB22C]">
                  {evaluationResult.tensionReduced >= 0 ? '-' : '+'}
                  {Math.abs(evaluationResult.tensionReduced)}%
                </strong>
              </div>
            </div>

            <div className="bg-[#1C1613] border border-[#854836]/60 p-4 flex flex-col gap-1.5 rounded-xl">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-[#F7F7F7] flex items-center gap-1.5">
                  <Heart className="w-4 h-4 text-[#FFB22C]" />
                  Rasa Aman & Kepercayaan (Rapport)
                </span>
                <span className="font-mono text-[#FFB22C] font-bold">
                  {currentClient?.initialRapport}% ➔ {evaluationResult.finalRapport}%
                </span>
              </div>
              <div className="text-[11px] text-[#F7F7F7]/80">
                Keterhubungan terapeutik:{' '}
                <strong className="text-[#FFB22C]">
                  {evaluationResult.finalRapport >= 70 ? 'Sangat Erat & Terbuka' : 'Cukup Terhubung'}
                </strong>
              </div>
            </div>
          </div>

          {/* Theoretical Mechanism Breakdown & Direct Journal Links */}
          {theory && (
            <div className="bg-[#1C1613] border border-[#FFB22C]/60 p-4 sm:p-5 flex flex-col gap-3 rounded-xl shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold text-[#FFB22C] uppercase tracking-wider">
                  <Library className="w-4 h-4 text-[#854836]" />
                  Bedah Teori Psikologi Kasus Ini
                </div>
                <span className="text-[10px] text-[#FFD382] bg-[#241B17] px-2.5 py-0.5 rounded-full border border-[#854836]">
                  Peer-Reviewed Literature
                </span>
              </div>

              <div className="text-xs">
                <span className="text-[#FFB22C] font-bold block mb-0.5">
                  📚 Kerangka Teori Utama:
                </span>
                <p className="text-sm font-bold text-[#F7F7F7]">
                  {theory.framework}
                </p>
              </div>

              {/* Scientific Mechanism Explanation */}
              <div className="p-3 bg-[#241B17] border border-[#854836]/60 text-xs text-[#F7F7F7]/90 leading-relaxed rounded-lg">
                <strong className="text-[#FFB22C] block mb-1 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> Penjelasan Mekanisme Psikologis:
                </strong>
                {theory.scientificExplanation}
              </div>

              {/* Academic Citations & CTA BUTTONS */}
              <div className="p-3.5 bg-[#201713] border border-[#854836] rounded-lg flex flex-col gap-2.5 text-[11px]">
                <span className="text-[#FFB22C] font-bold flex items-center gap-1">
                  <Quote className="w-3.5 h-3.5" /> Sumber Referensi Ilmiah (APA Citation):
                </span>
                <div className="font-mono text-[#F7F7F7]/90 pl-2 border-l-2 border-[#FFB22C] leading-snug">
                  • {theory.primarySource}
                </div>
                {theory.secondarySource && (
                  <div className="font-mono text-[#F7F7F7]/80 pl-2 border-l-2 border-[#854836] leading-snug">
                    • {theory.secondarySource}
                  </div>
                )}

                {/* Direct CTA Buttons */}
                <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#3D2E27]">
                  {theory.doiUrl && (
                    <a
                      href={theory.doiUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#854836] hover:bg-[#9F5742] text-[#F7F7F7] border border-[#FFB22C]/60 text-xs font-bold transition-all shadow-sm active:scale-95"
                      title="Buka publikasi jurnal resmi via DOI"
                    >
                      <ExternalLink className="w-3.5 h-3.5 text-[#FFB22C]" />
                      <span>Buka Jurnal Resmi (DOI) ↗</span>
                    </a>
                  )}

                  <a
                    href={theory.scholarUrl || theory.doiUrl || 'https://pubmed.ncbi.nlm.nih.gov/'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#241B17] hover:bg-[#35261F] text-[#FFD382] border border-[#854836] text-xs font-bold transition-all shadow-sm active:scale-95"
                    title="Cek arsip naskah ilmiah lengkap di PubMed / PMC / Scholar"
                  >
                    <FileText className="w-3.5 h-3.5 text-[#FFB22C]" />
                    <span>Arsip Naskah Ilmiah (PubMed / PMC) ↗</span>
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* HOTS Decision Analysis */}
          <div className="bg-[#1C1613] border border-[#854836]/60 p-4 rounded-xl">
            <div className="text-xs font-bold text-[#FFB22C] mb-2 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#FFB22C]" />
              DISTRIBUSI KEPUTUSAN KOGNITIF (BLOOM'S HOTS):
            </div>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-2.5 bg-[#241B17] border border-[#FFB22C]/60 rounded-lg">
                <span className="text-[11px] font-bold text-[#FFB22C] block">C4 ANALYZING</span>
                <div className="text-lg font-bold font-mono text-[#FFB22C] mt-0.5">
                  {evaluationResult.hotsBreakdown.c4Count}x
                </div>
                <div className="text-[10px] text-[#F7F7F7]/60">Pola & Pemicu</div>
              </div>

              <div className="p-2.5 bg-[#241B17] border border-[#854836] rounded-lg">
                <span className="text-[11px] font-bold text-[#FFD382] block">C5 EVALUATING</span>
                <div className="text-lg font-bold font-mono text-[#FFD382] mt-0.5">
                  {evaluationResult.hotsBreakdown.c5Count}x
                </div>
                <div className="text-[10px] text-[#F7F7F7]/60">Uji Realitas</div>
              </div>

              <div className="p-2.5 bg-[#241B17] border border-[#FFB22C]/60 rounded-lg">
                <span className="text-[11px] font-bold text-[#F7F7F7] block">C6 CREATING</span>
                <div className="text-lg font-bold font-mono text-[#F7F7F7] mt-0.5">
                  {evaluationResult.hotsBreakdown.c6Count}x
                </div>
                <div className="text-[10px] text-[#F7F7F7]/60">Rencana Aksi</div>
              </div>
            </div>
          </div>

          {/* Overall Diagnostic Insight */}
          <div className="bg-[#1C1613] border border-[#854836]/60 p-4 text-xs leading-relaxed rounded-xl">
            <strong className="text-[#FFB22C] block mb-1">
              📝 Evaluasi Keseluruhan:
            </strong>
            {evaluationResult.diagnosticInsight}
          </div>

          {/* Practical Recommendations */}
          <div className="bg-[#1C1613] border border-[#854836]/60 p-4 text-xs rounded-xl">
            <strong className="text-[#FFB22C] block mb-2">
              💡 Pelajaran Praktis untuk Kehidupan Nyata:
            </strong>
            <ul className="space-y-1.5">
              {evaluationResult.recommendations.map((rec, i) => (
                <li key={i} className="flex items-start gap-2 text-[#F7F7F7]/90">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#FFB22C] shrink-0 mt-0.5" />
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="bg-[#120E0C] border-t border-[#854836]/60 p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => setGameMode('EXPLORATION')}
              className="px-4 py-2.5 rounded-xl bg-[#221B17] hover:bg-[#35261F] border border-[#854836] text-xs font-bold text-[#F7F7F7]/90 transition-all active:scale-95 flex-1 sm:flex-none text-center"
            >
              Tinjau Ruangan
            </button>
            <button
              onClick={() => setPhoneOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-[#3A241C] hover:bg-[#523326] border border-[#FFB22C]/70 text-xs font-bold text-[#FFD382] transition-all active:scale-95 flex items-center justify-center gap-1.5 flex-1 sm:flex-none"
            >
              <Smartphone className="w-4 h-4 text-[#FFB22C]" />
              <span>Cek Pesan HP</span>
            </button>
          </div>

          <button
            onClick={generateNewClientCase}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#FFB22C] hover:bg-[#FFC45E] text-[#000000] text-xs font-bold transition-all shadow-md active:scale-95 flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Terima Klien Baru (Kasus Acak)</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};
