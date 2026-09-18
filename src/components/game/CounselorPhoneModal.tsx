import React, { useState } from 'react';
import { useGameStore } from '../../store/useGameStore';
import logoImg from '../../assets/logo-artudieiclinic.png';
import { ClientPixelAvatar } from '../ui/ClientPixelAvatar';
import { 
  Smartphone, 
  X, 
  MessageSquare, 
  Sparkles, 
  CheckCheck, 
  Send, 
  Award, 
  Heart, 
  Clock, 
  Wifi, 
  Battery, 
  ChevronLeft,
  Flame,
  ShieldCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const CounselorPhoneModal: React.FC = () => {
  const {
    isPhoneOpen,
    phoneMessages,
    activeChatId,
    reputationXP,
    counselorRank,
    setPhoneOpen,
    setActiveChatId,
    sendChatReply
  } = useGameStore();

  const [selectedChatId, setSelectedChatId] = useState<string | null>(
    activeChatId || (phoneMessages.length > 0 ? phoneMessages[0].id : null)
  );

  if (!isPhoneOpen) return null;

  const currentChat = phoneMessages.find((m) => m.id === (activeChatId || selectedChatId)) || phoneMessages[0];

  const handleSelectChat = (id: string) => {
    setSelectedChatId(id);
    setActiveChatId(id);
  };

  const handleSendQuickReply = (index: number) => {
    if (!currentChat) return;
    sendChatReply(currentChat.id, index);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="w-full max-w-2xl bg-[#140F0D] border-4 border-[#854836] rounded-[28px] shadow-2xl text-[#F7F7F7] overflow-hidden flex flex-col max-h-[88vh]"
      >
        {/* Phone Top Speaker & Notch Bar */}
        <div className="bg-[#120E0C] px-5 py-2.5 border-b border-[#854836]/50 flex items-center justify-between select-none">
          <div className="flex items-center gap-2">
            <img src={logoImg} alt="Logo" className="w-4 h-4 object-contain rounded shrink-0" />
            <span className="text-[11px] font-mono font-bold text-[#FFB22C] tracking-wide">
              ARTUDIEI OS • SMARTPHONE
            </span>
          </div>
          {/* Speaker grill */}
          <div className="w-16 h-1 bg-[#854836]/60 rounded-full hidden sm:block" />
          {/* Status indicators */}
          <div className="flex items-center gap-2.5 text-[11px] text-[#F7F7F7]/70 font-mono">
            <Wifi className="w-3.5 h-3.5 text-[#22C55E]" />
            <Battery className="w-3.5 h-3.5 text-[#FFB22C]" />
            <span>100%</span>
            <button
              onClick={() => setPhoneOpen(false)}
              className="p-1 rounded-lg bg-[#221B17] hover:bg-[#9A342D] text-white transition-colors ml-1"
              title="Tutup HP"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Main Phone Screen View */}
        <div className="flex flex-1 min-h-0 overflow-hidden">
          {/* Left Column: Chat Contacts List */}
          <div className={`w-full sm:w-64 border-r border-[#854836]/50 bg-[#18120F] flex flex-col ${currentChat ? 'hidden sm:flex' : 'flex'}`}>
            <div className="p-3 bg-[#120E0C]/80 border-b border-[#854836]/40 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <MessageSquare className="w-4 h-4 text-[#FFB22C]" />
                <span className="text-xs font-bold text-[#F7F7F7]">Pesan Klien</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#FFB22C] text-[#120E0C] font-bold">
                {phoneMessages.length}
              </span>
            </div>

            <div className="flex-1 overflow-y-auto p-2 space-y-1.5">
              {phoneMessages.length === 0 ? (
                <div className="p-4 text-center text-xs text-[#F7F7F7]/50 flex flex-col items-center gap-2">
                  <Smartphone className="w-8 h-8 text-[#854836] opacity-40 mt-4" />
                  <p>Belum ada pesan masuk.</p>
                  <p className="text-[10px] text-[#FFD382]/70 leading-relaxed">
                    Selesaikan sesi konseling untuk menerima kabar kabar gembira dari klien Anda!
                  </p>
                </div>
              ) : (
                phoneMessages.map((msg) => {
                  const isSelected = currentChat?.id === msg.id;
                  return (
                    <button
                      key={msg.id}
                      onClick={() => handleSelectChat(msg.id)}
                      className={`w-full p-2.5 rounded-xl text-left transition-all flex items-start gap-2.5 ${
                        isSelected
                          ? 'bg-[#854836]/40 border-2 border-[#FFB22C] shadow-md'
                          : 'bg-[#1C1613] hover:bg-[#251D18] border border-[#854836]/30'
                      }`}
                    >
                      <ClientPixelAvatar
                        gender={msg.gender}
                        hairstyle={msg.hairstyle}
                        hairColor={msg.hairColor}
                        shirtColor={msg.shirtColor}
                        accessoryType={msg.accessoryType}
                        size="sm"
                        className="shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1 mb-0.5">
                          <span className="text-xs font-bold text-[#F7F7F7] truncate">
                            {msg.clientName}
                          </span>
                          {!msg.isRead && (
                            <span className="w-2 h-2 rounded-full bg-[#FFB22C] shrink-0 animate-ping" />
                          )}
                        </div>
                        <p className="text-[10px] text-[#FFD382]/80 truncate">
                          {msg.archetypeName}
                        </p>
                        <p className="text-[10px] text-[#F7F7F7]/60 truncate mt-0.5">
                          {msg.messageText}
                        </p>
                      </div>
                    </button>
                  );
                })
              )}
            </div>
          </div>

          {/* Right Column: Active Chat Conversation */}
          <div className={`flex-1 bg-[#15100E] flex flex-col ${!currentChat ? 'hidden sm:flex' : 'flex'}`}>
            {currentChat ? (
              <>
                {/* Chat Header */}
                <div className="p-3 bg-[#1A1310] border-b border-[#854836]/50 flex items-center justify-between">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <button
                      onClick={() => setSelectedChatId(null)}
                      className="sm:hidden p-1 rounded-lg bg-[#221B17] text-[#FFB22C]"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <ClientPixelAvatar
                      gender={currentChat.gender}
                      hairstyle={currentChat.hairstyle}
                      hairColor={currentChat.hairColor}
                      shirtColor={currentChat.shirtColor}
                      accessoryType={currentChat.accessoryType}
                      size="sm"
                      className="shrink-0"
                    />
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-[#F7F7F7] truncate">
                          {currentChat.clientName}
                        </span>
                        <span className="px-1.5 py-0.2 text-[9px] bg-[#FFB22C] text-[#120E0C] font-bold rounded">
                          Grade {currentChat.sessionGrade}
                        </span>
                      </div>
                      <span className="text-[10px] text-[#22C55E] flex items-center gap-1">
                        ● Online • {currentChat.clientProfession}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 text-[10px] text-[#FFD382] bg-[#241B17] px-2.5 py-1 rounded-lg border border-[#854836]/60 font-mono shrink-0">
                    <Sparkles className="w-3 h-3 text-[#FFB22C]" />
                    <span>{reputationXP} XP</span>
                  </div>
                </div>

                {/* Chat Scroll Area */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {/* Date Badge */}
                  <div className="flex justify-center">
                    <span className="px-3 py-1 rounded-full bg-[#241B17] text-[10px] text-[#F7F7F7]/60 font-mono border border-[#854836]/40">
                      {currentChat.timestamp}
                    </span>
                  </div>

                  {/* Message Bubble: From Client */}
                  <div className="flex items-start gap-2.5 max-w-[88%]">
                    <ClientPixelAvatar
                      gender={currentChat.gender}
                      hairstyle={currentChat.hairstyle}
                      hairColor={currentChat.hairColor}
                      shirtColor={currentChat.shirtColor}
                      accessoryType={currentChat.accessoryType}
                      size="sm"
                      className="shrink-0 mt-1"
                    />
                    <div className="bg-[#261E1A] border border-[#854836]/60 rounded-2xl rounded-tl-sm p-3.5 shadow-md">
                      <p className="text-xs leading-relaxed text-[#F7F7F7]">
                        {currentChat.messageText}
                      </p>
                      <span className="text-[9px] text-[#F7F7F7]/40 block text-right mt-1.5 font-mono">
                        Terkirim
                      </span>
                    </div>
                  </div>

                  {/* Message Bubble: Counselor Reply (If chosen) */}
                  {currentChat.chosenReplyText && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex justify-end"
                    >
                      <div className="bg-[#854836] text-[#F7F7F7] border border-[#FFB22C]/70 rounded-2xl rounded-tr-sm p-3.5 max-w-[85%] shadow-md">
                        <div className="flex items-center gap-1.5 text-[10px] text-[#FFD382] font-bold mb-1">
                          <ShieldCheck className="w-3 h-3" />
                          <span>Respon Terapeutik Anda:</span>
                        </div>
                        <p className="text-xs leading-relaxed">
                          {currentChat.chosenReplyText}
                        </p>
                        <div className="flex items-center justify-end gap-1 text-[9px] text-[#FFD382]/80 mt-1.5 font-mono">
                          <span>Diterima</span>
                          <CheckCheck className="w-3 h-3 text-[#22C55E]" />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Client Follow-up Post-Reply Feedback (Heartfelt reaction) */}
                  {currentChat.clientPostReplyText && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="flex items-start gap-2.5 max-w-[88%]"
                    >
                      <ClientPixelAvatar
                        gender={currentChat.gender}
                        hairstyle={currentChat.hairstyle}
                        hairColor={currentChat.hairColor}
                        shirtColor={currentChat.shirtColor}
                        accessoryType={currentChat.accessoryType}
                        size="sm"
                        className="shrink-0 mt-1"
                      />
                      <div className="bg-[#2E221D] border border-[#FFB22C]/60 rounded-2xl rounded-tl-sm p-3.5 shadow-md">
                        <div className="flex items-center gap-1 text-[10px] text-[#FFB22C] font-bold mb-1">
                          <Heart className="w-3 h-3 fill-[#FFB22C]" />
                          <span>{currentChat.clientName}:</span>
                        </div>
                        <p className="text-xs leading-relaxed text-[#F7F7F7]">
                          {currentChat.clientPostReplyText}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Chat Footer: Interactive Quick Reply Options */}
                <div className="p-3.5 bg-[#120E0C] border-t border-[#854836]/60">
                  {currentChat.chosenReplyIndex === undefined ? (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-[11px] text-[#FFB22C] font-bold">
                        <span className="flex items-center gap-1">
                          <Send className="w-3 h-3" />
                          Pilih Respon Tindak Lanjut:
                        </span>
                        <span className="text-[10px] text-[#22C55E] font-mono font-normal">
                          +15 XP Bonus Reputasi
                        </span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {currentChat.replyOptions.map((opt, i) => (
                          <button
                            key={i}
                            onClick={() => handleSendQuickReply(i)}
                            className="p-2.5 text-left rounded-xl bg-[#241B17] hover:bg-[#3D281E] border border-[#FFB22C]/60 hover:border-[#FFB22C] text-xs font-semibold text-[#F7F7F7] transition-all flex items-start justify-between gap-2 group active:scale-98 shadow-sm"
                          >
                            <span className="leading-snug">{opt.text}</span>
                            <span className="px-1.5 py-0.5 rounded bg-[#FFB22C] text-[#120E0C] font-bold text-[9px] shrink-0 group-hover:scale-105 transition-transform">
                              +15 XP
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between text-xs text-[#22C55E] bg-[#16291C] px-3.5 py-2.5 rounded-xl border border-[#22C55E]/40 font-mono">
                      <div className="flex items-center gap-1.5">
                        <CheckCheck className="w-4 h-4 text-[#22C55E]" />
                        <span>Sesi chat selesai. Hubungan terapeutik terjalin kuat!</span>
                      </div>
                      <span className="text-[10px] font-bold text-[#FFB22C]">+15 XP Diterima</span>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center p-6 text-center text-xs text-[#F7F7F7]/50">
                <Smartphone className="w-12 h-12 text-[#854836] opacity-30 mb-2" />
                <p>Pilih salah satu pesan di samping untuk membaca dan membalas kabar klien.</p>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
