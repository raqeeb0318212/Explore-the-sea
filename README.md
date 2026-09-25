# Explore the Deep Sea

An immersive, cinematic marine species discovery web application engineered to introduce users to the extraordinary creatures of the ocean through high-fidelity imagery, detailed biological profiles, 3D underwater ambient animations, and procedural acoustics.

---

## 1. Project Hierarchy

### File & Directory Structure

```text
├── index.html                   # HTML entry point with metadata, preconnects & custom fonts
├── metadata.json                # AI Studio application metadata
├── package.json                 # Dependencies and build configurations
├── tsconfig.json                # TypeScript compiler configuration
├── vite.config.ts               # Vite bundler & Tailwind configuration
├── public/                      # Public assets directory
└── src/
    ├── main.tsx                 # React application root entry point
    ├── App.tsx                  # Master layout, state orchestration & scroll management
    ├── index.css                # Global Tailwind CSS, theme tokens & custom scrollbars
    │
    ├── components/              # Modular UI & Section Components
    │   ├── Navbar.tsx           # Sticky header with search, theme & acoustics toggles
    │   ├── HeroSection.tsx      # Cinematic whale hero banner with parallax & scroll hint
    │   ├── ThreeOceanCanvas.tsx # Three.js WebGL canvas (bioluminescent particles & god-rays)
    │   ├── MarineVisual.tsx     # Lazy-loaded image renderer with SVG fallback & size variants
    │   ├── FeaturedSpeciesSection.tsx # Responsive species grid (mobile 1-col, PC 4-col)
    │   ├── SpeciesSpotlightSection.tsx # Interactive museum spotlight panel with specs & fun facts
    │   ├── SpeciesDetailModal.tsx # Full-screen biological dossier modal with sound player
    │   ├── OceanLayersSection.tsx # The 5 depth zones (Sunlight to Hadal trench)
    │   ├── OceanLifeSecretsSection.tsx # Biological marvels & biomechanical adaptation cards
    │   ├── GallerySection.tsx   # Curated photographic exhibition with fullscreen lightbox
    │   ├── ConservationSection.tsx # Threat impact tracker & interactive guardian pledge
    │   ├── AboutSection.tsx     # Educational mission & taxonomic accuracy overview
    │   ├── ContactSection.tsx   # Expedition inquiry & dispatch contact form
    │   └── Footer.tsx           # Institutional footer, links, credits & back-to-top button
    │
    ├── data/                    # Scientifically-Curated Datasets
    │   ├── speciesData.ts       # 16 complete species profiles (taxonomies, metrics, diet, audio)
    │   ├── oceanLayersData.ts   # Depth tiers data (temperatures, pressures, sunlight)
    │   ├── oceanLifeSecretsData.ts # Scientific deep dives (echolocation, camouflage, propulsion)
    │   └── galleryData.ts       # Curated photographic catalog with locations & metadata
    │
    └── utils/
        └── audioSynthesizer.ts  # Web Audio API procedural synthesizer (whale & creature calls)
```

### Component Architecture Hierarchy

```text
<App>
  ├── <ThreeOceanCanvas />              (WebGL background: particles, caustics, silhouettes)
  ├── <Navbar />                        (Brand wordmark, nav links, live search, theme, audio)
  │
  ├── <main>
  │   ├── <HeroSection />              (Headline, whale backdrop, primary CTAs, scroll down indicator)
  │   ├── <FeaturedSpeciesSection />   (Filter tags, responsive top-to-bottom card grid)
  │   ├── <SpeciesSpotlightSection />  (Species picker, central photo showcase, biological metrics)
  │   ├── <OceanLayersSection />       (Depth cards: Sunlight, Twilight, Midnight, Abyssal, Hadal)
  │   ├── <OceanLifeSecretsSection />  (Interactive adaptation cards & deep dive panel)
  │   ├── <GallerySection />           (Filterable photo grid + Fullscreen lightbox)
  │   ├── <ConservationSection />      (Biodiversity threats + Interactive pledge counter)
  │   ├── <AboutSection />             (Mission statement + taxonomic accuracy pillars)
  │   └── <ContactSection />           (Expedition inquiry dispatch form)
  │   </main>
  │
  ├── <Footer />                        (Links, copyright notice, back-to-top button)
  └── <SpeciesDetailModal />            (Expanded species biology & acoustics dossier dialog)
```

---

## 2. Species Showcase & Visual Preview

The website highlights 16 extraordinary marine creatures across diverse ocean layers and taxonomic categories.

### Key Species Featured

| Species | Scientific Name | Category | Primary Depth Layer | Size / Length |
| :--- | :--- | :--- | :--- | :--- |
| **Blue Whale** | *Balaenoptera musculus* | Mammals | Sunlight Zone | 24–30 m |
| **Humpback Whale** | *Megaptera novaeangliae* | Mammals | Sunlight Zone | 12–16 m |
| **Great White Shark** | *Carcharodon carcharias* | Fish | Sunlight Zone | 4–6 m |
| **Giant Pacific Octopus** | *Enteroctopus dofleini* | Invertebrates | Twilight Zone | 3–5 m |
| **Green Sea Turtle** | *Chelonia mydas* | Reptiles | Sunlight Zone | 1–1.5 m |
| **Ochre Sea Star** | *Pisaster ochraceus* | Invertebrates | Sunlight Zone | 20–45 cm |
| **Crystal Jellyfish** | *Aequorea victoria* | Invertebrates | Twilight Zone | 10–25 cm |
| **Giant Oceanic Manta Ray** | *Mobula birostris* | Fish | Sunlight Zone | 5–7 m |
| **Humpback Anglerfish** | *Melanocetus johnsonii* | Deep-Sea | Midnight Zone | 15–20 cm |
| **Ocellaris Clownfish** | *Amphiprion ocellaris* | Fish | Sunlight Zone | 8–11 cm |
| **Common Bottlenose Dolphin** | *Tursiops truncatus* | Mammals | Sunlight Zone | 2.5–3.8 m |
| **Pacific Seahorse** | *Hippocampus ingens* | Fish | Sunlight Zone | 18–30 cm |
| **American Lobster** | *Homarus americanus* | Invertebrates | Sunlight Zone | 30–65 cm |
| **Japanese Spider Crab** | *Macrocheira kaempferi* | Invertebrates | Twilight Zone | Up to 3.8 m leg span |
| **Staghorn & Brain Coral** | *Acropora cervicornis* | Coral & Plants | Sunlight Zone | Colonies up to 2 m |
| **Purple Sea Urchin** | *Strongylocentrotus purpuratus* | Invertebrates | Sunlight Zone | 5–10 cm |

---

### Visual Imagery References

#### 1. Blue Whale (*Balaenoptera musculus*)
> *The largest animal to have ever lived on Earth, gliding beneath sunlit surface caustics.*  
![Blue Whale](https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=900&q=80)

#### 2. Great White Shark (*Carcharodon carcharias*)
> *Apex predator with electromagnetic ampullae of Lorenzini swimming in crystal coastal waters.*  
![Great White Shark](https://images.unsplash.com/photo-1560275619-4662e36fa65c?auto=format&fit=crop&w=900&q=80)

#### 3. Giant Pacific Octopus (*Enteroctopus dofleini*)
> *Cognitive cephalopod with three hearts, copper blood, and 200ms instantaneous camouflage.*  
![Giant Octopus](https://images.unsplash.com/photo-1545671913-b89ac1b4ac10?auto=format&fit=crop&w=900&q=80)

#### 4. Green Sea Turtle (*Chelonia mydas*)
> *Ancient oceanic navigator crossing ocean basins using Earth's geomagnetic field.*  
![Green Sea Turtle](https://images.unsplash.com/photo-1518467166778-b88f373ffec7?auto=format&fit=crop&w=900&q=80)

#### 5. Bioluminescent Crystal Jellyfish (*Aequorea victoria*)
> *Hydrodynamic pulsating bell emitting green fluorescent protein (GFP) luminescence.*  
![Crystal Jellyfish](https://images.unsplash.com/photo-1508873696983-2df5293cb32f?auto=format&fit=crop&w=900&q=80)

#### 6. Giant Oceanic Manta Ray (*Mobula birostris*)
> *Graceful 6-meter glider possessing the largest brain-to-body mass ratio of any cold-blooded fish.*  
![Manta Ray](https://images.unsplash.com/photo-1544551763-8dd44758c2dd?auto=format&fit=crop&w=900&q=80)

#### 7. Living Coral Reef Ecosystem (*Acropora cervicornis*)
> *Living limestone megastructures providing nursery grounds for over 25% of all marine species.*  
![Coral Reef](https://images.unsplash.com/photo-1546026423-cc4642628d2b?auto=format&fit=crop&w=900&q=80)

---

## 3. Website Look & Features

- **Documentary Nature Aesthetic**: Deep navy and dark sapphire canvas (`#030b17`) paired with cyan and turquoise glowing accents (`#38bdf8`), subtle water caustics, and Cinzel display typography.
- **Three.js WebGL Particle Canvas**: Real-time floating bioluminescent plankton particles, volumetric god-rays, and swimming silhouettes with automatic mobile throttling.
- **Top-to-Bottom Mobile Responsive Design**:
  - Full-width stacked vertical cards on mobile devices (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-4`).
  - Fluid multi-line category filter wrapping with zero horizontal scrolling (`overflow-x-hidden`).
  - Ergonomic mobile species switcher with `< Previous` and `Next >` touch buttons.
- **Interactive Species Spotlight**: 3-column PC museum layout with vertical avatar selector, large photo showcase, biological metrics (Length, Weight, Lifespan, Habitat), and illuminated *Fun Fact* callout box.
- **Ocean Depth Layers**: Interactive exploration across the 5 oceanic tiers (Sunlight 0–200m, Twilight 200–1,000m, Midnight 1,000–4,000m, Abyssal 4,000–6,000m, Hadal 6,000+m).
- **Procedural Underwater Acoustics**: Web Audio API engine synthesizing authentic baleen whale songs, dolphin click-trains, and sonar sweeps with zero external audio assets.
- **Theme Accessibility Toggle**: Switch between *Deep Ocean* (cinematic dark navy), *Abyssal Midnight* (ultra-dark), and *Sunlit Coastal* (high-contrast mode).
