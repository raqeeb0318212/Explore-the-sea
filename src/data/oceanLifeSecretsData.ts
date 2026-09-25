export interface OceanSecret {
  id: string;
  title: string;
  topic: string;
  summary: string;
  deepDive: string;
  organism: string;
  keyMetric: string;
  metricLabel: string;
  imageUrl: string;
}

export const OCEAN_SECRETS: OceanSecret[] = [
  {
    id: 'secret-whale-songs',
    title: 'How Whales Communicate Across Oceans',
    topic: 'Acoustic Navigation & SOFAR Channels',
    summary: 'Baleen whales project complex low-frequency infrasound waves (10–40 Hz) that can travel more than 4,000 kilometers across the oceanic deep sound channel.',
    deepDive: 'In the ocean, the SOFAR (Sound Fixing and Ranging) channel at depths of 600–1,200m acts as an underwater acoustic waveguide where temperature and water pressure create a zone of minimum sound speed. Whales use this physical channel to broadcast mating serenades and migratory rallying calls that travel halfway across entire ocean basins without dispersing.',
    organism: 'Blue Whale & Humpback Whale',
    keyMetric: '4,000+ km',
    metricLabel: 'Acoustic broadcast range',
    imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'secret-octopus-camo',
    title: 'Instantaneous Cephalopod Camouflage',
    topic: 'Chromatophore Neuro-Mechanics',
    summary: 'Octopuses change their pigment coloration and 3D skin texture within 200 milliseconds without needing to check a mirror.',
    deepDive: 'The skin of an octopus is directly wired to its peripheral nervous system. It contains three stacked optical layers: elastic pigment sacs (chromatophores) controlled by radial muscles, reflective plates (iridophores) scattering blue and green light, and white structural reflectors (leucophores). Muscular dermal papillae can simultaneously morph smooth skin into spiky coral ridges.',
    organism: 'Giant Pacific Octopus',
    keyMetric: '200 ms',
    metricLabel: 'Texture morphing speed',
    imageUrl: 'https://images.unsplash.com/photo-1545671913-b89ac1b4ac10?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'secret-jellyfish-propulsion',
    title: 'The Most Energy-Efficient Swimmer on Earth',
    topic: 'Passive Energy Recoil & Vortices',
    summary: 'Jellyfish consume 48% less metabolic oxygen than any other swimming animal through suction-based hydrodynamic vortex rings.',
    deepDive: 'Rather than forcefully paddling through water, a jellyfish contracts its umbrella-shaped bell to generate a low-pressure vortex at the margin. As the elastic bell passively recoils back to its resting state, it captures a secondary vortex that literally pulls the animal forward through the water column with zero additional energy expenditure.',
    organism: 'Crystal & Moon Jellyfish',
    keyMetric: '48% Less',
    metricLabel: 'Oxygen cost vs. fish swimming',
    imageUrl: 'https://images.unsplash.com/photo-1508873696983-2df5293cb32f?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'secret-coral-cities',
    title: 'Coral Reefs as Living Megastructures',
    topic: 'Symbiotic Biomineralization',
    summary: 'Corals cover less than 0.1% of the seabed yet nurture more than 25% of all known marine species on our planet.',
    deepDive: 'Coral colonies are biogenic architects. Microscopic zooxanthellae living inside polyp tissues conduct solar photosynthesis, donating 90% of their glucose and amino acid yield to the coral animal. In turn, the polyp provides carbon dioxide, nitrogen, and a protected limestone sanctuary. Over millennia, these colonies construct barriers visible from outer space.',
    organism: 'Staghorn & Brain Corals',
    keyMetric: '25%',
    metricLabel: 'Global marine species supported',
    imageUrl: 'https://images.unsplash.com/photo-1546026423-cc4642628d2b?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'secret-deep-abyss-pressure',
    title: 'Surviving Crushing Hadal Pressures',
    topic: 'Cellular Piezo-Stabilization',
    summary: 'Creatures in the Mariana Trench endure water pressures exceeding 1,100 atmospheres (equivalent to the weight of an elephant balanced on a postage stamp).',
    deepDive: 'At 10,000 meters depth, hydrostatic pressure normally crushes cell membranes and deforms protein enzymes. Deep-sea hadal species survive by producing high concentrations of Trimethylamine N-oxide (TMAO), a piezolyte molecule that tightly binds water molecules, stabilizing intracellular proteins against distortion under immense pressure.',
    organism: 'Mariana Snailfish & Hadal Amphipods',
    keyMetric: '1,100 atm',
    metricLabel: 'Hydrostatic pressure survived',
    imageUrl: 'https://images.unsplash.com/photo-1544551763-92ab472cad5d?auto=format&fit=crop&w=1000&q=80'
  }
];
