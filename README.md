# AFTER THE FOOTPRINTS
### *An Interactive 3D Space Heritage Archive*
> *"The mission may end, but its footprint remains."*

A digital archive and interactive 3D museum documenting historically significant abandoned human and robotic exploration hardware resting on the Moon and Mars. Built for the NASA-themed hackathon and educational exploration.

---

## 🚀 Key Features

1. **Cinematic 3D Landing Experience**
   - High-fidelity real-time 3D Earth, Moon, and Mars spheres with procedural surface shaders and atmospheric rim glow.
   - Smooth mouse parallax, moving starfields, and space ambient audio.
   - Fast loading with telemetry progress indicator.

2. **The Story & Space Heritage Philosophy**
   - Archival essay exploring why space archaeology and heritage preservation matters beyond low Earth orbit.
   - Dual 3D celestial visualizer contrasting the airless vacuum of the Moon with the wind-swept dust plains of Mars.

3. **Explore the Worlds**
   - Interactive 3D orbital viewer for Earth, the Moon, and Mars.
   - Scientific telemetry panels detailing equatorial diameter, surface gravity, surface temperature, atmospheric composition, and documented artifact counts.

4. **The Space Heritage Archive (6 Documented In Situ Artifacts)**
   - **Moon Archive:**
     1. *Apollo 11 Lunar Module Descent Stage (Eagle)* — Tranquility Base (0.67408° N, 23.47297° E)
     2. *Surveyor 3 Lunar Lander* — Ocean of Storms (-3.0163° S, -23.4180° W), visited by Apollo 12
     3. *Apollo 15 Lunar Roving Vehicle (LRV-001)* — Hadley-Apennine (26.1322° N, 3.6339° E)
   - **Mars Archive:**
     4. *Mars Pathfinder Sojourner Rover* — Ares Vallis (19.30° N, 335.88° E)
     5. *Mars Exploration Rover Spirit (MER-A)* — Gusev Crater (-14.5684° S, 175.4726° E)
     6. *Mars Exploration Rover Opportunity (MER-B)* — Meridiani Planum (-1.9483° S, 354.4742° E)

5. **3D Interactive Hardware Inspectors**
   - Custom 3D procedural geometries for every artifact with Kapton gold foil, wire-mesh wheels, solar panels, and mast cameras.
   - Interactive 3D hotspots providing component-level engineering annotations.
   - In-depth tabs: Overview & History, Accomplishments, Scientific Legacy, In Situ Status, Specs, and Official NASA Sources.

6. **Interactive 3D Planetary Map**
   - Accurate 3D spherical projection converting real planetary latitude and longitude into 3D Cartesian surface coordinates.
   - Pulsing beacon pins and HTML overlays on the 3D Moon and Mars globes.
   - Click to focus camera and inspect landing coordinates.

7. **Mission Chronology Timeline**
   - Chronological journey from Surveyor 3 in 1967 through Apollo, Pathfinder, Spirit, Opportunity, to the 2020 *One Small Step to Protect Human Heritage in Space Act*.

8. **Mission-Control Knowledge Check (Quiz)**
   - 8 verified multiple-choice questions testing comprehension of off-world heritage sites and planetary science.
   - Immediate answer feedback with scientific explanations and verified NASA source citations.

9. **Synthesized Web Audio Experience**
   - Deep space harmonic drone (55 Hz binaural oscillator) and telemetry audio clicks synthesized using the Web Audio API without external audio file dependencies.

---

## 🛠️ Technology Stack

- **Framework:** React 18, Vite 6, TypeScript
- **3D Graphics & Shaders:** Three.js, React Three Fiber (`@react-three/fiber`), Drei (`@react-three/drei`), `@react-three/postprocessing`
- **Animation:** Motion for React (`motion`), GSAP, `@gsap/react`
- **Styling:** Tailwind CSS, Custom CSS variables, Glassmorphism, Technical HUD styling
- **State Management:** Zustand
- **Routing:** React Router DOM
- **Icons:** Lucide React
- **Audio:** Web Audio API (procedural synthesis)

---

## 🛰️ Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Production Build
```bash
npm run build
npm run preview
```

---

## 📚 Data Sources & Attributions

- **NASA Lunar Reconnaissance Orbiter (LRO / LROC):** High-resolution orbital imagery and surface coordinates (Arizona State University).
- **NASA Jet Propulsion Laboratory (JPL):** Mars Exploration Rover Mission Archive & Mars Pathfinder Telemetry.
- **NASA High Resolution Imaging Science Experiment (HiRISE):** University of Arizona orbital imagery.
- **United Nations Office for Outer Space Affairs (UNOOSA):** 1967 Outer Space Treaty.
- **US Congress:** Public Law 116-275 (*One Small Step to Protect Human Heritage in Space Act*).

---

> *"The missions may be silent, but the evidence of exploration remains."*
