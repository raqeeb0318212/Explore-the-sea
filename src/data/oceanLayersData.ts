export interface OceanLayer {
  id: string;
  name: string;
  scientificName: string;
  depthRange: string;
  depthMeters: string;
  temperature: string;
  pressure: string;
  lightLevel: string;
  description: string;
  characteristicCreatures: string[];
  bannerGradient: string;
  accentColor: string;
}

export const OCEAN_LAYERS: OceanLayer[] = [
  {
    id: 'sunlight-zone',
    name: 'Sunlight Zone',
    scientificName: 'Epipelagic Zone',
    depthRange: '0–200 m',
    depthMeters: '0–200 m',
    temperature: '12°C to 30°C',
    pressure: '1 to 20 atm',
    lightLevel: 'Full daylight & photosynthesis',
    description: 'The sun-drenched surface realm where photosynthesis flourishes. Although it makes up only 5% of the ocean’s depth, it sustains 90% of all marine life, from coral reefs to majestic baleen whales.',
    characteristicCreatures: ['Blue Whale', 'Green Sea Turtle', 'Manta Ray', 'Clownfish', 'Dolphin', 'Staghorn Coral'],
    bannerGradient: 'from-cyan-500/20 via-blue-600/10 to-slate-900',
    accentColor: '#38bdf8'
  },
  {
    id: 'twilight-zone',
    name: 'Twilight Zone',
    scientificName: 'Mesopelagic Zone',
    depthRange: '200–1,000 m',
    depthMeters: '200–1,000 m',
    temperature: '4°C to 20°C',
    pressure: '20 to 100 atm',
    lightLevel: 'Dim twilight, insufficient for photosynthesis',
    description: 'A shadowy, eerie dusk where sunlight fades into eternal darkness. Here, 90% of organisms produce their own living light through chemical bioluminescence to communicate, evade predators, and hunt.',
    characteristicCreatures: ['Giant Pacific Octopus', 'Crystal Jellyfish', 'Japanese Spider Crab', 'Lanternfish', 'Sperm Whale'],
    bannerGradient: 'from-blue-700/20 via-indigo-900/15 to-slate-950',
    accentColor: '#0ea5e9'
  },
  {
    id: 'midnight-zone',
    name: 'Midnight Zone',
    scientificName: 'Bathypelagic Zone',
    depthRange: '1,000–4,000 m',
    depthMeters: '1,000–4,000 m',
    temperature: '1°C to 4°C',
    pressure: '100 to 400 atm',
    lightLevel: 'Total blackness, except for bioluminescent organisms',
    description: 'A pitch-black expanse under immense crushing hydrostatic pressures. Creatures here have bizarre evolutionary adaptations: elastic stomachs, giant translucent fangs, and glowing bacterial lures.',
    characteristicCreatures: ['Humpback Anglerfish', 'Giant Squid', 'Vampire Squid', 'Gulper Eel', 'Fangtooth'],
    bannerGradient: 'from-indigo-950/40 via-purple-950/20 to-[#020617]',
    accentColor: '#818cf8'
  },
  {
    id: 'abyssal-zone',
    name: 'Abyssal Zone',
    scientificName: 'Abyssopelagic Zone',
    depthRange: '4,000–6,000 m',
    depthMeters: '4,000–6,000 m',
    temperature: '0°C to 3°C',
    pressure: '400 to 600 atm',
    lightLevel: 'Absolute darkness',
    description: 'Covering 60% of the Earth’s surface, the oceanic abyss is a realm of near-freezing water, heavy silence, and mineral-rich sediment plains punctuated by hydrothermal vents spewing superheated water.',
    characteristicCreatures: ['Tripod Fish', 'Dumbo Octopus', 'Deep-Sea Urchins', 'Sea Cucumbers', 'Vent Tube Worms'],
    bannerGradient: 'from-purple-950/30 via-slate-950 to-[#010409]',
    accentColor: '#a855f7'
  },
  {
    id: 'hadal-zone',
    name: 'Hadal Zone',
    scientificName: 'Hadopelagic Zone',
    depthRange: '6,000+ m',
    depthMeters: '6,000–11,000 m',
    temperature: '1°C to 4°C',
    pressure: 'Over 1,100 atm (8 tons/sq inch)',
    lightLevel: 'Eternal abyss',
    description: 'Named after Hades, god of the underworld. Found exclusively in extreme V-shaped tectonic trenches like the Mariana Trench (10,994m). Inhabitants possess flexible cartilaginous skeletons and trimethylamine oxide to stabilize proteins.',
    characteristicCreatures: ['Mariana Snailfish', 'Hirondellea gigas (Giant Amphipod)', 'Deep Trench Anemones', 'Xenophyophores'],
    bannerGradient: 'from-violet-950/20 via-black to-[#010206]',
    accentColor: '#c084fc'
  }
];
