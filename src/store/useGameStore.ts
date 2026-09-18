import { create } from 'zustand';
import { 
  Direction, 
  Position, 
  ClientProfile, 
  DialoguePhase, 
  DialogueOption, 
  GameMode, 
  EvaluationResult, 
  ArchetypeId,
  InteractiveObject,
  Gender,
  Hairstyle,
  AccessoryType,
  ClientChatMessage,
  PhoneNotification,
  EquippedDecorations,
  DecorationItem
} from '../types/game';
import archetypesData from '../data/archetypes.json';
import endingsData from '../data/endings.json';
import { SCENARIO_SEEDS, generateContextualPhaseOptions, ScenarioSeed } from '../data/proceduralCases';
import { CLINIC_DECORATIONS } from '../data/decorations';
import { generateFollowUpMessage } from '../data/followUpMessages';

interface GameState {
  // Player state
  playerPos: Position;
  playerDir: Direction;
  isMoving: boolean;

  // Entrance animation state
  entranceProgress: number; // 0 = off-screen below door, 1 = at start position

  // Walk-to-client auto-walk target
  walkToClientTarget: Position | null;

  // Game Flow state
  gameMode: GameMode;
  nearbyObject: InteractiveObject | null;
  activeReferenceTab: string;
  activeRelaxationModal: 'tea' | 'plant' | null;

  // Client & Counseling state
  currentClient: ClientProfile | null;
  lastDecisionFeedback: {
    feedback: string;
    clientReaction: string;
    tensionDelta: number;
    rapportDelta: number;
    hotsTitle: string;
    techniqueName: string;
    journalRef?: {
      title: string;
      citation: string;
      url: string;
    };
  } | null;
  
  // Progression & Replayability Tracker
  reputationXP: number;
  counselorRank: string;
  evaluationResult: EvaluationResult | null;
  totalClientsHelped: number;
  
  // Radio audio state
  isRadioPlaying: boolean;

  // Phone & Follow-up State
  phoneMessages: ClientChatMessage[];
  unreadPhoneCount: number;
  activeChatId: string | null;
  isPhoneOpen: boolean;
  phoneToastNotification: PhoneNotification | null;

  // Clinic Decoration & Shop State
  unlockedDecorations: string[];
  equippedDecorations: EquippedDecorations;
  isShopOpen: boolean;

  // Level Up & Rank Notification State
  levelUpNotification: { oldRank: string; newRank: string; xp: number } | null;
  isRankHighlighted: boolean;

  // Actions
  setPlayerPos: (pos: Position) => void;
  setPlayerDir: (dir: Direction) => void;
  setIsMoving: (moving: boolean) => void;
  setGameMode: (mode: GameMode) => void;
  setNearbyObject: (obj: InteractiveObject | null) => void;
  setActiveReferenceTab: (tab: string) => void;
  setActiveRelaxationModal: (modal: 'tea' | 'plant' | null) => void;
  setEntranceProgress: (p: number) => void;
  finishEntrance: () => void;
  startWalkToClient: () => void;
  tickWalkToClient: () => void;
  setRadioPlaying: (playing: boolean) => void;
  toggleRadio: () => void;

  // Level Up Actions
  dismissLevelUpNotification: () => void;
  clearRankHighlight: () => void;

  // Phone Actions
  setPhoneOpen: (open: boolean) => void;
  setActiveChatId: (id: string | null) => void;
  markChatAsRead: (id: string) => void;
  sendChatReply: (messageId: string, replyIndex: number) => void;
  dismissPhoneToast: () => void;
  triggerFollowUpMessage: (client: ClientProfile, evalResult: EvaluationResult) => void;

  // Decoration Actions
  setShopOpen: (open: boolean) => void;
  buyDecoration: (itemId: string) => boolean;
  toggleEquipDecoration: (itemId: string) => void;

  // Procedural Generator & Counseling Actions
  generateNewClientCase: () => void;
  handleDialogueChoice: (option: DialogueOption) => void;
  advanceToNextPhase: () => void;
  concludeSession: () => void;
  resetGameSession: () => void;
}

// Utility to shuffle array elements randomly
const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

interface PersonaTemplate {
  name: string;
  gender: Gender;
  defaultAge: number;
  hairstyles: Hairstyle[];
  accessoryTypes: AccessoryType[];
  accessoryName: string;
  accessoryColor: string;
  hairColors: string[];
  shirtColors: string[];
  pantsColors: string[];
}

const PERSONA_TEMPLATES: PersonaTemplate[] = [
  // --- FEMALE CLIENTS ---
  {
    name: 'Dinda',
    gender: 'female',
    defaultAge: 19,
    hairstyles: ['long_flow', 'wavy_long'],
    accessoryTypes: ['glasses_round', 'headband'],
    accessoryName: 'Kacamata Bulat Estetik & Rambut Panjang',
    accessoryColor: '#FFB22C',
    hairColors: ['#2B1E1A', '#402619', '#1F2421'],
    shirtColors: ['#854836', '#9E5B4B', '#52796F'],
    pantsColors: ['#2F3E46', '#241B17', '#354F52']
  },
  {
    name: 'Nadia',
    gender: 'female',
    defaultAge: 17,
    hairstyles: ['ponytail', 'bob'],
    accessoryTypes: ['ribbon', 'glasses_square'],
    accessoryName: 'Pita Rambut Ceri Merah',
    accessoryColor: '#E11D48',
    hairColors: ['#1F2421', '#2B1E1A', '#3D281E'],
    shirtColors: ['#52796F', '#738B71', '#854836'],
    pantsColors: ['#2F3E46', '#241B17']
  },
  {
    name: 'Kirana',
    gender: 'female',
    defaultAge: 16,
    hairstyles: ['twin_tail', 'long_flow'],
    accessoryTypes: ['headband', 'ribbon'],
    accessoryName: 'Bando Beludru Manis',
    accessoryColor: '#8B5CF6',
    hairColors: ['#4A3B32', '#402619', '#2B1E1A'],
    shirtColors: ['#84A98C', '#52796F', '#BC6C25'],
    pantsColors: ['#354F52', '#2F3E46']
  },
  {
    name: 'Salsa',
    gender: 'female',
    defaultAge: 18,
    hairstyles: ['wavy_long', 'bob'],
    accessoryTypes: ['earrings', 'glasses_round'],
    accessoryName: 'Anting Mutiara Elegan',
    accessoryColor: '#FFD382',
    hairColors: ['#402619', '#2B1E1A', '#593E2B'],
    shirtColors: ['#BC6C25', '#A36E52', '#854836'],
    pantsColors: ['#606C38', '#3B342E']
  },
  {
    name: 'Zahra',
    gender: 'female',
    defaultAge: 20,
    hairstyles: ['hijab'],
    accessoryTypes: ['glasses_square', 'glasses_round'],
    accessoryName: 'Hijab Anggun & Bros Emas',
    accessoryColor: '#FFB22C',
    hairColors: ['#52796F', '#854836', '#3D281E', '#354F52'],
    shirtColors: ['#A36E52', '#84A98C', '#BC6C25'],
    pantsColors: ['#3B342E', '#2F3E46']
  },
  {
    name: 'Clarissa',
    gender: 'female',
    defaultAge: 21,
    hairstyles: ['long_flow', 'bob'],
    accessoryTypes: ['glasses_square', 'earrings'],
    accessoryName: 'Kacamata Frame Cat-Eye & Anting',
    accessoryColor: '#10B981',
    hairColors: ['#1F2421', '#2B1E1A', '#402619'],
    shirtColors: ['#738B71', '#52796F', '#854836'],
    pantsColors: ['#2A3B32', '#241B17']
  },
  {
    name: 'Alya',
    gender: 'female',
    defaultAge: 18,
    hairstyles: ['bob', 'ponytail', 'hijab'],
    accessoryTypes: ['scarf', 'glasses_round'],
    accessoryName: 'Syal Leher Rajut Hangat',
    accessoryColor: '#F59E0B',
    hairColors: ['#2B1E1A', '#402619', '#738B71'],
    shirtColors: ['#854836', '#BC6C25', '#52796F'],
    pantsColors: ['#241B17', '#354F52']
  },

  // --- MALE CLIENTS ---
  {
    name: 'Dimas',
    gender: 'male',
    defaultAge: 19,
    hairstyles: ['undercut', 'short_neat'],
    accessoryTypes: ['glasses_square', 'lanyard'],
    accessoryName: 'Kacamata Hitam Kotak & Tali Lanyard',
    accessoryColor: '#1E293B',
    hairColors: ['#1F2421', '#2B1E1A'],
    shirtColors: ['#52796F', '#354F52', '#854836'],
    pantsColors: ['#241B17', '#2F3E46']
  },
  {
    name: 'Rian',
    gender: 'male',
    defaultAge: 21,
    hairstyles: ['curly_mop', 'undercut'],
    accessoryTypes: ['headphones', 'glasses_round'],
    accessoryName: 'Headphones Studio di Leher',
    accessoryColor: '#3B82F6',
    hairColors: ['#2B1E1A', '#402619', '#1F2421'],
    shirtColors: ['#854836', '#BC6C25', '#738B71'],
    pantsColors: ['#241B17', '#3B342E']
  },
  {
    name: 'Fajar',
    gender: 'male',
    defaultAge: 20,
    hairstyles: ['side_part', 'short_neat'],
    accessoryTypes: ['glasses_round', 'none'],
    accessoryName: 'Kacamata Bulat Vintage',
    accessoryColor: '#854836',
    hairColors: ['#1F2421', '#2B1E1A', '#4A3B32'],
    shirtColors: ['#738B71', '#52796F', '#A36E52'],
    pantsColors: ['#2A3B32', '#2F3E46']
  },
  {
    name: 'Bimo',
    gender: 'male',
    defaultAge: 22,
    hairstyles: ['curly_mop', 'spiky'],
    accessoryTypes: ['beanie', 'headphones'],
    accessoryName: 'Kupluk Beanie Hangat',
    accessoryColor: '#854836',
    hairColors: ['#402619', '#2B1E1A', '#4A3B32'],
    shirtColors: ['#BC6C25', '#854836', '#52796F'],
    pantsColors: ['#606C38', '#241B17']
  },
  {
    name: 'Arka',
    gender: 'male',
    defaultAge: 17,
    hairstyles: ['spiky', 'undercut'],
    accessoryTypes: ['lanyard', 'headphones'],
    accessoryName: 'Tali Lanyard Kartu Pelajar',
    accessoryColor: '#10B981',
    hairColors: ['#1F2421', '#2B1E1A'],
    shirtColors: ['#52796F', '#738B71', '#854836'],
    pantsColors: ['#2F3E46', '#241B17']
  },
  {
    name: 'Gilang',
    gender: 'male',
    defaultAge: 18,
    hairstyles: ['short_neat', 'side_part'],
    accessoryTypes: ['glasses_square', 'beanie'],
    accessoryName: 'Kacamata Persegi Minimalis',
    accessoryColor: '#3B82F6',
    hairColors: ['#2B1E1A', '#1F2421', '#402619'],
    shirtColors: ['#84A98C', '#52796F', '#A36E52'],
    pantsColors: ['#354F52', '#241B17']
  },
  {
    name: 'Kevin',
    gender: 'male',
    defaultAge: 19,
    hairstyles: ['side_part', 'curly_mop'],
    accessoryTypes: ['glasses_round', 'headphones'],
    accessoryName: 'Kacamata Bulat & Headphone',
    accessoryColor: '#FFB22C',
    hairColors: ['#402619', '#2B1E1A'],
    shirtColors: ['#A36E52', '#854836', '#BC6C25'],
    pantsColors: ['#3B342E', '#2F3E46']
  }
];

// ============================================================================
// FIXED CHARACTER ROSTER — setiap kasus memiliki identitas karakter yang TETAP
// Tidak ada randomness — semua visual dikunci per case ID.
// Format: caseId -> { personaIndex, hairstyle, accessoryType, hairColor, shirtColor, pantsColor, profession, initialTension, initialRapport }
// ============================================================================

interface FixedCaseIdentity {
  personaIndex: number;        // index ke PERSONA_TEMPLATES
  hairstyleIndex: number;      // index ke persona.hairstyles[]
  accessoryIndex: number;      // index ke persona.accessoryTypes[]
  hairColorIndex: number;      // index ke persona.hairColors[]
  shirtColorIndex: number;     // index ke persona.shirtColors[]
  pantsColorIndex: number;     // index ke persona.pantsColors[]
  professionIndex: number;     // index ke archetypesData.professions[]
  initialTension: number;
  initialRapport: number;
}

const CASE_IDENTITY_MAP: Record<string, FixedCaseIdentity> = {
  // Kasus 1 → Dinda (index 0) — kacamata bulat, rambut panjang gelap
  'anx_sekolah_ujian':       { personaIndex: 0,  hairstyleIndex: 0, accessoryIndex: 0, hairColorIndex: 0, shirtColorIndex: 0, pantsColorIndex: 0, professionIndex: 0,  initialTension: 78, initialRapport: 20 },
  // Kasus 2 → Nadia (index 1) — pita merah, ponytail
  'anx_pertemanan_chat':     { personaIndex: 1,  hairstyleIndex: 0, accessoryIndex: 0, hairColorIndex: 1, shirtColorIndex: 0, pantsColorIndex: 0, professionIndex: 1,  initialTension: 72, initialRapport: 18 },
  // Kasus 3 → Zahra (index 4) — hijab, kacamata
  'anx_keluarga_ekspektasi': { personaIndex: 4,  hairstyleIndex: 0, accessoryIndex: 0, hairColorIndex: 2, shirtColorIndex: 1, pantsColorIndex: 0, professionIndex: 2,  initialTension: 80, initialRapport: 15 },
  // Kasus 4 → Clarissa (index 5) — kacamata cat-eye, rambut panjang
  'perf_kampus_skripsi':     { personaIndex: 5,  hairstyleIndex: 0, accessoryIndex: 0, hairColorIndex: 0, shirtColorIndex: 0, pantsColorIndex: 0, professionIndex: 3,  initialTension: 85, initialRapport: 22 },
  // Kasus 5 → Dimas (index 7) — kacamata kotak, undercut
  'perf_magang_imposter':    { personaIndex: 7,  hairstyleIndex: 0, accessoryIndex: 0, hairColorIndex: 0, shirtColorIndex: 0, pantsColorIndex: 0, professionIndex: 4,  initialTension: 82, initialRapport: 17 },
  // Kasus 6 → Kirana (index 2) — bando ungu, twin tail
  'def_sekolah_tugas_kelompok': { personaIndex: 2, hairstyleIndex: 0, accessoryIndex: 0, hairColorIndex: 0, shirtColorIndex: 0, pantsColorIndex: 0, professionIndex: 0, initialTension: 75, initialRapport: 25 },
  // Kasus 7 → Rian (index 8) — headphones, curly
  'avd_pertemanan_game':     { personaIndex: 8,  hairstyleIndex: 0, accessoryIndex: 0, hairColorIndex: 0, shirtColorIndex: 0, pantsColorIndex: 0, professionIndex: 1,  initialTension: 70, initialRapport: 28 },
};

// Fallback: gunakan hash deterministik dari seed.id untuk karakter baru jika ada penambahan kasus
const deterministicIndex = (str: string, max: number): number => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash) % max;
};

// Generates a deterministic client case — karakter TETAP untuk setiap kasus
const generateDynamicClient = (): ClientProfile => {
  // Kumpulkan semua seed dari semua archetype
  const allSeeds: { seed: ScenarioSeed; archetypeKey: ArchetypeId }[] = [];
  const archetypeKeys = Object.keys(SCENARIO_SEEDS) as ArchetypeId[];
  for (const key of archetypeKeys) {
    for (const seed of SCENARIO_SEEDS[key]) {
      allSeeds.push({ seed, archetypeKey: key });
    }
  }

  // Pilih kasus berdasarkan urutan counter di localStorage
  const counterKey = 'gayatama_case_counter';
  const rawCounter = localStorage.getItem(counterKey);
  const caseCounter = rawCounter !== null ? parseInt(rawCounter, 10) : 0;
  const selectedIndex = caseCounter % allSeeds.length;
  localStorage.setItem(counterKey, String(caseCounter + 1));

  const { seed: selectedSeed, archetypeKey: selectedArchetypeKey } = allSeeds[selectedIndex];
  const archetypeDef = archetypesData.archetypes[selectedArchetypeKey];

  // Ambil identitas karakter tetap untuk kasus ini
  const identity = CASE_IDENTITY_MAP[selectedSeed.id];

  let selectedPersona: PersonaTemplate;
  let selectedHairstyle: Hairstyle;
  let selectedAccessoryType: AccessoryType;
  let selectedHairColor: string;
  let selectedShirtColor: string;
  let selectedPantsColor: string;
  let initialTension: number;
  let initialRapport: number;

  if (identity) {
    // Gunakan identitas tetap dari tabel
    selectedPersona = PERSONA_TEMPLATES[identity.personaIndex];
    selectedHairstyle = selectedPersona.hairstyles[identity.hairstyleIndex] ?? selectedPersona.hairstyles[0];
    selectedAccessoryType = selectedPersona.accessoryTypes[identity.accessoryIndex] ?? selectedPersona.accessoryTypes[0];
    selectedHairColor = selectedPersona.hairColors[identity.hairColorIndex] ?? selectedPersona.hairColors[0];
    selectedShirtColor = selectedPersona.shirtColors[identity.shirtColorIndex] ?? selectedPersona.shirtColors[0];
    selectedPantsColor = selectedPersona.pantsColors[identity.pantsColorIndex] ?? selectedPersona.pantsColors[0];
    initialTension = identity.initialTension;
    initialRapport = identity.initialRapport;
  } else {
    // Kasus baru yang belum ada di tabel — gunakan hash deterministik (tidak random)
    const personaIdx = deterministicIndex(selectedSeed.id, PERSONA_TEMPLATES.length);
    selectedPersona = PERSONA_TEMPLATES[personaIdx];
    selectedHairstyle = selectedPersona.hairstyles[deterministicIndex(selectedSeed.id + 'h', selectedPersona.hairstyles.length)];
    selectedAccessoryType = selectedPersona.accessoryTypes[deterministicIndex(selectedSeed.id + 'a', selectedPersona.accessoryTypes.length)];
    selectedHairColor = selectedPersona.hairColors[deterministicIndex(selectedSeed.id + 'hc', selectedPersona.hairColors.length)];
    selectedShirtColor = selectedPersona.shirtColors[deterministicIndex(selectedSeed.id + 'sc', selectedPersona.shirtColors.length)];
    selectedPantsColor = selectedPersona.pantsColors[deterministicIndex(selectedSeed.id + 'pc', selectedPersona.pantsColors.length)];
    // Tension & rapport juga deterministik dari hash
    initialTension = 65 + deterministicIndex(selectedSeed.id + 'tension', 25);
    initialRapport = 15 + deterministicIndex(selectedSeed.id + 'rapport', 20);
  }

  const profession = archetypesData.professions[
    identity
      ? identity.professionIndex % archetypesData.professions.length
      : deterministicIndex(selectedSeed.id + 'prof', archetypesData.professions.length)
  ];

  const fullNameWithAge = `${selectedPersona.name} (${selectedPersona.defaultAge} th)`;

  const phases: DialoguePhase[] = [
    {
      id: `phase_1_${selectedSeed.id}`,
      phaseNumber: 1,
      phaseName: `Fase 1: Membangun Aliansi & Validasi (${selectedSeed.contextTitle})`,
      clientSpeech: selectedSeed.phase1.clientSpeech,
      clientNonVerbal: selectedSeed.phase1.clientNonVerbal,
      clientInnerDistress: selectedSeed.phase1.clientInnerThought,
      options: shuffleArray(generateContextualPhaseOptions(1, selectedSeed, fullNameWithAge, selectedArchetypeKey))
    },
    {
      id: `phase_2_${selectedSeed.id}`,
      phaseNumber: 2,
      phaseName: `Fase 2: Eksplorasi Akar Pola & Restrukturisasi`,
      clientSpeech: selectedSeed.phase2.clientSpeech,
      clientNonVerbal: selectedSeed.phase2.clientNonVerbal,
      clientInnerDistress: selectedSeed.phase2.clientInnerThought,
      options: shuffleArray(generateContextualPhaseOptions(2, selectedSeed, fullNameWithAge, selectedArchetypeKey))
    },
    {
      id: `phase_3_${selectedSeed.id}`,
      phaseNumber: 3,
      phaseName: `Fase 3: Integrasi & Aksi Nyata Mandiri`,
      clientSpeech: selectedSeed.phase3.clientSpeech,
      clientNonVerbal: selectedSeed.phase3.clientNonVerbal,
      clientInnerDistress: selectedSeed.phase3.clientInnerThought,
      options: shuffleArray(generateContextualPhaseOptions(3, selectedSeed, fullNameWithAge, selectedArchetypeKey))
    }
  ];

  return {
    id: `client_${selectedSeed.id}`,
    name: fullNameWithAge,
    gender: selectedPersona.gender,
    age: selectedPersona.defaultAge,
    profession,
    complaintTitle: selectedSeed.triggerEvent,
    backgroundStory: `${fullNameWithAge}, ${profession}, sedang mengalami: "${selectedSeed.triggerEvent}". Kategori kasus: ${selectedSeed.contextTitle}. Ciri visual: ${selectedPersona.accessoryName}.`,
    archetypeId: selectedArchetypeKey,
    archetypeName: archetypeDef.name,
    archetypeDescription: archetypeDef.description,
    hairColor: selectedHairColor,
    shirtColor: selectedShirtColor,
    pantsColor: selectedPantsColor,
    hairstyle: selectedHairstyle,
    accessoryType: selectedAccessoryType,
    accessoryColor: selectedPersona.accessoryColor,
    accessory: selectedPersona.accessoryName,
    initialTension,
    currentTension: initialTension,
    initialRapport,
    currentRapport: initialRapport,
    phases,
    currentPhaseIndex: 0,
    preferredTechniques: archetypeDef.preferredTechniques as any,
    aversionTechniques: archetypeDef.aversionTechniques as any,
    theoryConnection: selectedSeed.theoryConnection || archetypeDef.theoryConnection,
    sessionHistory: []
  };
};

const calculateRank = (xp: number): string => {
  if (xp >= 1000) return 'Psikolog Maestro (Senior Supervisor)';
  if (xp >= 600) return 'Klinisi Mahir (Master Practitioner)';
  if (xp >= 300) return 'Konselor Terampil (Skilled Helper)';
  if (xp >= 100) return 'Praktisi Berkembang (Associate Counselor)';
  return 'Konselor Magang (Junior Apprentice)';
};

// The entrance spawn position (just below the bottom door, off-map)
const ENTRANCE_SPAWN_POS: Position = { x: 5, y: 9.5 };
// Final start position after walking through door
const ENTRANCE_FINAL_POS: Position = { x: 5, y: 7 };
// Client sofa-side seat (where psychologist sits on psychologist sofa opposite client)
const CLIENT_MEETING_POS: Position = { x: 6.5, y: 6 };

export const useGameStore = create<GameState>((set, get) => ({
  // Start below the door, will animate in
  playerPos: ENTRANCE_SPAWN_POS,
  playerDir: 'up',
  isMoving: false,

  entranceProgress: 0,
  walkToClientTarget: null,

  // Begin game in ENTERING mode (triggers entrance animation)
  gameMode: 'ENTERING',
  nearbyObject: null,
  activeReferenceTab: 'theories',
  activeRelaxationModal: null,

  currentClient: generateDynamicClient(),
  lastDecisionFeedback: null,

  reputationXP: 100, // Starter XP agar konselor bisa langsung bereksperimen di toko dekorasi
  counselorRank: calculateRank(100), // 'Praktisi Berkembang (Associate Counselor)'
  evaluationResult: null,
  totalClientsHelped: 0,
  isRadioPlaying: false,

  // Phone & Follow-up State
  phoneMessages: [],
  unreadPhoneCount: 0,
  activeChatId: null,
  isPhoneOpen: false,
  phoneToastNotification: null,

  // Clinic Decoration & Shop State
  unlockedDecorations: [],
  equippedDecorations: {},
  isShopOpen: false,

  setPlayerPos: (pos) => set({ playerPos: pos }),
  setPlayerDir: (dir) => set({ playerDir: dir }),
  setIsMoving: (isMoving) => set({ isMoving }),
  setGameMode: (gameMode) => set({ gameMode }),
  setNearbyObject: (nearbyObject) => set({ nearbyObject }),
  setActiveReferenceTab: (activeReferenceTab) => set({ activeReferenceTab }),
  setActiveRelaxationModal: (activeRelaxationModal) => set({ activeRelaxationModal }),
  setRadioPlaying: (isRadioPlaying) => set({ isRadioPlaying }),
  toggleRadio: () => set((state) => ({ isRadioPlaying: !state.isRadioPlaying })),

  // Level Up & Rank Notification State
  levelUpNotification: null,
  isRankHighlighted: false,

  dismissLevelUpNotification: () => set({ levelUpNotification: null }),
  clearRankHighlight: () => set({ isRankHighlighted: false }),

  // Phone Actions
  setPhoneOpen: (isPhoneOpen) => {
    set({ isPhoneOpen });
    if (isPhoneOpen) {
      set({ phoneToastNotification: null });
    }
  },

  setActiveChatId: (activeChatId) => {
    set({ activeChatId });
    if (activeChatId) {
      get().markChatAsRead(activeChatId);
    }
  },

  markChatAsRead: (id) => {
    set((state) => {
      const updatedMessages = state.phoneMessages.map((m) =>
        m.id === id ? { ...m, isRead: true } : m
      );
      const unreadCount = updatedMessages.filter((m) => !m.isRead).length;
      return {
        phoneMessages: updatedMessages,
        unreadPhoneCount: unreadCount
      };
    });
  },

  sendChatReply: (messageId, replyIndex) => {
    const { phoneMessages, reputationXP, counselorRank } = get();
    const msg = phoneMessages.find((m) => m.id === messageId);
    if (!msg || msg.chosenReplyIndex !== undefined) return;

    const chosenOption = msg.replyOptions[replyIndex];
    if (!chosenOption) return;

    const bonusXP = chosenOption.xpReward || 15;
    const newXP = reputationXP + bonusXP;
    const newRank = calculateRank(newXP);
    const isRankUp = newRank !== counselorRank;

    set((state) => ({
      phoneMessages: state.phoneMessages.map((m) =>
        m.id === messageId
          ? {
              ...m,
              chosenReplyIndex: replyIndex,
              chosenReplyText: chosenOption.counselorReply,
              clientPostReplyText: chosenOption.clientFeedback,
              xpClaimed: true
            }
          : m
      ),
      reputationXP: newXP,
      counselorRank: newRank,
      ...(isRankUp
        ? {
            levelUpNotification: { oldRank: counselorRank, newRank, xp: newXP },
            isRankHighlighted: true
          }
        : {})
    }));
  },

  dismissPhoneToast: () => set({ phoneToastNotification: null }),

  triggerFollowUpMessage: (client, evalResult) => {
    const newMsg = generateFollowUpMessage(client, evalResult);
    set((state) => ({
      phoneMessages: [newMsg, ...state.phoneMessages],
      unreadPhoneCount: state.unreadPhoneCount + 1,
      phoneToastNotification: {
        id: newMsg.id,
        senderName: newMsg.clientName,
        snippet: newMsg.messageText.slice(0, 65) + '...',
        timestamp: Date.now()
      }
    }));
  },

  setShopOpen: (isShopOpen) => set({ isShopOpen }),

  buyDecoration: (itemId) => {
    const { reputationXP, unlockedDecorations, equippedDecorations } = get();
    const item = CLINIC_DECORATIONS.find((d) => d.id === itemId);
    if (!item) return false;
    if (unlockedDecorations.includes(itemId)) return true;
    if (reputationXP < item.costXP) return false;

    const newXP = reputationXP - item.costXP;
    const newRank = calculateRank(newXP);
    const newUnlocked = [...unlockedDecorations, itemId];
    
    // Auto-equip item yang baru dibeli
    const newEquipped = {
      ...equippedDecorations,
      [item.category]: itemId
    };

    set({
      reputationXP: newXP,
      counselorRank: newRank,
      unlockedDecorations: newUnlocked,
      equippedDecorations: newEquipped
    });

    return true;
  },

  toggleEquipDecoration: (itemId) => {
    const { unlockedDecorations, equippedDecorations } = get();
    if (!unlockedDecorations.includes(itemId)) return;

    const item = CLINIC_DECORATIONS.find((d) => d.id === itemId);
    if (!item) return;

    const currentEquippedInSlot = equippedDecorations[item.category];
    const newEquipped = { ...equippedDecorations };

    if (currentEquippedInSlot === itemId) {
      delete newEquipped[item.category];
    } else {
      newEquipped[item.category] = itemId;
    }

    set({ equippedDecorations: newEquipped });
  },

  setEntranceProgress: (p) => set({ entranceProgress: p }),

  finishEntrance: () => {
    set({
      gameMode: 'EXPLORATION',
      playerPos: ENTRANCE_FINAL_POS,
      playerDir: 'up',
      entranceProgress: 1,
      isMoving: false
    });
  },

  startWalkToClient: () => {
    set({
      gameMode: 'WALKING_TO_CLIENT',
      walkToClientTarget: CLIENT_MEETING_POS,
      playerDir: 'up',
      isMoving: true
    });
  },

  tickWalkToClient: () => {
    const { playerPos, walkToClientTarget } = get();
    if (!walkToClientTarget) return;

    const dx = walkToClientTarget.x - playerPos.x;
    const dy = walkToClientTarget.y - playerPos.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    const WALK_SPEED = 0.055;

    if (dist <= WALK_SPEED + 0.05) {
      // Arrived — check if session is already completed or active
      const { evaluationResult } = get();
      if (evaluationResult) {
        set({
          playerPos: walkToClientTarget,
          playerDir: 'up',
          isMoving: false,
          walkToClientTarget: null,
          gameMode: 'ENDING'
        });
      } else {
        set({
          playerPos: walkToClientTarget,
          playerDir: 'up',
          isMoving: false,
          walkToClientTarget: null,
          gameMode: 'DIALOGUE',
          lastDecisionFeedback: null
        });
      }
    } else {
      // Step closer
      const nx = playerPos.x + (dx / dist) * WALK_SPEED;
      const ny = playerPos.y + (dy / dist) * WALK_SPEED;

      let dir: Direction = 'up';
      if (Math.abs(dy) >= Math.abs(dx)) {
        dir = dy < 0 ? 'up' : 'down';
      } else {
        dir = dx < 0 ? 'left' : 'right';
      }

      set({
        playerPos: { x: nx, y: ny },
        playerDir: dir,
        isMoving: true
      });
    }
  },

  generateNewClientCase: () => {
    const newClient = generateDynamicClient();
    set({
      currentClient: newClient,
      gameMode: 'EXPLORATION',
      lastDecisionFeedback: null,
      evaluationResult: null,
      playerPos: ENTRANCE_FINAL_POS,
      playerDir: 'up',
      walkToClientTarget: null,
    });
  },

  handleDialogueChoice: (option) => {
    const { currentClient } = get();
    if (!currentClient) return;

    let tensionChange = option.tensionChange;
    let rapportChange = option.rapportChange;

    // Archetype preference modifiers (evidence-based therapeutic match)
    if (currentClient.preferredTechniques.includes(option.technique)) {
      tensionChange -= 6;
      rapportChange += 8;
    } else if (currentClient.aversionTechniques.includes(option.technique)) {
      tensionChange += 8;
      rapportChange -= 5;
    }

    const newTension = Math.max(0, Math.min(100, currentClient.currentTension + tensionChange));
    const newRapport = Math.max(0, Math.min(100, currentClient.currentRapport + rapportChange));

    const currentPhase = currentClient.phases[currentClient.currentPhaseIndex];
    const updatedHistory = [
      ...currentClient.sessionHistory,
      {
        phaseName: currentPhase?.phaseName || 'Fase Obrolan',
        chosenOption: option,
        resultingTension: newTension,
        resultingRapport: newRapport
      }
    ];

    const updatedClient: ClientProfile = {
      ...currentClient,
      currentTension: newTension,
      currentRapport: newRapport,
      sessionHistory: updatedHistory
    };

    const feedbackPayload = {
      feedback: option.feedback,
      clientReaction: option.clientReaction,
      tensionDelta: tensionChange,
      rapportDelta: rapportChange,
      hotsTitle: option.hotsTitle,
      techniqueName: option.technique,
      journalRef: option.journalRef
    };

    set({
      currentClient: updatedClient,
      lastDecisionFeedback: feedbackPayload
    });
  },

  advanceToNextPhase: () => {
    const { currentClient, concludeSession } = get();
    if (!currentClient) return;

    const nextIndex = currentClient.currentPhaseIndex + 1;
    if (nextIndex >= currentClient.phases.length) {
      // Reset feedback FIRST so DialogueOverlay doesn't get stuck on the last feedback panel
      set({ lastDecisionFeedback: null });
      concludeSession();
    } else {
      set({
        currentClient: {
          ...currentClient,
          currentPhaseIndex: nextIndex
        },
        lastDecisionFeedback: null
      });
    }
  },

  concludeSession: () => {
    // Always read fresh state via get() — never use closure-scoped variables for mutable state
    const { currentClient, totalClientsHelped, reputationXP, counselorRank } = get();
    if (!currentClient) return;

    const tensionReduction = currentClient.initialTension - currentClient.currentTension;

    const tensionFactor = Math.max(0, Math.min(100, 100 - currentClient.currentTension));
    const finalScore = Math.round((currentClient.currentRapport * 0.5) + (tensionFactor * 0.5));

    let grade: 'S' | 'A' | 'B' | 'C' | 'D' = 'D';
    if (finalScore >= endingsData.grades.S.minScore) grade = 'S';
    else if (finalScore >= endingsData.grades.A.minScore) grade = 'A';
    else if (finalScore >= endingsData.grades.B.minScore) grade = 'B';
    else if (finalScore >= endingsData.grades.C.minScore) grade = 'C';

    const gradeInfo = endingsData.grades[grade];

    // Gain XP based on score
    const xpGained = finalScore * 2;
    const newXP = reputationXP + xpGained;
    const newRank = calculateRank(newXP);

    let c4Count = 0;
    let c5Count = 0;
    let c6Count = 0;

    currentClient.sessionHistory.forEach((h) => {
      if (h.chosenOption.hots === 'C4') c4Count++;
      if (h.chosenOption.hots === 'C5') c5Count++;
      if (h.chosenOption.hots === 'C6') c6Count++;
    });

    const recommendations: string[] = [];
    if (currentClient.currentTension > 40) {
      recommendations.push("Gunakan pendekatan mendengarkan dan latihan napas di awal agar klien merasa aman lebih cepat.");
    }
    if (c6Count === 0) {
      recommendations.push("Ajak klien merumuskan kebiasaan atau langkah kecil baru agar punya bekal saat pulang.");
    }
    if (currentClient.currentRapport > 75) {
      recommendations.push("Kepercayaan terbentuk sangat kuat! Klien siap menerapkan langkah perubahan secara mandiri.");
    } else {
      recommendations.push("Dengarkan perasaannya dengan tulus sebelum mengajak memeriksa kenyataan.");
    }

    const evaluationResult: EvaluationResult = {
      clientName: currentClient.name,
      archetype: currentClient.archetypeName,
      finalTension: currentClient.currentTension,
      tensionReduced: tensionReduction,
      finalRapport: currentClient.currentRapport,
      score: finalScore,
      grade,
      titleAchieved: gradeInfo.title,
      diagnosticInsight: gradeInfo.summary,
      theoryConnection: currentClient.theoryConnection,
      hotsBreakdown: { c4Count, c5Count, c6Count },
      recommendations
    };

    const isRankUp = newRank !== counselorRank; // counselorRank now comes from get() above — always fresh

    set({
      gameMode: 'ENDING',
      evaluationResult,
      lastDecisionFeedback: null, // Ensure feedback panel is cleared when ending
      totalClientsHelped: totalClientsHelped + 1,
      reputationXP: newXP,
      counselorRank: newRank,
      ...(isRankUp
        ? {
            levelUpNotification: { oldRank: counselorRank, newRank, xp: newXP },
            isRankHighlighted: true
          }
        : {})
    });

    // Otomatis buat pesan follow-up dari klien yang ditolong
    get().triggerFollowUpMessage(currentClient, evaluationResult);
  },

  resetGameSession: () => {
    const newClient = generateDynamicClient();
    set({
      currentClient: newClient,
      gameMode: 'ENTERING',
      playerPos: ENTRANCE_SPAWN_POS,
      playerDir: 'up',
      lastDecisionFeedback: null,
      evaluationResult: null,
      entranceProgress: 0,
      walkToClientTarget: null
    });
  }
}));
