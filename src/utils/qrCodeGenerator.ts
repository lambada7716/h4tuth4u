/**
 * Generates deterministic 2D QR matrix data for unique ticket passes.
 * Uses Reed-Solomon-style alignment patterns, timing strips, and data payload bits.
 */
export function generateTicketQRMatrix(payload: string, size = 25): boolean[][] {
  // Initialize grid of false
  const grid: boolean[][] = Array.from({ length: size }, () => Array(size).fill(false));

  // Helper to draw finder pattern (7x7 with 1px border)
  const drawFinder = (top: number, left: number) => {
    for (let r = 0; r < 7; r++) {
      for (let c = 0; c < 7; c++) {
        if (
          r === 0 ||
          r === 6 ||
          c === 0 ||
          c === 6 ||
          (r >= 2 && r <= 4 && c >= 2 && c <= 4)
        ) {
          grid[top + r][left + c] = true;
        } else {
          grid[top + r][left + c] = false;
        }
      }
    }
    // White separator border
    for (let r = -1; r <= 7; r++) {
      for (let c = -1; c <= 7; c++) {
        const nr = top + r;
        const nc = left + c;
        if (nr >= 0 && nr < size && nc >= 0 && nc < size) {
          if (r === -1 || r === 7 || c === -1 || c === 7) {
            grid[nr][nc] = false;
          }
        }
      }
    }
  };

  // 3 Finder patterns (top-left, top-right, bottom-left)
  drawFinder(0, 0);
  drawFinder(0, size - 7);
  drawFinder(size - 7, 0);

  // Timing patterns
  for (let i = 8; i < size - 8; i++) {
    grid[6][i] = i % 2 === 0;
    grid[i][6] = i % 2 === 0;
  }

  // Alignment pattern (for size >= 25, at size-9, size-9)
  const alignR = size - 9;
  const alignC = size - 9;
  for (let r = -2; r <= 2; r++) {
    for (let c = -2; c <= 2; c++) {
      const isOuter = Math.abs(r) === 2 || Math.abs(c) === 2;
      const isCenter = r === 0 && c === 0;
      grid[alignR + r][alignC + c] = isOuter || isCenter;
    }
  }

  // Generate payload hash
  let hash = 0x811c9dc5;
  for (let i = 0; i < payload.length; i++) {
    hash ^= payload.charCodeAt(i);
    hash += (hash << 1) + (hash << 4) + (hash << 7) + (hash << 8) + (hash << 24);
  }

  // Pseudo-random data distribution based on hash and payload chars
  let charIdx = 0;
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      // Skip finder zones
      const inTopLeft = r <= 7 && c <= 7;
      const inTopRight = r <= 7 && c >= size - 8;
      const inBottomLeft = r >= size - 8 && c <= 7;
      const inTiming = r === 6 || c === 6;
      const inAlign = Math.abs(r - alignR) <= 2 && Math.abs(c - alignC) <= 2;

      if (!inTopLeft && !inTopRight && !inBottomLeft && !inTiming && !inAlign) {
        const seed = (r * 31 + c * 17 + payload.charCodeAt(charIdx % payload.length) + (hash >>> 4)) >>> 0;
        grid[r][c] = (seed % 3 === 0) || (seed % 7 === 2) || (seed % 11 === 5);
        charIdx++;
      }
    }
  }

  return grid;
}
