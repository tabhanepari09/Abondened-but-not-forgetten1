import * as THREE from 'three';

// Cache generated textures to avoid regenerating across renders
const textureCache: Record<string, THREE.CanvasTexture> = {};

// Helper pseudo-random simplex-like noise
function noise2D(x: number, y: number): number {
  const n = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453;
  return n - Math.floor(n);
}

function fbm(x: number, y: number, octaves = 5): number {
  let val = 0;
  let amp = 0.5;
  let freq = 1;
  for (let i = 0; i < octaves; i++) {
    val += amp * Math.sin(x * freq * 3.1415 + y * freq * 1.718);
    amp *= 0.5;
    freq *= 2;
  }
  return (val + 1) * 0.5;
}

/**
 * Procedural Earth Texture
 */
export function getEarthTexture(): THREE.CanvasTexture {
  if (textureCache['earth']) return textureCache['earth'];

  const width = 2048;
  const height = 1024;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d')!;

  // Deep ocean base
  const grad = ctx.createLinearGradient(0, 0, 0, height);
  grad.addColorStop(0, '#0B2247');
  grad.addColorStop(0.5, '#071A38');
  grad.addColorStop(1, '#0B2247');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, width, height);

  // Paint landmasses using fractal noise
  const imgData = ctx.getImageData(0, 0, width, height);
  const data = imgData.data;

  for (let y = 0; y < height; y++) {
    const ny = y / height;
    for (let x = 0; x < width; x++) {
      const nx = x / width;
      const index = (y * width + x) * 4;

      // Spherical projection approximation for continent masses
      const elev = fbm(nx * 4, ny * 2, 6) + (Math.sin(nx * Math.PI * 2 * 3) * 0.15);

      if (elev > 0.54) {
        // Land
        const landFactor = (elev - 0.54) / 0.46;
        const isMountain = landFactor > 0.6;
        const isVegetation = landFactor < 0.4 && ny > 0.25 && ny < 0.75;

        if (isMountain) {
          // Brownish mountain ranges
          data[index] = 135 + Math.floor(landFactor * 40);
          data[index + 1] = 115 + Math.floor(landFactor * 30);
          data[index + 2] = 85 + Math.floor(landFactor * 20);
        } else if (isVegetation) {
          // Lush continental green
          data[index] = 34 + Math.floor(landFactor * 25);
          data[index + 1] = 95 + Math.floor(landFactor * 55);
          data[index + 2] = 45 + Math.floor(landFactor * 30);
        } else {
          // Arid / savannah / sandy plateaus
          data[index] = 165 + Math.floor(landFactor * 40);
          data[index + 1] = 145 + Math.floor(landFactor * 30);
          data[index + 2] = 100 + Math.floor(landFactor * 20);
        }
      } else if (elev > 0.51) {
        // Shallow continental shelves (cyan / turquoise)
        data[index] = 20;
        data[index + 1] = 100;
        data[index + 2] = 140;
      }

      // Polar ice caps
      if (ny < 0.08 || ny > 0.92) {
        data[index] = 230;
        data[index + 1] = 240;
        data[index + 2] = 255;
      }
    }
  }

  ctx.putImageData(imgData, 0, 0);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  textureCache['earth'] = texture;
  return texture;
}

/**
 * Procedural Earth Cloud Texture
 */
export function getEarthCloudsTexture(): THREE.CanvasTexture {
  if (textureCache['earth_clouds']) return textureCache['earth_clouds'];

  const width = 1024;
  const height = 512;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d')!;

  const imgData = ctx.createImageData(width, height);
  const data = imgData.data;

  for (let y = 0; y < height; y++) {
    const ny = y / height;
    for (let x = 0; x < width; x++) {
      const nx = x / width;
      const index = (y * width + x) * 4;

      const cloudNoise = fbm(nx * 6 + 1.2, ny * 3, 5);
      const alpha = cloudNoise > 0.52 ? Math.min(240, Math.floor((cloudNoise - 0.52) * 600)) : 0;

      data[index] = 255;
      data[index + 1] = 255;
      data[index + 2] = 255;
      data[index + 3] = alpha;
    }
  }

  ctx.putImageData(imgData, 0, 0);
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  textureCache['earth_clouds'] = texture;
  return texture;
}

/**
 * Procedural Moon Texture (Maria, Highlands, Craters, Ejecta Rays)
 */
export function getMoonTexture(): THREE.CanvasTexture {
  if (textureCache['moon']) return textureCache['moon'];

  const width = 2048;
  const height = 1024;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d')!;

  // Highland grey base
  ctx.fillStyle = '#9E9E9E';
  ctx.fillRect(0, 0, width, height);

  const imgData = ctx.getImageData(0, 0, width, height);
  const data = imgData.data;

  // Major lunar maria positions (normalized x, y, radius)
  const maria = [
    { x: 0.56, y: 0.48, r: 0.16 }, // Mare Tranquillitatis & Serenitatis
    { x: 0.43, y: 0.45, r: 0.22 }, // Oceanus Procellarum
    { x: 0.50, y: 0.35, r: 0.14 }, // Mare Imbrium
    { x: 0.63, y: 0.52, r: 0.10 }, // Mare Fecunditatis
    { x: 0.62, y: 0.38, r: 0.08 }, // Mare Crisium
    { x: 0.48, y: 0.60, r: 0.11 }, // Mare Nubium
  ];

  for (let y = 0; y < height; y++) {
    const ny = y / height;
    for (let x = 0; x < width; x++) {
      const nx = x / width;
      const index = (y * width + x) * 4;

      // Base highland noise
      let tone = 150 + fbm(nx * 12, ny * 6, 5) * 40;

      // Check proximity to lunar maria (darker basalt plains)
      for (const m of maria) {
        const dx = Math.abs(nx - m.x);
        const dy = Math.abs(ny - m.y);
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < m.r) {
          const darkFactor = Math.cos((dist / m.r) * (Math.PI / 2));
          tone -= darkFactor * 65;
        }
      }

      tone = Math.max(50, Math.min(235, Math.floor(tone)));

      data[index] = tone;
      data[index + 1] = tone - 2; // subtle warm grey
      data[index + 2] = tone - 4;
      data[index + 3] = 255;
    }
  }

  ctx.putImageData(imgData, 0, 0);

  // Paint major crater rings and ray systems (like Tycho)
  ctx.strokeStyle = 'rgba(235, 235, 240, 0.45)';
  ctx.lineWidth = 2;

  // Tycho ray system in southern hemisphere
  const tychoX = width * 0.48;
  const tychoY = height * 0.72;
  for (let angle = 0; angle < Math.PI * 2; angle += 0.35) {
    ctx.beginPath();
    ctx.moveTo(tychoX, tychoY);
    ctx.lineTo(
      tychoX + Math.cos(angle) * (180 + Math.random() * 120),
      tychoY + Math.sin(angle) * (180 + Math.random() * 120)
    );
    ctx.stroke();
  }

  // Draw distinct craters
  const craters = [
    { x: tychoX, y: tychoY, r: 16 },
    { x: width * 0.42, y: height * 0.46, r: 14 }, // Copernicus
    { x: width * 0.38, y: height * 0.42, r: 12 }, // Kepler
    { x: width * 0.58, y: height * 0.42, r: 10 }, // Plinius
  ];

  craters.forEach((c) => {
    ctx.beginPath();
    ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(40, 40, 42, 0.75)';
    ctx.fill();
    ctx.strokeStyle = 'rgba(220, 220, 230, 0.9)';
    ctx.lineWidth = 3;
    ctx.stroke();
    // Central peak
    ctx.beginPath();
    ctx.arc(c.x, c.y, 2, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
  });

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  textureCache['moon'] = texture;
  return texture;
}

/**
 * Procedural Mars Texture (Iron oxide deserts, dark basalt albedos, polar caps, Valles Marineris)
 */
export function getMarsTexture(): THREE.CanvasTexture {
  if (textureCache['mars']) return textureCache['mars'];

  const width = 2048;
  const height = 1024;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d')!;

  // Base red-orange desert
  ctx.fillStyle = '#B84523';
  ctx.fillRect(0, 0, width, height);

  const imgData = ctx.getImageData(0, 0, width, height);
  const data = imgData.data;

  // Dark albedo volcanic provinces (Syrtis Major, Acidalia, Sinus Meridiani)
  const darkFeatures = [
    { x: 0.72, y: 0.46, r: 0.16 }, // Syrtis Major
    { x: 0.42, y: 0.32, r: 0.18 }, // Acidalia Planitia
    { x: 0.50, y: 0.54, r: 0.14 }, // Sinus Sabaeus & Meridiani Planum
    { x: 0.25, y: 0.58, r: 0.15 }, // Mare Sirenum
  ];

  for (let y = 0; y < height; y++) {
    const ny = y / height;
    for (let x = 0; x < width; x++) {
      const nx = x / width;
      const index = (y * width + x) * 4;

      const f = fbm(nx * 8, ny * 4, 6);

      // Base rusty hues
      let r = 180 + f * 50;
      let g = 80 + f * 35;
      let b = 40 + f * 20;

      // Dark albedo basalt shading
      for (const feat of darkFeatures) {
        const dx = Math.abs(nx - feat.x);
        const dy = Math.abs(ny - feat.y);
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < feat.r) {
          const darkFactor = Math.cos((dist / feat.r) * (Math.PI / 2));
          r -= darkFactor * 80;
          g -= darkFactor * 45;
          b -= darkFactor * 25;
        }
      }

      // Polar ice caps (dry ice and water ice)
      if (ny < 0.07 || ny > 0.94) {
        r = 235;
        g = 240;
        b = 245;
      }

      data[index] = Math.max(30, Math.min(255, Math.floor(r)));
      data[index + 1] = Math.max(20, Math.min(255, Math.floor(g)));
      data[index + 2] = Math.max(15, Math.min(255, Math.floor(b)));
      data[index + 3] = 255;
    }
  }

  ctx.putImageData(imgData, 0, 0);

  // Paint Valles Marineris canyon rift system
  ctx.strokeStyle = 'rgba(50, 20, 10, 0.85)';
  ctx.lineWidth = 6;
  ctx.beginPath();
  const canyonStartX = width * 0.32;
  const canyonStartY = height * 0.54;
  ctx.moveTo(canyonStartX, canyonStartY);
  ctx.bezierCurveTo(
    canyonStartX + 120, canyonStartY - 10,
    canyonStartX + 240, canyonStartY + 15,
    canyonStartX + 360, canyonStartY + 5
  );
  ctx.stroke();

  // Paint Tharsis volcanic caldera circles (Olympus Mons, Ascraeus, Pavonis, Arsia)
  const volcanoes = [
    { x: width * 0.22, y: height * 0.42, r: 24 }, // Olympus Mons
    { x: width * 0.28, y: height * 0.38, r: 12 }, // Ascraeus Mons
    { x: width * 0.27, y: height * 0.48, r: 12 }, // Pavonis Mons
    { x: width * 0.26, y: height * 0.58, r: 12 }, // Arsia Mons
  ];

  volcanoes.forEach((v) => {
    ctx.beginPath();
    ctx.arc(v.x, v.y, v.r, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(120, 45, 20, 0.5)';
    ctx.fill();
    ctx.strokeStyle = 'rgba(60, 20, 10, 0.8)';
    ctx.lineWidth = 2;
    ctx.stroke();
    // Caldera summit crater
    ctx.beginPath();
    ctx.arc(v.x, v.y, 4, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(30, 10, 5, 0.9)';
    ctx.fill();
  });

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  textureCache['mars'] = texture;
  return texture;
}
