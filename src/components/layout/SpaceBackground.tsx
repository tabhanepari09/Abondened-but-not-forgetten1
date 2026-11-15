import React, { useEffect, useRef } from 'react';

export const SpaceBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // 1. Multi-layered Stars (Distant, Mid-range, and Bright Stellar Beacons)
    const starCount = 380;
    const stars = Array.from({ length: starCount }, () => {
      const isBright = Math.random() > 0.92;
      const isCyan = Math.random() > 0.75;
      const isAmber = Math.random() > 0.85;
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        size: isBright ? Math.random() * 2.2 + 1.2 : Math.random() * 1.4 + 0.3,
        alpha: Math.random() * 0.85 + 0.15,
        baseAlpha: Math.random() * 0.7 + 0.3,
        twinkleSpeed: Math.random() * 0.03 + 0.008,
        isBright,
        color: isCyan ? '#55DDF5' : isAmber ? '#FFB703' : '#FFFFFF',
      };
    });

    // 2. Cosmic Stardust Particles (Floating gently through the space void)
    const dustCount = 45;
    const dustParticles = Array.from({ length: dustCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.25,
      vy: -Math.random() * 0.35 - 0.1, // Gently drifting upward
      size: Math.random() * 2.5 + 0.8,
      alpha: Math.random() * 0.4 + 0.1,
      color: Math.random() > 0.5 ? 'rgba(85, 221, 245, ' : 'rgba(165, 233, 245, ',
    }));

    // 3. Shooting Star / Meteor Streaks
    interface Meteor {
      x: number;
      y: number;
      length: number;
      speed: number;
      alpha: number;
      angle: number;
      active: boolean;
    }

    const meteors: Meteor[] = [
      { x: 0, y: 0, length: 0, speed: 0, alpha: 0, angle: 0, active: false },
      { x: 0, y: 0, length: 0, speed: 0, alpha: 0, angle: 0, active: false },
    ];

    const spawnMeteor = (m: Meteor) => {
      m.x = Math.random() * width * 0.85;
      m.y = Math.random() * (height * 0.35);
      m.length = Math.random() * 120 + 70;
      m.speed = Math.random() * 12 + 14;
      m.alpha = 1;
      m.angle = (Math.PI / 4) + (Math.random() - 0.5) * 0.25;
      m.active = true;
    };

    let lastMeteorTime = Date.now();

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render Starfield
      stars.forEach((star) => {
        star.alpha += Math.sin(Date.now() * star.twinkleSpeed) * 0.018;
        const currentAlpha = Math.max(0.12, Math.min(1, star.alpha));

        ctx.fillStyle = star.color;
        ctx.globalAlpha = currentAlpha;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();

        // Extra stellar halo for the brightest stars
        if (star.isBright) {
          ctx.globalAlpha = currentAlpha * 0.35;
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size * 2.8, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // Render Drifting Cosmic Stardust
      dustParticles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < 0) p.y = height;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;

        ctx.fillStyle = p.color + p.alpha + ')';
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Periodically trigger shooting stars
      if (Date.now() - lastMeteorTime > 5000) {
        const inactive = meteors.find((m) => !m.active);
        if (inactive) {
          spawnMeteor(inactive);
          lastMeteorTime = Date.now();
        }
      }

      // Render Meteors
      meteors.forEach((m) => {
        if (!m.active) return;
        m.x += Math.cos(m.angle) * m.speed;
        m.y += Math.sin(m.angle) * m.speed;
        m.alpha -= 0.015;

        if (m.alpha <= 0 || m.x > width || m.y > height) {
          m.active = false;
          return;
        }

        ctx.globalAlpha = m.alpha;
        const grad = ctx.createLinearGradient(
          m.x,
          m.y,
          m.x - Math.cos(m.angle) * m.length,
          m.y - Math.sin(m.angle) * m.length
        );
        grad.addColorStop(0, '#FFFFFF');
        grad.addColorStop(0.2, '#55DDF5');
        grad.addColorStop(0.6, 'rgba(85, 221, 245, 0.4)');
        grad.addColorStop(1, 'transparent');

        ctx.strokeStyle = grad;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(
          m.x - Math.cos(m.angle) * m.length,
          m.y - Math.sin(m.angle) * m.length
        );
        ctx.stroke();
      });

      ctx.globalAlpha = 1;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* 1. Deep Cosmic Void Backdrop Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#020409] via-[#040816] to-[#020409]" />

      {/* 2. Ethereal Cosmic Nebulae (Cyan, Deep Violet, and Stellar Gold Aura) */}
      {/* Cyan Nebula Cluster (Top Left) */}
      <div className="absolute -top-32 -left-32 w-[750px] h-[750px] rounded-full bg-gradient-to-br from-[#55DDF5]/14 via-[#0284C7]/8 to-transparent blur-[160px] animate-pulse-subtle" />

      {/* Deep Violet / Ultraviolet Cosmic Cloud (Center Right) */}
      <div className="absolute top-1/4 -right-32 w-[700px] h-[700px] rounded-full bg-gradient-to-bl from-[#8B5CF6]/12 via-[#4F46E5]/6 to-transparent blur-[150px]" />

      {/* Solar Amber Stellar Glow (Bottom Left) */}
      <div className="absolute -bottom-32 left-1/3 w-[800px] h-[650px] rounded-full bg-gradient-to-t from-[#FF9F1C]/10 via-[#D9532F]/5 to-transparent blur-[170px]" />

      {/* Deep Space Blue Rift (Center) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] rounded-full bg-radial-gradient from-[#0A1633]/30 to-transparent blur-[120px]" />

      {/* 3. Real-time Animated Starfield + Meteors Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* 4. Fine Astronomical Grid Lines & Orbital Rings */}
      <div className="absolute inset-0 tech-grid opacity-35" />

      {/* 5. Vignette Shadow around screen edges */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#020409]/30 to-[#020409]/80" />
    </div>
  );
};
