import * as THREE from 'three';

// Fresnel atmospheric glow shader
export const AtmosphereGlowShader = {
  uniforms: {
    color: { value: new THREE.Color(0x55ddf5) },
    viewVector: { value: new THREE.Vector3() },
    c: { value: 0.35 },
    p: { value: 3.5 },
  },
  vertexShader: `
    uniform vec3 viewVector;
    uniform float c;
    uniform float p;
    varying float intensity;
    void main() {
      vec3 vNormal = normalize(normalMatrix * normal);
      vec3 vNormel = normalize(normalMatrix * viewVector);
      intensity = pow(c - dot(vNormal, vNormel), p);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform vec3 color;
    varying float intensity;
    void main() {
      vec3 glow = color * intensity;
      gl_FragColor = vec4(glow, intensity * 0.75);
    }
  `,
};
