import { TimelineItem } from '../types';

export const timelineEvents: TimelineItem[] = [
  {
    id: 'evt-surveyor-3',
    year: 1967,
    exactDate: 'April 20, 1967',
    title: 'Surveyor 3 Soft-Lands in Ocean of Storms',
    mission: 'Surveyor 3',
    planet: 'moon',
    operator: 'NASA / JPL',
    category: 'Landing',
    artifactId: 'surveyor-3',
    description:
      'Surveyor 3 bounces twice before coming to rest on the interior slope of a 200m crater. It digs 4 trenches in the lunar soil, proving the ground can support the weight of future Apollo astronauts.',
    significance: 'First robotic trenching and physical soil test on another celestial body.'
  },
  {
    id: 'evt-apollo-11',
    year: 1969,
    exactDate: 'July 20, 1969',
    title: 'Apollo 11 Touches Down at Tranquility Base',
    mission: 'Apollo 11',
    planet: 'moon',
    operator: 'NASA',
    category: 'Landing',
    artifactId: 'apollo-11-lm',
    description:
      'With less than 30 seconds of descent propellant remaining, Neil Armstrong sets the Lunar Module Eagle down in Mare Tranquillitatis. The iconic footprint and descent stage remain untouched.',
    significance: 'First human landing on another world; first permanent human artifact site.'
  },
  {
    id: 'evt-apollo-12-surveyor',
    year: 1969,
    exactDate: 'November 19, 1969',
    title: 'Apollo 12 Astronauts Visit Surveyor 3',
    mission: 'Apollo 12',
    planet: 'moon',
    operator: 'NASA',
    category: 'Milestone',
    artifactId: 'surveyor-3',
    description:
      'Pete Conrad and Alan Bean perform pinpoint landing just 163 meters from Surveyor 3. They walk over, inspect the lander after 2.5 years in vacuum, and retrieve its camera to study deep-space material degradation.',
    significance: 'Only time in human history that astronauts visited a pre-existing robotic artifact on another world.'
  },
  {
    id: 'evt-apollo-15-lrv',
    year: 1971,
    exactDate: 'July 30, 1971',
    title: 'Apollo 15 Deploys First Lunar Roving Vehicle',
    mission: 'Apollo 15',
    planet: 'moon',
    operator: 'NASA / Boeing',
    category: 'Operation',
    artifactId: 'lunar-roving-vehicle',
    description:
      'David Scott and James Irwin unfold LRV-001 from the side of the LM Falcon and drive 27.76 km through the foothills of the Apennine Mountains and the rim of Hadley Rille gorge.',
    significance: 'First motorized wheels driven by humans beyond Earth.'
  },
  {
    id: 'evt-sojourner-mars',
    year: 1997,
    exactDate: 'July 4, 1997',
    title: 'Mars Pathfinder Deploys Sojourner Rover',
    mission: 'Mars Pathfinder',
    planet: 'mars',
    operator: 'NASA / JPL',
    category: 'Landing',
    artifactId: 'sojourner-rover',
    description:
      'Encased in airbags, Mars Pathfinder bounces to a halt in Ares Vallis. The microwave-sized Sojourner rolls down the egress ramps, becoming the first robotic rover to navigate the surface of Mars.',
    significance: 'Inaugurated the modern era of mobile robotic Mars surface exploration.'
  },
  {
    id: 'evt-spirit-landing',
    year: 2004,
    exactDate: 'January 4, 2004',
    title: 'Spirit Rover Lands Inside Gusev Crater',
    mission: 'Mars Exploration Rover A',
    planet: 'mars',
    operator: 'NASA / JPL',
    category: 'Landing',
    artifactId: 'spirit-rover',
    description:
      'Spirit touches down inside the 166-km-wide Gusev Crater, embarking on a multi-kilometer trek toward the Columbia Hills where it uncovers silica-rich deposits indicating hot spring activity.',
    significance: 'First definitive evidence of past hydrothermal activity and volcanic hot springs on Mars.'
  },
  {
    id: 'evt-opportunity-landing',
    year: 2004,
    exactDate: 'January 25, 2004',
    title: 'Opportunity Touches Down at Meridiani Planum',
    mission: 'Mars Exploration Rover B',
    planet: 'mars',
    operator: 'NASA / JPL',
    category: 'Landing',
    artifactId: 'opportunity-rover',
    description:
      'Opportunity lands directly inside Eagle Crater in Meridiani Planum. It immediately spots hematite spheres ("blueberries") and sulfate layers formed in ancient standing surface water.',
    significance: 'Proved liquid water once saturated the surface and subsurface of ancient Mars.'
  },
  {
    id: 'evt-spirit-silent',
    year: 2010,
    exactDate: 'March 22, 2010',
    title: 'Spirit Transmits Final Signal from Troy Sand Trap',
    mission: 'Mars Exploration Rover A',
    planet: 'mars',
    operator: 'NASA / JPL',
    category: 'End of Mission',
    artifactId: 'spirit-rover',
    description:
      'After becoming stuck in soft sand at Troy and surviving multiple Martian winters, Spirit transmits its final data packet. NASA concludes attempts to re-establish contact in May 2011.',
    significance: 'Spirit operated for 2,210 sols—more than 24 times its intended 90-sol design baseline.'
  },
  {
    id: 'evt-opportunity-marathon',
    year: 2015,
    exactDate: 'March 24, 2015',
    title: 'Opportunity Completes the First Off-World Marathon',
    mission: 'Mars Exploration Rover B',
    planet: 'mars',
    operator: 'NASA / JPL',
    category: 'Milestone',
    artifactId: 'opportunity-rover',
    description:
      'Opportunity officially surpasses the 42.195 km (26.219 mi) marathon distance on the rim of Endeavour Crater, making it the first human-built vehicle to run an off-world marathon.',
    significance: 'World record for total off-world distance traveled by any robotic explorer.'
  },
  {
    id: 'evt-opportunity-silent',
    year: 2018,
    exactDate: 'June 10, 2018',
    title: 'Opportunity Sends Final Telemetry in Global Dust Storm',
    mission: 'Mars Exploration Rover B',
    planet: 'mars',
    operator: 'NASA / JPL',
    category: 'End of Mission',
    artifactId: 'opportunity-rover',
    description:
      'A colossal, planet-wide dust storm blankets Meridiani Planum, reducing sunlight to less than 1%. Opportunity enters low-power sleep and remains in Perseverance Valley. Mission concluded Feb 13, 2019.',
    significance: '5,111 sols and 45.16 km driven; one of humanity’s most heroic scientific odysseys.'
  },
  {
    id: 'evt-space-heritage-act',
    year: 2020,
    exactDate: 'December 31, 2020',
    title: 'One Small Step to Protect Human Heritage in Space Act',
    mission: 'Space Heritage Preservation Policy',
    planet: 'earth',
    operator: 'US Congress / NASA / International Community',
    category: 'Milestone',
    description:
      'The United States enacts federal legislation requiring NASA contractors and partners to avoid disrupting Apollo landing sites, recognizing off-world exploration artifacts as irreplaceable cultural heritage.',
    significance: 'First statutory recognition of archaeological preservation sites beyond planet Earth.'
  }
];
