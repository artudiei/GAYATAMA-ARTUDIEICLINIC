import { Position, InteractiveObject } from '../../types/game';

export interface TileMapConfig {
  cols: number;
  rows: number;
  tileSize: number;
}

export class MapGrid {
  public static readonly COLS = 12;
  public static readonly ROWS = 10;
  public static readonly BASE_TILE_SIZE = 54; // Base pixel dimension per tile on desktop

  /**
   * Dynamically calculates tile size to fit the entire board on any screen size.
   * On mobile screens (< 640px wide), scales down so all 12x10 tiles fit vertically and horizontally.
   */
  public static getTileSize(viewWidth: number, viewHeight: number): number {
    if (viewWidth <= 0 || viewHeight <= 0) return this.BASE_TILE_SIZE;
    const isMobile = viewWidth < 640;
    if (isMobile) {
      // Reserve padding (16px left/right, 130px top/bottom for UI overlay/controls)
      const fitW = Math.floor((viewWidth - 16) / this.COLS);
      const fitH = Math.floor((viewHeight - 130) / this.ROWS);
      return Math.max(26, Math.min(this.BASE_TILE_SIZE, fitW, fitH));
    }
    // Desktop / Laptop (16:9 fullscreen): fill screen comfortably with room for header
    const fitW = Math.floor((viewWidth - 48) / this.COLS);
    const fitH = Math.floor((viewHeight - 96) / this.ROWS);
    return Math.max(48, Math.min(115, fitW, fitH));
  }

  // Grid Matrix
  // 0: Floor
  // 1: Wall (Solid)
  // 2: Bookshelf (Solid, Interactive)
  // 3: Desk (Solid)
  // 4: Client Sofa (Solid)
  // 5: Therapist Armchair (Solid)
  // 6: Center Coffee Table (Solid)
  // 7: Potted Plant (Solid)
  // 8: Tea / Coffee Station (Solid, Interactive)
  // 9: Consultation Rug (Walkable)
  public static readonly GRID: number[][] = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], // Row 0: Top wall
    [1, 2, 2, 0, 0, 8, 8, 0, 0, 7, 7, 1], // Row 1: Bookshelf, Tea Station, Plant
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], // Row 2: Walkway
    [1, 0, 3, 3, 0, 9, 9, 9, 9, 0, 0, 1], // Row 3: Desk, Rug start
    [1, 0, 3, 3, 0, 9, 4, 4, 9, 0, 0, 1], // Row 4: Desk, Client Sofa
    [1, 0, 0, 0, 0, 9, 6, 6, 9, 0, 0, 1], // Row 5: Coffee Table
    [1, 0, 0, 0, 0, 9, 5, 5, 9, 0, 0, 1], // Row 6: Therapist Chair
    [1, 0, 0, 0, 0, 9, 9, 9, 9, 0, 0, 1], // Row 7: Rug end
    [1, 7, 0, 0, 0, 0, 0, 0, 0, 0, 7, 1], // Row 8: Plants corner
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], // Row 9: Bottom wall
  ];

  // Solid collision tiles
  private static readonly SOLID_TILES = new Set([1, 2, 3, 4, 5, 6, 7, 8]);

  /**
   * Client NPC position in world tile coordinates
   */
  public static readonly CLIENT_TILE_POS: Position = { x: 6.5, y: 4 };

  /**
   * List of interactive objects
   */
  public static readonly INTERACTIVE_OBJECTS: InteractiveObject[] = [
    {
      id: 'client_npc',
      x: 6.5,
      y: 4,
      width: 1.5,
      height: 1.5,
      type: 'client',
      name: 'Klien Konseling',
      promptText: 'Mulai Sesi Konseling'
    },
    {
      id: 'reference_bookshelf',
      x: 1.5,
      y: 1,
      width: 2,
      height: 1,
      type: 'bookshelf',
      name: 'Rak Buku Teori Psikologi',
      promptText: 'Buka Buku Teori & Glosarium'
    },
    {
      id: 'tea_station',
      x: 5.5,
      y: 1,
      width: 2,
      height: 1,
      type: 'tea_station',
      name: 'Station Teh Chamomile',
      promptText: 'Seduh Teh Relaksasi'
    },
    {
      id: 'plant_pot',
      x: 9.5,
      y: 1,
      width: 2,
      height: 1,
      type: 'plant',
      name: 'Tanaman Hias Monstera',
      promptText: 'Amati Pola Daun & Bernapas'
    },
    {
      id: 'desk_radio',
      x: 3.0,
      y: 4.4,
      width: 1.5,
      height: 1.5,
      type: 'radio',
      name: 'Radio Vintage Meja',
      promptText: 'Putar Musik'
    }
  ];

  /**
   * Check if a world coordinate (tile units) collides with solid geometry.
   * Uses separate bounding-box radius for anti-glitch sliding.
   */
  public static isSolid(tileX: number, tileY: number, radius: number = 0.28): boolean {
    const minX = Math.floor(tileX - radius);
    const maxX = Math.floor(tileX + radius);
    const minY = Math.floor(tileY - radius);
    const maxY = Math.floor(tileY + radius);

    for (let y = minY; y <= maxY; y++) {
      for (let x = minX; x <= maxX; x++) {
        if (x < 0 || x >= this.COLS || y < 0 || y >= this.ROWS) {
          return true; // Map bounds
        }
        const tile = this.GRID[y][x];
        if (this.SOLID_TILES.has(tile)) {
          return true;
        }
      }
    }
    return false;
  }

  /**
   * Resolves player movement with sub-pixel collision sliding on separate axes
   */
  public static resolveMovement(
    currentPos: Position,
    deltaX: number,
    deltaY: number,
    radius: number = 0.28
  ): Position {
    let nextX = currentPos.x;
    let nextY = currentPos.y;

    // Check X axis separately
    if (deltaX !== 0) {
      const tryX = currentPos.x + deltaX;
      if (!this.isSolid(tryX, currentPos.y, radius)) {
        nextX = tryX;
      }
    }

    // Check Y axis separately
    if (deltaY !== 0) {
      const tryY = currentPos.y + deltaY;
      if (!this.isSolid(nextX, tryY, radius)) {
        nextY = tryY;
      }
    }

    return { x: nextX, y: nextY };
  }

  /**
   * Check if player is near any interactive object (radius <= 1.5 tiles)
   */
  public static getNearbyObject(playerPos: Position): InteractiveObject | null {
    const INTERACTION_RADIUS = 1.6;

    for (const obj of this.INTERACTIVE_OBJECTS) {
      if (obj.type === 'radio') {
        // Radio interaction only activates from below the desk directly in front of the radio graphic
        if (playerPos.y < 4.75) continue;
        const dx = playerPos.x - obj.x;
        const dy = playerPos.y - 5.0; // Distance to player standing spot right below the radio
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist <= 1.25) {
          return obj;
        }
        continue;
      }

      const dx = playerPos.x - obj.x;
      const dy = playerPos.y - obj.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist <= INTERACTION_RADIUS) {
        return obj;
      }
    }
    return null;
  }

  /**
   * Render the entire clinic map tiles and objects onto canvas
   */
  public static renderMap(
    ctx: CanvasRenderingContext2D,
    viewWidth: number,
    viewHeight: number,
    time: number,
    isRadioPlaying: boolean = false
  ) {
    const tileSize = this.getTileSize(viewWidth, viewHeight);
    const mapWidth = this.COLS * tileSize;
    const mapHeight = this.ROWS * tileSize;

    // Center map on viewport
    const offsetX = Math.round((viewWidth - mapWidth) / 2);
    const offsetY = Math.round((viewHeight - mapHeight) / 2);

    ctx.save();
    ctx.translate(offsetX, offsetY);

    // 1. Draw Floor & Rug
    for (let r = 0; r < this.ROWS; r++) {
      for (let c = 0; c < this.COLS; c++) {
        const x = c * tileSize;
        const y = r * tileSize;
        const tile = this.GRID[r][c];

        // Parquet Floor Tile
        this.drawParquetFloor(ctx, x, y, tileSize, (r + c) % 2 === 0);

        // Rug under consultation
        if (tile === 9 || tile === 4 || tile === 5 || tile === 6) {
          this.drawRugTile(ctx, x, y, tileSize, r, c);
        }
      }
    }

    // 2. Draw Walls & Upper Wainscoting
    for (let r = 0; r < this.ROWS; r++) {
      for (let c = 0; c < this.COLS; c++) {
        const x = c * tileSize;
        const y = r * tileSize;
        const tile = this.GRID[r][c];

        if (tile === 1) {
          this.drawWallTile(ctx, x, y, tileSize, r, c);
        }
      }
    }

    // 3. Draw Static Objects & Furniture
    this.drawFurniture(ctx, tileSize, time, isRadioPlaying);

    ctx.restore();
    return { offsetX, offsetY, tileSize };
  }

  private static drawParquetFloor(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    size: number,
    alt: boolean
  ) {
    // 16-Bit Retro Wood Parquet Pattern
    ctx.fillStyle = alt ? '#221B17' : '#2D231E';
    ctx.fillRect(x, y, size, size);

    // Plank seams (Dark Obsidian outline)
    ctx.strokeStyle = '#120E0C';
    ctx.lineWidth = 1;
    ctx.strokeRect(x, y, size, size);

    // Inner pixel plank weave texture
    ctx.fillStyle = alt ? '#29201B' : '#352922';
    const half = Math.floor(size / 2);
    if (alt) {
      // Horizontal planks
      ctx.fillRect(x + 2, y + 2, size - 4, half - 3);
      ctx.fillRect(x + 2, y + half + 1, size - 4, half - 3);
    } else {
      // Vertical planks
      ctx.fillRect(x + 2, y + 2, half - 3, size - 4);
      ctx.fillRect(x + half + 1, y + 2, half - 3, size - 4);
    }

    // Corner pixel nails
    ctx.fillStyle = '#120E0C';
    ctx.fillRect(x + 2, y + 2, 2, 2);
    ctx.fillRect(x + size - 4, y + 2, 2, 2);
    ctx.fillRect(x + 2, y + size - 4, 2, 2);
    ctx.fillRect(x + size - 4, y + size - 4, 2, 2);

    // Amber grain highlight line
    ctx.fillStyle = 'rgba(255, 178, 44, 0.12)';
    ctx.fillRect(x + 4, y + Math.floor(size / 3), size - 8, 1);
  }

  private static drawRugTile(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    size: number,
    _r: number,
    _c: number
  ) {
    // Russet Terracotta & Gold Woven Rug
    ctx.fillStyle = '#5E2F22';
    ctx.fillRect(x + 1, y + 1, size - 2, size - 2);

    // Gold Outer Trim
    ctx.strokeStyle = '#FFB22C';
    ctx.lineWidth = 2;
    ctx.strokeRect(x + 3, y + 3, size - 6, size - 6);

    // Inner Woven Diamond
    ctx.fillStyle = '#854836';
    ctx.fillRect(x + 6, y + 6, size - 12, size - 12);
    ctx.fillStyle = '#FFB22C';
    ctx.fillRect(x + size / 2 - 3, y + size / 2 - 3, 6, 6);

    // Corner Tassel Dots
    ctx.fillStyle = '#FFD382';
    ctx.fillRect(x + 1, y + 1, 2, 2);
    ctx.fillRect(x + size - 3, y + 1, 2, 2);
    ctx.fillRect(x + 1, y + size - 3, 2, 2);
    ctx.fillRect(x + size - 3, y + size - 3, 2, 2);
  }

  private static drawWallTile(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    size: number,
    r: number,
    c: number
  ) {
    const s = size / 54; // Relative scale factor

    // Wall Base (Dark Obsidian Charcoal)
    ctx.fillStyle = '#18120F';
    ctx.fillRect(x, y, size, size);

    // Vertical Retro Pixel Wallpaper Stripes
    ctx.fillStyle = '#221B17';
    ctx.fillRect(x + Math.round(4 * s), y, Math.max(2, Math.round(4 * s)), size);
    ctx.fillRect(x + Math.round(14 * s), y, Math.max(2, Math.round(4 * s)), size);
    ctx.fillRect(x + Math.round(24 * s), y, Math.max(2, Math.round(4 * s)), size);

    // Upper Moldings
    const moldingH = Math.max(8, Math.round(14 * s));
    ctx.fillStyle = '#854836';
    ctx.fillRect(x, y, size, moldingH);
    ctx.fillStyle = '#FFB22C';
    ctx.fillRect(x, y, size, Math.max(1, Math.round(3 * s))); // Gold crown highlight

    // Baseboard
    const baseH = Math.max(4, Math.round(8 * s));
    ctx.fillStyle = '#0F0C0A';
    ctx.fillRect(x, y + size - baseH, size, baseH);
    ctx.fillStyle = '#3D2E27';
    ctx.fillRect(x, y + size - baseH, size, Math.max(1, Math.round(2 * s)));

    // Wall Panel Bevel Seams
    ctx.strokeStyle = '#0F0C0A';
    ctx.lineWidth = 1;
    ctx.strokeRect(x, y, size, size);

    // Special Entrance Doorway Mat at Row 9 (Bottom edge door)
    if (r === 9 && (c === 5 || c === 6)) {
      ctx.fillStyle = '#3D2E27';
      ctx.fillRect(x, y + 2, size, size - 4);
      ctx.fillStyle = '#FFB22C';
      ctx.fillRect(x + 2, y + 4, size - 4, size - 8);
      ctx.fillStyle = '#854836';
      ctx.fillRect(x + 4, y + 6, size - 8, size - 12);
    }

    // Diploma Frame on Top Wall (Scaled to stay 100% inside tile 0,3 and 0,8)
    if (r === 0 && (c === 3 || c === 8)) {
      const frameW = Math.round(size * 0.65);
      const frameH = Math.round(size * 0.48);
      const frameX = x + Math.round((size - frameW) / 2);
      const frameY = y + Math.round(size * 0.35);

      ctx.fillStyle = '#FFB22C';
      ctx.fillRect(frameX, frameY, frameW, frameH);
      ctx.fillStyle = '#120E0C';
      ctx.fillRect(frameX + 2, frameY + 2, frameW - 4, frameH - 4);
      ctx.fillStyle = '#F7F7F7';
      ctx.fillRect(frameX + 4, frameY + 4, frameW - 8, frameH - 8);
      ctx.fillStyle = '#854836';
      ctx.fillRect(frameX + Math.round(frameW / 2) - 2, frameY + Math.round(frameH / 2) - 1, 5, 3); // Seal
    }
  }

  private static drawFurniture(
    ctx: CanvasRenderingContext2D,
    tileSize: number,
    time: number,
    isRadioPlaying: boolean = false
  ) {
    const s = tileSize / 54; // Relative scale factor
    const border = Math.max(2, Math.round(4 * s));

    // --- 1. Psychology Bookshelf (Row 1, Col 1-2) ---
    const bookX = 1 * tileSize;
    const bookY = 1 * tileSize - Math.round(8 * s);
    const bookW = 2 * tileSize;
    const bookH = tileSize + Math.round(8 * s);

    // Bookshelf Frame
    ctx.fillStyle = '#2E1E16';
    ctx.fillRect(bookX, bookY, bookW, bookH);
    ctx.fillStyle = '#48281E';
    ctx.fillRect(bookX + border, bookY + border, bookW - border * 2, bookH - border * 2);

    // Shelves & Colorful Book Spines
    const shelfY1 = bookY + Math.round(16 * s);
    const shelfY2 = bookY + Math.round(36 * s);
    ctx.fillStyle = '#1A110D';
    const shelfH = Math.max(2, Math.round(3 * s));
    ctx.fillRect(bookX + border, shelfY1, bookW - border * 2, shelfH);
    ctx.fillRect(bookX + border, shelfY2, bookW - border * 2, shelfH);

    // Row 1 Books (scaled to fit bookW)
    const bookColors = ['#FFB22C', '#854836', '#F7F7F7', '#3D2E27', '#FFD382', '#9A342D'];
    const numBooks = 10;
    const bw = Math.max(3, Math.floor((bookW - border * 3) / numBooks) - 1);
    let curX = bookX + border + 2;
    for (let i = 0; i < numBooks; i++) {
      ctx.fillStyle = bookColors[i % bookColors.length];
      const bh = Math.round((10 + (i % 3) * 2) * s);
      ctx.fillRect(curX, shelfY1 - bh, bw, bh);
      curX += bw + 1;
    }

    // Row 2 Books
    curX = bookX + border + 2;
    for (let i = 0; i < numBooks; i++) {
      ctx.fillStyle = bookColors[(i + 2) % bookColors.length];
      const bh = Math.round((12 + (i % 2) * 3) * s);
      ctx.fillRect(curX, shelfY2 - bh, bw, bh);
      curX += bw + 1;
    }

    // --- 2. Tea Station (Row 1, Col 5-6) ---
    const teaX = 5 * tileSize;
    const teaY = 1 * tileSize;
    const teaW = 2 * tileSize;
    const teaH = tileSize;
    const pad = Math.round(6 * s);

    ctx.fillStyle = '#3D2E27';
    ctx.fillRect(teaX + pad, teaY + pad, teaW - pad * 2, teaH - pad);

    // Kettle & Mugs (Scale proportional)
    const kw = Math.round(14 * s);
    const kh = Math.round(16 * s);
    const kettleX = teaX + Math.round(teaW * 0.22);
    const kettleY = teaY + Math.round(teaH * 0.35);

    ctx.fillStyle = '#F7F7F7';
    ctx.fillRect(kettleX, kettleY, kw, kh);

    const mw = Math.round(10 * s);
    const mh = Math.round(12 * s);
    ctx.fillStyle = '#FFB22C';
    ctx.fillRect(teaX + Math.round(teaW * 0.45), teaY + Math.round(teaH * 0.42), mw, mh);
    ctx.fillRect(teaX + Math.round(teaW * 0.62), teaY + Math.round(teaH * 0.42), mw, mh);

    // Steam particles
    const steamFloat = (time * 0.003) % (Math.PI * 2);
    ctx.fillStyle = 'rgba(247, 247, 247, 0.55)';
    const pw = Math.max(2, Math.round(3 * s));
    ctx.fillRect(kettleX + Math.round(3 * s) + Math.sin(steamFloat) * 3, kettleY - Math.round(8 * s) - (time * 0.02 % 8), pw, pw);

    // --- 3. Psychologist Executive Desk (Row 3-4, Col 2-3) ---
    const deskX = 2 * tileSize;
    const deskY = 3 * tileSize + Math.round(8 * s);
    const deskW = 2 * tileSize;
    const deskH = 2 * tileSize - Math.round(16 * s);

    // Dark Russet Wood Desk
    ctx.fillStyle = '#2D1E16';
    ctx.fillRect(deskX, deskY, deskW, deskH);
    ctx.fillStyle = '#3E2A20';
    ctx.fillRect(deskX + border, deskY + border, deskW - border * 2, deskH - border * 2);

    // 3a. Open Laptop (Upper-left of desk)
    const laptopW = Math.round(deskW * 0.32);
    const laptopH = Math.round(deskH * 0.34);
    const laptopX = deskX + Math.round(deskW * 0.08);
    const laptopY = deskY + Math.round(deskH * 0.14);

    ctx.fillStyle = '#120E0C';
    ctx.fillRect(laptopX, laptopY, laptopW, laptopH);
    ctx.fillStyle = '#FFB22C';
    ctx.fillRect(laptopX + 2, laptopY + 2, laptopW - 4, laptopH - 4); // Glowing amber screen
    ctx.fillStyle = '#854836';
    ctx.fillRect(laptopX + 4, laptopY + 4, laptopW - 8, Math.max(1, Math.round(2 * s))); // UI bar on screen

    // 3b. Diagnostic Desk Lamp (Upper-right of desk)
    const lampX = deskX + Math.round(deskW * 0.82);
    const lampY = deskY + Math.round(deskH * 0.22);
    const lampRadius = Math.max(4, Math.round(7 * s));
    
    // Lamp glow halo
    ctx.fillStyle = 'rgba(255, 178, 44, 0.15)';
    ctx.beginPath();
    ctx.arc(lampX, lampY, lampRadius * 2, 0, Math.PI * 2);
    ctx.fill();

    // Lamp shade & stand
    ctx.fillStyle = '#120E0C';
    ctx.fillRect(lampX - 1, lampY, 2, Math.round(10 * s));
    ctx.fillStyle = '#FFB22C';
    ctx.beginPath();
    ctx.arc(lampX, lampY, lampRadius, 0, Math.PI * 2);
    ctx.fill();

    // 3c. Case Notebook (Lower-left of desk)
    const noteW = Math.round(deskW * 0.26);
    const noteH = Math.round(deskH * 0.36);
    const noteX = deskX + Math.round(deskW * 0.08);
    const noteY = deskY + Math.round(deskH * 0.54);

    ctx.fillStyle = '#F7F7F7';
    ctx.fillRect(noteX, noteY, noteW, noteH);
    ctx.fillStyle = '#854836';
    ctx.fillRect(noteX, noteY, Math.max(2, Math.round(3 * s)), noteH); // Notebook spine
    // Lined notes
    ctx.fillStyle = '#D1D5DB';
    ctx.fillRect(noteX + Math.round(6 * s), noteY + Math.round(6 * s), noteW - Math.round(10 * s), 1);
    ctx.fillRect(noteX + Math.round(6 * s), noteY + Math.round(12 * s), noteW - Math.round(10 * s), 1);

    // 3d. Vintage Retro Pixel Art Radio (Lower-right of desk)
    const radioW = Math.round(deskW * 0.44);
    const radioH = Math.round(deskH * 0.38);
    const radioX = deskX + Math.round(deskW * 0.48);
    const radioY = deskY + Math.round(deskH * 0.52);

    // Slanted Metal Antenna with golden ball tip
    ctx.strokeStyle = '#D1D5DB';
    ctx.lineWidth = Math.max(1, Math.round(2 * s));
    ctx.beginPath();
    ctx.moveTo(radioX + Math.round(6 * s), radioY);
    ctx.lineTo(radioX - Math.round(4 * s), radioY - Math.round(14 * s));
    ctx.stroke();

    ctx.fillStyle = '#FFB22C';
    ctx.beginPath();
    ctx.arc(radioX - Math.round(4 * s), radioY - Math.round(14 * s), Math.max(2, Math.round(2.5 * s)), 0, Math.PI * 2);
    ctx.fill();

    // Radio Outer Chassis (Dark Wood Casing with Gold Inset)
    ctx.fillStyle = '#120E0C'; // Outline shadow
    ctx.fillRect(radioX - 1, radioY - 1, radioW + 2, radioH + 2);
    ctx.fillStyle = '#5A3222'; // Rich mahogany wood
    ctx.fillRect(radioX, radioY, radioW, radioH);
    ctx.fillStyle = '#7A4430'; // Top bevel highlight
    ctx.fillRect(radioX + 1, radioY + 1, radioW - 2, Math.max(1, Math.round(3 * s)));
    ctx.fillStyle = '#FFB22C'; // Gold trim border
    ctx.strokeRect(radioX + 1.5, radioY + 1.5, radioW - 3, radioH - 3);

    // Left Speaker Grille
    const spkW = Math.round(radioW * 0.42);
    const spkH = Math.round(radioH * 0.65);
    const spkX = radioX + Math.round(3 * s);
    const spkY = radioY + Math.round(4 * s);

    ctx.fillStyle = '#1C110D';
    ctx.fillRect(spkX, spkY, spkW, spkH);

    // Speaker horizontal grille slats
    ctx.fillStyle = '#854836';
    for (let gy = spkY + 2; gy < spkY + spkH - 2; gy += Math.max(2, Math.round(3 * s))) {
      ctx.fillRect(spkX + 1, gy, spkW - 2, 1);
    }

    // Right Tuner Display & Controls
    const ctrlX = radioX + spkW + Math.round(6 * s);
    const ctrlW = radioW - spkW - Math.round(9 * s);
    const tunerH = Math.round(radioH * 0.32);
    const tunerY = radioY + Math.round(4 * s);

    // Glass Tuner Window
    ctx.fillStyle = '#120E0C';
    ctx.fillRect(ctrlX, tunerY, ctrlW, tunerH);
    ctx.fillStyle = isRadioPlaying ? '#166534' : '#450A0A'; // Glowing back light
    ctx.fillRect(ctrlX + 1, tunerY + 1, ctrlW - 2, tunerH - 2);

    // Tuner Frequency Needle (Animates if radio is playing)
    const needleProgress = isRadioPlaying ? (Math.sin(time * 0.002) + 1) / 2 : 0.45;
    const needleX = ctrlX + 2 + Math.round((ctrlW - 5) * needleProgress);
    ctx.fillStyle = isRadioPlaying ? '#4ADE80' : '#EF4444';
    ctx.fillRect(needleX, tunerY + 1, 1.5, tunerH - 2);

    // Vintage Rotary Knobs (Volume & Tuning)
    const knobR = Math.max(1.5, Math.round(2.5 * s));
    const knobY = tunerY + tunerH + Math.round(4 * s);
    ctx.fillStyle = '#FFB22C';
    ctx.beginPath();
    ctx.arc(ctrlX + Math.round(ctrlW * 0.28), knobY, knobR, 0, Math.PI * 2);
    ctx.arc(ctrlX + Math.round(ctrlW * 0.72), knobY, knobR, 0, Math.PI * 2);
    ctx.fill();

    // Power Indicator LED Dot
    const ledX = radioX + radioW - Math.round(4 * s);
    const ledY = radioY + Math.round(2.5 * s);
    const isBlink = Math.sin(time * 0.006) > 0;
    ctx.fillStyle = isRadioPlaying ? (isBlink ? '#22C55E' : '#86EFAC') : '#EF4444';
    ctx.fillRect(ledX, ledY, Math.max(2, Math.round(2.5 * s)), Math.max(2, Math.round(2.5 * s)));

    // Animated Floating Pixel Music Notes (♪ ♫) when Radio is playing!
    if (isRadioPlaying) {
      const noteCount = 3;
      for (let n = 0; n < noteCount; n++) {
        const noteProgress = ((time * 0.001 + n * 0.33) % 1);
        const floatY = radioY - noteProgress * Math.round(30 * s);
        const floatX = radioX + Math.round(radioW * 0.25) + Math.sin(time * 0.004 + n * 2.1) * Math.round(10 * s);
        const alpha = Math.sin(noteProgress * Math.PI); // Smooth fade in and out

        ctx.save();
        ctx.globalAlpha = Math.max(0, Math.min(1, alpha * 0.95));
        ctx.fillStyle = n % 2 === 0 ? '#FFB22C' : '#FFD382';
        ctx.font = `bold ${Math.max(11, Math.round(14 * s))}px monospace`;
        ctx.fillText(n % 2 === 0 ? '♪' : '♫', floatX, floatY);
        ctx.restore();
      }
    }

    // --- 4. Client Counseling Sofa (Row 4, Col 6-7) ---
    const sofaX = 6 * tileSize;
    const sofaY = 4 * tileSize;
    const sofaW = 2 * tileSize;
    const sofaH = tileSize;

    // Sofa base & backrest
    ctx.fillStyle = '#3D261B';
    ctx.fillRect(sofaX, sofaY, sofaW, sofaH);
    ctx.fillStyle = '#543627';
    ctx.fillRect(sofaX + border, sofaY + border, sofaW - border * 2, sofaH - border * 2);

    // Cushions
    ctx.fillStyle = '#5E2F22';
    const cushionW = Math.round(sofaW / 2 - 8 * s);
    const cushionH = Math.round(sofaH - 16 * s);
    ctx.fillRect(sofaX + Math.round(6 * s), sofaY + Math.round(12 * s), cushionW, cushionH);
    ctx.fillRect(sofaX + Math.round(sofaW / 2 + 2 * s), sofaY + Math.round(12 * s), cushionW, cushionH);

    // Accent Pillows (Warm Amber & Russet)
    const pillowS = Math.round(12 * s);
    ctx.fillStyle = '#FFB22C';
    ctx.fillRect(sofaX + Math.round(8 * s), sofaY + Math.round(6 * s), pillowS, pillowS);
    ctx.fillStyle = '#854836';
    ctx.fillRect(sofaX + sofaW - Math.round(8 * s) - pillowS, sofaY + Math.round(6 * s), pillowS, pillowS);

    // --- 5. Center Coffee Table (Row 5, Col 6-7) ---
    const tableX = 6 * tileSize + Math.round(8 * s);
    const tableY = 5 * tileSize + Math.round(4 * s);
    const tableW = 2 * tileSize - Math.round(16 * s);
    const tableH = tileSize - Math.round(8 * s);

    ctx.fillStyle = '#2E1E16';
    ctx.fillRect(tableX, tableY, tableW, tableH);
    ctx.fillStyle = '#48281E';
    ctx.fillRect(tableX + border, tableY + border, tableW - border * 2, tableH - border * 2);

    // Tea cup on table
    const cupR = Math.max(3, Math.round(5 * s));
    ctx.fillStyle = '#F7F7F7';
    ctx.beginPath();
    ctx.arc(tableX + Math.round(tableW * 0.35), tableY + Math.round(tableH * 0.5), cupR, 0, Math.PI * 2);
    ctx.fill();

    // Napkin
    ctx.fillStyle = '#FFB22C';
    ctx.fillRect(tableX + Math.round(tableW * 0.6), tableY + Math.round(tableH * 0.3), Math.round(12 * s), Math.round(8 * s));

    // --- 6. Therapist Armchair (Row 6, Col 6-7) ---
    const chairX = 6 * tileSize + Math.round(10 * s);
    const chairY = 6 * tileSize + Math.round(4 * s);
    const chairW = 2 * tileSize - Math.round(20 * s);
    const chairH = tileSize - Math.round(8 * s);

    ctx.fillStyle = '#2D1F18';
    ctx.fillRect(chairX, chairY, chairW, chairH);
    ctx.fillStyle = '#48281E';
    ctx.fillRect(chairX + border, chairY + border, chairW - border * 2, chairH - border * 2);

    // --- 7. Potted Monstera Plants (Corners) ---
    this.drawPlant(ctx, 1 * tileSize + Math.round(8 * s), 8 * tileSize + Math.round(6 * s), time, tileSize);
    this.drawPlant(ctx, 10 * tileSize + Math.round(8 * s), 8 * tileSize + Math.round(6 * s), time + 500, tileSize);
    this.drawPlant(ctx, 9 * tileSize + Math.round(10 * s), 1 * tileSize + Math.round(8 * s), time + 1000, tileSize);
    this.drawPlant(ctx, 10 * tileSize + Math.round(10 * s), 1 * tileSize + Math.round(8 * s), time + 1500, tileSize);
  }

  private static drawPlant(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    time: number,
    tileSize: number = MapGrid.BASE_TILE_SIZE
  ) {
    const s = tileSize / 54; // Relative scale factor
    const sway = Math.sin(time * 0.003) * (2 * s);

    // Ceramic Russet/Terracotta Pot (Proportional to tileSize)
    const potW = Math.round(18 * s);
    const potH = Math.round(14 * s);
    const potX = x + Math.round(3 * s);
    const potY = y + Math.round(14 * s);

    ctx.fillStyle = '#854836';
    ctx.fillRect(potX, potY, potW, potH);
    ctx.fillStyle = '#FFB22C';
    ctx.fillRect(potX - 2, potY - 3, potW + 4, Math.max(2, Math.round(5 * s)));
    ctx.fillStyle = '#120E0C';
    ctx.fillRect(potX, potY - 2, potW, Math.max(1, Math.round(2 * s))); // Soil

    // Lush Foliage (Proportional to tileSize)
    const r1 = Math.max(4, Math.round(7 * s));
    const r2 = Math.max(5, Math.round(9 * s));
    const r3 = Math.max(4, Math.round(8 * s));

    ctx.fillStyle = '#3E5C38';
    ctx.beginPath();
    ctx.arc(x + Math.round(6 * s) + sway, y + Math.round(6 * s), r1, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#4E7A45';
    ctx.beginPath();
    ctx.arc(x + Math.round(16 * s) - sway, y + Math.round(4 * s), r2, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#659A5A';
    ctx.beginPath();
    ctx.arc(x + Math.round(11 * s) + sway * 0.5, y - Math.round(1 * s), r3, 0, Math.PI * 2);
    ctx.fill();

    // Leaf vein highlights
    ctx.fillStyle = '#88C07C';
    ctx.fillRect(x + Math.round(11 * s) + sway * 0.5, y - Math.round(3 * s), Math.max(1, Math.round(2 * s)), Math.max(2, Math.round(5 * s)));
  }
}
