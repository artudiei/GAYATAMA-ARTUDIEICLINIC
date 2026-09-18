export type Direction = 'up' | 'down' | 'left' | 'right';

export interface Position {
  x: number;
  y: number;
}

export type ArchetypeId = 'defensive' | 'perfectionist' | 'anxious' | 'avoidant';

export type HOTSLevel = 'C4' | 'C5' | 'C6';

export type TechniqueType = 
  | 'active_listening' 
  | 'cbt_reframing' 
  | 'socratic_questioning' 
  | 'somatic_grounding' 
  | 'gentle_confrontation' 
  | 'validation';

export interface StrategyCard {
  id: string;
  name: string;
  technique: TechniqueType;
  hotsLevel: HOTSLevel;
  icon: string;
  description: string;
  clinicalRationale: string;
  tensionModifier: number; // e.g., -15 or +10
  rapportModifier: number; // e.g., +20
  cooldownTurns: number;
}

export interface DialogueOption {
  id: string;
  text: string;
  hots: HOTSLevel;
  hotsTitle: string; // e.g. "C4: Analyzing Core Cognitive Distortion"
  technique: TechniqueType;
  tensionChange: number; // Positive increases tension, negative reduces it
  rapportChange: number; // Positive increases rapport
  feedback: string;      // Educational feedback why this works or backfires
  clientReaction: string; // Speech bubble client says in response
  requiredCardId?: string; // If this choice is boosted/unlocked by card
  journalRef?: {
    title: string;
    citation: string;
    url: string;
  };
}

export interface DialoguePhase {
  id: string;
  phaseNumber: number;
  phaseName: string; // e.g. "Fase 1: Membangun Rasa Aman & Aliansi Terapeutik"
  clientSpeech: string;
  clientNonVerbal: string;
  clientInnerDistress: string;
  options: DialogueOption[];
}

export interface TheoryConnection {
  framework: string;
  primarySource: string;
  secondarySource?: string;
  scientificExplanation: string;
  doiUrl?: string;
  scholarUrl?: string;
  journalName?: string;
  year?: number;
}

export type Gender = 'female' | 'male';

export type Hairstyle = 
  | 'long_flow' 
  | 'ponytail' 
  | 'bob' 
  | 'twin_tail' 
  | 'hijab' 
  | 'wavy_long'
  | 'short_neat' 
  | 'undercut' 
  | 'curly_mop' 
  | 'spiky' 
  | 'side_part';

export type AccessoryType = 
  | 'glasses_round' 
  | 'glasses_square' 
  | 'headband' 
  | 'ribbon' 
  | 'earrings' 
  | 'scarf' 
  | 'beanie' 
  | 'headphones' 
  | 'lanyard' 
  | 'none';

export interface ClientProfile {
  id: string;
  name: string;
  gender: Gender;
  age: number;
  profession: string;
  complaintTitle: string;
  backgroundStory: string;
  archetypeId: ArchetypeId;
  archetypeName: string;
  archetypeDescription: string;
  hairColor: string;
  shirtColor: string;
  pantsColor: string;
  hairstyle: Hairstyle;
  accessoryType: AccessoryType;
  accessoryColor?: string;
  accessory?: string; // Human readable description e.g. "Kacamata Bulat & Bando Mawar"
  initialTension: number;
  currentTension: number;
  initialRapport: number;
  currentRapport: number;
  phases: DialoguePhase[];
  currentPhaseIndex: number;
  preferredTechniques: TechniqueType[];
  aversionTechniques: TechniqueType[];
  theoryConnection?: TheoryConnection;
  sessionHistory: {
    phaseName: string;
    chosenOption: DialogueOption;
    resultingTension: number;
    resultingRapport: number;
  }[];
}

export type GameMode = 'ENTERING' | 'EXPLORATION' | 'WALKING_TO_CLIENT' | 'DIALOGUE' | 'REFERENCE' | 'ENDING';

export interface EvaluationResult {
  clientName: string;
  archetype: string;
  finalTension: number;
  tensionReduced: number;
  finalRapport: number;
  score: number;
  grade: 'S' | 'A' | 'B' | 'C' | 'D';
  titleAchieved: string;
  diagnosticInsight: string;
  theoryConnection?: TheoryConnection;
  hotsBreakdown: {
    c4Count: number;
    c5Count: number;
    c6Count: number;
  };
  recommendations: string[];
}

export interface InteractiveObject {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  type: 'client' | 'bookshelf' | 'desk' | 'tea_station' | 'plant' | 'diploma' | 'radio' | 'shop';
  name: string;
  promptText: string;
}

// --- PHONE & FOLLOW-UP CHAT TYPES ---
export interface ChatReplyOption {
  text: string;
  counselorReply: string;
  clientFeedback: string;
  xpReward: number;
}

export interface ClientChatMessage {
  id: string;
  clientId: string;
  clientName: string;
  clientProfession: string;
  archetypeId: ArchetypeId;
  archetypeName: string;
  gender: Gender;
  hairstyle: Hairstyle;
  accessoryType: AccessoryType;
  hairColor: string;
  shirtColor: string;
  pantsColor: string;
  timestamp: string; // e.g. "Hari ini, 14:30"
  sessionGrade: 'S' | 'A' | 'B' | 'C' | 'D';
  messageText: string;
  replyOptions: ChatReplyOption[];
  chosenReplyIndex?: number;
  chosenReplyText?: string;
  clientPostReplyText?: string;
  isRead: boolean;
  xpClaimed: boolean;
}

export interface PhoneNotification {
  id: string;
  senderName: string;
  snippet: string;
  timestamp: number;
}

// --- CLINIC DECORATION TYPES ---
export type DecorationCategory = 'desk' | 'wall' | 'plant' | 'rug' | 'furniture' | 'station';

export interface DecorationItem {
  id: string;
  name: string;
  category: DecorationCategory;
  costXP: number;
  iconName: string;
  previewColor: string;
  description: string;
  clinicalBenefit: string;
  passiveBonusText: string;
}

export interface EquippedDecorations {
  desk?: string;       // e.g. 'himalayan_lamp'
  wall?: string;       // e.g. 'aquarium_wall' | 'zen_mountain_art'
  plant?: string;      // e.g. 'lavender_pot'
  rug?: string;        // e.g. 'persian_rug'
  furniture?: string;  // e.g. 'emerald_sofa'
  station?: string;    // e.g. 'diffuser_station'
}

