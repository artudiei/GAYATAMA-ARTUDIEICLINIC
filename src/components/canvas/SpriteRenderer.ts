import { Direction, Gender, Hairstyle, AccessoryType } from '../../types/game';

export interface SpritePalette {
  skin: string;
  hair: string;
  shirt: string;
  pants: string;
  shoes: string;
  accent: string;
}

export interface CharacterVisualConfig {
  gender?: Gender;
  hairstyle?: Hairstyle;
  accessoryType?: AccessoryType;
  accessoryColor?: string;
}

export class SpriteRenderer {
  private static spriteCache: Map<string, HTMLCanvasElement> = new Map();

  /**
   * Draw a procedural character sprite (16x24 pixel grid scaled up)
   */
  public static drawCharacter(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    direction: Direction,
    frame: number, // 0..3 for walking cycle
    isMoving: boolean,
    palette: SpritePalette,
    scale: number = 3,
    isPlayer: boolean = false,
    visualConfig?: CharacterVisualConfig
  ) {
    const gender = visualConfig?.gender || (isPlayer ? 'male' : 'female');
    const hairstyle = visualConfig?.hairstyle || (isPlayer ? 'side_part' : (gender === 'female' ? 'long_flow' : 'short_neat'));
    const accessoryType = visualConfig?.accessoryType || (isPlayer ? 'glasses_round' : 'none');
    const accessoryColor = visualConfig?.accessoryColor || (isPlayer ? '#FFB22C' : '#FFB22C');

    const cacheKey = `${isPlayer ? 'p' : 'npc'}_${direction}_${isMoving ? frame : 0}_${palette.shirt}_${palette.hair}_${gender}_${hairstyle}_${accessoryType}_${accessoryColor}`;
    
    let spriteCanvas = this.spriteCache.get(cacheKey);
    if (!spriteCanvas) {
      spriteCanvas = this.generateCharacterCanvas(
        direction,
        isMoving ? frame : 0,
        palette,
        isPlayer,
        gender,
        hairstyle,
        accessoryType,
        accessoryColor
      );
      this.spriteCache.set(cacheKey, spriteCanvas);
    }

    const drawW = spriteCanvas.width * scale;
    const drawH = spriteCanvas.height * scale;

    // Center the sprite at x, y (with shadow beneath)
    const renderX = Math.round(x - drawW / 2);
    const renderY = Math.round(y - drawH + (scale * 4));

    // Draw soft drop shadow
    ctx.fillStyle = 'rgba(0, 0, 0, 0.28)';
    ctx.beginPath();
    ctx.ellipse(x, y + 2, drawW * 0.35, drawH * 0.12, 0, 0, Math.PI * 2);
    ctx.fill();

    // Draw procedural sprite
    ctx.drawImage(spriteCanvas, renderX, renderY, drawW, drawH);
  }

  private static generateCharacterCanvas(
    direction: Direction,
    frame: number,
    palette: SpritePalette,
    isPlayer: boolean,
    gender: Gender,
    hairstyle: Hairstyle,
    accessoryType: AccessoryType,
    accessoryColor: string
  ): HTMLCanvasElement {
    const width = 16;
    const height = 24;
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return canvas;

    ctx.imageSmoothingEnabled = false;

    // Determine leg and arm offsets based on walk frame
    let legOffset = 0;
    let armOffset = 0;
    if (frame === 0) {
      legOffset = -1;
      armOffset = 1;
    } else if (frame === 2) {
      legOffset = 1;
      armOffset = -1;
    }

    const drawPixel = (px: number, py: number, color: string) => {
      ctx.fillStyle = color;
      ctx.fillRect(px, py, 1, 1);
    };

    const drawRect = (px: number, py: number, w: number, h: number, color: string) => {
      ctx.fillStyle = color;
      ctx.fillRect(px, py, w, h);
    };

    const hairHighlight = '#FFB22C55';

    // --- 1. HEAD & HAIR BASE ---
    // Skin Head Base
    drawRect(5, 3, 6, 6, palette.skin);

    // --- 1A. DIRECTION: DOWN (FRONT VIEW) ---
    if (direction === 'down') {
      // Blush for female
      if (gender === 'female') {
        drawPixel(5, 7, '#FFA8A8');
        drawPixel(10, 7, '#FFA8A8');
      }

      // Eyes
      drawPixel(6, 6, '#120E0C');
      drawPixel(9, 6, '#120E0C');

      // Mouth
      drawPixel(7, 8, '#B87768');
      drawPixel(8, 8, '#B87768');

      // Hairstyle rendering
      if (hairstyle === 'hijab') {
        drawRect(3, 1, 10, 8, palette.hair); // Outer hood
        drawRect(5, 3, 6, 5, palette.skin);  // Face cutout
        drawRect(4, 9, 8, 3, palette.hair);  // Drape
        drawPixel(8, 9, accessoryColor);     // Brooch
        drawRect(4, 2, 8, 1, hairHighlight);
      } else if (hairstyle === 'long_flow') {
        drawRect(4, 2, 8, 3, palette.hair);  // Top
        drawRect(3, 3, 2, 10, palette.hair); // Left long strand
        drawRect(11, 3, 2, 10, palette.hair);// Right long strand
        drawRect(5, 3, 6, 2, palette.hair);  // Bangs
        drawRect(5, 2, 4, 1, hairHighlight);
      } else if (hairstyle === 'ponytail') {
        drawRect(4, 2, 8, 3, palette.hair);
        drawRect(4, 4, 1, 3, palette.hair);
        drawRect(11, 4, 1, 3, palette.hair);
        drawRect(12, 4, 2, 6, palette.hair); // Ponytail bunch
        drawRect(11, 3, 2, 2, accessoryColor); // Ribbon scrunchie
        drawRect(5, 3, 5, 2, palette.hair);
      } else if (hairstyle === 'bob') {
        drawRect(4, 2, 8, 3, palette.hair);
        drawRect(3, 4, 2, 6, palette.hair);
        drawRect(11, 4, 2, 6, palette.hair);
        drawPixel(4, 10, palette.hair);
        drawPixel(11, 10, palette.hair);
        drawRect(5, 3, 6, 2, palette.hair);
      } else if (hairstyle === 'twin_tail') {
        drawRect(4, 2, 8, 3, palette.hair);
        drawRect(2, 4, 2, 7, palette.hair);  // Left tail
        drawRect(12, 4, 2, 7, palette.hair); // Right tail
        drawPixel(3, 4, accessoryColor);
        drawPixel(12, 4, accessoryColor);
        drawRect(5, 3, 6, 2, palette.hair);
      } else if (hairstyle === 'wavy_long') {
        drawRect(3, 2, 10, 3, palette.hair);
        drawRect(3, 4, 2, 9, palette.hair);
        drawRect(11, 4, 2, 9, palette.hair);
        drawPixel(2, 7, palette.hair);
        drawPixel(13, 7, palette.hair);
        drawRect(5, 3, 6, 2, palette.hair);
      } else if (hairstyle === 'undercut') {
        drawRect(4, 1, 8, 3, palette.hair);
        drawRect(4, 4, 1, 2, '#18120F'); // Fade
        drawRect(11, 4, 1, 2, '#18120F');
        drawRect(6, 3, 4, 1, palette.hair);
      } else if (hairstyle === 'curly_mop') {
        drawRect(3, 1, 10, 4, palette.hair);
        drawPixel(4, 0, palette.hair);
        drawPixel(7, 0, palette.hair);
        drawPixel(11, 0, palette.hair);
        drawRect(3, 4, 2, 3, palette.hair);
        drawRect(11, 4, 2, 3, palette.hair);
      } else if (hairstyle === 'spiky') {
        drawPixel(5, 0, palette.hair);
        drawPixel(8, 0, palette.hair);
        drawPixel(10, 1, palette.hair);
        drawRect(4, 2, 8, 3, palette.hair);
        drawRect(3, 3, 2, 3, palette.hair);
        drawRect(11, 3, 2, 3, palette.hair);
      } else if (hairstyle === 'side_part') {
        drawRect(4, 2, 8, 3, palette.hair);
        drawRect(7, 3, 4, 2, palette.hair);
        drawRect(4, 4, 1, 2, palette.hair);
      } else {
        // short_neat
        drawRect(4, 2, 8, 3, palette.hair);
        drawRect(4, 4, 1, 3, palette.hair);
        drawRect(11, 4, 1, 3, palette.hair);
        drawRect(5, 3, 4, 1, palette.hair);
      }

      // Accessories (Front)
      if (isPlayer || accessoryType === 'glasses_round') {
        const frameColor = isPlayer ? '#FFB22C' : accessoryColor;
        drawRect(5, 5, 2, 2, frameColor);
        drawRect(9, 5, 2, 2, frameColor);
        drawPixel(7, 5, frameColor); // Bridge
        drawPixel(6, 6, '#120E0C');
        drawPixel(9, 6, '#120E0C');
        drawPixel(5, 5, '#FFFFFF'); // Glint
        drawPixel(10, 5, '#FFFFFF');
      } else if (accessoryType === 'glasses_square') {
        drawRect(5, 5, 3, 2, accessoryColor);
        drawRect(8, 5, 3, 2, accessoryColor);
        drawPixel(7, 5, accessoryColor);
        drawPixel(6, 6, '#120E0C');
        drawPixel(9, 6, '#120E0C');
        drawPixel(5, 5, '#FFFFFF');
        drawPixel(10, 5, '#FFFFFF');
      } else if (accessoryType === 'headband') {
        drawRect(4, 2, 8, 1, accessoryColor);
        drawPixel(4, 3, accessoryColor);
      } else if (accessoryType === 'ribbon') {
        drawRect(10, 2, 2, 2, accessoryColor);
        drawPixel(11, 3, '#FFFFFF');
      } else if (accessoryType === 'earrings') {
        drawPixel(4, 7, accessoryColor);
        drawPixel(11, 7, accessoryColor);
      } else if (accessoryType === 'beanie') {
        drawRect(4, 0, 8, 3, accessoryColor);
        drawRect(3, 2, 10, 1, '#FFB22C');
        drawRect(7, 0, 2, 1, '#F7F7F7');
      }
    } 
    // --- 1B. DIRECTION: UP (BACK VIEW) ---
    else if (direction === 'up') {
      if (hairstyle === 'hijab') {
        drawRect(3, 1, 10, 11, palette.hair);
      } else if (hairstyle === 'long_flow' || hairstyle === 'wavy_long') {
        drawRect(3, 2, 10, 10, palette.hair);
        drawRect(5, 3, 6, 1, hairHighlight);
      } else if (hairstyle === 'ponytail') {
        drawRect(4, 2, 8, 6, palette.hair);
        drawRect(7, 4, 2, 8, palette.hair); // Long ponytail down center
        drawRect(7, 3, 2, 2, accessoryColor); // Tie
      } else if (hairstyle === 'twin_tail') {
        drawRect(4, 2, 8, 6, palette.hair);
        drawRect(2, 4, 2, 7, palette.hair);
        drawRect(12, 4, 2, 7, palette.hair);
      } else if (hairstyle === 'bob') {
        drawRect(4, 2, 8, 8, palette.hair);
      } else {
        // short / curly / spiky
        drawRect(4, 2, 8, 6, palette.hair);
        drawRect(5, 7, 6, 2, palette.hair);
      }

      if (accessoryType === 'beanie') {
        drawRect(3, 0, 10, 4, accessoryColor);
        drawRect(3, 3, 10, 1, '#FFB22C');
      }
    }
    // --- 1C. DIRECTION: LEFT (SIDE VIEW) ---
    else if (direction === 'left') {
      if (hairstyle === 'hijab') {
        drawRect(3, 1, 9, 10, palette.hair);
        drawPixel(5, 6, '#120E0C'); // Eye
        drawPixel(4, 7, palette.skin);
      } else {
        drawRect(4, 2, 7, 3, palette.hair);
        drawRect(7, 4, 4, 4, palette.hair);
        drawPixel(5, 6, '#120E0C');
        drawPixel(4, 7, palette.skin); // Nose bump

        if (hairstyle === 'long_flow' || hairstyle === 'wavy_long') {
          drawRect(7, 4, 4, 8, palette.hair);
        } else if (hairstyle === 'ponytail') {
          drawRect(10, 3, 3, 6, palette.hair);
          drawPixel(10, 3, accessoryColor);
        } else if (hairstyle === 'twin_tail') {
          drawRect(8, 4, 2, 7, palette.hair);
          drawPixel(8, 4, accessoryColor);
        }
      }

      if (isPlayer || accessoryType === 'glasses_round' || accessoryType === 'glasses_square') {
        const frameColor = isPlayer ? '#FFB22C' : accessoryColor;
        drawPixel(4, 5, frameColor);
        drawPixel(5, 5, frameColor);
        drawPixel(6, 5, frameColor);
      } else if (accessoryType === 'earrings') {
        drawPixel(7, 7, accessoryColor);
      }
    }
    // --- 1D. DIRECTION: RIGHT (SIDE VIEW) ---
    else if (direction === 'right') {
      if (hairstyle === 'hijab') {
        drawRect(4, 1, 9, 10, palette.hair);
        drawPixel(10, 6, '#120E0C');
        drawPixel(11, 7, palette.skin);
      } else {
        drawRect(5, 2, 7, 3, palette.hair);
        drawRect(5, 4, 4, 4, palette.hair);
        drawPixel(10, 6, '#120E0C');
        drawPixel(11, 7, palette.skin);

        if (hairstyle === 'long_flow' || hairstyle === 'wavy_long') {
          drawRect(5, 4, 4, 8, palette.hair);
        } else if (hairstyle === 'ponytail') {
          drawRect(3, 3, 3, 6, palette.hair);
          drawPixel(5, 3, accessoryColor);
        } else if (hairstyle === 'twin_tail') {
          drawRect(6, 4, 2, 7, palette.hair);
          drawPixel(6, 4, accessoryColor);
        }
      }

      if (isPlayer || accessoryType === 'glasses_round' || accessoryType === 'glasses_square') {
        const frameColor = isPlayer ? '#FFB22C' : accessoryColor;
        drawPixel(10, 5, frameColor);
        drawPixel(11, 5, frameColor);
        drawPixel(9, 5, frameColor);
      } else if (accessoryType === 'earrings') {
        drawPixel(8, 7, accessoryColor);
      }
    }

    // --- 2. TORSO & CLOTHING ---
    // Neck
    drawRect(7, 9, 2, 1, palette.skin);

    // Torso Base (Shirt)
    drawRect(5, 10, 6, 7, palette.shirt);

    if (isPlayer) {
      // Psychologist Cardigan Details
      drawRect(7, 10, 2, 7, '#F7F7F7'); // Inner shirt
      drawPixel(7, 12, '#FFB22C');     // ID Badge
      drawRect(5, 10, 2, 7, palette.shirt);
      drawRect(9, 10, 2, 7, palette.shirt);
      drawPixel(5, 10, '#A55A44');
      drawPixel(10, 10, '#A55A44');
    } else {
      // Client accessories on chest
      if (accessoryType === 'headphones' && direction === 'down') {
        drawRect(3, 8, 2, 3, accessoryColor);
        drawRect(11, 8, 2, 3, accessoryColor);
        drawRect(4, 9, 8, 1, '#1E293B');
      } else if (accessoryType === 'lanyard' && direction === 'down') {
        drawPixel(6, 10, accessoryColor);
        drawPixel(9, 10, accessoryColor);
        drawPixel(7, 11, accessoryColor);
        drawPixel(8, 11, accessoryColor);
        drawRect(7, 12, 2, 3, '#FFFFFF');
        drawPixel(7, 12, '#3B82F6');
      } else if (accessoryType === 'scarf' && direction === 'down') {
        drawRect(4, 8, 8, 2, accessoryColor);
        drawRect(8, 10, 2, 4, accessoryColor);
      }

      drawRect(5, 15, 6, 1, '#120E0C'); // Belt
    }

    // Arms
    if (direction === 'down' || direction === 'up') {
      drawRect(3, 10 + armOffset, 2, 5, palette.shirt);
      drawRect(3, 15 + armOffset, 2, 2, palette.skin);

      drawRect(11, 10 - armOffset, 2, 5, palette.shirt);
      drawRect(11, 15 - armOffset, 2, 2, palette.skin);

      if (isPlayer && direction === 'down') {
        // Holding clipboard / therapy tablet in right hand
        drawRect(11, 14 - armOffset, 3, 4, '#854836');
        drawRect(12, 15 - armOffset, 1, 2, '#F7F7F7');
      }
    } else if (direction === 'left') {
      drawRect(6 + armOffset, 10, 3, 5, palette.shirt);
      drawRect(6 + armOffset, 15, 2, 2, palette.skin);
    } else if (direction === 'right') {
      drawRect(7 - armOffset, 10, 3, 5, palette.shirt);
      drawRect(8 - armOffset, 15, 2, 2, palette.skin);
    }

    // --- 3. LEGS & SHOES ---
    if (direction === 'down' || direction === 'up') {
      const leftY = 17 + (legOffset > 0 ? -1 : 0);
      drawRect(5, leftY, 2, 4, palette.pants);
      drawRect(5, leftY + 4, 2, 2, palette.shoes);

      const rightY = 17 + (legOffset < 0 ? -1 : 0);
      drawRect(9, rightY, 2, 4, palette.pants);
      drawRect(9, rightY + 4, 2, 2, palette.shoes);
    } else {
      const frontLegY = 17 + (legOffset !== 0 ? -1 : 0);
      drawRect(6, frontLegY, 4, 4, palette.pants);
      drawRect(6, frontLegY + 4, 4, 2, palette.shoes);
    }

    // --- 4. RETRO PIXEL OUTLINE ---
    const outlineColor = '#120E0C';
    drawRect(4, 1, 8, 1, outlineColor);
    drawRect(3, 2, 1, 6, outlineColor);
    drawRect(12, 2, 1, 6, outlineColor);

    return canvas;
  }

  /**
   * Draw emotion / status speech bubble over character head
   */
  public static drawEmotionBubble(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    type: 'tension' | 'insight' | 'heart' | 'talk',
    time: number
  ) {
    const floatY = Math.sin(time * 0.005) * 3;
    const bubbleX = x;
    const bubbleY = y - 65 + floatY;

    // Bubble background
    ctx.fillStyle = '#f7f4ea';
    ctx.strokeStyle = '#27352b';
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.roundRect(bubbleX - 14, bubbleY - 14, 28, 24, 6);
    ctx.fill();
    ctx.stroke();

    // Little tail
    ctx.beginPath();
    ctx.moveTo(bubbleX - 3, bubbleY + 10);
    ctx.lineTo(bubbleX, bubbleY + 15);
    ctx.lineTo(bubbleX + 3, bubbleY + 10);
    ctx.fill();
    ctx.stroke();

    // Icon inside bubble
    if (type === 'tension') {
      ctx.fillStyle = '#EF4444';
      ctx.beginPath();
      ctx.moveTo(bubbleX, bubbleY - 9);
      ctx.lineTo(bubbleX - 6, bubbleY);
      ctx.lineTo(bubbleX - 1, bubbleY);
      ctx.lineTo(bubbleX - 3, bubbleY + 7);
      ctx.lineTo(bubbleX + 6, bubbleY - 2);
      ctx.lineTo(bubbleX + 1, bubbleY - 2);
      ctx.closePath();
      ctx.fill();
    } else if (type === 'insight') {
      ctx.fillStyle = '#FFB22C';
      ctx.beginPath();
      ctx.arc(bubbleX, bubbleY - 3, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillRect(bubbleX - 2, bubbleY + 2, 4, 3);
    } else if (type === 'heart') {
      ctx.fillStyle = '#FFB22C';
      ctx.beginPath();
      ctx.arc(bubbleX - 3, bubbleY - 3, 3.5, 0, Math.PI * 2);
      ctx.arc(bubbleX + 3, bubbleY - 3, 3.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(bubbleX - 6.5, bubbleY - 2);
      ctx.lineTo(bubbleX, bubbleY + 6);
      ctx.lineTo(bubbleX + 6.5, bubbleY - 2);
      ctx.closePath();
      ctx.fill();
    } else {
      ctx.fillStyle = '#241B17';
      ctx.fillRect(bubbleX - 7, bubbleY - 2, 3, 3);
      ctx.fillRect(bubbleX - 1, bubbleY - 2, 3, 3);
      ctx.fillRect(bubbleX + 5, bubbleY - 2, 3, 3);
    }
  }
}
