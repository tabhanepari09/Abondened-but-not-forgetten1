import { PlanetInfo } from '../types';

export const planetsData: Record<'earth' | 'moon' | 'mars', PlanetInfo> = {
  earth: {
    id: 'earth',
    name: 'Earth',
    subtitle: 'Point of Departure',
    type: 'Terrestrial Planet / Human Cradle',
    diameterKm: '12,742 km',
    distanceFromSun: '149.6M km (1.00 AU)',
    surfaceGravity: '9.807 m/s² (1.00 g)',
    surfaceTemp: '15°C (mean global)',
    atmosphere: '78% N₂, 21% O₂, 0.93% Ar',
    dayLength: '24.0 hours',
    artifactsCount: 0,
    description:
      'The single home planet from which all lunar and Martian voyages originated. Seen from deep space, Earth appears as an ephemeral blue marble suspended in total darkness—fragile, solitary, and united.',
    colorAccent: '#55DDF5',
    colorHex: '#3B82F6'
  },
  moon: {
    id: 'moon',
    name: 'The Moon',
    subtitle: 'Humanity’s First Footstep',
    type: 'Natural Planetary Satellite',
    diameterKm: '3,474.8 km',
    distanceFromSun: '384,400 km from Earth',
    surfaceGravity: '1.62 m/s² (0.166 g)',
    surfaceTemp: '-130°C to +120°C',
    atmosphere: 'Near Vacuum (Exosphere)',
    dayLength: '27.3 Earth days (tidally locked)',
    artifactsCount: 3,
    description:
      'A silent, airless world of ancient impact basins and basaltic maria. Because the Moon lacks wind, rain, and active tectonic processes, human bootprints, rover tire tracks, and landing stages remain essentially unaltered across geological epochs.',
    colorAccent: '#A5A5A5',
    colorHex: '#D1D5DB'
  },
  mars: {
    id: 'mars',
    name: 'Mars',
    subtitle: 'The Desert Frontier',
    type: 'Terrestrial Planet / Red Planet',
    diameterKm: '6,779 km',
    distanceFromSun: '227.9M km (1.52 AU)',
    surfaceGravity: '3.721 m/s² (0.38 g)',
    surfaceTemp: '-63°C (mean; -125°C to +20°C)',
    atmosphere: '95.3% CO₂, 2.6% N₂, 1.9% Ar (~6.1 mbar)',
    dayLength: '24h 37m 22s (1 Sol)',
    artifactsCount: 3,
    description:
      'A freezing, rust-tinted world sculpted by ancient oceans, gargantuan volcanoes, and colossal river valleys. Today, robotic rovers and landers rest amidst shifting dunes and seasonal dust storms, awaiting human arrival.',
    colorAccent: '#D9532F',
    colorHex: '#EF4444'
  }
};
