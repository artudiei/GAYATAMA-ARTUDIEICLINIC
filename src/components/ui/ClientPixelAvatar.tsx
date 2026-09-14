import React, { useEffect, useRef } from 'react';
import { ClientProfile, Gender, Hairstyle, AccessoryType } from '../../types/game';

interface ClientPixelAvatarProps {
  client?: ClientProfile | null;
  gender?: Gender;
  name?: string;
  hairstyle?: Hairstyle;
  hairColor?: string;
  shirtColor?: string;
  accessoryType?: AccessoryType;
  accessoryColor?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const ClientPixelAvatar: React.FC<ClientPixelAvatarProps> = ({
  client,
  gender = client?.gender || 'female',
  hairstyle = client?.hairstyle || (gender === 'female' ? 'long_flow' : 'short_neat'),
  hairColor = client?.hairColor || '#2B1E1A',
  shirtColor = client?.shirtColor || '#854836',
  accessoryType = client?.accessoryType || 'none',
  accessoryColor = client?.accessoryColor || '#FFB22C',
  size = 'md',
  className = ''
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Pixel dimensions (20x20 portrait grid)
  const pixelGrid = 20;

  // Scale map
  const sizePixels = {
    sm: 36,
    md: 52,
    lg: 72,
    xl: 96
  }[size];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.imageSmoothingEnabled = false;
    ctx.clearRect(0, 0, pixelGrid, pixelGrid);

    const drawPixel = (x: number, y: number, color: string) => {
      ctx.fillStyle = color;
      ctx.fillRect(x, y, 1, 1);
    };

    const drawRect = (x: number, y: number, w: number, h: number, color: string) => {
      ctx.fillStyle = color;
      ctx.fillRect(x, y, w, h);
    };

    // --- 1. PORTRAIT BACKGROUND ---
    drawRect(0, 0, 20, 20, '#241B17');
    drawRect(1, 1, 18, 18, '#2E221D');

    // --- 2. CLOTHING & SHOULDERS (Bottom of portrait) ---
    // Shirt base
    drawRect(4, 14, 12, 6, shirtColor);
    drawRect(6, 13, 8, 2, shirtColor);
    // Collar
    drawRect(8, 13, 4, 3, '#F7F7F7');
    drawRect(9, 14, 2, 2, shirtColor);

    // --- 3. NECK & HEAD BASE ---
    drawRect(8, 11, 4, 3, '#F5CBA7'); // Neck
    drawRect(5, 4, 10, 8, '#F5CBA7'); // Face
    drawRect(6, 3, 8, 10, '#F5CBA7');

    // Blushing cheeks for female
    if (gender === 'female') {
      drawRect(5, 8, 2, 1, '#FFA8A8');
      drawRect(13, 8, 2, 1, '#FFA8A8');
    }

    // Eyes
    drawRect(7, 7, 2, 2, '#120E0C');
    drawRect(11, 7, 2, 2, '#120E0C');
    drawPixel(7, 7, '#FFFFFF'); // Eye shine
    drawPixel(11, 7, '#FFFFFF');

    // Eyebrows
    drawRect(7, 5, 2, 1, hairColor);
    drawRect(11, 5, 2, 1, hairColor);

    // Friendly smile
    drawPixel(8, 10, '#B87768');
    drawPixel(9, 10, '#B87768');
    drawPixel(10, 10, '#B87768');
    drawPixel(11, 10, '#B87768');

    // --- 4. HAIRSTYLES ---
    const hairHighlight = '#FFB22C44';

    if (hairstyle === 'hijab') {
      // Hijab / Kerudung
      drawRect(3, 1, 14, 14, hairColor);
      drawRect(5, 4, 10, 8, '#F5CBA7'); // Face cut-out
      drawRect(4, 12, 12, 4, hairColor); // Drapery over shoulders
      drawRect(4, 2, 12, 1, hairHighlight); // Fold shine
      if (accessoryType === 'glasses_round' || accessoryType === 'glasses_square') {
        // Will be drawn in accessory section
      }
      // Hijab pin / brooch
      drawPixel(10, 13, accessoryColor);
    } else if (hairstyle === 'long_flow') {
      // Long flowing female hair
      drawRect(4, 1, 12, 4, hairColor);
      drawRect(3, 3, 3, 14, hairColor); // Left flowing strand
      drawRect(14, 3, 3, 14, hairColor); // Right flowing strand
      drawRect(6, 3, 8, 2, hairColor); // Bangs
      drawRect(6, 2, 8, 1, hairHighlight);
    } else if (hairstyle === 'ponytail') {
      // Ponytail with hair ribbon
      drawRect(4, 1, 12, 4, hairColor);
      drawRect(4, 4, 2, 5, hairColor);
      drawRect(14, 4, 2, 5, hairColor);
      drawRect(6, 3, 8, 2, hairColor); // Bangs
      // Ponytail tuft on right shoulder
      drawRect(15, 5, 3, 9, hairColor);
      drawRect(14, 4, 3, 2, accessoryColor); // Scrunchie
    } else if (hairstyle === 'bob') {
      // Bob cut with bangs
      drawRect(4, 1, 12, 4, hairColor);
      drawRect(3, 4, 3, 9, hairColor);
      drawRect(14, 4, 3, 9, hairColor);
      drawRect(4, 12, 2, 1, hairColor); // Curved in tips
      drawRect(14, 12, 2, 1, hairColor);
      drawRect(6, 3, 8, 3, hairColor); // Neat bangs
      drawRect(6, 2, 8, 1, hairHighlight);
    } else if (hairstyle === 'twin_tail') {
      // Twin tails
      drawRect(4, 1, 12, 4, hairColor);
      drawRect(2, 4, 3, 11, hairColor); // Left tail
      drawRect(15, 4, 3, 11, hairColor); // Right tail
      drawRect(2, 4, 2, 2, accessoryColor); // Left ribbon
      drawRect(16, 4, 2, 2, accessoryColor); // Right ribbon
      drawRect(6, 3, 8, 2, hairColor);
    } else if (hairstyle === 'wavy_long') {
      // Wavy voluminous long hair
      drawRect(3, 1, 14, 4, hairColor);
      drawRect(2, 4, 4, 13, hairColor);
      drawRect(14, 4, 4, 13, hairColor);
      drawPixel(2, 8, hairColor);
      drawPixel(17, 8, hairColor);
      drawRect(6, 3, 8, 2, hairColor);
    } else if (hairstyle === 'undercut') {
      // Male undercut
      drawRect(4, 0, 12, 4, hairColor);
      drawRect(4, 4, 2, 3, '#18120F'); // Tapered fade sides
      drawRect(14, 4, 2, 3, '#18120F');
      drawRect(7, 3, 6, 2, hairColor); // Swept fringe
      drawRect(5, 1, 8, 1, hairHighlight);
    } else if (hairstyle === 'curly_mop') {
      // Male fluffy curly mop
      drawRect(3, 0, 14, 5, hairColor);
      drawPixel(4, 0, hairColor);
      drawPixel(9, 0, hairColor);
      drawPixel(14, 0, hairColor);
      drawRect(3, 4, 3, 4, hairColor);
      drawRect(14, 4, 3, 4, hairColor);
      drawRect(6, 4, 8, 2, hairColor);
    } else if (hairstyle === 'spiky') {
      // Spiky anime / casual hair
      drawRect(4, 1, 12, 4, hairColor);
      drawPixel(6, 0, hairColor);
      drawPixel(10, 0, hairColor);
      drawPixel(13, 0, hairColor);
      drawRect(3, 4, 2, 3, hairColor);
      drawRect(15, 4, 2, 3, hairColor);
      drawRect(6, 3, 6, 2, hairColor);
    } else if (hairstyle === 'side_part') {
      // Classic side part
      drawRect(4, 1, 12, 4, hairColor);
      drawRect(8, 3, 6, 3, hairColor); // Swept right
      drawRect(4, 4, 2, 3, hairColor);
      drawRect(14, 4, 2, 3, hairColor);
    } else {
      // short_neat
      drawRect(4, 1, 12, 4, hairColor);
      drawRect(4, 4, 2, 3, hairColor);
      drawRect(14, 4, 2, 3, hairColor);
      drawRect(6, 3, 8, 2, hairColor);
    }

    // --- 5. ACCESSORIES ---
    if (accessoryType === 'glasses_round') {
      // Round glasses
      drawRect(6, 6, 4, 3, accessoryColor);
      drawRect(10, 6, 4, 3, accessoryColor);
      drawPixel(9, 7, accessoryColor); // Bridge
      drawPixel(7, 7, '#120E0C'); // Left lens eye
      drawPixel(11, 7, '#120E0C'); // Right lens eye
      drawPixel(6, 6, '#FFFFFF'); // Lens glint
      drawPixel(10, 6, '#FFFFFF');
    } else if (accessoryType === 'glasses_square') {
      // Square / stylish rim glasses
      drawRect(6, 6, 4, 3, accessoryColor);
      drawRect(10, 6, 4, 3, accessoryColor);
      drawPixel(9, 6, accessoryColor); // Top bridge
      drawPixel(7, 7, '#120E0C');
      drawPixel(11, 7, '#120E0C');
      drawPixel(6, 6, '#FFFFFF');
      drawPixel(10, 6, '#FFFFFF');
    } else if (accessoryType === 'headband') {
      // Hair headband
      drawRect(4, 2, 12, 2, accessoryColor);
      drawPixel(4, 3, '#FFFFFF'); // Ribbon knot
    } else if (accessoryType === 'ribbon') {
      // Cute side hair ribbon
      drawRect(13, 2, 3, 3, accessoryColor);
      drawPixel(14, 3, '#FFFFFF');
    } else if (accessoryType === 'earrings') {
      // Sparkling earrings
      drawRect(3, 9, 2, 2, accessoryColor);
      drawRect(15, 9, 2, 2, accessoryColor);
    } else if (accessoryType === 'headphones') {
      // Headphones around neck
      drawRect(3, 11, 3, 4, accessoryColor);
      drawRect(14, 11, 3, 4, accessoryColor);
      drawRect(5, 12, 10, 1, '#1E293B');
    } else if (accessoryType === 'beanie') {
      // Knit beanie hat
      drawRect(3, 0, 14, 4, accessoryColor);
      drawRect(2, 3, 16, 2, '#FFB22C'); // Beanie brim
      drawRect(8, 0, 4, 1, '#F7F7F7'); // Pompom
    } else if (accessoryType === 'lanyard') {
      // University / office lanyard
      drawPixel(7, 13, accessoryColor);
      drawPixel(12, 13, accessoryColor);
      drawPixel(8, 14, accessoryColor);
      drawPixel(11, 14, accessoryColor);
      drawRect(9, 15, 2, 3, '#FFFFFF');
      drawPixel(9, 15, '#3B82F6');
    } else if (accessoryType === 'scarf') {
      // Cozy scarf around neck
      drawRect(4, 11, 12, 3, accessoryColor);
      drawRect(11, 13, 3, 5, accessoryColor);
    }

    // Outer border frame
    ctx.strokeStyle = '#120E0C';
    ctx.lineWidth = 1;
    ctx.strokeRect(0.5, 0.5, 19, 19);
  }, [gender, hairstyle, hairColor, shirtColor, accessoryType, accessoryColor]);

  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 rounded-xl overflow-hidden shadow-md border-2 border-[#854836] bg-[#18120F] ${className}`}
      style={{ width: `${sizePixels}px`, height: `${sizePixels}px` }}
    >
      <canvas
        ref={canvasRef}
        width={pixelGrid}
        height={pixelGrid}
        style={{
          width: '100%',
          height: '100%',
          imageRendering: 'pixelated'
        }}
      />
    </div>
  );
};
