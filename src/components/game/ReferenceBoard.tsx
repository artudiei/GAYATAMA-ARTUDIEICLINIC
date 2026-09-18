import React, { useState } from 'react';
import { useGameStore } from '../../store/useGameStore';
import endingsData from '../../data/endings.json';
import { BookOpen, X, Sparkles, Brain, Quote, Library, ExternalLink, FileText, UserCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import logoImg from '../../assets/logo-artudieiclinic.png';

export const ReferenceBoard: React.FC = () => {
  const { gameMode, currentClient, setGameMode } = useGameStore();
  const [activeTab, setActiveTab] = useState<'theories' | 'client_profile' | 'hots_rubric'>('theories');

  if (gameMode !== 'REFERENCE') return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 12 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        className="w-full max-w-4xl max-h-[88vh] bg-[#18120F]/98 border-2 border-[#854836] shadow-2xl text-[#F7F7F7] flex flex-col overflow-hidden my-auto rounded-2xl backdrop-blur-xl"
      >
        {/* Top Header */}
        <div className="bg-[#120E0C] border-b border-[#854836]/60 px-4 sm:px-6 py-3.5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#FFB22C] border border-[#FFB22C]/60 flex items-center justify-center shadow-inner shrink-0 overflow-hidden p-0.5">
              <img src={logoImg} alt="ARTUDIEI Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <h2 className="font-bold text-sm sm:text-lg text-[#F7F7F7] tracking-wide">
                Buku Referensi & Teori Klinis Psikologi
              </h2>
              <span className="text-[10px] sm:text-[11px] text-[#FFB22C] font-mono">
                ARTUDIEI PSYCHOLOGY ARCHIVE & PEER-REVIEWED JOURNAL SOURCES
              </span>
            </div>
          </div>

          <button
            onClick={() => setGameMode('EXPLORATION')}
            className="w-8 h-8 rounded-full bg-[#221B17] border border-[#854836] flex items-center justify-center text-[#F7F7F7]/70 hover:text-white hover:bg-[#9A342D] hover:border-transparent transition-all shrink-0"
            title="Tutup Referensi"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Navigation (shrink-0 ensures it is NEVER hidden or cut off) */}
        <div className="flex border-b border-[#3D2E27] bg-[#120E0C] px-3 sm:px-6 gap-1.5 sm:gap-2 overflow-x-auto shrink-0 sticky top-0 z-10 pt-2">
          <button
            onClick={() => setActiveTab('theories')}
            className={`px-3.5 py-2 text-xs font-bold rounded-t-lg transition-all flex items-center gap-1.5 whitespace-nowrap shrink-0 ${activeTab === 'theories'
              ? 'bg-[#FFB22C] text-[#000000] border-t-2 border-x border-[#FFB22C]'
              : 'bg-[#241B17] text-[#F7F7F7]/70 hover:text-[#F7F7F7] border-t border-x border-[#3D2E27]'
              }`}
          >
            <Brain className="w-3.5 h-3.5" />
            <span>Teori Terapi & Link Jurnal Ilmiah</span>
          </button>
          <button
            onClick={() => setActiveTab('client_profile')}
            className={`px-3.5 py-2 text-xs font-bold rounded-t-lg transition-all flex items-center gap-1.5 whitespace-nowrap shrink-0 ${activeTab === 'client_profile'
              ? 'bg-[#FFB22C] text-[#000000] border-t-2 border-x border-[#FFB22C]'
              : 'bg-[#241B17] text-[#F7F7F7]/70 hover:text-[#F7F7F7] border-t border-x border-[#3D2E27]'
              }`}
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>Kasus Klien Aktif</span>
          </button>
          <button
            onClick={() => setActiveTab('hots_rubric')}
            className={`px-3.5 py-2 text-xs font-bold rounded-t-lg transition-all flex items-center gap-1.5 whitespace-nowrap shrink-0 ${activeTab === 'hots_rubric'
              ? 'bg-[#FFB22C] text-[#000000] border-t-2 border-x border-[#FFB22C]'
              : 'bg-[#241B17] text-[#F7F7F7]/70 hover:text-[#F7F7F7] border-t border-x border-[#3D2E27]'
              }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Konsep Bloom's HOTS (C4-C6)</span>
          </button>
        </div>

        {/* Tab Contents */}
        <div className="p-6 overflow-y-auto flex-1 flex flex-col gap-4 text-xs sm:text-sm">
          {/* 1. THEORIES TAB WITH DIRECT JOURNAL CTAs */}
          {activeTab === 'theories' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {endingsData.theories.map((theory) => (
                <div
                  key={theory.id}
                  className="bg-[#1C1613] border border-[#854836]/60 p-4 flex flex-col justify-between gap-3 rounded-xl hover:border-[#FFB22C]/70 transition-colors"
                >
                  <div>
                    <h3 className="font-bold text-sm text-[#FFB22C] mb-1 flex items-center gap-2">
                      <Brain className="w-4 h-4 text-[#854836] shrink-0" />
                      {theory.name}
                    </h3>
                    <div className="text-[11px] text-[#FFD382] font-mono mb-2">
                      Tokoh: {theory.theorist}
                    </div>
                    <p className="text-xs text-[#F7F7F7]/90 leading-relaxed mb-2">
                      <strong>Konsep Inti:</strong> {theory.coreConcept}
                    </p>
                    <div className="p-2.5 bg-[#241B17] border border-[#854836]/60 rounded-lg text-xs text-[#F7F7F7]/85 mb-2">
                      <span className="text-[#FFB22C] font-bold">Penerapan Praktis:</span>{' '}
                      {theory.clinicalApplication}
                    </div>
                  </div>

                  {/* Scientific Citations & CTA Buttons */}
                  <div className="pt-2.5 border-t border-[#3D2E27] flex flex-col gap-2">
                    <div className="text-[10px] text-[#F7F7F7]/80 font-mono leading-snug">
                      <Quote className="w-3 h-3 inline mr-1 text-[#FFB22C]" />
                      {theory.primarySource}
                    </div>

                    {/* Direct CTA Links to Journal Publisher / PubMed / Semantic Scholar */}
                    <div className="flex flex-wrap items-center gap-2 pt-1">
                      {theory.doiUrl && (
                        <a
                          href={theory.doiUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#854836] hover:bg-[#9F5742] text-[#F7F7F7] border border-[#FFB22C]/60 text-[11px] font-bold transition-all shadow-sm active:scale-95"
                          title="Buka publikasi jurnal resmi via DOI"
                        >
                          <ExternalLink className="w-3.5 h-3.5 text-[#FFB22C]" />
                          <span>Buka Jurnal / DOI Asli ↗</span>
                        </a>
                      )}

                      {theory.scholarUrl && (
                        <a
                          href={theory.scholarUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#241B17] hover:bg-[#35261F] text-[#FFD382] border border-[#854836] text-[11px] font-bold transition-all shadow-sm active:scale-95"
                          title="Buka repositori artikel lengkap / PubMed / Semantic Scholar"
                        >
                          <FileText className="w-3.5 h-3.5 text-[#FFB22C]" />
                          <span>Arsip Naskah Lengkap ↗</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* 2. CLIENT PROFILE TAB */}
          {activeTab === 'client_profile' && (
            <div className="flex flex-col gap-4">
              {currentClient ? (
                <div className="bg-[#1C1613] border border-[#854836]/60 p-5 flex flex-col gap-3 rounded-xl">
                  <div className="flex items-center justify-between border-b border-[#3D2E27] pb-3">
                    <div>
                      <h3 className="text-base font-bold text-[#F7F7F7]">
                        {currentClient.name} ({currentClient.profession})
                      </h3>
                      <p className="text-xs text-[#FFB22C] mt-0.5">
                        Keluhan: "{currentClient.complaintTitle}"
                      </p>
                    </div>
                    <span className="text-xs font-bold text-[#FFB22C] bg-[#241B17] px-3 py-1 rounded-full border border-[#854836]">
                      {currentClient.archetypeName}
                    </span>
                  </div>

                  <div className="text-xs leading-relaxed text-[#F7F7F7]/90">
                    <strong className="text-[#FFB22C] block mb-1">
                      Cerita Latar Belakang:
                    </strong>
                    {currentClient.backgroundStory}
                  </div>

                  <div className="p-3 bg-[#241B17] border border-[#854836]/60 rounded-lg text-xs leading-relaxed">
                    <strong className="text-[#FFD382] block mb-1">
                      Dinamika Kepribadian ({currentClient.archetypeName}):
                    </strong>
                    {currentClient.archetypeDescription}
                  </div>

                  {currentClient.theoryConnection && (
                    <div className="p-3.5 bg-[#241B17] border border-[#FFB22C]/60 rounded-lg text-xs flex flex-col gap-2">
                      <strong className="text-[#FFB22C] block flex items-center gap-1.5">
                        <Library className="w-3.5 h-3.5" /> Kerangka Teori Ilmiah Terkait:
                      </strong>
                      <p className="text-[#F7F7F7] font-semibold">
                        {currentClient.theoryConnection.framework}
                      </p>
                      <span className="text-[11px] text-[#FFD382] font-mono block">
                        Rujukan: {currentClient.theoryConnection.primarySource}
                      </span>

                      {/* Direct Verification Links */}
                      <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-[#3D2E27]">
                        {currentClient.theoryConnection.doiUrl && (
                          <a
                            href={currentClient.theoryConnection.doiUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#854836] hover:bg-[#9F5742] text-[#F7F7F7] border border-[#FFB22C]/50 text-[11px] font-bold transition-all"
                            title="Buka publikasi jurnal via DOI"
                          >
                            <ExternalLink className="w-3 h-3 text-[#FFB22C]" />
                            <span>Buka Jurnal Resmi (DOI) ↗</span>
                          </a>
                        )}

                        <a
                          href={currentClient.theoryConnection.scholarUrl || currentClient.theoryConnection.doiUrl || 'https://pubmed.ncbi.nlm.nih.gov/'}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#241B17] hover:bg-[#35261F] text-[#FFD382] border border-[#854836] text-[11px] font-bold transition-all"
                          title="Cek artikel lengkap di PubMed / PMC / Scholar"
                        >
                          <FileText className="w-3 h-3 text-[#FFB22C]" />
                          <span>Arsip Naskah Ilmiah (PubMed / PMC) ↗</span>
                        </a>
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-xs">
                    <div className="p-3 bg-[#241B17] border border-[#FFB22C]/50 rounded-lg">
                      <span className="text-[#FFB22C] font-bold block mb-1">
                        ✅ Pendekatan Terapeutik yang Efektif:
                      </span>
                      {currentClient.preferredTechniques.map(t => (
                        <span key={t} className="inline-block mr-1.5 mb-1 px-2 py-0.5 bg-[#18120F] border border-[#854836] text-[10px] text-[#FFD382] font-mono rounded">
                          {t.replace('_', ' ').toUpperCase()}
                        </span>
                      ))}
                    </div>
                    <div className="p-3 bg-[#241B17] border border-[#9A342D]/60 rounded-lg">
                      <span className="text-[#FFA8A8] font-bold block mb-1">
                        ⚠️ Pendekatan yang Rentan Memicu Defensif:
                      </span>
                      {currentClient.aversionTechniques.map(t => (
                        <span key={t} className="inline-block mr-1.5 mb-1 px-2 py-0.5 bg-[#2A1715] border border-[#9A342D] text-[10px] text-[#FFA8A8] font-mono rounded">
                          {t.replace('_', ' ').toUpperCase()}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-6 text-center text-[#F7F7F7]/60">
                  Tidak ada klien aktif di ruangan saat ini.
                </div>
              )}
            </div>
          )}

          {/* 3. HOTS RUBRIC TAB */}
          {activeTab === 'hots_rubric' && (
            <div className="flex flex-col gap-4">
              <div className="p-4 bg-[#1C1613] border border-[#854836]/60 rounded-xl flex flex-col gap-2">
                <h3 className="font-bold text-sm text-[#FFB22C] flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#854836]" />
                  Taksonomi Bloom HOTS (Higher-Order Thinking Skills) dalam Konseling
                </h3>
                <p className="text-xs text-[#F7F7F7]/85 leading-relaxed">
                  Dalam ARTUDIEI Clinic, pengambilan keputusan klinis dievaluasi berdasarkan tiga tingkat kognisi tingkat tinggi:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="p-4 bg-[#1C1613] border border-[#FFB22C]/60 rounded-xl flex flex-col gap-2">
                  <span className="text-xs font-bold text-[#FFB22C]">C4: ANALYZING (Mengurai Pola)</span>
                  <p className="text-xs text-[#F7F7F7]/85 leading-relaxed">
                    Membantu klien mengurai pemicu emosional, sensasi somatis, dan pola perlindungan diri masa lalu tanpa menghakimi.
                  </p>
                </div>

                <div className="p-4 bg-[#1C1613] border border-[#854836] rounded-xl flex flex-col gap-2">
                  <span className="text-xs font-bold text-[#FFD382]">C5: EVALUATING (Uji Realitas)</span>
                  <p className="text-xs text-[#F7F7F7]/85 leading-relaxed">
                    Mengajak klien memeriksa bukti objektif dan menimbang biaya energi dari distorsi kognitif yang selama ini diyakininya.
                  </p>
                </div>

                <div className="p-4 bg-[#1C1613] border border-[#FFB22C]/60 rounded-xl flex flex-col gap-2">
                  <span className="text-xs font-bold text-[#F7F7F7]">C6: CREATING (Rencana Adaptif)</span>
                  <p className="text-xs text-[#F7F7F7]/85 leading-relaxed">
                    Merumuskan komitmen mikro yang realistis (jangkar somatis, aturan jeda, atau kebiasaan baru) untuk dipraktikkan di dunia nyata.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
