import { DecorationItem } from '../types/game';

export const CLINIC_DECORATIONS: DecorationItem[] = [
  {
    id: 'himalayan_lamp',
    name: 'Lampu Garam Himalaya',
    category: 'desk',
    costXP: 75,
    iconName: 'Sun',
    previewColor: '#F97316',
    description: 'Bongkahan kristal garam pink alami dengan pendaran cahaya hangat amber yang menenangkan.',
    clinicalBenefit: 'Pencahayaan warm tone (2200K) terbukti menurunkan kortisol dan membantu desensitisasi respon stres klien.',
    passiveBonusText: 'Pendaran cahaya hangat di meja konseling'
  },
  {
    id: 'aquarium_wall',
    name: 'Akuarium Mini Neon Tetra',
    category: 'wall',
    costXP: 140,
    iconName: 'Waves',
    previewColor: '#06B6D4',
    description: 'Akuarium kaca terpasang rapi dengan ikan Neon Tetra & Guppy bercahaya yang berenang lembut.',
    clinicalBenefit: 'Observasi gerak ritmis biota air (Aquarium Therapy) memicu stimulasi saraf parasimpatis dan relaksasi alami.',
    passiveBonusText: 'Ikan animasi berenang di dinding atas klinik'
  },
  {
    id: 'lavender_pot',
    name: 'Tanaman Aromatik Lavender',
    category: 'plant',
    costXP: 60,
    iconName: 'Flower2',
    previewColor: '#A855F7',
    description: 'Pot tanaman Lavandula angustifolia dengan bunga ungu mekar dan kelopak aromaterapi.',
    clinicalBenefit: 'Senyawa Linalool pada lavender memodulasi reseptor GABA untuk meredakan gelisah tanpa efek sedatif berlebih.',
    passiveBonusText: 'Tanaman lavender ungu di sudut ruangan'
  },
  {
    id: 'persian_rug',
    name: 'Karpet Sutra Emerald Geometris',
    category: 'rug',
    costXP: 120,
    iconName: 'LayoutGrid',
    previewColor: '#10B981',
    description: 'Karpet tenun lembut berpola geometris heksagonal dengan rona zamrud dan aksen emas.',
    clinicalBenefit: 'Tekstur alas kaki yang lembut dan simetri visual memberikan rasa stabil (Grounding Effect) bagi klien.',
    passiveBonusText: 'Desain lantai karpet zamrud mewah di area konseling'
  },
  {
    id: 'zen_mountain_art',
    name: 'Lukisan Kanvas Zen Pegunungan',
    category: 'wall',
    costXP: 90,
    iconName: 'Image',
    previewColor: '#3B82F6',
    description: 'Karya seni pemandangan pegunungan berkabut bernuansa minimalis Jepang dengan matahari terbit lembut.',
    clinicalBenefit: 'Visual alam terbuka (*Biophilic Art*) memperluas ruang persepsi kognitif dan meredakan ketegangan mental.',
    passiveBonusText: 'Lukisan seni lanskap pegunungan di dinding tengah'
  },
  {
    id: 'emerald_sofa',
    name: 'Sofa Beludru Royal Emerald',
    category: 'furniture',
    costXP: 160,
    iconName: 'Armchair',
    previewColor: '#047857',
    description: 'Sofa konseling berlapis beludru hijau zamrud dengan sandaran busa memori ergonomis.',
    clinicalBenefit: 'Postur duduk rileks yang ditopang penuh menurunkan tekanan otot punggung bawah saat klien membuka diri.',
    passiveBonusText: 'Upgrade visual sofa klien menjadi warna zamrud elegan'
  },
  {
    id: 'diffuser_station',
    name: 'Diffuser Aromaterapi Ultrasonik',
    category: 'station',
    costXP: 85,
    iconName: 'Wind',
    previewColor: '#EAB308',
    description: 'Diffuser kayu minimalis yang mengembuskan uap mikro chamomile dan sweet orange.',
    clinicalBenefit: 'Stimulasi olfaktori langsung menuju amigdala untuk mereduksi reaktivitas emosional seketika.',
    passiveBonusText: 'Efek uap aromatik di area tea station'
  }
];
