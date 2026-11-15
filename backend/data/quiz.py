from typing import List, Dict, Any

QUIZ_DATA: List[Dict[str, Any]] = [
  {
    "id": 1,
    "question": "Why did the Apollo 12 astronauts land close to Surveyor 3 in November 1969?",
    "options": [
      "To refuel the Apollo Lunar Module engine with Surveyor propellants",
      "To demonstrate pinpoint landing and retrieve parts to study space weathering effects on Earth",
      "Because they had lost navigation telemetry and landed by emergency radar beacon",
      "To jumpstart the Surveyor camera and resume live broadcasts to Earth"
    ],
    "correctIndex": 1,
    "explanation": "Apollo 12 demonstrated precision landing by touching down within 163 meters of Surveyor 3. Astronauts Pete Conrad and Alan Bean retrieved its camera and scoop so scientists on Earth could analyze how 2.5 years of lunar vacuum, solar radiation, and micrometeoroids altered human-made materials.",
    "missionRef": "Surveyor 3 / Apollo 12",
    "verifiedSource": "NASA Technical Reports: Analysis of Surveyor 3 Materials Retrieved by Apollo 12"
  },
  {
    "id": 2,
    "question": "What type of wheels did the Apollo 15 Lunar Roving Vehicle use to traverse the lunar surface?",
    "options": [
      "Pressurized synthetic rubber tires with nitrogen gas",
      "Solid lead wheels to maximize weight and traction in 1/6th gravity",
      "Woven zinc-coated piano wire mesh with titanium chevron treads",
      "Inflatable Kevlar-reinforced composite bladders"
    ],
    "correctIndex": 2,
    "explanation": "Standard inflatable tires would burst in the lunar vacuum and fail in extreme temperatures (-130°C to +120°C). Boeing and Delco engineered wheels woven from 800 strands of zinc-coated steel piano wire with riveted titanium chevrons covering 50% of the surface area.",
    "missionRef": "Apollo 15 LRV-001",
    "verifiedSource": "NASA Boeing Lunar Roving Vehicle Operations Handbook"
  },
  {
    "id": 3,
    "question": "What is the current physical condition of the Apollo 11 Lunar Module at Tranquility Base?",
    "options": [
      "Both the descent and ascent stages sit together untouched",
      "Only the Descent Stage remains; the Ascent Stage lifted off and later impacted the Moon",
      "The entire module was retrieved by the Space Shuttle and returned to Earth",
      "The module was completely pulverized by a meteorite impact in 1984"
    ],
    "correctIndex": 1,
    "explanation": "The Lunar Module Eagle consisted of two stages. The Descent Stage served as a launchpad and remains anchored at Tranquility Base with the ladder, commemorative plaque, and footpads. The Ascent Stage propelled Armstrong and Aldrin back to orbit, was jettisoned, and subsequently impacted the lunar surface.",
    "missionRef": "Apollo 11 Lunar Module",
    "verifiedSource": "NASA Lunar Surface Journal / LROC Arizona State University"
  },
  {
    "id": 4,
    "question": "How did the Mars rover Spirit accidentally discover 90% pure silica on Mars in 2007?",
    "options": [
      "By drilling into the highest peak of Husband Hill",
      "Its jammed right-front wheel dragged through the soil, scraping open a trench behind it",
      "By firing a high-power laser beam into volcanic basalt rocks",
      "A massive dust devil blew away topsoil while Spirit was parked"
    ],
    "correctIndex": 1,
    "explanation": "In 2006, Spirit’s right-front steering wheel jammed. Engineers drove the rover backward, dragging the dead wheel like a plow. In 2007, this furrow sliced open bright white subsurface soil that chemical analysis revealed to be 90% pure silica—telltale evidence of ancient hot springs or fumaroles.",
    "missionRef": "Spirit Rover (MER-A)",
    "verifiedSource": "Science Magazine / NASA JPL Mission Highlights"
  },
  {
    "id": 5,
    "question": "Which planetary rover currently holds the all-time world record for total distance driven off-world?",
    "options": [
      "Curiosity Rover (Mars)",
      "Lunokhod 2 (Moon)",
      "Opportunity Rover (Mars)",
      "Apollo 17 Lunar Roving Vehicle (Moon)"
    ],
    "correctIndex": 2,
    "explanation": "Opportunity Rover traveled 45.16 kilometers (28.06 miles) across Meridiani Planum on Mars between 2004 and 2018, completing the first extraterrestrial marathon and setting the record for off-world driving distance.",
    "missionRef": "Opportunity Rover (MER-B)",
    "verifiedSource": "NASA Mars Exploration Program Archive"
  },
  {
    "id": 6,
    "question": "What suspension mechanism was pioneered on Mars by the micro-rover Sojourner in 1997?",
    "options": [
      "Hydraulic active-strut dampening system",
      "Rocker-Bogie differential suspension",
      "Continuous caterpillar rubber track mechanism",
      "Pneumatic leaf-spring chassis"
    ],
    "correctIndex": 1,
    "explanation": "Sojourner introduced the 6-wheel Rocker-Bogie suspension invented at NASA JPL. The rocker-bogie allows the rover to climb over obstacles larger than its wheel diameter while keeping all six wheels in contact with uneven ground without springs.",
    "missionRef": "Sojourner Rover (Mars Pathfinder)",
    "verifiedSource": "NASA JPL Robotics & Mobility Laboratory"
  },
  {
    "id": 7,
    "question": "What major atmospheric event brought the Opportunity Rover’s 14-year mission to a close in June 2018?",
    "options": [
      "A catastrophic meteor impact nearby in Endeavour Crater",
      "A global, planet-encircling dust storm that blocked sunlight to its solar arrays",
      "Severe volcanic ash fall from Olympus Mons",
      "Extreme sub-zero CO2 snow collapse"
    ],
    "correctIndex": 1,
    "explanation": "In June 2018, a massive planet-encircling dust storm blotted out over 99% of incoming solar radiation above Meridiani Planum. Without enough sunlight to generate electricity or run survival heaters, Opportunity’s batteries drained and the rover fell silent.",
    "missionRef": "Opportunity Rover (MER-B)",
    "verifiedSource": "NASA / JPL Mars Exploration Rover Final Status Report"
  },
  {
    "id": 8,
    "question": "What is the significance of the 'One Small Step to Protect Human Heritage in Space Act' passed in 2020?",
    "options": [
      "It bans any future robotic or crewed landings anywhere on the Moon",
      "It requires NASA-licensed missions to preserve and avoid disturbing historic Apollo lunar landing sites",
      "It claims sovereign US territorial ownership of Tranquility Base",
      "It authorizes the retrieval of all Apollo artifacts back to Earth museums"
    ],
    "correctIndex": 1,
    "explanation": "Enacted on December 31, 2020, the act requires US government agencies and commercial partners participating in new lunar missions to adhere to preservation guidelines preventing destruction or contamination of historic landing sites like Apollo 11.",
    "missionRef": "Space Heritage Preservation Law",
    "verifiedSource": "Public Law 116-275 (116th Congress) / NASA Office of General Counsel"
  }
]
