'use client';

import { useEffect, useRef } from 'react';

interface FloatingSymbol {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  size: number;
  type: string;
}

const SYMBOL_TYPES = ['₿', '♠', '♥', '♦', '♣', '#', '↗', '↘'];

// Draw a mini candlestick
function drawCandlestick(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  opacity: number,
  rotation: number,
  isBull: boolean
) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rotation);
  ctx.globalAlpha = opacity;

  const color = isBull ? 'rgba(34, 197, 94, 1)' : 'rgba(239, 68, 68, 1)';
  const bodyH = size * 0.5;
  const bodyW = size * 0.3;
  const wickH = size * 0.8;

  // Wick
  ctx.strokeStyle = color;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(0, -wickH / 2);
  ctx.lineTo(0, wickH / 2);
  ctx.stroke();

  // Body
  ctx.fillStyle = isBull ? 'transparent' : color;
  ctx.strokeStyle = color;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.rect(-bodyW / 2, -bodyH / 2, bodyW, bodyH);
  if (isBull) {
    ctx.stroke();
  } else {
    ctx.fill();
  }

  ctx.restore();
}

// Draw a mini K-line chart (3-5 candles)
function drawMiniChart(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  opacity: number,
  rotation: number
) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rotation * 0.3); // Less rotation for chart
  ctx.globalAlpha = opacity;

  const candles = [0.6, 0.8, 0.4, 0.9, 0.7];
  const bulls = [true, true, false, true, false];
  const gap = size * 0.22;
  const startX = -(candles.length * gap) / 2;

  for (let i = 0; i < candles.length; i++) {
    const cx = startX + i * gap;
    const h = candles[i] * size * 0.6;
    const bodyH = h * 0.5;
    const bodyW = gap * 0.5;
    const color = bulls[i] ? 'rgba(34, 197, 94, 1)' : 'rgba(239, 68, 68, 1)';

    // Wick
    ctx.strokeStyle = color;
    ctx.lineWidth = 0.5;
    ctx.beginPath();
    ctx.moveTo(cx, -h / 2);
    ctx.lineTo(cx, h / 2);
    ctx.stroke();

    // Body
    ctx.fillStyle = bulls[i] ? 'transparent' : color;
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.rect(cx - bodyW / 2, -bodyH / 2, bodyW, bodyH);
    if (bulls[i]) ctx.stroke();
    else ctx.fill();
  }

  ctx.restore();
}

export default function CryptoCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const symbolsRef = useRef<FloatingSymbol[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf: number;
    const MOUSE_RADIUS = 120;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const init = () => {
      const isMobile = window.innerWidth < 768;
      const count = isMobile ? 18 : 40;
      const symbols: FloatingSymbol[] = [];

      for (let i = 0; i < count; i++) {
        const typeIndex = i % (SYMBOL_TYPES.length + 2); // +2 for candlestick & chart
        let type: string;
        if (typeIndex === SYMBOL_TYPES.length) type = 'candle';
        else if (typeIndex === SYMBOL_TYPES.length + 1) type = 'chart';
        else type = SYMBOL_TYPES[typeIndex];

        symbols.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.15,
          vy: (Math.random() - 0.5) * 0.15,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.003,
          opacity: 0.03 + Math.random() * 0.05,
          size: isMobile ? 14 + Math.random() * 16 : 18 + Math.random() * 24,
          type,
        });
      }

      symbolsRef.current = symbols;
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      for (const s of symbolsRef.current) {
        // Mouse repulsion
        const dx = s.x - mx;
        const dy = s.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MOUSE_RADIUS && dist > 0) {
          const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS;
          s.x += (dx / dist) * force * 2;
          s.y += (dy / dist) * force * 2;
        }

        // Drift
        s.x += s.vx;
        s.y += s.vy;
        s.rotation += s.rotationSpeed;

        // Wrap around
        if (s.x < -50) s.x = canvas.width + 50;
        if (s.x > canvas.width + 50) s.x = -50;
        if (s.y < -50) s.y = canvas.height + 50;
        if (s.y > canvas.height + 50) s.y = -50;

        // Draw
        if (s.type === 'candle') {
          drawCandlestick(ctx, s.x, s.y, s.size, s.opacity, s.rotation, Math.random() > 0.5);
        } else if (s.type === 'chart') {
          drawMiniChart(ctx, s.x, s.y, s.size * 1.5, s.opacity, s.rotation);
        } else {
          ctx.save();
          ctx.translate(s.x, s.y);
          ctx.rotate(s.rotation);
          ctx.globalAlpha = s.opacity;
          ctx.font = `${s.size}px "Segoe UI", system-ui, sans-serif`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';

          // Color based on type
          if (s.type === '₿') {
            ctx.fillStyle = '#F7931A'; // Bitcoin orange
          } else if (s.type === '♥' || s.type === '♦') {
            ctx.fillStyle = '#EF4444'; // Red for hearts/diamonds
          } else if (s.type === '♠' || s.type === '♣') {
            ctx.fillStyle = '#ffffff';
          } else if (s.type === '↗') {
            ctx.fillStyle = '#22C55E'; // Green for up arrow
          } else if (s.type === '↘') {
            ctx.fillStyle = '#EF4444'; // Red for down arrow
          } else {
            ctx.fillStyle = '#8B5CF6'; // Purple for hash
          }

          ctx.fillText(s.type, 0, 0);
          ctx.restore();
        }
      }

      raf = requestAnimationFrame(draw);
    };

    const onMouse = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const onLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
    };

    resize();
    init();
    draw();

    const onResize = () => { resize(); init(); };
    window.addEventListener('resize', onResize);
    window.addEventListener('mousemove', onMouse);
    window.addEventListener('mouseleave', onLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMouse);
      window.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ width: '100vw', height: '100vh' }}
    />
  );
}
