export interface GalleryItem {
  id: string;
  title: string;
  category: 'Whales & Giants' | 'Predators' | 'Reefs & Corals' | 'Deep Bioluminescence' | 'Invertebrates';
  location: string;
  depth: string;
  photographer: string;
  caption: string;
  imageUrl: string;
  aspect: 'landscape' | 'portrait' | 'square';
}

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Baleen Titan Through Surface Light',
    category: 'Whales & Giants',
    location: 'Silver Bank, Dominican Republic',
    depth: '14 m',
    photographer: 'Marine Expeditions Archive',
    caption: 'A 30-ton female humpback whale glides serenely below the sunlit surface caustics.',
    imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1400&q=80',
    aspect: 'landscape'
  },
  {
    id: 'gal-2',
    title: 'Neon Tendrils of the Abyssal Crown',
    category: 'Deep Bioluminescence',
    location: 'Monterey Submarine Canyon',
    depth: '850 m',
    photographer: 'Deep Pelagic Survey',
    caption: 'Bioluminescent photophores glowing with blue-green luciferin emissions in dark waters.',
    imageUrl: 'https://images.unsplash.com/photo-1508873696983-2df5293cb32f?auto=format&fit=crop&w=1200&q=80',
    aspect: 'portrait'
  },
  {
    id: 'gal-3',
    title: 'The Silent Apex Hunter',
    category: 'Predators',
    location: 'Guadalupe Island, Mexico',
    depth: '8 m',
    photographer: 'Ocean Pelagic Guild',
    caption: 'Counter-shaded Great White Shark ascending into coastal waters with sunlight ripples.',
    imageUrl: 'https://images.unsplash.com/photo-1560275619-4662e36fa65c?auto=format&fit=crop&w=1200&q=80',
    aspect: 'landscape'
  },
  {
    id: 'gal-4',
    title: 'Living Tapestry of the Coral Atoll',
    category: 'Reefs & Corals',
    location: 'Raja Ampat, Indonesia',
    depth: '12 m',
    photographer: 'Coral Biodiversity Project',
    caption: 'Pristine hard and soft coral colonies teeming with thousands of anthias and damselfish.',
    imageUrl: 'https://images.unsplash.com/photo-1546026423-cc4642628d2b?auto=format&fit=crop&w=1200&q=80',
    aspect: 'landscape'
  },
  {
    id: 'gal-5',
    title: 'Ancient Nomad of the Seagrass Shallows',
    category: 'Whales & Giants',
    location: 'Ningaloo Reef, Western Australia',
    depth: '6 m',
    photographer: 'Marine Reptile Trust',
    caption: 'A green sea turtle gracefully grazing amidst pristine sunlight reflections.',
    imageUrl: 'https://images.unsplash.com/photo-1518467166778-b88f373ffec7?auto=format&fit=crop&w=1200&q=80',
    aspect: 'portrait'
  },
  {
    id: 'gal-6',
    title: 'Cephalopod Sentry in Kelp Shadows',
    category: 'Invertebrates',
    location: 'Puget Sound, Washington',
    depth: '22 m',
    photographer: 'Pacific Benthic Lab',
    caption: 'Giant Pacific Octopus surveying its rocky lair with curious amber eyes and flared mantle.',
    imageUrl: 'https://images.unsplash.com/photo-1545671913-b89ac1b4ac10?auto=format&fit=crop&w=1200&q=80',
    aspect: 'square'
  },
  {
    id: 'gal-7',
    title: 'Oceanic Flight of the Manta Wing',
    category: 'Whales & Giants',
    location: 'Socorro Islands, Revillagigedo',
    depth: '18 m',
    photographer: 'Pelagic Wanderers Project',
    caption: 'A 6-meter oceanic manta ray soaring gracefully through sun-pierced oceanic depths.',
    imageUrl: 'https://images.unsplash.com/photo-1544551763-8dd44758c2dd?auto=format&fit=crop&w=1200&q=80',
    aspect: 'landscape'
  },
  {
    id: 'gal-8',
    title: 'The Intertidal Keystone Star',
    category: 'Invertebrates',
    location: 'Tofino, British Columbia',
    depth: '2 m',
    photographer: 'Coastal Tidepool Survey',
    caption: 'Ochre sea star clinging to wave-swept barnacle beds in crystal tidal pools.',
    imageUrl: 'https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?auto=format&fit=crop&w=1200&q=80',
    aspect: 'portrait'
  }
];
