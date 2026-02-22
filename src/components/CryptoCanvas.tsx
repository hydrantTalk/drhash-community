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
  bullish?: boolean; // for candle/chart
}

const SYMBOL_TYPES = ['₿', '♠', '♥', '♦', '♣', '#', '↗', '↘', '$', '€'];

// Draw a poker chip
function drawChip(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  opacity: number,
  rotation: number
) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rotation);
  ctx.globalAlpha = opacity;

  const r = size * 0.45;

  // Outer ring
  ctx.strokeStyle = 'rgba(142, 124, 195, 0.8)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(0, 0, r, 0, Math.PI * 2);
  ctx.stroke();

  // Inner circle
  ctx.strokeStyle = 'rgba(142, 124, 195, 0.5)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.arc(0, 0, r * 0.6, 0, Math.PI * 2);
  ctx.stroke();

  // Edge notches (8)
  for (let i = 0; i < 8; i++) {
    const angle = (i / 8) * Math.PI * 2;
    const nx = Math.cos(angle) * r;
    const ny = Math.sin(angle) * r;
    const nx2 = Math.cos(angle) * (r + 4);
    const ny2 = Math.sin(angle) * (r + 4);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(nx, ny);
    ctx.lineTo(nx2, ny2);
    ctx.stroke();
  }

  // Center cross
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  ctx.moveTo(-r * 0.3, 0);
  ctx.lineTo(r * 0.3, 0);
  ctx.moveTo(0, -r * 0.3);
  ctx.lineTo(0, r * 0.3);
  ctx.stroke();

  ctx.restore();
}

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
  if (isBull) ctx.stroke();
  else ctx.fill();

  ctx.restore();
}

// Draw a mini K-line chart (5 candles)
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
  ctx.rotate(rotation * 0.3);
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

    ctx.strokeStyle = color;
    ctx.lineWidth = 0.5;
    ctx.beginPath();
    ctx.moveTo(cx, -h / 2);
    ctx.lineTo(cx, h / 2);
    ctx.stroke();

    ctx.fillStyle = bulls[i] ? 'transparent' : color;
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.rect(cx - bodyW / 2, -bodyH / 2, bodyW, bodyH);
    if (bulls[i]) ctx.stroke();
    else ctx.fill();
  }

  ctx.restore();
}

// Draw a poker card back
function drawCardBack(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  opacity: number,
  rotation: number
) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rotation);
  ctx.globalAlpha = opacity;

  const w = size * 0.5;
  const h = size * 0.7;

  // Card outline
  ctx.strokeStyle = 'rgba(142, 124, 195, 0.7)';
  ctx.lineWidth = 1;
  const r = 3;
  ctx.beginPath();
  ctx.moveTo(-w / 2 + r, -h / 2);
  ctx.lineTo(w / 2 - r, -h / 2);
  ctx.arcTo(w / 2, -h / 2, w / 2, -h / 2 + r, r);
  ctx.lineTo(w / 2, h / 2 - r);
  ctx.arcTo(w / 2, h / 2, w / 2 - r, h / 2, r);
  ctx.lineTo(-w / 2 + r, h / 2);
  ctx.arcTo(-w / 2, h / 2, -w / 2, h / 2 - r, r);
  ctx.lineTo(-w / 2, -h / 2 + r);
  ctx.arcTo(-w / 2, -h / 2, -w / 2 + r, -h / 2, r);
  ctx.closePath();
  ctx.stroke();

  // Inner diamond pattern
  ctx.strokeStyle = 'rgba(142, 124, 195, 0.4)';
  ctx.lineWidth = 0.5;
  ctx.beginPath();
  ctx.moveTo(0, -h * 0.3);
  ctx.lineTo(w * 0.25, 0);
  ctx.lineTo(0, h * 0.3);
  ctx.lineTo(-w * 0.25, 0);
  ctx.closePath();
  ctx.stroke();

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
      const count = isMobile ? 25 : 55; // Increased density
      const symbols: FloatingSymbol[] = [];

      // Extended types including new custom draw types
      const allTypes = [...SYMBOL_TYPES, 'candle', 'chart', 'chip', 'cardback'];

      for (let i = 0; i < count; i++) {
        const type = allTypes[i % allTypes.length];

        symbols.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.18,
          vy: (Math.random() - 0.5) * 0.18,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.003,
          opacity: 0.03 + Math.random() * 0.06,
          size: isMobile ? 14 + Math.random() * 18 : 18 + Math.random() * 28,
          type,
          bullish: Math.random() > 0.4,
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
        if (s.x < -60) s.x = canvas.width + 60;
        if (s.x > canvas.width + 60) s.x = -60;
        if (s.y < -60) s.y = canvas.height + 60;
        if (s.y > canvas.height + 60) s.y = -60;

        // Draw based on type
        if (s.type === 'candle') {
          drawCandlestick(ctx, s.x, s.y, s.size, s.opacity, s.rotation, s.bullish ?? true);
        } else if (s.type === 'chart') {
          drawMiniChart(ctx, s.x, s.y, s.size * 1.5, s.opacity, s.rotation);
        } else if (s.type === 'chip') {
          drawChip(ctx, s.x, s.y, s.size, s.opacity, s.rotation);
        } else if (s.type === 'cardback') {
          drawCardBack(ctx, s.x, s.y, s.size * 1.2, s.opacity, s.rotation);
        } else {
          // Text symbols
          ctx.save();
          ctx.translate(s.x, s.y);
          ctx.rotate(s.rotation);
          ctx.globalAlpha = s.opacity;
          ctx.font = `${s.size}px "Segoe UI", system-ui, sans-serif`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';

          if (s.type === '₿') ctx.fillStyle = '#F7931A';
          else if (s.type === '♥' || s.type === '♦') ctx.fillStyle = '#EF4444';
          else if (s.type === '♠' || s.type === '♣') ctx.fillStyle = '#ffffff';
          else if (s.type === '↗') ctx.fillStyle = '#22C55E';
          else if (s.type === '↘') ctx.fillStyle = '#EF4444';
          else if (s.type === '$' || s.type === '€') ctx.fillStyle = '#22C55E';
          else ctx.fillStyle = '#8E7CC3';

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
