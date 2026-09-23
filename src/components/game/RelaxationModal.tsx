import React, { useState, useEffect } from 'react';
import { useGameStore } from '../../store/useGameStore';
import { useTranslation } from '../../i18n/useTranslation';
import { Coffee, Sparkles, X, Heart, RefreshCw, Quote } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const teaImg = '/assets/cozy_tea.jpg';
const plantImg = '/assets/monstera.jpg';

interface EmotionalReflection {
  id: string;
  title: { id: string; en: string };
  subtitle: { id: string; en: string };
  quote: { id: string; en: string };
  author: string;
  insight: { id: string; en: string };
  themeColor: string;
  borderColor: string;
}

const TEA_REFLECTIONS: EmotionalReflection[] = [
  {
    id: 'tea_1',
    title: { id: 'Kehangatan Dalam Keheningan', en: 'Warmth in Silence' },
    subtitle: { id: 'Momen Menyentuh Ketenangan Jiwa', en: 'A Moment of Soul Serenity' },
    quote: {
      id: 'Tidak semua yang patah harus segera diperbaiki. Kadang, yang paling dibutuhkan seseorang hanyalah tempat untuk merasa aman dan didengar tanpa dihakimi.',
      en: 'Not everything broken must be fixed immediately. Sometimes, all a person needs is a safe space to be heard without judgment.'
    },
    author: 'Carl Rogers — Humanistic Psychology',
    insight: {
      id: 'Menyediakan kehangatan fisik & empati tanpa beban tuntutan adalah pintu utama penyembuhan trauma.',
      en: 'Providing physical warmth and unconditional empathy is the cornerstone of trauma recovery.'
    },
    themeColor: '#FFB22C',
    borderColor: '#854836'
  },
  {
    id: 'tea_2',
    title: { id: 'Ruang Aman Bagi Manusia', en: 'A Safe Harbor for the Soul' },
    subtitle: { id: 'Tempat Bernapas Tanpa Topeng', en: 'A Place to Breathe Without Masks' },
    quote: {
      id: 'Ruang paling hangat di dunia bukanlah ruangan berpendingin atau bertikar empuk, melainkan penerimaan tulus saat seseorang merasa begitu hancur.',
      en: 'The warmest space in the world is not soft cushions, but genuine acceptance when someone feels completely shattered.'
    },
    author: 'Virginia Satir — Experiential Therapy',
    insight: {
      id: 'Di balik pertahanan diri yang keras, terdapat jiwa yang merindukan diterima apa adanya.',
      en: 'Behind strong emotional defenses lies a human heart longing to be accepted as they are.'
    },
    themeColor: '#FFD382',
    borderColor: '#9A342D'
  },
  {
    id: 'tea_3',
    title: { id: 'Keheningan Yang Menyembuhkan', en: 'Healing Stillness' },
    subtitle: { id: 'Napas Sejenak Sebelum Memberi Ampun', en: 'A Deep Breath Before Healing' },
    quote: {
      id: 'Sebelum mampu memeluk dan membalut luka orang lain, pastikan jiwamu sendiri pernah merasakan hangatnya keheningan.',
      en: 'Before you can comfort and dress the wounds of others, let your own soul embrace quiet restorative stillness.'
    },
    author: 'Therapeutic Presence & Mindfulness',
    insight: {
      id: 'Seorang konselor yang tenang adalah cermin jernih tempat klien menemukan kembali kedamaian pikirannya.',
      en: 'A calm, centered counselor is a clear mirror where clients rediscover their inner peace.'
    },
    themeColor: '#FFC45E',
    borderColor: '#523324'
  }
];

const PLANT_REFLECTIONS: EmotionalReflection[] = [
  {
    id: 'plant_1',
    title: { id: 'Akar Yang Bertahan Dalam Badai', en: 'Roots That Withstand the Storm' },
    subtitle: { id: 'Proses Bertumbuh Yang Tak Terlihat', en: 'The Invisible Journey of Growth' },
    quote: {
      id: 'Pohon yang paling kokoh tidak pernah tumbuh terburu-buru. Ia membiarkan akarnya merayap pelan di kegelapan sebelum daunnya menyapa cahaya.',
      en: 'The sturdiest trees never rush their growth. They let roots creep gently in darkness before leaves greet the sun.'
    },
    author: 'Refleksi Pertumbuhan Somatik',
    insight: {
      id: 'Setiap proses pemulihan emosi butuh waktu dan kegigihan tersembunyi yang patut dihargai.',
      en: 'Every emotional recovery process takes time and unseen resilience worthy of respect.'
    },
    themeColor: '#659A5A',
    borderColor: '#3E5C38'
  },
  {
    id: 'plant_2',
    title: { id: 'Harapan Di Balik Musim Dingin', en: 'Hope Beyond Winter' },
    subtitle: { id: 'Ketahanan Jiwa (Resilience)', en: 'Psychological Resilience' },
    quote: {
      id: 'Bahkan di balik tanah yang paling dingin dan sepi, kehidupan sedang mengumpulkan tenaga untuk mekar kembali saat musim berubah.',
      en: 'Even beneath the coldest ground, life quietly gathers strength to bloom again when the season shifts.'
    },
    author: 'Post-Traumatic Growth Principle',
    insight: {
      id: 'Rasa sakit hari ini bukanlah akhir cerita, melainkan benih kekuatan baru yang sedang tumbuh.',
      en: 'Today’s pain is not the conclusion, but the seedling of renewed resilience.'
    },
    themeColor: '#88C07C',
    borderColor: '#243322'
  },
  {
    id: 'plant_3',
    title: { id: 'Menghormati Waktu Pemulihan', en: 'Honoring Healing Time' },
    subtitle: { id: 'Kelembutan Pada Diri Sendiri', en: 'Gentleness Toward Yourself' },
    quote: {
      id: 'Jangan paksa kuntum bunga mekar sebelum waktunya. Hargai setiap cm pertumbuhan kecil yang telah berhasil kamu lalui hari ini.',
      en: 'Do not force the flower to bloom before its time. Cherish every tiny inch of growth you made today.'
    },
    author: 'Self-Compassion in Counseling',
    insight: {
      id: 'Penyembuhan bukanlah garis lurus yang tergesa-gesa, melainkan proses perlahan memeluk diri sendiri.',
      en: 'Healing is not a hurried sprint, but a gentle journey of self-embrace.'
    },
    themeColor: '#A2D996',
    borderColor: '#4E7A45'
  }
];

export const RelaxationModal: React.FC = () => {
  const { language } = useTranslation();
  const { activeRelaxationModal, setActiveRelaxationModal } = useGameStore();

  const [reflectionIndex, setReflectionIndex] = useState<number>(0);

  // Set random index when modal opens
  useEffect(() => {
    if (activeRelaxationModal) {
      setReflectionIndex(Math.floor(Math.random() * 3));
    }
  }, [activeRelaxationModal]);

  if (!activeRelaxationModal) return null;

  const isTea = activeRelaxationModal === 'tea';
  const list = isTea ? TEA_REFLECTIONS : PLANT_REFLECTIONS;
  const currentItem = list[reflectionIndex % list.length];
  const bgImg = isTea ? teaImg : plantImg;

  const handleNextReflection = () => {
    setReflectionIndex((prev) => (prev + 1) % list.length);
  };

  const titleText = currentItem.title[language] || currentItem.title.id;
  const subtitleText = currentItem.subtitle[language] || currentItem.subtitle.id;
  const quoteText = currentItem.quote[language] || currentItem.quote.id;
  const insightText = currentItem.insight[language] || currentItem.insight.id;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
        <motion.div
          initial={{ scale: 0.88, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.88, opacity: 0, y: 20 }}
          transition={{ type: 'spring', stiffness: 360, damping: 26 }}
          className="w-full max-w-lg bg-[#18120F] border-3 rounded-2xl shadow-2xl text-[#F7F7F7] flex flex-col overflow-hidden relative"
          style={{ borderColor: currentItem.themeColor }}
        >
          {/* Top Banner Image with Atmospheric Gradient Overlay */}
          <div className="relative h-44 sm:h-52 w-full overflow-hidden select-none">
            <img
              src={bgImg}
              alt={titleText}
              className="w-full h-full object-cover object-center filter brightness-90 contrast-105 transform hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#18120F] via-[#18120F]/40 to-transparent" />

            {/* Top Close & Refresh controls */}
            <div className="absolute top-3 right-3 flex items-center gap-2 z-10">
              <button
                onClick={handleNextReflection}
                className="p-2 rounded-full bg-black/60 border border-white/20 hover:bg-black/80 text-white backdrop-blur-md transition-all active:scale-90"
                title={language === 'id' ? 'Lihat pesan refleksi lainnya' : 'View next reflection'}
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setActiveRelaxationModal(null)}
                className="p-2 rounded-full bg-black/60 border border-white/20 hover:bg-[#9A342D] text-white backdrop-blur-md transition-all active:scale-90"
                title={language === 'id' ? 'Tutup' : 'Close'}
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Badge Icon & Category Title */}
            <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
              <div className="flex items-center gap-2">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center border-2 shadow-lg backdrop-blur-md"
                  style={{ backgroundColor: 'rgba(24, 18, 15, 0.85)', borderColor: currentItem.themeColor }}
                >
                  {isTea ? (
                    <Coffee className="w-4 h-4 text-[#FFB22C]" />
                  ) : (
                    <Sparkles className="w-4 h-4 text-[#88C07C]" />
                  )}
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider block" style={{ color: currentItem.themeColor }}>
                    {subtitleText}
                  </span>
                  <h3 className="font-extrabold text-sm sm:text-base text-white drop-shadow-md leading-tight">
                    {titleText}
                  </h3>
                </div>
              </div>
            </div>
          </div>

          {/* Emotional Heart-Touching Quote Body */}
          <div className="p-4 sm:p-5 flex flex-col gap-4">
            <div className="relative p-4 rounded-xl bg-[#241B17] border border-[#854836]/60 shadow-inner">
              <Quote className="w-6 h-6 text-[#FFB22C]/30 absolute top-2 left-2 pointer-events-none" />
              <p className="text-xs sm:text-sm text-[#F7F7F7] leading-relaxed font-serif italic text-center px-2 py-1 relative z-10">
                "{quoteText}"
              </p>
              <span className="block text-right text-[10px] sm:text-[11px] font-mono font-bold mt-2 text-[#FFD382]/80">
                — {currentItem.author}
              </span>
            </div>

            {/* Professional Counselor Insight Reflection */}
            <div className="flex items-start gap-2.5 p-3 rounded-lg bg-[#120E0C] border border-[#854836]/40 text-[11px] text-[#F7F7F7]/85 leading-snug">
              <Heart className="w-4 h-4 text-[#FFB22C] shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#FFB22C] block mb-0.5 text-[10px] font-mono">
                  {language === 'id' ? 'REFLEKSI KONSELING:' : 'COUNSELING REFLECTION:'}
                </strong>
                <span>{insightText}</span>
              </div>
            </div>

            {/* Footer Action Button */}
            <div className="flex items-center justify-between pt-1">
              <button
                onClick={handleNextReflection}
                className="text-[11px] text-[#FFD382]/70 hover:text-[#FFB22C] flex items-center gap-1 transition-colors"
              >
                <RefreshCw className="w-3 h-3" />
                <span>{language === 'id' ? 'Pesan Lainnya' : 'Next Reflection'}</span>
              </button>

              <button
                onClick={() => setActiveRelaxationModal(null)}
                className="px-4 py-2 rounded-xl font-extrabold text-xs shadow-md transition-all active:scale-95 text-[#000000]"
                style={{ backgroundColor: currentItem.themeColor }}
              >
                {language === 'id' ? 'Resapi & Lanjutkan' : 'Embrace & Continue'}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
