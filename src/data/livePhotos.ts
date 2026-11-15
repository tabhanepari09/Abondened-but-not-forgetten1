export interface LivePhoto {
  id: string;
  title: string;
  subtitle: string;
  planet: 'moon' | 'mars' | 'earth' | 'deep-space';
  imageSrc: string;
  thumbnailSrc?: string;
  credit: string;
  date: string;
  location: string;
  description: string;
  sensor?: string;
  telemetry?: {
    coordinates?: string;
    altitude?: string;
    mission?: string;
  };
}

export const livePhotosCollection: LivePhoto[] = [
  {
    id: 'moon-selene-nasa',
    title: 'Full Lunar Disk & Crater Ray Telemetry',
    subtitle: 'Direct high-resolution orbital reconnaissance of the lunar near-side',
    planet: 'moon',
    imageSrc: '/images/moon-nasa-selene.jpg',
    credit: 'NASA / USGS / JAXA / SELENE (Kaguya)',
    date: 'Orbital Reconnaissance Survey',
    location: 'Lunar Near-Side Orbit',
    description:
      'Pristine orbital telescopic capture showing the basaltic dark maria (Mare Tranquillitatis, Oceanus Procellarum) and the luminous Tycho impact ray system radiating across the southern highlands.',
    sensor: 'Multispectral Lunar Profiler & High-Definition Imager',
    telemetry: {
      coordinates: '0.0° N, 0.0° E Center',
      altitude: '100 km circular lunar orbit',
      mission: 'JAXA SELENE / NASA Lunar Mapping'
    }
  },
  {
    id: 'mars-phobos-debris',
    title: 'Mars & Phobos Tidal Disruption Field',
    subtitle: 'Tidal gravitational evolution of the Martian inner satellite',
    planet: 'mars',
    imageSrc: '/images/mars-phobos-debris.jpg',
    credit: 'NASA / JPL-Caltech / Mars Science Investigation',
    date: 'Orbital Dynamical Survey',
    location: 'Mars High-Apogee Orbital Plane',
    description:
      'High-resolution orbital visualization capturing the grooved, cratered moon Phobos in orbit above the Martian atmosphere, tracking the gradual gravitational tidal decay that will eventually form a planetary debris ring.',
    sensor: 'Orbital High-Resolution Imaging & Ephemeris Sensor',
    telemetry: {
      coordinates: 'Phobos Orbit: 9,376 km Radius',
      altitude: 'Synchronous Martian High Orbit',
      mission: 'NASA Mars Reconnaissance Program'
    }
  },
  {
    id: 'apollo-11-eagle-surface',
    title: 'Apollo 11 Eagle Descent Stage at Tranquility Base',
    subtitle: 'Humanity’s premier extraterrestrial archaeological monument',
    planet: 'moon',
    imageSrc: 'https://images-assets.nasa.gov/image/as11-40-5927/as11-40-5927~orig.jpg',
    credit: 'NASA / Apollo 11 / Neil Armstrong',
    date: 'July 20, 1969',
    location: 'Mare Tranquillitatis (Tranquility Base)',
    description:
      'The Lunar Module Eagle descent stage standing silently in the undisturbed lunar dust. The gold-foil Kapton insulation, egress ladder, and stainless steel plaque remain anchored in vacuum.',
    sensor: 'Hasselblad 500EL 70mm Space Camera',
    telemetry: {
      coordinates: '0.67408° N, 23.47297° E',
      altitude: 'Surface Elevation -2.57 km',
      mission: 'Apollo 11'
    }
  },
  {
    id: 'surveyor-3-apollo-12',
    title: 'Astronaut Conrad Inspects Surveyor 3',
    subtitle: 'First in situ human examination of a robotic artifact on another world',
    planet: 'moon',
    imageSrc: 'https://images-assets.nasa.gov/image/as12-48-7136/as12-48-7136~orig.jpg',
    credit: 'NASA / Apollo 12 / Alan Bean',
    date: 'November 19, 1969',
    location: 'Surveyor Crater, Oceanus Procellarum',
    description:
      'Apollo 12 commander Pete Conrad examines the unmanned Surveyor 3 spacecraft, which landed softly 2.5 years earlier. Conrad and Bean recovered its camera and scoop to return to Earth for forensic space degradation analysis.',
    sensor: 'Hasselblad 70mm Medium Format Camera',
    telemetry: {
      coordinates: '3.0163° S, 23.4180° W',
      altitude: 'Crater Interior Slope',
      mission: 'Apollo 12 / Surveyor 3'
    }
  },
  {
    id: 'apollo-15-lrv-hadley',
    title: 'Apollo 15 Lunar Roving Vehicle at Hadley Rille',
    subtitle: 'The first motorized exploration vehicle driven off-world',
    planet: 'moon',
    imageSrc: 'https://images-assets.nasa.gov/image/as15-88-11901/as15-88-11901~orig.jpg',
    credit: 'NASA / Apollo 15 / Dave Scott',
    date: 'August 1, 1971',
    location: 'Hadley-Apennine, Montes Apenninus',
    description:
      'Astronaut Jim Irwin salutes beside the Lunar Roving Vehicle (LRV-001) parked adjacent to the dramatic 300-meter-deep gorge of Hadley Rille, with the 4,000-meter peak of Mount Hadley in the distance.',
    sensor: 'Reseau Plate Hasselblad 500EL 70mm',
    telemetry: {
      coordinates: '26.1322° N, 3.6339° E',
      altitude: 'Apennine Front Valley',
      mission: 'Apollo 15'
    }
  },
  {
    id: 'sojourner-yogi-rock',
    title: 'Sojourner Micro-Rover at Yogi Rock',
    subtitle: 'The dawn of autonomous robotic roving on Mars',
    planet: 'mars',
    imageSrc: 'https://images-assets.nasa.gov/image/PIA01122/PIA01122~orig.jpg',
    credit: 'NASA / JPL-Caltech / Mars Pathfinder',
    date: 'July 10, 1997',
    location: 'Ares Vallis, Chryse Planitia',
    description:
      'Sojourner deploys its Alpha Particle X-Ray Spectrometer (APXS) directly against the Martian boulder named Yogi, identifying high silica content resembling terrestrial volcanic andesite on ancient outflow floodplains.',
    sensor: 'Pathfinder IMP Multispectral Imager & Sojourner Forward Stereo Cams',
    telemetry: {
      coordinates: '19.30° N, 335.88° E (24.12° W)',
      altitude: '-3.68 km Elevation',
      mission: 'Mars Pathfinder'
    }
  },
  {
    id: 'spirit-columbia-hills',
    title: 'Spirit Looks Back from the Columbia Hills',
    subtitle: 'Wheel tracks climbing into ancient volcanic plateaus',
    planet: 'mars',
    imageSrc: 'https://images-assets.nasa.gov/image/PIA05541/PIA05541~orig.jpg',
    credit: 'NASA / JPL-Caltech / Cornell University',
    date: 'March 2004',
    location: 'Gusev Crater, Columbia Hills',
    description:
      'Spirit captures its wheel tracks ascending Husband Hill across the basaltic floor of Gusev Crater. In 2007, its stuck wheel dragged through the dust here, revealing 90% pure silica hot spring deposits.',
    sensor: 'Pancam Multispectral Stereo Imager (PMA)',
    telemetry: {
      coordinates: '14.5684° S, 175.4726° E',
      altitude: 'Gusev Crater Floor',
      mission: 'Mars Exploration Rover A (Spirit)'
    }
  },
  {
    id: 'opportunity-endeavour-rim',
    title: 'Opportunity Overlooks Endeavour Crater',
    subtitle: 'A marathon rover standing on the precipice of a 22-kilometer basin',
    planet: 'mars',
    imageSrc: 'https://images-assets.nasa.gov/image/PIA19113/PIA19113~orig.jpg',
    credit: 'NASA / JPL-Caltech / Cornell / ASU',
    date: 'January 2015',
    location: 'Cape Tribulation, Endeavour Crater Rim',
    description:
      'A breathtaking panoramic vista captured from the summit ridge of Cape Tribulation overlooking the vast 22-kilometer interior of Endeavour Crater, documenting gypsum veins deposited in ancient water.',
    sensor: 'Pancam Calibrated High-Definition Stereo System',
    telemetry: {
      coordinates: '1.9483° S, 354.4742° E',
      altitude: 'Endeavour Rim Ridgeline',
      mission: 'Mars Exploration Rover B (Opportunity)'
    }
  },
  {
    id: 'apollo-8-earthrise',
    title: 'Iconic Apollo 8 Earthrise',
    subtitle: 'The fragile blue cradle rising above the lunar horizon',
    planet: 'earth',
    imageSrc: 'https://images-assets.nasa.gov/image/as08-14-2383/as08-14-2383~orig.jpg',
    credit: 'NASA / Apollo 8 / William Anders',
    date: 'December 24, 1968',
    location: 'Lunar Far-Side Orbital Horizon',
    description:
      'One of the most consequential environmental photographs in human history, capturing the delicate blue marble of Earth rising over the cratered, desolate lunar limb during the first crewed lunar orbit.',
    sensor: 'Hasselblad 500EL with 250mm Telephoto Lens',
    telemetry: {
      coordinates: 'Lunar Orbit Circumlunar Path',
      altitude: '110 km Lunar Orbital Apocynthion',
      mission: 'Apollo 8'
    }
  }
];
