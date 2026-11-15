import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { MissionHUD } from './components/layout/MissionHUD';
import { LoadingScreen } from './components/layout/LoadingScreen';
import { SpaceBackground } from './components/layout/SpaceBackground';

// Pages
import { Home } from './pages/Home';
import { Story } from './pages/Story';
import { Explore } from './pages/Explore';
import { Archive } from './pages/Archive';
import { ArtifactDetail } from './pages/ArtifactDetail';
import { PlanetaryMap } from './pages/PlanetaryMap';
import { Timeline } from './pages/Timeline';
import { Quiz } from './pages/Quiz';
import { About } from './pages/About';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export function App() {
  return (
    <Router>
      <ScrollToTop />
      <LoadingScreen minDuration={850} />

      {/* Global Animated Space Background (Nebulae + Stars + Meteors) */}
      <SpaceBackground />

      <div className="relative min-h-screen flex flex-col z-10 text-[#F0F6FC]">
        <Navbar />

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/story" element={<Story />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/archive" element={<Archive />} />
            <Route path="/archive/:id" element={<ArtifactDetail />} />
            <Route path="/map" element={<PlanetaryMap />} />
            <Route path="/timeline" element={<Timeline />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>

        <MissionHUD />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
