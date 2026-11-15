import { Artifact } from '../types';

export const artifacts: Artifact[] = [
  {
    id: 'apollo-11-lm',
    name: 'Apollo 11 Lunar Module Descent Stage (Eagle)',
    shortName: 'Apollo 11 Eagle',
    mission: 'Apollo 11',
    operator: 'NASA',
    country: 'United States',
    planet: 'moon',
    launchDate: 'July 16, 1969',
    landingDate: 'July 20, 1969 (20:17:40 UTC)',
    lastContactDate: 'July 24, 1969 (Crew return to Earth)',
    operationalDuration: '21 hours, 36 minutes on lunar surface (crew duration)',
    coordinates: {
      lat: 0.67408,
      lng: 23.47297,
      latDisplay: '0.67408° N',
      lngDisplay: '23.47297° E',
      siteName: 'Tranquility Base (Statio Tranquillitatis)',
      region: 'Mare Tranquillitatis (Sea of Tranquility)'
    },
    originalObjective:
      'Perform the first crewed lunar landing, safely deploy astronauts Neil Armstrong and Buzz Aldrin onto the lunar surface, conduct scientific surface exploration, collect lunar regolith samples, and provide a stable launch platform for the Ascent Stage.',
    whatItAccomplished: [
      'First successful human landing on another celestial body in human history.',
      'Astronauts spent 2 hours and 31 minutes outside the spacecraft collecting 21.55 kg of lunar samples.',
      'Deployed Early Apollo Surface Experiments Package (EASEP), including the Passive Seismic Experiment and Lunar Laser Ranging Retroreflector (still active today).',
      'Descent engine throttleable hypergolic propulsion successfully navigated boulder field during final manual descent.'
    ],
    scientificContributions: [
      'Confirmed the mechanical strength and bearing capacity of the lunar regolith for human exploration.',
      'Passive seismometer detected lunar natural seismic events and micro-meteoroid impacts.',
      'Lunar Laser Ranging experiment established the Moon is spiraling away from Earth at 3.8 cm per year and continues to refine Einstein’s general relativity.'
    ],
    fateAndCondition:
      'The descent stage served as the launch platform for the ascent stage when Neil Armstrong and Buzz Aldrin departed on July 21, 1969. The descent stage remains intact at Tranquility Base. The ladder still holds the commemorative plaque: "Here men from the planet Earth first set foot upon the Moon, July 1969 A.D. We came in peace for all mankind."',
    currentStatus: 'Preserved / Intact Descent Stage',
    statusCertainty: 'Directly Imaged by LRO / MRO',
    historicalSignificance:
      'Represents humanity’s greatest technological leap of the 20th century. Tranquility Base is designated by historical preservationists as a primary candidate for human heritage protection beyond Earth under the Outer Space Treaty and the One Small Step to Protect Human Heritage in Space Act.',
    interestingFacts: [
      'Fuel was so low during the descent that only approximately 25 seconds of propellant remained when Eagle touched down.',
      'The gold-colored foil insulation covering the descent stage is aluminized Kapton polyimide and Mylar, designed to regulate internal temperatures against the +120°C to -130°C lunar thermal cycle.',
      'The descent stage footprint still preserves the contact probes that signaled "contact light" 1.5 meters above the surface.'
    ],
    specs: {
      massKg: '2,034 kg (dry landed mass)',
      dimensions: '4.22 m high × 9.4 m diagonal span with landing gear',
      powerSource: 'Silver-Zinc batteries (4 descent stage batteries, 400 Ah each)',
      communication: 'S-band steerable high-gain antenna & VHF antennas'
    },
    hotspots: [
      {
        id: 'plaque',
        position: [0, -0.2, 1.4],
        title: 'Lunar Plaque on Front Strut',
        description: 'Stainless steel plaque engraved with the two hemispheres of Earth and signed by the Apollo 11 crew and President Nixon.'
      },
      {
        id: 'descent-engine',
        position: [0, -1.2, 0],
        title: 'Descent Propulsion System (DPS)',
        description: 'Gimbaled, throttleable rocket engine fueled by Aerozine 50 and nitrogen tetroxide (N2O4).'
      },
      {
        id: 'gold-kapton',
        position: [1.2, 0.4, 0.8],
        title: 'Kapton Multi-Layer Insulation',
        description: 'Multi-layer amber and gold-toned aluminized plastic sheets insulating critical fuel tanks from severe lunar solar radiation.'
      },
      {
        id: 'footpad',
        position: [-1.8, -1.3, -1.5],
        title: 'Lunar Surface Contact Footpad',
        description: 'Dish-shaped aluminum footpad measuring 0.94 meters across, designed to distribute landing weight across fine lunar dust.'
      }
    ],
    images: [
      {
        url: '/images/moon-nasa-selene.jpg',
        caption: 'Live optical survey by NASA / USGS / JAXA SELENE capturing the Mare Tranquillitatis basin where Apollo 11 touched down.',
        credit: 'Image NASA / USGS / JAXA / SELENE'
      },
      {
        url: 'https://images-assets.nasa.gov/image/as11-40-5927/as11-40-5927~orig.jpg',
        caption: 'Lunar Module Eagle descent stage standing silently at Tranquility Base.',
        credit: 'NASA / Apollo 11 Crew'
      }
    ],
    references: [
      {
        title: 'Apollo 11 Mission Overview',
        url: 'https://www.nasa.gov/mission_pages/apollo/missions/apollo11.html',
        organization: 'NASA'
      },
      {
        title: 'LRO Sees Apollo 11 Tranquility Base with Long Shadows',
        url: 'https://www.nasa.gov/mission_pages/LRO/multimedia/lroimages/lroc_20090929_apollo11.html',
        organization: 'NASA / LROC / Arizona State University'
      },
      {
        title: 'Apollo Lunar Surface Journal: Tranquility Base',
        url: 'https://www.hq.nasa.gov/alsj/a11/a11.html',
        organization: 'NASA History Division'
      }
    ]
  },
  {
    id: 'surveyor-3',
    name: 'Surveyor 3 Lunar Lander',
    shortName: 'Surveyor 3',
    mission: 'Surveyor Program',
    operator: 'NASA / JPL',
    country: 'United States',
    planet: 'moon',
    launchDate: 'April 17, 1967',
    landingDate: 'April 20, 1967 (00:04:53 UTC)',
    lastContactDate: 'May 4, 1967 (Surveyor operational phase)',
    operationalDuration: '14 Earth days (transmitted 6,315 television pictures)',
    coordinates: {
      lat: -3.0163,
      lng: -23.418,
      latDisplay: '3.0163° S',
      lngDisplay: '23.4180° W',
      siteName: 'Surveyor Crater',
      region: 'Oceanus Procellarum (Ocean of Storms)'
    },
    originalObjective:
      'Demonstrate soft-landing capability on the lunar surface, transmit close-up television images of the lunar terrain, and dig trenches with an articulated surface sampler to calculate soil bearing mechanics ahead of the Apollo human missions.',
    whatItAccomplished: [
      'Second US spacecraft to softly land on the Moon; landed inside a gentle 200-meter-wide crater.',
      'Operated the first robotic soil mechanics surface sampler scoop on another world, digging 4 trenches up to 17.5 cm deep.',
      'Transmitted 6,315 high-resolution television frames before lunar nightfall.',
      'Became the only robotic probe in human history to be visited and inspected by astronauts from another mission (Apollo 12 in November 1969).'
    ],
    scientificContributions: [
      'Proven that lunar regolith could bear the weight of Apollo lunar modules and astronaut boots without sinking.',
      'Apollo 12 returned its TV camera and mechanical scoop to Earth, providing scientists with the first long-term analysis of how space radiation, vacuum, and micrometeoroids degrade human-made materials over 2.5 years in deep space.',
      'Spawned famous study on Streptococcus mitis bacteria inside camera insulation, pioneering modern planetary protection standards.'
    ],
    fateAndCondition:
      'Surveyor 3 sits quietly tilted at a 12-degree angle on the southeast slope of Surveyor Crater. Its chassis, solar mast, radar altimeter, and landing gear remain in place, minus the camera and robotic scoop retrieved by Apollo 12 and now exhibited at the Smithsonian National Air and Space Museum.',
    currentStatus: 'Preserved / Intact Descent Stage',
    statusCertainty: 'In Situ Contact Confirmed',
    historicalSignificance:
      'Unprecedented benchmark in aerospace archeology. It demonstrates direct human contact with robotic space heritage and established the foundation of planetary forensic science.',
    interestingFacts: [
      'During its initial landing, Surveyor 3 bounced twice because its landing radar locked onto highly reflective rocks, bouncing 10 meters and then 3 meters before final touchdown.',
      'Apollo 12 astronauts Pete Conrad and Alan Bean landed their LM Intrepid just 163 meters away, walking across the crater rim to examine Surveyor 3.',
      'Conrad noticed that the white painted surfaces had turned a tan-brown color due to lunar dust blown during the Apollo 12 touchdown.'
    ],
    specs: {
      massKg: '294 kg (landed dry mass)',
      dimensions: '3.0 m high × 4.2 m triangular landing footprint',
      powerSource: 'Solar array producing 89 W + rechargeable silver-zinc batteries',
      communication: 'High-gain planar antenna & dual omnidirectional antennas'
    },
    hotspots: [
      {
        id: 'tv-camera-mount',
        position: [0.3, 0.8, 0.4],
        title: 'Television Camera Mount',
        description: 'Mounting location for the Vidicon TV camera removed by Apollo 12 astronaut Pete Conrad for Earth laboratory testing.'
      },
      {
        id: 'soil-scoop',
        position: [0.9, -0.4, 0.6],
        title: 'Surface Sampler Mechanism',
        description: 'Pantograph arm with electric motor scoop capable of trenching, scraping, and testing lunar soil resistance.'
      },
      {
        id: 'solar-mast',
        position: [0, 1.4, 0],
        title: 'Solar Array & Planar Antenna Mast',
        description: 'Vertical mast supporting the solar panel array and directional communications antenna.'
      },
      {
        id: 'crushable-pads',
        position: [-1.1, -1.0, -0.8],
        title: 'Aluminum Honeycomb Footpads',
        description: 'Three landing legs equipped with shock absorbers and crushable aluminum pads to cushion the 3 m/s lunar impact.'
      }
    ],
    images: [
      {
        url: '/images/moon-nasa-selene.jpg',
        caption: 'Live telescopic image showing Oceanus Procellarum where Surveyor 3 landed inside Surveyor Crater.',
        credit: 'Image NASA / USGS / JAXA / SELENE'
      },
      {
        url: 'https://images-assets.nasa.gov/image/as12-48-7136/as12-48-7136~orig.jpg',
        caption: 'Apollo 12 Commander Pete Conrad examining the unmanned Surveyor 3 spacecraft.',
        credit: 'NASA / Alan Bean'
      }
    ],
    references: [
      {
        title: 'Surveyor 3 Spacecraft Overview',
        url: 'https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1967-035A',
        organization: 'NASA Space Science Data Coordinated Archive'
      },
      {
        title: 'Analysis of Surveyor 3 Materials Retrieved by Apollo 12',
        url: 'https://ntrs.nasa.gov/citations/19720019057',
        organization: 'NASA Technical Reports Server'
      }
    ]
  },
  {
    id: 'lunar-roving-vehicle',
    name: 'Apollo 15 Lunar Roving Vehicle (LRV-001)',
    shortName: 'Lunar Rover (LRV-001)',
    mission: 'Apollo 15',
    operator: 'NASA / Boeing / Delco',
    country: 'United States',
    planet: 'moon',
    launchDate: 'July 26, 1971',
    landingDate: 'July 30, 1971',
    lastContactDate: 'August 2, 1971 (TV broadcast of Apollo 15 liftoff)',
    operationalDuration: '3 days of surface operations (27.76 km driven)',
    coordinates: {
      lat: 26.1322,
      lng: 3.6339,
      latDisplay: '26.1322° N',
      lngDisplay: '3.6339° E',
      siteName: 'VIP Site, Hadley-Apennine',
      region: 'Hadley Rille / Montes Apenninus'
    },
    originalObjective:
      'Vastly expand the exploration range of Apollo astronauts from hundreds of meters to tens of kilometers, transport heavy scientific drilling equipment, and carry lunar geological samples back to the Lunar Module.',
    whatItAccomplished: [
      'First wheeled vehicle driven by humans on another world.',
      'Covered a total driving distance of 27.76 km across dramatic terrain near the 300-meter-deep Hadley Rille gorge.',
      'Carried 77 kg of lunar rock samples, including the 4.5-billion-year-old anorthosite "Genesis Rock".',
      'Ground-controlled color TV camera captured the first live broadcast of an Apollo Lunar Module ascent stage liftoff.'
    ],
    scientificContributions: [
      'Enabled geological sampling across diverse geographical strata on the flanks of Mons Hadley and Hadley Delta.',
      'Demonstrated high mobility on 15-degree slopes with specialized zinc-coated steel woven wire mesh wheels.',
      'Tested inertial directional gyro navigation system without GPS or magnetic compass in vacuum.'
    ],
    fateAndCondition:
      'Stationed approximately 160 meters east of the Apollo 15 Lunar Module Falcon descent stage at the designated "VIP Site". Left parked with its high-gain antenna pointed back at Earth so mission control could operate the TV camera to film the astronaut liftoff. Remains intact in the pristine lunar vacuum.',
    currentStatus: 'Preserved In Situ',
    statusCertainty: 'Directly Imaged by LRO / MRO',
    historicalSignificance:
      'Revolutionized planetary surface exploration. Precursor to all subsequent robotic Mars rovers and future Artemis lunar terrain vehicles.',
    interestingFacts: [
      'The rover folded into an origami-like 1.5 × 0.5 meter package mounted into the Lunar Module descent stage quadrant and was deployed via astronauts pulling nylon lanyard tapes.',
      'The wheels did not use inflatable rubber (which would pop in a vacuum), but instead woven piano wire mesh with titanium chevron treads.',
      'Top speed recorded was 12 km/h (7.5 mph) down a lunar slope by astronaut Dave Scott.'
    ],
    specs: {
      massKg: '210 kg (Earth mass) / 35 kg (effective lunar weight)',
      dimensions: '3.1 m long × 1.8 m wide × 1.14 m high',
      powerSource: 'Two 36-volt silver-zinc non-rechargeable batteries (121 Ah capacity)',
      communication: 'Lunar Communications Relay Unit (LCRU) with high-gain umbrella dish'
    },
    hotspots: [
      {
        id: 'wire-wheels',
        position: [-1.1, -0.4, 0.8],
        title: 'Woven Piano Wire Wheels',
        description: 'Tire structure woven from 800 strands of zinc-coated steel piano wire with titanium chevron treads for traction in loose dust.'
      },
      {
        id: 't-handle-controller',
        position: [0, 0.3, 0],
        title: 'T-Handle Drive Controller',
        description: 'Central joystick used by astronauts wearing bulky pressurized gloves to steer, accelerate, and brake all four drive motors.'
      },
      {
        id: 'high-gain-antenna',
        position: [0.6, 0.9, -0.5],
        title: 'Color TV & High-Gain Umbrella Dish',
        description: 'RCA ground-controlled color TV camera and parabolic antenna transmitting live telecasts directly to Houston mission control.'
      },
      {
        id: 'sample-racks',
        position: [-0.7, 0.2, -0.6],
        title: 'Aft Geology Equipment Palette',
        description: 'Equipment bay designed to hold lunar rock core drill bits, tongs, sample containment bags, and rake samplers.'
      }
    ],
    images: [
      {
        url: '/images/moon-nasa-selene.jpg',
        caption: 'Live lunar optical survey capturing Montes Apenninus where the Lunar Roving Vehicle was driven 27.76 km.',
        credit: 'Image NASA / USGS / JAXA / SELENE'
      },
      {
        url: 'https://images-assets.nasa.gov/image/as15-88-11901/as15-88-11901~orig.jpg',
        caption: 'Astronaut Jim Irwin salutes beside the Apollo 15 Lunar Roving Vehicle at Hadley-Apennine.',
        credit: 'NASA / Dave Scott'
      }
    ],
    references: [
      {
        title: 'The Apollo Lunar Roving Vehicle',
        url: 'https://www.nasa.gov/history/alsj/lrvhandbook.pdf',
        organization: 'NASA / Boeing LRV Operations Handbook'
      },
      {
        title: 'LRO Captures Apollo 15 Landing Site and Rover Tracks',
        url: 'https://www.nasa.gov/mission_pages/LRO/multimedia/lroimages/lroc-20100315-apollo15.html',
        organization: 'NASA / LROC'
      }
    ]
  },
  {
    id: 'sojourner-rover',
    name: 'Mars Pathfinder Sojourner Rover',
    shortName: 'Sojourner Rover',
    mission: 'Mars Pathfinder',
    operator: 'NASA / JPL',
    country: 'United States',
    planet: 'mars',
    launchDate: 'December 4, 1996',
    landingDate: 'July 4, 1997 (16:56:55 UTC)',
    lastContactDate: 'September 27, 1997',
    operationalDuration: '83 sols (planned for 7 sols); traversed ~100 meters',
    coordinates: {
      lat: 19.30,
      lng: -24.12,
      latDisplay: '19.30° N',
      lngDisplay: '24.12° W (335.88° E)',
      siteName: 'Carl Sagan Memorial Station',
      region: 'Ares Vallis, Chryse Planitia'
    },
    originalObjective:
      'Prove that a low-cost, lightweight micro-rover could navigate the rocky Martian surface autonomously, test materials wear, and analyze rocks and soil using an Alpha Particle X-ray Spectrometer (APXS).',
    whatItAccomplished: [
      'First wheeled vehicle to operate on Mars.',
      'Exceeded its design lifetime by twelve times, operating 83 Martian days (sols).',
      'Transmitted 550 rover camera images and analyzed 16 chemical sample targets, including famous rocks "Barnacle Bill" and "Yogi".',
      'Tested laser stripe hazard detection and autonomous obstacle avoidance on unfamiliar alien terrain.'
    ],
    scientificContributions: [
      'Discovered that Mars rocks at Ares Vallis contain high silica content, resembling terrestrial andesite, indicating differentiated crustal volcanic activity.',
      'Confirmed catastrophic ancient flooding formed the Ares Vallis outflow channel billions of years ago.',
      'Pioneered the patented 6-wheel Rocker-Bogie suspension system that became the mobility blueprint for Spirit, Opportunity, Curiosity, and Perseverance.'
    ],
    fateAndCondition:
      'After the Pathfinder base station battery failed in late September 1997 due to extreme freeze-thaw cycling, communication with Sojourner was lost. Programmed to loop back toward the base station if contact broke, Sojourner likely circled Pathfinder and entered an indefinite sleep state on the Ares Vallis floodplain.',
    currentStatus: 'Dormant / Surface Static',
    statusCertainty: 'Directly Imaged by LRO / MRO',
    historicalSignificance:
      'Opened the modern era of continuous robotic exploration of Mars. Named in honor of civil rights abolitionist Sojourner Truth.',
    interestingFacts: [
      'Sojourner weighed just 10.5 kg (23 lbs) on Earth and was approximately the size of a microwave oven.',
      'Its onboard computer was an 8-bit Intel 80C85 running at just 2 MHz with 512 kB of RAM and 176 kB of flash memory.',
      'Its wheels incorporated three material adherence experiments to see how quickly electrostatic Martian dust coated surfaces.'
    ],
    specs: {
      massKg: '10.5 kg (Earth mass)',
      dimensions: '65 cm long × 48 cm wide × 30 cm high',
      powerSource: '0.22 m² solar array (16 W peak) + non-rechargeable 150 Wh lithium-thionyl chloride battery',
      communication: 'UHF radio link with Pathfinder lander station (9600 baud)'
    },
    hotspots: [
      {
        id: 'rocker-bogie',
        position: [-0.35, -0.15, 0.25],
        title: 'Rocker-Bogie Suspension',
        description: 'Differential rocker bogie mechanism enabling the 6 wheels to climb obstacles larger than the wheel diameter without tipping.'
      },
      {
        id: 'apxs-sensor',
        position: [0.35, -0.1, 0],
        title: 'Alpha Particle X-Ray Spectrometer (APXS)',
        description: 'Curium-244 radioactive source emitting alpha particles and X-rays to identify elemental chemical compositions of rocks.'
      },
      {
        id: 'solar-panel',
        position: [0, 0.15, 0],
        title: 'GaAs Solar Cell Deck',
        description: 'Gallium arsenide solar panel generating about 16 watts of power during peak midday Martian sunlight.'
      },
      {
        id: 'stereo-forward-cam',
        position: [0.3, 0.12, 0.15],
        title: 'Forward Stereo Navigation Cameras',
        description: 'Black-and-white stereo cameras with 5 laser projection diodes for automated real-time 3D terrain mapping.'
      }
    ],
    images: [
      {
        url: '/images/mars-phobos-debris.jpg',
        caption: 'Live optical survey of the Martian orbital environment above the Chryse Planitia basin.',
        credit: 'NASA / JPL-Caltech'
      },
      {
        url: 'https://images-assets.nasa.gov/image/PIA01122/PIA01122~orig.jpg',
        caption: 'Sojourner Rover approaches the rock named Yogi on Mars surface.',
        credit: 'NASA / JPL-Caltech'
      }
    ],
    references: [
      {
        title: 'Mars Pathfinder / Sojourner Mission Archive',
        url: 'https://mars.nasa.gov/mars-exploration/missions/pathfinder/',
        organization: 'NASA Mars Exploration Program'
      },
      {
        title: 'MRO HiRISE Images Mars Pathfinder and Sojourner',
        url: 'https://www.uahirise.org/PSP_001890_1995',
        organization: 'University of Arizona / NASA JPL'
      }
    ]
  },
  {
    id: 'spirit-rover',
    name: 'Mars Exploration Rover Spirit (MER-A)',
    shortName: 'Spirit Rover',
    mission: 'Mars Exploration Rover',
    operator: 'NASA / JPL',
    country: 'United States',
    planet: 'mars',
    launchDate: 'June 10, 2003',
    landingDate: 'January 4, 2004 (04:35 UTC)',
    lastContactDate: 'March 22, 2010 (Sol 2210)',
    operationalDuration: '6 years, 2 months, 19 days (2,210 sols; planned for 90 sols)',
    coordinates: {
      lat: -14.5684,
      lng: 175.4726,
      latDisplay: '14.5684° S',
      lngDisplay: '175.4726° E',
      siteName: 'Troy Sand Trap, Home Plate',
      region: 'Gusev Crater, Columbia Hills'
    },
    originalObjective:
      'Search for and characterize a wide variety of rocks and soils that hold clues to past water activity on Mars, particularly in Gusev Crater, a suspected ancient crater lake basin.',
    whatItAccomplished: [
      'Survived more than 25 times its original warranty duration across the harsh Martian seasons.',
      'Climbed the summit of Husband Hill in the Columbia Hills, ascending over 100 meters in elevation.',
      'Accidentally made one of its greatest discoveries when its stuck right-front wheel dragged through soil, excavating 90% pure silica.',
      'Traveled a cumulative distance of 7.73 km (4.8 miles) over jagged basaltic terrain.'
    ],
    scientificContributions: [
      'The exposed pure silica deposit provided indisputable evidence of ancient hydrothermal springs or fumaroles—ideal environments for ancient microbial life.',
      'Discovered carbonate-rich outcrops in the Columbia Hills formed in nearly neutral pH water.',
      'Documented dozens of active Martian dust devils in real time using automated image differencing algorithms.'
    ],
    fateAndCondition:
      'In May 2009 (Sol 1892), Spirit broke through a crust of iron sulfate into loose powdery sand at a site dubbed "Troy". Despite months of rescue simulations, Spirit could not extricate itself. Unable to tilt its dust-coated solar panels toward the sun for the freezing Martian winter, its internal clock froze and last contact occurred on March 22, 2010.',
    currentStatus: 'Dormant / Surface Static',
    statusCertainty: 'Directly Imaged by LRO / MRO',
    historicalSignificance:
      'Transformed Mars from a cold, dead basalt desert into a planet that once possessed active hydrothermal systems, hot springs, and habitable aquatic environments.',
    interestingFacts: [
      'Its solar panels were repeatedly cleaned by unexpected Martian "dust devils", replenishing battery power and extending the mission by years.',
      'After its right-front steering actuator failed in 2006, NASA engineers drove the rover backward, dragging the dead wheel.',
      'Named by 9-year-old orphan Sofi Collis from Scottsdale, Arizona, through a NASA essay competition.'
    ],
    specs: {
      massKg: '185 kg (Earth mass)',
      dimensions: '1.5 m high × 2.3 m wide × 1.6 m long',
      powerSource: 'Triple-junction GaAs solar arrays (140 W peak) + dual rechargeable lithium-ion batteries',
      communication: 'High-gain steerable X-band dish & UHF omni antenna'
    },
    hotspots: [
      {
        id: 'pancam-mast',
        position: [0, 0.9, 0.4],
        title: 'Pancam Mast Assembly (PMA)',
        description: 'Periscope neck standing 1.5 m high carrying panoramic color cameras and Miniature Thermal Emission Spectrometer.'
      },
      {
        id: 'solar-wings',
        position: [0, 0.25, -0.3],
        title: 'Triple-Junction Solar Array Wings',
        description: 'Articulated solar panels designed to power the 185-kg robotic geologist during Martian daytime.'
      },
      {
        id: 'robotic-arm',
        position: [0.6, -0.2, 0.4],
        title: 'Instrument Deployment Device (IDD)',
        description: '5-degree-of-freedom robotic arm holding the Rock Abrasion Tool (RAT), microscopic imager, and Mössbauer spectrometer.'
      },
      {
        id: 'dragged-wheel',
        position: [0.8, -0.6, 0.7],
        title: 'Right-Front Locked Wheel',
        description: 'The wheel that jammed in 2006; while dragged backward it scraped open the white silica hydrothermal deposits.'
      }
    ],
    images: [
      {
        url: '/images/mars-phobos-debris.jpg',
        caption: 'Live optical survey capturing the thin Martian atmosphere above the Gusev Crater crater basin.',
        credit: 'NASA / JPL-Caltech'
      },
      {
        url: 'https://images-assets.nasa.gov/image/PIA05541/PIA05541~orig.jpg',
        caption: 'Spirit looks back toward its tracks in Gusev Crater after climbing into the Columbia Hills.',
        credit: 'NASA / JPL-Caltech / Cornell'
      }
    ],
    references: [
      {
        title: 'NASA Spirit Mission Archive',
        url: 'https://mars.nasa.gov/mer/mission/overview/',
        organization: 'NASA Mars Exploration Program'
      },
      {
        title: 'Science Magazine: Hydrothermal Silica in Gusev Crater',
        url: 'https://www.science.org/doi/10.1126/science.1155425',
        organization: 'Science / American Association for the Advancement of Science'
      }
    ]
  },
  {
    id: 'opportunity-rover',
    name: 'Mars Exploration Rover Opportunity (MER-B)',
    shortName: 'Opportunity Rover',
    mission: 'Mars Exploration Rover',
    operator: 'NASA / JPL',
    country: 'United States',
    planet: 'mars',
    launchDate: 'July 7, 2003',
    landingDate: 'January 25, 2004 (05:05 UTC)',
    lastContactDate: 'June 10, 2018 (Sol 5111)',
    operationalDuration: '14 years, 138 days (5,111 sols; planned for 90 sols); 45.16 km driven',
    coordinates: {
      lat: -1.9483,
      lng: 354.4742,
      latDisplay: '1.9483° S',
      lngDisplay: '354.4742° E (5.5258° W)',
      siteName: 'Perseverance Valley, Endeavour Crater Rim',
      region: 'Meridiani Planum'
    },
    originalObjective:
      'Investigate the sedimentary bedrock of Meridiani Planum, determine whether groundwater once saturated the region, and establish whether conditions could have supported life.',
    whatItAccomplished: [
      'All-time extraterrestrial driving champion: 45.16 km (28.06 miles), surpassing the Soviet Lunokhod 2 lunar record.',
      'Operated for over 5,000 sols, outlasting its intended design life by a factor of 55.',
      'Explored Eagle Crater, Endurance Crater, Victoria Crater, and finally the 22-km-wide Endeavour Crater.',
      'Sent back 217,594 raw science and engineering images over 14.5 years.'
    ],
    scientificContributions: [
      'Discovered hematite-rich spherical concretions nicknamed "blueberries", formed inside ancient acidic groundwater.',
      'Discovered clay mineral gypsum veins at Endeavour Crater, formed in pH-neutral water conducive to ancient microbial life.',
      'Created an unprecedented chronological sedimentary stratigraphy record of early Mars spanning hundreds of millions of years.'
    ],
    fateAndCondition:
      'In June 2018, a catastrophic planet-encircling global dust storm blotted out 99% of sunlight above Meridiani Planum. Opportunity transmitted its final telemetry on June 10, 2018. Over eight months and more than 1,000 recovery commands later, NASA officially concluded the mission on February 13, 2019. The rover sits peacefully in Perseverance Valley on the rim of Endeavour Crater.',
    currentStatus: 'Dormant / Surface Static',
    statusCertainty: 'Directly Imaged by LRO / MRO',
    historicalSignificance:
      'The longest-operating and most productive surface vehicle on another planet in human history. A monument to human curiosity and robotic endurance.',
    interestingFacts: [
      'Upon touchdown, Opportunity bounced across Meridiani Planum inside its airbags and scored an interplanetary "hole-in-one", coming to rest inside the 22-meter Eagle Crater.',
      'Its final telemetry message to Earth was popularly paraphrased as: "My battery is low and it’s getting dark."',
      'Opportunity survived getting stuck in "Purgatory Dune" for five weeks in 2005 before JPL drivers carefully extricated it centimeter by centimeter.'
    ],
    specs: {
      massKg: '185 kg (Earth mass)',
      dimensions: '1.5 m high × 2.3 m wide × 1.6 m long',
      powerSource: 'Triple-junction solar arrays (up to 900 Wh/sol initially) + 2 lithium-ion batteries',
      communication: 'High-gain steerable parabolic X-band antenna & UHF relay with Mars orbiters'
    },
    hotspots: [
      {
        id: 'perseverance-rim',
        position: [0, 0.9, 0.4],
        title: 'Panoramic Camera (Pancam)',
        description: 'High-resolution multispectral stereo imaging system that documented the interior strata of Victoria and Endeavour craters.'
      },
      {
        id: 'gypsum-veins-arm',
        position: [0.6, -0.2, 0.4],
        title: 'Robotic Arm & Rock Abrasion Tool',
        description: 'Tipped with diamond cutting teeth to grind away rock weathered crusts and expose pristine interior minerals.'
      },
      {
        id: 'x-band-antenna',
        position: [-0.4, 0.6, -0.4],
        title: 'High-Gain X-Band Dish',
        description: 'Steerable dish antenna pointing directly toward Earth to downlink scientific discoveries across millions of miles.'
      },
      {
        id: 'rocker-bogie-wheels',
        position: [-0.6, -0.6, 0.6],
        title: 'Cleated Aluminum Wheels',
        description: 'Individually driven aluminum wheels with deep spiral grousers that traversed 45.16 kilometers of Martian sands.'
      }
    ],
    images: [
      {
        url: '/images/mars-phobos-debris.jpg',
        caption: 'Live optical survey over Meridiani Planum and the Endeavour Crater rim where Opportunity completed the first off-world marathon.',
        credit: 'NASA / JPL-Caltech'
      },
      {
        url: 'https://images-assets.nasa.gov/image/PIA19113/PIA19113~orig.jpg',
        caption: 'Opportunity looks down into Endeavour Crater from the rim at Cape Tribulation.',
        credit: 'NASA / JPL-Caltech'
      }
    ],
    references: [
      {
        title: 'NASA Opportunity Rover Mission Summary',
        url: 'https://mars.nasa.gov/mer/mission/overview/',
        organization: 'NASA Mars Exploration Program'
      },
      {
        title: 'NASA HiRISE Orbiter Spotting Opportunity in Perseverance Valley',
        url: 'https://www.uahirise.org/ESP_056960_1775',
        organization: 'NASA / JPL / University of Arizona'
      },
      {
        title: 'Science: Meridiani Planum Bedrock Deposited by Ancient Water',
        url: 'https://www.science.org/doi/10.1126/science.1104086',
        organization: 'Science / AAAS'
      }
    ]
  }
];
