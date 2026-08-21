import React, { useEffect, useRef } from 'react';

export default function AuroraCanvas({ scrollProgress = 0, isScrolling = false }) {
  const canvasRef = useRef(null);
  const animationFrameRef = useRef(null);
  const stateRef = useRef({
    time: 0,
    scrollProgress: 0,
    targetProgress: 0,
    walkCycle: 0,
    stars: [],
    snowflakes: [],
    smokePuffs: [],
  });

  // Keep stateRef target in sync with prop
  useEffect(() => {
    stateRef.current.targetProgress = scrollProgress;
  }, [scrollProgress]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // Initialize Canvas Size
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles();
    };

    window.addEventListener('resize', handleResize);

    // Initialize Particles
    const initParticles = () => {
      const starCount = Math.floor((width * height) / 4000);
      const stars = [];
      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * (height * 0.65),
          radius: Math.random() * 1.5 + 0.5,
          alpha: Math.random() * 0.8 + 0.2,
          twinkleSpeed: Math.random() * 0.03 + 0.005,
        });
      }

      // Initialize Snow / Sparkles
      const snowflakeCount = Math.min(100, Math.floor(width / 15));
      const snowflakes = [];
      for (let i = 0; i < snowflakeCount; i++) {
        snowflakes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 2 + 0.5,
          speedY: Math.random() * 0.6 + 0.2,
          speedX: Math.random() * 0.4 - 0.2,
          alpha: Math.random() * 0.6 + 0.2,
        });
      }

      // Initialize Cabin Smoke Puffs
      const smokePuffs = [];
      for (let i = 0; i < 8; i++) {
        smokePuffs.push({
          xOffset: Math.random() * 4 - 2,
          yOffset: -i * 6,
          radius: Math.random() * 3 + 2,
          alpha: Math.random() * 0.5 + 0.2,
        });
      }

      stateRef.current.stars = stars;
      stateRef.current.snowflakes = snowflakes;
      stateRef.current.smokePuffs = smokePuffs;
    };

    initParticles();

    // Main Render Loop
    const render = () => {
      const state = stateRef.current;
      state.time += 0.015;

      // Smooth scroll lerp for fluid traveler motion
      const delta = state.targetProgress - state.scrollProgress;
      state.scrollProgress += delta * 0.08;

      if (Math.abs(delta) > 0.0005) {
        state.walkCycle += Math.abs(delta) * 15 + 0.08;
      } else {
        state.walkCycle += 0.02; // idle breathing pulse
      }

      const p = state.scrollProgress;
      const t = state.time;

      ctx.clearRect(0, 0, width, height);

      // --- 1. DYNAMIC CELESTIAL SKY GRADIENT (High Sun at Start -> Sunset Night Sky at End) ---
      drawSunToNightSky(ctx, width, height, p);

      // --- 2. TWINKLING STARS (Fade in as Sun dips at the end!) ---
      const starOpacity = Math.min(1, Math.max(0.1, p * 1.2));
      state.stars.forEach((star) => {
        star.alpha += Math.sin(t * 2 + star.x) * star.twinkleSpeed;
        const currentAlpha = Math.max(0.05, Math.min(1, star.alpha)) * starOpacity;
        ctx.fillStyle = `rgba(255, 255, 255, ${currentAlpha})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y - p * 80 * (star.radius / 2), star.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // --- 3. DYNAMIC SUN ORB (High at start, dips behind mountain at end!) ---
      drawSunDippingBehindMountain(ctx, width, height, p, t);

      // --- 4. AURORA BOREALIS RIBBONS (Full vibrant glowing Aurora at end!) ---
      drawAuroraRibbons(ctx, width, height, t, p);

      // --- 5. MOUNTAIN RANGES ---
      drawMountainLayer(
        ctx,
        width,
        height,
        height * 0.52 + p * 40,
        width * 0.5,
        height * 0.32,
        '#0f172a',
        '#1e293b',
        p,
        t,
        1
      );

      drawMountainLayer(
        ctx,
        width,
        height,
        height * 0.62 + p * 60,
        width * 0.3,
        height * 0.26,
        '#090d16',
        '#0f172a',
        p,
        t,
        2
      );

      drawMountainLayer(
        ctx,
        width,
        height,
        height * 0.74 + p * 80,
        width * 0.7,
        height * 0.22,
        '#030712',
        '#090d16',
        p,
        t,
        3
      );

      // --- 6. 100% FIXED RIGHT-SIDE TRAIL ---
      const pathPoints = getRightsideCurvedPathCoordinates(width, height);
      drawSnowyPathway(ctx, width, height, pathPoints, t, p);

      // --- 7. COZY MOUNTAIN CABIN HOUSE WITH FLOATING Z Z Z SLEEP SYMBOLS ---
      drawSummitHouse(ctx, width, height, pathPoints, p, t, state.smokePuffs);

      // --- 8. WAYPOINT BEACONS ALONG TRAIL ---
      drawWaypointBeacons(ctx, width, height, pathPoints, p, t);

      // --- 9. BACK-RIGHT PERSPECTIVE: TRAVELER + DOG & CAT (Walk inside cabin at end!) ---
      drawTravelerBackView(ctx, width, height, p, state.walkCycle, pathPoints);

      // --- 10. FLOATING SNOW PARTICLES ---
      state.snowflakes.forEach((flake) => {
        flake.y += flake.speedY;
        flake.x += Math.sin(t + flake.y) * flake.speedX;
        if (flake.y > height) flake.y = -10;
        if (flake.x > width) flake.x = 0;
        if (flake.x < 0) flake.x = width;

        const flakeAlpha = flake.alpha * (0.6 + p * 0.4);
        ctx.fillStyle = `rgba(255, 250, 240, ${flakeAlpha * 0.8})`;
        ctx.beginPath();
        ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10 w-full h-full"
      style={{ touchAction: 'none' }}
    />
  );
}

// --- HELPER: HIGH SUN AT START (p=0) -> DIPS TO NIGHT AURORA AT END (p=1.0) ---
function drawSunToNightSky(ctx, width, height, p) {
  const skyGrad = ctx.createLinearGradient(0, 0, 0, height * 0.85);

  if (p < 0.5) {
    // ☀️ HIGH SUNNY DAYTIME SKY (p: 0.0 -> 0.5): Slate Blue & Golden Sunlit Sky
    const factor = p / 0.5;
    const topHue = Math.floor(215 + factor * 10);
    const topSat = Math.floor(65 - factor * 15);
    const topLight = Math.floor(18 - factor * 6);

    const horizonHue = Math.floor(38 + factor * 20);
    const horizonLight = Math.floor(32 - factor * 12);

    skyGrad.addColorStop(0, `hsl(${topHue}, ${topSat}%, ${topLight}%)`);
    skyGrad.addColorStop(0.5, `hsl(${topHue - 15}, 55%, ${topLight + 4}%)`);
    skyGrad.addColorStop(1, `hsl(${horizonHue}, 75%, ${horizonLight}%)`);
  } else {
    // 🌌 SUNSET DIPPING TO DEEP COSMIC NIGHT SKY (p: 0.5 -> 1.0)
    const factor = (p - 0.5) / 0.5;
    const topHue = Math.floor(225 + factor * 20);     // 225 -> 245 Midnight Indigo
    const topLight = Math.floor(12 - factor * 8);    // 12 -> 4 Deep Night

    const horizonHue = Math.floor(340 - factor * 120); // Crimson -> Indigo Night
    const horizonLight = Math.floor(20 - factor * 14);

    skyGrad.addColorStop(0, `hsl(${topHue}, 65%, ${Math.max(4, topLight)}%)`);
    skyGrad.addColorStop(0.5, `hsl(${topHue + 10}, 60%, ${Math.max(6, topLight + 2)}%)`);
    skyGrad.addColorStop(1, `hsl(${horizonHue}, 70%, ${Math.max(8, horizonLight)}%)`);
  }

  ctx.fillStyle = skyGrad;
  ctx.fillRect(0, 0, width, height);

  // Sunset Horizon Glow (Intensifies as Sun dips behind mountain at p=0.3+)
  if (p > 0.3) {
    const horizonGlow = ctx.createLinearGradient(0, height * 0.35, 0, height * 0.75);
    const glowAlpha = Math.min(0.65, (p - 0.3) * 0.9);
    horizonGlow.addColorStop(0, 'rgba(255, 255, 255, 0)');
    horizonGlow.addColorStop(0.6, p > 0.7 ? `rgba(168, 85, 247, ${glowAlpha * 0.35})` : `rgba(245, 158, 11, ${glowAlpha * 0.45})`);
    horizonGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');

    ctx.fillStyle = horizonGlow;
    ctx.fillRect(0, 0, width, height);
  }
}

// --- HELPER: SUN DIPPING BEHIND MOUNTAINS ---
function drawSunDippingBehindMountain(ctx, width, height, p, t) {
  const sunX = width * (0.45 + p * 0.38);
  const sunY = height * (0.16 + p * 0.52);
  const sunRadius = Math.max(26, Math.min(50, width * 0.035));

  const sunAlpha = Math.max(0, 1 - Math.max(0, (p - 0.7) * 4));
  if (sunAlpha <= 0) return;

  ctx.save();

  // Rotating Sunbeams
  ctx.save();
  ctx.translate(sunX, sunY);
  ctx.rotate(t * 0.08);

  const rayCount = 12;
  for (let i = 0; i < rayCount; i++) {
    const angle = (i * Math.PI * 2) / rayCount;
    const rayLength = sunRadius * (2.4 + Math.sin(t * 2 + i) * 0.4);

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(Math.cos(angle - 0.1) * rayLength, Math.sin(angle - 0.1) * rayLength);
    ctx.lineTo(Math.cos(angle + 0.1) * rayLength, Math.sin(angle + 0.1) * rayLength);
    ctx.closePath();

    ctx.fillStyle = `rgba(254, 240, 138, ${0.22 * sunAlpha})`;
    ctx.fill();
  }
  ctx.restore();

  // Outer Sun Corona Glow
  const coronaGrad = ctx.createRadialGradient(sunX, sunY, sunRadius * 0.2, sunX, sunY, sunRadius * 4.5);
  coronaGrad.addColorStop(0, `rgba(255, 255, 255, ${0.95 * sunAlpha})`);
  coronaGrad.addColorStop(0.3, `rgba(254, 240, 138, ${0.85 * sunAlpha})`);
  coronaGrad.addColorStop(0.6, `rgba(245, 158, 11, ${0.45 * sunAlpha})`);
  coronaGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

  ctx.beginPath();
  ctx.arc(sunX, sunY, sunRadius * 4.5, 0, Math.PI * 2);
  ctx.fillStyle = coronaGrad;
  ctx.fill();

  // Bright Sun Core Disc
  ctx.beginPath();
  ctx.arc(sunX, sunY, sunRadius, 0, Math.PI * 2);
  ctx.fillStyle = `rgba(255, 255, 255, ${sunAlpha})`;
  ctx.shadowColor = '#fbbf24';
  ctx.shadowBlur = 35;
  ctx.fill();

  ctx.restore();
}

// --- HELPER: AURORA BOREALIS RIBBONS ---
function drawAuroraRibbons(ctx, width, height, t, p) {
  const auroraOpacity = Math.min(1, Math.max(0.15, p * 1.3));

  const ribbonConfigs = [
    {
      colorStop1: `rgba(16, 185, 129, ${0.55 * auroraOpacity})`,
      colorStop2: `rgba(56, 189, 248, ${0.35 * auroraOpacity})`,
      colorStop3: 'rgba(139, 92, 246, 0.0)',
      baseY: height * 0.22,
      amplitude: 50 + p * 20,
      frequency: 0.004,
      speed: 0.8,
    },
    {
      colorStop1: `rgba(6, 182, 212, ${0.5 * auroraOpacity})`,
      colorStop2: `rgba(168, 85, 247, ${0.4 * auroraOpacity})`,
      colorStop3: 'rgba(15, 23, 42, 0.0)',
      baseY: height * 0.18,
      amplitude: 70 + p * 30,
      frequency: 0.003,
      speed: 1.2,
    },
  ];

  ctx.save();
  ctx.globalCompositeOperation = 'screen';

  ribbonConfigs.forEach((cfg) => {
    ctx.beginPath();
    ctx.moveTo(0, 0);

    for (let x = 0; x <= width; x += 15) {
      const yWave =
        Math.sin(x * cfg.frequency + t * cfg.speed) * cfg.amplitude +
        Math.cos(x * cfg.frequency * 0.5 - t * 0.5) * (cfg.amplitude * 0.5);
      const y = cfg.baseY + yWave - p * 60;
      ctx.lineTo(x, y);
    }

    ctx.lineTo(width, 0);
    ctx.closePath();

    const grad = ctx.createLinearGradient(0, cfg.baseY - 100, 0, cfg.baseY + 150);
    grad.addColorStop(0, cfg.colorStop3);
    grad.addColorStop(0.4, cfg.colorStop1);
    grad.addColorStop(0.7, cfg.colorStop2);
    grad.addColorStop(1, cfg.colorStop3);

    ctx.fillStyle = grad;
    ctx.fill();
  });

  ctx.restore();
}

// --- HELPER: MOUNTAIN LAYERS ---
function drawMountainLayer(
  ctx,
  width,
  height,
  baseY,
  peakX,
  peakHeight,
  colorDark,
  colorMid,
  p,
  t,
  layerIndex
) {
  ctx.save();

  ctx.beginPath();
  ctx.moveTo(0, height);
  ctx.lineTo(0, baseY);

  const points = [];
  const segments = 12;
  const segmentWidth = width / segments;

  for (let i = 0; i <= segments; i++) {
    const x = i * segmentWidth;
    let y = baseY;

    const distToPeak = Math.abs(x - peakX) / (width * 0.5);
    const peakFactor = Math.max(0, 1 - distToPeak * distToPeak);

    const noise =
      Math.sin(i * 1.5 + layerIndex) * 35 +
      Math.cos(i * 2.8 + layerIndex * 2) * 20;

    y = baseY - peakFactor * peakHeight + noise;
    points.push({ x, y });
    ctx.lineTo(x, y);
  }

  ctx.lineTo(width, height);
  ctx.closePath();

  const mtnGrad = ctx.createLinearGradient(0, baseY - peakHeight, 0, height);
  mtnGrad.addColorStop(0, colorMid);
  mtnGrad.addColorStop(0.6, colorDark);
  mtnGrad.addColorStop(1, '#020617');
  ctx.fillStyle = mtnGrad;
  ctx.fill();

  // Snowy Crest Reflection
  ctx.beginPath();
  for (let i = 0; i < points.length - 1; i++) {
    const p1 = points[i];
    const p2 = points[i + 1];
    if (p1.y < baseY - 40) {
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.lineTo(p2.x - 15, p2.y + 25);
      ctx.lineTo(p1.x + 10, p1.y + 30);
    }
  }
  ctx.closePath();

  const snowReflectColor =
    p > 0.7
      ? `rgba(56, 189, 248, ${0.35 + Math.sin(t + layerIndex) * 0.05})`
      : `rgba(251, 191, 36, ${0.28 + Math.sin(t + layerIndex) * 0.05})`;

  ctx.fillStyle = snowReflectColor;
  ctx.fill();

  ctx.restore();
}

// --- HELPER: 100% FIXED RIGHT-SIDE TRAIL ---
function getRightsideCurvedPathCoordinates(width, height) {
  const isMobile = width < 768;

  const startX = isMobile ? width * 0.85 : width * 0.92;
  const startY = height * 0.96;

  const endX = isMobile ? width * 0.88 : width * 0.94;
  const endY = height * 0.45;

  const cp1X = isMobile ? width * 0.92 : width * 0.98;
  const cp1Y = height * 0.76;

  const cp2X = isMobile ? width * 0.78 : width * 0.85;
  const cp2Y = height * 0.60;

  return { startX, startY, endX, endY, cp1X, cp1Y, cp2X, cp2Y };
}

// --- HELPER: DRAW FIXED SNOWY PATHWAY ---
function drawSnowyPathway(ctx, width, height, path, t, p) {
  ctx.save();

  const { startX, startY, endX, endY, cp1X, cp1Y, cp2X, cp2Y } = path;

  // 1. Dark Outer Path Boundary
  ctx.beginPath();
  ctx.moveTo(startX, startY);
  ctx.bezierCurveTo(cp1X, cp1Y, cp2X, cp2Y, endX, endY);
  ctx.lineWidth = Math.max(16, width * 0.045);
  ctx.strokeStyle = 'rgba(15, 23, 42, 0.95)';
  ctx.stroke();

  // 2. Glowing Snow Trail Surface
  const trailGrad = ctx.createLinearGradient(startX, startY, endX, endY);

  if (p > 0.7) {
    trailGrad.addColorStop(0, 'rgba(0, 255, 210, 0.85)');
    trailGrad.addColorStop(0.5, 'rgba(56, 189, 248, 0.75)');
    trailGrad.addColorStop(1, 'rgba(168, 85, 247, 0.85)');
  } else {
    trailGrad.addColorStop(0, 'rgba(251, 191, 36, 0.85)');
    trailGrad.addColorStop(0.5, 'rgba(245, 158, 11, 0.75)');
    trailGrad.addColorStop(1, 'rgba(56, 189, 248, 0.85)');
  }

  ctx.lineWidth = Math.max(8, width * 0.022);
  ctx.strokeStyle = trailGrad;
  ctx.shadowColor = p > 0.7 ? '#00ffd2' : '#fbbf24';
  ctx.shadowBlur = 22;
  ctx.stroke();

  // 3. Inner Pulsing Trail Center Line
  ctx.shadowBlur = 0;
  ctx.lineWidth = 2.5;
  ctx.strokeStyle = '#ffffff';
  ctx.setLineDash([8, 12]);
  ctx.lineDashOffset = -t * 18;
  ctx.stroke();

  ctx.restore();
}

// --- HELPER: COZY MOUNTAIN CABIN HOUSE WITH FLOATING Z Z Z SLEEP SYMBOLS ---
function drawSummitHouse(ctx, width, height, path, p, t, smokePuffs) {
  const { endX, endY } = path;

  ctx.save();
  ctx.translate(endX, endY);

  const houseScale = 0.85;
  ctx.scale(houseScale, houseScale);

  // Warm Cabin Window Glow Halo
  ctx.beginPath();
  ctx.arc(0, -15, 30, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(251, 191, 36, 0.35)';
  ctx.shadowColor = '#fbbf24';
  ctx.shadowBlur = 30;
  ctx.fill();

  // Chimney Smoke Puffs floating up into sky
  smokePuffs.forEach((puff, idx) => {
    puff.yOffset -= 0.3;
    if (puff.yOffset < -35) puff.yOffset = 0;

    const smokeX = -14 + puff.xOffset + Math.sin(t * 2 + idx) * 3;
    const smokeY = -42 + puff.yOffset;

    ctx.beginPath();
    ctx.arc(smokeX, smokeY, puff.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(241, 245, 249, ${puff.alpha * 0.6})`;
    ctx.fill();
  });

  // 😴 FLOATING CARTOON Z Z Z SLEEP SYMBOLS (Drift up from chimney when figures enter at p >= 0.85!)
  if (p >= 0.85) {
    const zAlpha = Math.min(1, (p - 0.85) * 6.5);
    ctx.save();
    ctx.shadowColor = '#fbbf24';
    ctx.shadowBlur = 10;

    const zSymbols = [
      { text: 'Z', font: 'bold 15px sans-serif', yBase: -52, xOffset: -12, speed: 20 },
      { text: 'z', font: 'bold 12px sans-serif', yBase: -68, xOffset: -6,  speed: 24 },
      { text: 'z', font: 'bold 9px sans-serif',  yBase: -82, xOffset: -2,  speed: 28 },
    ];

    zSymbols.forEach((z, idx) => {
      const floatY = z.yBase - ((t * z.speed + idx * 15) % 30);
      const floatX = z.xOffset + Math.sin(t * 3 + idx) * 4;
      const currentAlpha = Math.max(0, zAlpha * (1 - (z.yBase - floatY) / 30));

      ctx.font = z.font;
      ctx.fillStyle = `rgba(251, 191, 36, ${currentAlpha})`;
      ctx.fillText(z.text, floatX, floatY);
    });

    ctx.restore();
  }

  // Log Cabin Base Body
  ctx.shadowBlur = 0;
  ctx.fillStyle = '#1e1b18';
  ctx.strokeStyle = '#451a03';
  ctx.lineWidth = 2;

  ctx.beginPath();
  ctx.roundRect(-24, -30, 48, 30, 3);
  ctx.fill();
  ctx.stroke();

  // Roof
  ctx.beginPath();
  ctx.moveTo(-30, -30);
  ctx.lineTo(0, -50);
  ctx.lineTo(30, -30);
  ctx.closePath();
  ctx.fillStyle = '#0f172a';
  ctx.fill();
  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 2;
  ctx.stroke();

  // Roof Snow Cap Layer
  ctx.beginPath();
  ctx.moveTo(-32, -30);
  ctx.lineTo(0, -52);
  ctx.lineTo(32, -30);
  ctx.lineTo(26, -26);
  ctx.lineTo(0, -44);
  ctx.lineTo(-26, -26);
  ctx.closePath();
  ctx.fillStyle = '#f8fafc';
  ctx.fill();

  // Chimney
  ctx.fillStyle = '#334155';
  ctx.fillRect(-18, -46, 7, 14);

  // Windows
  ctx.fillStyle = '#fbbf24';
  ctx.shadowColor = '#fbbf24';
  ctx.shadowBlur = 15;
  ctx.fillRect(-16, -22, 10, 10);
  ctx.fillRect(6, -22, 10, 10);

  // Door
  ctx.shadowBlur = 0;
  ctx.fillStyle = '#362312';
  ctx.fillRect(-4, -18, 8, 18);

  ctx.restore();
}

// --- HELPER: WAYPOINT BEACONS ALONG FIXED TRAIL ---
function drawWaypointBeacons(ctx, width, height, path, p, t) {
  const waypoints = [0.18, 0.42, 0.65, 0.88];

  waypoints.forEach((wp, idx) => {
    const pt = interpolateBezier(path, wp);
    const isReached = p >= wp;

    ctx.save();
    ctx.translate(pt.x, pt.y);

    const scale = 1 - wp * 0.4;
    ctx.scale(scale, scale);

    const activeColor = p > 0.7 ? '#00ffd2' : '#fbbf24';

    // Beacon base
    ctx.beginPath();
    ctx.arc(0, 0, 9, 0, Math.PI * 2);
    ctx.fillStyle = isReached ? activeColor : '#1e293b';
    ctx.shadowColor = isReached ? activeColor : 'transparent';
    ctx.shadowBlur = isReached ? 25 : 0;
    ctx.fill();

    // Beacon ring pulse
    if (isReached) {
      const pulse = (t * 2 + idx) % 2;
      ctx.beginPath();
      ctx.arc(0, 0, 9 + pulse * 14, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(0, 255, 210, ${1 - pulse / 2})`;
      ctx.lineWidth = 2;
      ctx.stroke();
    }

    ctx.restore();
  });
}

// --- HELPER: BACK-RIGHT PERSPECTIVE: TRAVELER + DOG & CAT (Walk inside cabin at end!) ---
function drawTravelerBackView(ctx, width, height, p, walkCycle, path) {
  // If p >= 0.98, the figures have entered inside the warm cabin to sleep!
  if (p >= 0.98) return;

  const isMobile = width < 768;
  const clampedP = Math.max(0.02, Math.min(0.96, p));
  const pos = interpolateBezier(path, clampedP);

  // Scale down into distance
  const baseScale = isMobile ? 1.0 : 1.25;
  const scale = Math.max(0.32, baseScale - clampedP * 0.88);

  // Fade out opacity as traveler & pets step inside the cabin door (p >= 0.88 -> 0.98)
  const entranceFade = p >= 0.88 ? Math.max(0, 1 - (p - 0.88) / 0.10) : 1;
  if (entranceFade <= 0) return;

  const isDark = p >= 0.45;
  const accentColor = isDark ? '#00ffd2' : '#fbbf24';

  ctx.save();
  ctx.translate(pos.x, pos.y);
  ctx.scale(scale, scale);
  ctx.globalAlpha = entranceFade;

  // 1. Ground Shadows (Traveler, Dog & Cat)
  ctx.shadowBlur = 0;
  ctx.fillStyle = 'rgba(2, 6, 23, 0.9)';
  // Traveler shadow
  ctx.beginPath(); ctx.ellipse(0, 4, 24, 8, 0, 0, Math.PI * 2); ctx.fill();
  // Dog shadow ahead right
  ctx.beginPath(); ctx.ellipse(20, -4, 11, 4, 0, 0, Math.PI * 2); ctx.fill();
  // Cat shadow left
  ctx.beginPath(); ctx.ellipse(-18, 2, 9, 3.5, 0, 0, Math.PI * 2); ctx.fill();

  // 🐶 2. LOYAL DOG TROTTING AHEAD (BACK-RIGHT VIEW)
  ctx.save();
  ctx.translate(20, -8);

  const dogLeg1 = Math.sin(walkCycle * 1.6) * 0.5;
  const dogLeg2 = -Math.sin(walkCycle * 1.6) * 0.5;

  ctx.strokeStyle = '#fbbf24';
  ctx.lineWidth = 2.5;
  ctx.lineCap = 'round';

  ctx.beginPath(); ctx.moveTo(-4, 0); ctx.lineTo(-4 + Math.sin(dogLeg1) * 6, 8); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(4, 0);  ctx.lineTo(4 + Math.sin(dogLeg2) * 6, 8);  ctx.stroke();

  ctx.beginPath();
  ctx.roundRect(-8, -12, 16, 12, 4);
  ctx.fillStyle = '#78350f';
  ctx.fill();
  ctx.strokeStyle = '#f59e0b';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(0, -14, 5, 0, Math.PI * 2);
  ctx.fillStyle = '#92400e';
  ctx.fill();

  ctx.beginPath(); ctx.moveTo(-3, -19); ctx.lineTo(-1, -16); ctx.lineTo(-5, -14); ctx.fillStyle = '#f59e0b'; ctx.fill();
  ctx.beginPath(); ctx.moveTo(3, -19);  ctx.lineTo(1, -16);  ctx.lineTo(5, -14);  ctx.fillStyle = '#f59e0b'; ctx.fill();

  const tailWag = Math.sin(walkCycle * 2.5) * 5;
  ctx.beginPath();
  ctx.moveTo(0, -10);
  ctx.lineTo(tailWag, -22);
  ctx.strokeStyle = '#fbbf24';
  ctx.lineWidth = 2.5;
  ctx.stroke();
  ctx.restore();

  // 🐱 3. NIMBLE CAT WALKING BESIDE (BACK-LEFT VIEW)
  ctx.save();
  ctx.translate(-18, -2);

  const catLeg1 = Math.sin(walkCycle * 1.3) * 0.4;
  const catLeg2 = -Math.sin(walkCycle * 1.3) * 0.4;

  ctx.strokeStyle = '#e2e8f0';
  ctx.lineWidth = 2;

  ctx.beginPath(); ctx.moveTo(-4, 0); ctx.lineTo(-4 + Math.sin(catLeg1) * 5, 6); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(3, 0);  ctx.lineTo(3 + Math.sin(catLeg2) * 5, 6);  ctx.stroke();

  ctx.beginPath();
  ctx.roundRect(-6, -10, 12, 10, 3);
  ctx.fillStyle = '#0f172a';
  ctx.fill();
  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(0, -12, 4, 0, Math.PI * 2);
  ctx.fillStyle = '#1e293b';
  ctx.fill();

  ctx.beginPath(); ctx.moveTo(-3, -17); ctx.lineTo(-1, -13); ctx.lineTo(-5, -12); ctx.fillStyle = '#38bdf8'; ctx.fill();
  ctx.beginPath(); ctx.moveTo(3, -17);  ctx.lineTo(1, -13);  ctx.lineTo(5, -12);  ctx.fillStyle = '#38bdf8'; ctx.fill();

  const catTailCurve = Math.sin(walkCycle * 1.2) * 4;
  ctx.beginPath();
  ctx.moveTo(0, -8);
  ctx.bezierCurveTo(-6, -16, 4, -22 + catTailCurve, 2, -24);
  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.restore();

  // 🧍 4. TRAVELER SILHOUETTE (BACK-RIGHT VIEW)
  const legAngle1 = Math.sin(walkCycle) * 0.55;
  const legAngle2 = -Math.sin(walkCycle) * 0.55;

  ctx.strokeStyle = accentColor;
  ctx.fillStyle = '#0f172a';
  ctx.lineWidth = 5.5;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  ctx.beginPath();
  ctx.moveTo(-4, -18);
  ctx.lineTo(-4 + Math.sin(legAngle1) * 12, Math.cos(legAngle1) * 6);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(4, -18);
  ctx.lineTo(4 + Math.sin(legAngle2) * 12, Math.cos(legAngle2) * 6);
  ctx.stroke();

  ctx.beginPath();
  ctx.fillStyle = '#020617';
  ctx.strokeStyle = accentColor;
  ctx.lineWidth = 3;
  ctx.shadowColor = accentColor;
  ctx.shadowBlur = 12;

  ctx.moveTo(-14, -50);
  ctx.lineTo(14, -50);
  ctx.lineTo(12, -18);
  ctx.lineTo(-12, -18);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#1e293b';
  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 2;
  ctx.roundRect(-10, -46, 20, 24, 4);
  ctx.fill();
  ctx.stroke();

  ctx.strokeStyle = '#00ffd2';
  ctx.lineWidth = 1;
  ctx.strokeRect(-7, -40, 14, 12);

  ctx.beginPath();
  ctx.arc(0, -56, 11, 0, Math.PI * 2);
  ctx.fillStyle = '#090d16';
  ctx.shadowColor = accentColor;
  ctx.shadowBlur = 12;
  ctx.fill();
  ctx.strokeStyle = accentColor;
  ctx.lineWidth = 2.5;
  ctx.stroke();

  const armSwing = Math.sin(walkCycle * 0.8) * 4;
  const staffX = 16 + armSwing;
  const staffYUpper = -72;
  const staffYLower = 8;

  ctx.shadowBlur = 0;
  ctx.beginPath();
  ctx.moveTo(staffX, staffYUpper);
  ctx.lineTo(staffX - 2, staffYLower);
  ctx.strokeStyle = '#f59e0b';
  ctx.lineWidth = 3.5;
  ctx.stroke();

  if (isDark) {
    ctx.beginPath();
    ctx.arc(staffX, staffYUpper, 8, 0, Math.PI * 2);
    ctx.fillStyle = '#fbbf24';
    ctx.shadowColor = '#fbbf24';
    ctx.shadowBlur = 35;
    ctx.fill();

    const lightGrad = ctx.createRadialGradient(staffX, staffYUpper, 2, staffX, staffYUpper, 80);
    lightGrad.addColorStop(0, 'rgba(251, 191, 36, 0.7)');
    lightGrad.addColorStop(0.5, 'rgba(245, 158, 11, 0.3)');
    lightGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = lightGrad;
    ctx.beginPath();
    ctx.arc(staffX, staffYUpper, 80, 0, Math.PI * 2);
    ctx.fill();
  } else {
    ctx.beginPath();
    ctx.arc(staffX, staffYUpper, 5, 0, Math.PI * 2);
    ctx.fillStyle = '#92400e';
    ctx.fill();
  }

  ctx.restore();
}

// --- BEZIER INTERPOLATION ---
function interpolateBezier(path, t) {
  const { startX, startY, endX, endY, cp1X, cp1Y, cp2X, cp2Y } = path;
  const u = 1 - t;
  const tt = t * t;
  const uu = u * u;
  const uuu = uu * u;
  const ttt = tt * t;

  const x =
    uuu * startX +
    3 * uu * t * cp1X +
    3 * u * tt * cp2X +
    ttt * endX;

  const y =
    uuu * startY +
    3 * uu * t * cp1Y +
    3 * u * tt * cp2Y +
    ttt * endY;

  return { x, y };
}
