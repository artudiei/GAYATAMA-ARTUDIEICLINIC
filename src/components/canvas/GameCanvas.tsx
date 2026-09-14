import React, { useEffect, useRef, useCallback } from 'react';
import { useGameStore } from '../../store/useGameStore';
import { SpriteRenderer } from './SpriteRenderer';
import { MapGrid } from './MapGrid';
import { Direction } from '../../types/game';

interface GameCanvasProps {
  onInteract?: () => void;
}

// Entrance animation: total duration in ms
const ENTRANCE_DURATION_MS = 2000;
// Start tile Y for spawn (below door) and final Y
const ENTRANCE_START_Y = 9.5;
const ENTRANCE_END_Y = 7.0;

export const GameCanvas: React.FC<GameCanvasProps> = ({ onInteract }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Zustand Store
  const {
    playerPos,
    playerDir,
    isMoving,
    gameMode,
    currentClient,
    isRadioPlaying,
    toggleRadio,
    setPlayerPos,
    setPlayerDir,
    setIsMoving,
    setNearbyObject,
    finishEntrance,
    startWalkToClient,
    tickWalkToClient
  } = useGameStore();

  // References for smooth animation loop
  const keysPressed = useRef<{ [key: string]: boolean }>({});
  const animFrameRef = useRef<number>(0);
  const walkCycleRef = useRef<number>(0);
  const lastStepTimeRef = useRef<number>(0);
  const entranceStartTimeRef = useRef<number | null>(null);

  // Psychologist palette (Warm Russet Cardigan, Amber Accent)
  const playerPalette = {
    skin: '#F5CBA7',
    hair: '#3D2B1F',
    shirt: '#854836', // Warm Russet Cardigan
    pants: '#241B17', // Dark Obsidian Pants
    shoes: '#120E0C',
    accent: '#FFB22C'
  };

  // Keyboard Event Listeners
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameMode !== 'EXPLORATION') return;

      const key = e.key.toLowerCase();
      keysPressed.current[key] = true;

      // Interaction key 'e' or ' '
      if (key === 'e' || key === ' ') {
        e.preventDefault();
        const nearby = MapGrid.getNearbyObject(playerPos);
        if (nearby) {
          if (nearby.type === 'client') {
            const { evaluationResult } = useGameStore.getState();
            if (evaluationResult) {
              useGameStore.getState().setGameMode('ENDING');
            } else {
              startWalkToClient();
            }
          } else if (nearby.type === 'bookshelf') {
            useGameStore.getState().setGameMode('REFERENCE');
          } else if (nearby.type === 'tea_station') {
            useGameStore.getState().setActiveRelaxationModal('tea');
          } else if (nearby.type === 'plant') {
            useGameStore.getState().setActiveRelaxationModal('plant');
          } else if (nearby.type === 'radio' || nearby.type === 'desk') {
            useGameStore.getState().toggleRadio();
          }
          if (onInteract) onInteract();
        }
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      keysPressed.current[key] = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [gameMode, playerPos, startWalkToClient, onInteract]);

  // Movement & Game Loop
  const updateMovement = useCallback(() => {
    if (gameMode !== 'EXPLORATION') {
      if (gameMode !== 'ENTERING' && gameMode !== 'WALKING_TO_CLIENT') {
        setIsMoving(false);
      }
      return;
    }

    let dx = 0;
    let dy = 0;

    const keys = keysPressed.current;
    if (keys['w'] || keys['arrowup']) dy -= 1;
    if (keys['s'] || keys['arrowdown']) dy += 1;
    if (keys['a'] || keys['arrowleft']) dx -= 1;
    if (keys['d'] || keys['arrowright']) dx += 1;

    if (dx !== 0 && dy !== 0) {
      dx *= 0.7071;
      dy *= 0.7071;
    }

    const moveSpeed = 0.065;

    if (dx !== 0 || dy !== 0) {
      let newDir: Direction = playerDir;
      if (Math.abs(dy) > Math.abs(dx)) {
        newDir = dy < 0 ? 'up' : 'down';
      } else {
        newDir = dx < 0 ? 'left' : 'right';
      }

      const nextPos = MapGrid.resolveMovement(
        playerPos,
        dx * moveSpeed,
        dy * moveSpeed,
        0.26
      );

      setPlayerPos(nextPos);
      setPlayerDir(newDir);
      setIsMoving(true);

      const now = performance.now();
      if (now - lastStepTimeRef.current > 150) {
        walkCycleRef.current = (walkCycleRef.current + 1) % 4;
        lastStepTimeRef.current = now;
      }
    } else {
      setIsMoving(false);
      walkCycleRef.current = 1;
    }

    const nearby = MapGrid.getNearbyObject(playerPos);
    setNearbyObject(nearby);
  }, [gameMode, playerPos, playerDir, setPlayerPos, setPlayerDir, setIsMoving, setNearbyObject]);

  // Main Render Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let isRunning = true;

    const render = (time: number) => {
      if (!isRunning) return;

      // --- ENTRANCE ANIMATION LOGIC ---
      let effectivePlayerPos = playerPos;
      let effectivePlayerDir: Direction = playerDir;
      let effectiveIsMoving = isMoving;
      let entranceAlpha = 1;

      if (gameMode === 'ENTERING') {
        if (entranceStartTimeRef.current === null) {
          entranceStartTimeRef.current = time;
        }
        const elapsed = time - entranceStartTimeRef.current;
        const progress = Math.min(1, elapsed / ENTRANCE_DURATION_MS);

        // Ease-out cubic: fast start, slow settle
        const eased = 1 - Math.pow(1 - progress, 3);

        // Interpolate Y from spawn (below door) to final position
        const currentY = ENTRANCE_START_Y + (ENTRANCE_END_Y - ENTRANCE_START_Y) * eased;
        effectivePlayerPos = { x: 5, y: currentY };
        effectivePlayerDir = 'up';
        effectiveIsMoving = progress < 0.95;
        entranceAlpha = Math.min(1, progress * 3); // Fade in from transparent

        // Advance walk cycle during entrance
        const now = performance.now();
        if (effectiveIsMoving && now - lastStepTimeRef.current > 160) {
          walkCycleRef.current = (walkCycleRef.current + 1) % 4;
          lastStepTimeRef.current = now;
        }

        if (progress >= 1) {
          entranceStartTimeRef.current = null;
          finishEntrance();
        }
      } else if (gameMode === 'WALKING_TO_CLIENT') {
        // Auto-walk tick per frame
        tickWalkToClient();

        const now = performance.now();
        if (now - lastStepTimeRef.current > 155) {
          walkCycleRef.current = (walkCycleRef.current + 1) % 4;
          lastStepTimeRef.current = now;
        }
        effectiveIsMoving = true;
        effectivePlayerDir = playerDir;
        effectivePlayerPos = playerPos;
      } else {
        updateMovement();
        effectivePlayerPos = playerPos;
        effectivePlayerDir = playerDir;
        effectiveIsMoving = isMoving;
      }

      const width = canvas.parentElement?.clientWidth || window.innerWidth;
      const height = canvas.parentElement?.clientHeight || window.innerHeight;

      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }

      ctx.imageSmoothingEnabled = false;

      // Clear with dark charcoal obsidian background (matching theme palette)
      ctx.fillStyle = '#120E0C';
      ctx.fillRect(0, 0, width, height);

      // Render map grid
      const { offsetX, offsetY, tileSize } = MapGrid.renderMap(ctx, width, height, time, isRadioPlaying);

      // --- ENTRANCE DOOR GLOW EFFECT (while entering) ---
      if (gameMode === 'ENTERING') {
        const doorX = offsetX + 5 * tileSize;
        const doorY = offsetY + MapGrid.ROWS * tileSize; // Bottom edge

        const doorGlow = ctx.createRadialGradient(doorX, doorY - 4, 2, doorX, doorY - 4, tileSize * 1.5);
        doorGlow.addColorStop(0, 'rgba(82, 160, 116, 0.35)');
        doorGlow.addColorStop(0.5, 'rgba(66, 88, 72, 0.15)');
        doorGlow.addColorStop(1, 'rgba(30, 41, 35, 0)');
        ctx.fillStyle = doorGlow;
        ctx.beginPath();
        ctx.arc(doorX, doorY - 4, tileSize * 1.5, 0, Math.PI * 2);
        ctx.fill();
      }

      // Render Client NPC with Subtle Gloomy / Somber Emotional Aura
      if (currentClient) {
        const clientScreenX = offsetX + MapGrid.CLIENT_TILE_POS.x * tileSize;
        const clientScreenY = offsetY + MapGrid.CLIENT_TILE_POS.y * tileSize;

        // --- SUBTLE GLOOMY / SOMBER AURA AROUND CLIENT ---
        const tensionRatio = Math.min(1, Math.max(0, currentClient.currentTension / 100));
        const pulse = Math.sin(time * 0.0025) * 0.03;
        const gloomyOpacity = Math.max(0.10, Math.min(0.30, (tensionRatio * 0.22) + 0.06 + pulse));

        if (gloomyOpacity > 0.05) {
          const auraRadius = tileSize * 2.2;
          const gloomyGradient = ctx.createRadialGradient(
            clientScreenX, clientScreenY + 8, tileSize * 0.2,
            clientScreenX, clientScreenY + 8, auraRadius
          );
          gloomyGradient.addColorStop(0, `rgba(12, 16, 24, ${gloomyOpacity * 1.1})`);
          gloomyGradient.addColorStop(0.4, `rgba(20, 26, 36, ${gloomyOpacity * 0.75})`);
          gloomyGradient.addColorStop(0.75, `rgba(25, 32, 42, ${gloomyOpacity * 0.35})`);
          gloomyGradient.addColorStop(1, 'rgba(25, 32, 42, 0)');

          ctx.fillStyle = gloomyGradient;
          ctx.beginPath();
          ctx.arc(clientScreenX, clientScreenY + 8, auraRadius, 0, Math.PI * 2);
          ctx.fill();

          ctx.save();
          ctx.beginPath();
          ctx.ellipse(clientScreenX, clientScreenY + 16, tileSize * 0.9, tileSize * 0.45, 0, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(10, 14, 20, ${gloomyOpacity * 0.6})`;
          ctx.fill();
          ctx.restore();

          for (let i = 0; i < 6; i++) {
            const angle = (time * 0.0008) + (i * (Math.PI / 3));
            const dist = (tileSize * 0.55) + Math.sin(time * 0.0015 + i) * (tileSize * 0.25);
            const moteX = clientScreenX + Math.cos(angle) * dist;
            const moteY = clientScreenY + 4 + Math.sin(angle) * (dist * 0.65);
            const moteAlpha = (Math.sin(time * 0.002 + i * 1.5) * 0.5 + 0.5) * gloomyOpacity * 0.8;
            ctx.fillStyle = `rgba(15, 20, 28, ${moteAlpha})`;
            ctx.beginPath();
            ctx.arc(moteX, moteY, 2.5, 0, Math.PI * 2);
            ctx.fill();
          }
        }

        if (currentClient.currentRapport > 50) {
          const rapportRatio = (currentClient.currentRapport - 50) / 50;
          const warmAura = ctx.createRadialGradient(
            clientScreenX, clientScreenY + 6, tileSize * 0.2,
            clientScreenX, clientScreenY + 6, tileSize * 1.8
          );
          warmAura.addColorStop(0, `rgba(82, 160, 116, ${0.16 * rapportRatio})`);
          warmAura.addColorStop(0.7, `rgba(82, 160, 116, ${0.08 * rapportRatio})`);
          warmAura.addColorStop(1, 'rgba(82, 160, 116, 0)');
          ctx.fillStyle = warmAura;
          ctx.beginPath();
          ctx.arc(clientScreenX, clientScreenY + 6, tileSize * 1.8, 0, Math.PI * 2);
          ctx.fill();
        }

        const charScaleRatio = tileSize / MapGrid.BASE_TILE_SIZE;
        const clientScale = Math.max(1.4, 2.6 * charScaleRatio);
        const playerScale = Math.max(1.5, 2.8 * charScaleRatio);

        const clientPalette = {
          skin: '#f5cba7',
          hair: currentClient.hairColor || '#2b1e1a',
          shirt: currentClient.shirtColor || '#738b71',
          pants: currentClient.pantsColor || '#2a3b32',
          shoes: '#1e2923',
          accent: '#d99b6a'
        };

        SpriteRenderer.drawCharacter(
          ctx, clientScreenX, clientScreenY + (12 * charScaleRatio),
          'down', 0, false, clientPalette, clientScale, false,
          {
            gender: currentClient.gender,
            hairstyle: currentClient.hairstyle,
            accessoryType: currentClient.accessoryType,
            accessoryColor: currentClient.accessoryColor
          }
        );

        let bubbleType: 'talk' | 'tension' | 'insight' | 'heart' = 'talk';
        if (currentClient.currentTension > 70) bubbleType = 'tension';
        else if (currentClient.currentRapport > 65) bubbleType = 'heart';

        SpriteRenderer.drawEmotionBubble(ctx, clientScreenX, clientScreenY - (6 * charScaleRatio), bubbleType, time);
      }

      // Render Player Character (Psychologist POV)
      const playerScreenX = offsetX + effectivePlayerPos.x * tileSize;
      const playerScreenY = offsetY + effectivePlayerPos.y * tileSize;

      const charScaleRatio = tileSize / MapGrid.BASE_TILE_SIZE;
      const playerScale = Math.max(1.5, 2.8 * charScaleRatio);

      // Fade in on entrance
      ctx.save();
      if (gameMode === 'ENTERING') {
        ctx.globalAlpha = entranceAlpha;
      }

      SpriteRenderer.drawCharacter(
        ctx,
        playerScreenX,
        playerScreenY,
        effectivePlayerDir,
        walkCycleRef.current,
        effectiveIsMoving,
        playerPalette,
        playerScale,
        true
      );

      // POV Role indicator label over Psychologist (only when not entering and not in dialogue modes)
      if (gameMode === 'EXPLORATION' || gameMode === 'WALKING_TO_CLIENT') {
        const isCompact = width < 640 || tileSize < 44;
        const labelText = isCompact ? '🩺 Anda' : '🩺 Anda (POV Psikolog)';
        const fontSize = Math.max(8, Math.min(10, Math.round(9.5 * charScaleRatio * 10) / 10));

        ctx.font = `bold ${fontSize}px "Plus Jakarta Sans", sans-serif`;
        const textMetrics = ctx.measureText(labelText);
        const paddingX = Math.max(6, Math.round(8 * charScaleRatio));
        const labelWidth = Math.round(textMetrics.width + paddingX * 2);
        const labelHeight = Math.max(14, Math.round(17 * charScaleRatio));
        const labelX = playerScreenX - labelWidth / 2;
        const labelY = playerScreenY - Math.max(52, Math.round(68 * charScaleRatio));

        ctx.fillStyle = 'rgba(28, 22, 19, 0.92)';
        ctx.strokeStyle = '#FFB22C';
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.roundRect(labelX, labelY, labelWidth, labelHeight, 4);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = '#FFD382';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(labelText, playerScreenX, labelY + labelHeight / 2);
        ctx.textBaseline = 'alphabetic';
      }

      // "Masuk..." hint text during entrance
      if (gameMode === 'ENTERING') {
        const hintAlpha = Math.sin(time * 0.004) * 0.4 + 0.6;
        ctx.fillStyle = `rgba(152, 226, 179, ${hintAlpha * entranceAlpha})`;
        ctx.font = 'bold 11px "Plus Jakarta Sans", sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('Psikolog memasuki klinik...', playerScreenX, playerScreenY - 68);
      }

      // "Menghampiri klien..." hint during walk-to-client
      if (gameMode === 'WALKING_TO_CLIENT') {
        const hintAlpha = Math.sin(time * 0.005) * 0.35 + 0.65;
        ctx.fillStyle = `rgba(255, 178, 44, ${hintAlpha})`;
        ctx.font = 'bold 10px "Plus Jakarta Sans", sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('Menghampiri klien...', playerScreenX, playerScreenY - 68);
      }

      ctx.restore();

      // Soft Cozy Room Vignette & Lighting
      const mapCenterX = offsetX + (MapGrid.COLS * tileSize) / 2;
      const mapCenterY = offsetY + (MapGrid.ROWS * tileSize) / 2;
      const radius = (MapGrid.COLS * tileSize) * 0.75;

      const gradient = ctx.createRadialGradient(
        mapCenterX, mapCenterY, radius * 0.3,
        mapCenterX, mapCenterY, radius
      );
      gradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
      gradient.addColorStop(0.75, 'rgba(24, 18, 15, 0.25)');
      gradient.addColorStop(1, 'rgba(10, 8, 7, 0.75)');

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      isRunning = false;
      cancelAnimationFrame(animFrameRef.current);
    };
  }, [updateMovement, playerPos, playerDir, isMoving, currentClient, gameMode, finishEntrance, tickWalkToClient]);

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden bg-[#120E0C]">
      <canvas
        ref={canvasRef}
        className="w-full h-full block cursor-crosshair select-none"
      />
    </div>
  );
};
