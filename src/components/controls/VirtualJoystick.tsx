import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useGameStore } from '../../store/useGameStore';
import { MapGrid } from '../canvas/MapGrid';
import { Direction } from '../../types/game';

export const VirtualJoystick: React.FC = () => {
  const {
    playerPos,
    playerDir,
    gameMode,
    setPlayerPos,
    setPlayerDir,
    setIsMoving
  } = useGameStore();

  const [active, setActive] = useState(false);
  const [knobPos, setKnobPos] = useState({ x: 0, y: 0 });
  const touchIdRef = useRef<number | null>(null);
  const centerRef = useRef({ x: 0, y: 0 });
  const joystickBaseRef = useRef<HTMLDivElement | null>(null);
  const moveVectorRef = useRef({ x: 0, y: 0 });

  const maxRadius = 40; // Joystick max distance

  const handleTouchStart = (e: React.TouchEvent) => {
    if (gameMode !== 'EXPLORATION') return;
    const touch = e.changedTouches[0];
    touchIdRef.current = touch.identifier;

    if (joystickBaseRef.current) {
      const rect = joystickBaseRef.current.getBoundingClientRect();
      centerRef.current = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
      };
    }

    setActive(true);
    handleTouchMove(e);
  };

  const handleTouchMove = useCallback((e: React.TouchEvent | TouchEvent) => {
    if (!active || touchIdRef.current === null) return;

    for (let i = 0; i < e.changedTouches.length; i++) {
      const touch = e.changedTouches[i];
      if (touch.identifier === touchIdRef.current) {
        const dx = touch.clientX - centerRef.current.x;
        const dy = touch.clientY - centerRef.current.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance > 0) {
          const angle = Math.atan2(dy, dx);
          const clampedDist = Math.min(distance, maxRadius);

          const knobX = Math.cos(angle) * clampedDist;
          const knobY = Math.sin(angle) * clampedDist;

          setKnobPos({ x: knobX, y: knobY });
          moveVectorRef.current = {
            x: knobX / maxRadius,
            y: knobY / maxRadius
          };
        }
        break;
      }
    }
  }, [active, maxRadius]);

  const handleTouchEnd = () => {
    setActive(false);
    touchIdRef.current = null;
    setKnobPos({ x: 0, y: 0 });
    moveVectorRef.current = { x: 0, y: 0 };
    setIsMoving(false);
  };

  // Continuous movement loop while joystick is active
  useEffect(() => {
    if (!active) return;

    let frameId: number;
    const step = () => {
      const vx = moveVectorRef.current.x;
      const vy = moveVectorRef.current.y;

      if (Math.abs(vx) > 0.15 || Math.abs(vy) > 0.15) {
        const speed = 0.06;
        let newDir: Direction = playerDir;

        if (Math.abs(vy) > Math.abs(vx)) {
          newDir = vy < 0 ? 'up' : 'down';
        } else {
          newDir = vx < 0 ? 'left' : 'right';
        }

        const nextPos = MapGrid.resolveMovement(
          playerPos,
          vx * speed,
          vy * speed,
          0.26
        );

        setPlayerPos(nextPos);
        setPlayerDir(newDir);
        setIsMoving(true);
      } else {
        setIsMoving(false);
      }

      frameId = requestAnimationFrame(step);
    };

    frameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameId);
  }, [active, playerPos, playerDir, setPlayerPos, setPlayerDir, setIsMoving]);

  if (gameMode !== 'EXPLORATION') return null;

  return (
    <div className="md:hidden fixed bottom-6 left-6 z-30 touch-none select-none">
      <div
        ref={joystickBaseRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd}
        className="relative w-28 h-28 rounded-full bg-[#18120F]/85 border-4 border-[#854836] shadow-[0_4px_16px_rgba(0,0,0,0.8)] flex items-center justify-center"
      >
        {/* Direction arrows guide */}
        <div className="absolute top-1 text-[#FFB22C] text-[10px] font-bold">▲</div>
        <div className="absolute bottom-1 text-[#FFB22C] text-[10px] font-bold">▼</div>
        <div className="absolute left-1 text-[#FFB22C] text-[10px] font-bold">◀</div>
        <div className="absolute right-1 text-[#FFB22C] text-[10px] font-bold">▶</div>

        {/* Joystick Stick / Knob */}
        <div
          style={{
            transform: `translate(${knobPos.x}px, ${knobPos.y}px)`
          }}
          className="w-12 h-12 rounded-full bg-[#FFB22C] border-2 border-[#854836] shadow-md flex items-center justify-center pointer-events-none transition-transform duration-75"
        >
          <div className="w-4 h-4 rounded-full bg-[#000000]" />
        </div>
      </div>
    </div>
  );
};
