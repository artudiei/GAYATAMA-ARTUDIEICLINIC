import React, { useState, useEffect } from 'react';
import { useGameStore } from '../../store/useGameStore';
import { MapGrid } from '../canvas/MapGrid';
import { MessageSquare, BookOpen, Coffee, Sparkles, Award, Radio } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const InteractionPrompt: React.FC = () => {
  const { 
    nearbyObject, 
    gameMode, 
    evaluationResult, 
    isRadioPlaying,
    toggleRadio,
    setGameMode, 
    startWalkToClient,
    setActiveRelaxationModal 
  } = useGameStore();

  const [screenPos, setScreenPos] = useState({ x: window.innerWidth / 2, y: window.innerHeight / 2, isBelow: false });

  // Update screen coordinates of the client or nearby interactive target
  useEffect(() => {
    const updatePosition = () => {
      if (!nearbyObject) return;

      const width = window.innerWidth;
      const height = window.innerHeight;
      const tileSize = MapGrid.getTileSize(width, height);
      const mapWidth = MapGrid.COLS * tileSize;
      const mapHeight = MapGrid.ROWS * tileSize;

      const offsetX = Math.round((width - mapWidth) / 2);
      const offsetY = Math.round((height - mapHeight) / 2);

      const targetX = nearbyObject.x;
      const targetY = nearbyObject.y;

      const rawPosX = offsetX + targetX * tileSize + (tileSize / 2);
      
      let posY: number;
      let isBelow = false;

      if (nearbyObject.type === 'radio' || nearbyObject.type === 'desk') {
        // Psychologist desk radio: Place prompt BELOW the desk
        isBelow = true;
        const floatYOffsetBelow = Math.round(10 * (tileSize / MapGrid.BASE_TILE_SIZE));
        posY = offsetY + 4.9 * tileSize + floatYOffsetBelow;
      } else if (targetY <= 1.5) {
        // Objects near top wall (Bookshelf, Tea Station, Plant):
        isBelow = true;
        const floatYOffsetBelow = Math.round(12 * (tileSize / MapGrid.BASE_TILE_SIZE));
        posY = offsetY + (targetY + 1.2) * tileSize + floatYOffsetBelow;
      } else {
        // Normal objects (e.g. Client): float above object
        isBelow = false;
        const floatYOffset = Math.round(24 * (tileSize / MapGrid.BASE_TILE_SIZE));
        const rawPosY = offsetY + targetY * tileSize - floatYOffset;
        posY = Math.max(115, rawPosY);
      }

      // Clamp X position so prompt button text is never clipped on screen edges
      const minX = 110;
      const maxX = Math.max(minX, width - 110);
      const posX = Math.max(minX, Math.min(maxX, rawPosX));

      setScreenPos({ x: posX, y: posY, isBelow });
    };

    updatePosition();
    window.addEventListener('resize', updatePosition);
    return () => window.removeEventListener('resize', updatePosition);
  }, [nearbyObject]);

  // Only show when in exploration mode AND player is near an interactive object
  if (gameMode !== 'EXPLORATION') return null;
  if (!nearbyObject) return null;

  const isClientCompleted = Boolean(evaluationResult);
  const targetType = nearbyObject.type;
  const isTargetClient = targetType === 'client';

  const handleAction = () => {
    if (isTargetClient) {
      if (evaluationResult) {
        setGameMode('ENDING');
      } else {
        startWalkToClient();
      }
    } else if (targetType === 'bookshelf') {
      setGameMode('REFERENCE');
    } else if (targetType === 'tea_station') {
      setActiveRelaxationModal('tea');
    } else if (targetType === 'plant') {
      setActiveRelaxationModal('plant');
    } else if (targetType === 'radio' || targetType === 'desk') {
      toggleRadio();
    }
  };

  const getIcon = () => {
    if (isTargetClient) {
      return isClientCompleted ? (
        <Award className="w-4 h-4 text-[#000000]" />
      ) : (
        <MessageSquare className="w-4 h-4 text-[#000000]" />
      );
    }
    if (nearbyObject?.type === 'bookshelf') return <BookOpen className="w-4 h-4 text-[#000000]" />;
    if (nearbyObject?.type === 'tea_station') return <Coffee className="w-4 h-4 text-[#000000]" />;
    if (nearbyObject?.type === 'radio' || nearbyObject?.type === 'desk') return <Radio className="w-4 h-4 text-[#000000]" />;
    return <Sparkles className="w-4 h-4 text-[#000000]" />;
  };

  const buttonText = isTargetClient
    ? (isClientCompleted ? 'Laporan Sesi' : 'Bicara dengan Klien')
    : (nearbyObject?.type === 'radio' || nearbyObject?.type === 'desk')
    ? (isRadioPlaying ? 'Matikan Musik' : 'Putar Musik')
    : (nearbyObject?.name || 'Interaksi');

  return (
    <>
      {/* ── 1. IN-WORLD FLOATING ACTION BUBBLE NEXT TO / ABOVE / BELOW CHARACTER ── */}
      <AnimatePresence>
        <div
          style={{
            left: `${screenPos.x}px`,
            top: `${screenPos.y}px`,
            transform: screenPos.isBelow ? 'translate(-50%, 0%)' : 'translate(-50%, -100%)'
          }}
          className="fixed z-30 pointer-events-auto"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: screenPos.isBelow ? -6 : 8 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            className={`flex items-center group cursor-pointer ${screenPos.isBelow ? 'flex-col-reverse' : 'flex-col'}`}
            onClick={handleAction}
          >
            {/* Interactive Floating Button Bubble */}
            <button
              onClick={handleAction}
              className={`
                relative px-3.5 py-1.5 rounded-xl border-3 font-sans font-extrabold text-xs
                transition-all duration-150 transform group-hover:scale-105 active:scale-95
                shadow-[0_8px_20px_rgba(0,0,0,0.7),2px_2px_0px_#854836]
                flex items-center gap-2
                ${isClientCompleted
                  ? 'bg-[#854836] text-[#F7F7F7] border-[#FFB22C] hover:bg-[#9F5742]'
                  : 'bg-[#FFB22C] text-[#000000] border-[#854836] hover:bg-[#FFC45E]'
                }
              `}
              title="Klik atau tekan [E] / [SPASI] untuk interaksi"
            >
              {/* Icon Container */}
              <div className="w-6 h-6 rounded-md bg-white/25 flex items-center justify-center shadow-inner shrink-0">
                {getIcon()}
              </div>

              {/* Text & Key Prompt Badge */}
              <div className="flex items-center gap-1.5">
                <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-black/20 font-bold tracking-wider">
                  [E]
                </span>
                <span className="tracking-wide">{buttonText}</span>
              </div>
            </button>

            {/* Pointer Tail */}
            {screenPos.isBelow ? (
              <div className="w-0 h-0 border-l-[7px] border-l-transparent border-r-[7px] border-r-transparent border-b-[8px] border-b-[#854836]" />
            ) : (
              <div className="w-0 h-0 border-l-[7px] border-l-transparent border-r-[7px] border-r-transparent border-t-[8px] border-t-[#854836]" />
            )}
          </motion.div>
        </div>
      </AnimatePresence>

      {/* ── 2. MOBILE FLOATING ACTION BUTTON (Bottom-Right for easy touch reach) ── */}
      <div className="md:hidden fixed bottom-6 right-6 z-30">
        <button
          onClick={handleAction}
          className="flex flex-col items-center justify-center w-20 h-20 rounded-full bg-[#FFB22C] border-4 border-[#854836] shadow-[0_6px_20px_rgba(0,0,0,0.8)] active:scale-90 transition-transform"
        >
          {getIcon()}
          <span className="text-[10px] font-pixel font-bold text-[#000000] mt-1">
            {isClientCompleted ? 'LAPORAN' : 'AKSI'}
          </span>
        </button>
      </div>
    </>
  );
};
