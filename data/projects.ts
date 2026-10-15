import { galleryConfig } from '@/config/gallery.config';

export interface ProjectItem {
  id: string;
  category: string;
  filterKey:
    | 'electrical'
    | 'painting'
    | 'carpentry'
    | 'plumbing'
    | 'palisades'
    | 'paving'
    | 'maintenance'
    | 'glass-works'
    | 'flooring'
    | 'gutters-fascia'
    | 'aluminium-windows-doors';
  additionalFilterKeys?: Array<'maintenance' | 'glass-works' | 'flooring' | 'gutters-fascia' | 'aluminium-windows-doors'>;
  title: string;
  subtitle: string;
  cardSummary: string;
  location: string;
  image: string;
  scope: string[];
  description: string;
}

export const galleryFilters = [
  { key: 'all', label: 'All Projects' },
  ...galleryConfig.categories.map((category) => ({ key: category.value, label: category.filterLabel })),
] as const;

export const projectsData: ProjectItem[] = [
  {
    id: 'project-1',
    category: 'Electrical',
    filterKey: 'electrical',
    title: 'Electrical',
    subtitle: 'Distribution Board & Sub-Circuit Wiring',
    cardSummary: 'Distribution board rebuild, circuit protection and compliance-related electrical work.',
    location: 'Bedfordview, Johannesburg',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCuroIwgygiqhg0GpMdyZbaWlmYwILupLltCfXOBPOyROroqkyotDoDZ57kcxgDWRMD6LJEA-y6L5itLjWcuR21a8u-xm3VFbv2ZkUD6NYl-hqZ-Vqo5VqP5i2IZxZAthN10PhVC0wjhJ-VbSHrMwjxvyoSOZdWFRh6zDJFKyuBaSyQLu-CcmF15W3zntT0DsFajMP9lz4K-l5Tx9ZWo1wH5WGgNeWmPxBk7aWTAqx7iaAbYOrIcpNfmQ',
    scope: [
      '3-Phase Main DB Board rebuild and neat wiring loom',
      'Dual earth leakage protection circuit installation',
      'Dedicated surge protection device (SPD) integration',
      'Full SANS 10142-1 Electrical Certificate of Compliance (COC)'
    ],
    description: 'Complete overhaul of an outdated residential distribution board. The team traced all circuits, isolated chronic nuisance tripping, replaced faulty breakers with certified Din-rail modules, and issued an official compliance certificate.'
  },
  {
    id: 'project-2',
    category: 'Painting',
    filterKey: 'painting',
    title: 'Painting',
    subtitle: 'Interior & Exterior Coatings',
    cardSummary: 'Exterior painting with crack repairs and protective coatings for weather resistance.',
    location: 'Bryanston, Johannesburg',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBSl_WQz4_BUPFnnPx43a9J3C9qQyxe_oSjrch_YwfFQLrWmqKXnAY2Y1iqcCe_1n6mP7spblWkDZ9qKySWszfAhObjFdFc236E_hjyfy3O35LeRd21Zdosg-AhcP-A-XCpHb0iCgk7hk6GhRxlh7Ucm5xdGM2vt_lGZ7nH3EVQAc6WGJ841DM6dh-blVhAdTfXhvYUxSv6ae6NO_8IbFdXGZ-j5XD5CcepMsyOxK6TvpYi1hWfcVZAIw',
    scope: [
      'High-pressure chemical wash of existing masonry',
      'Deep elastomeric crack bridging and plaster repairs',
      'UV-resistant pure acrylic exterior topcoats (Charcoal & Crisp White)',
      'Waterproof sealing on parapets and window sills'
    ],
    description: 'Comprehensive transformation of a modern luxury residence exterior. Required thorough damp diagnosis, structural hairline crack filling, and triple-coat protective architectural paint engineered for severe Johannesburg hailstorm resilience.'
  },
  {
    id: 'project-3',
    category: 'Carpentry',
    filterKey: 'carpentry',
    title: 'Carpentry',
    subtitle: 'Built-In Cupboards & Finishing',
    cardSummary: 'Made-to-measure bedroom cupboards with fitted storage and clean finishing.',
    location: 'Meyersdal, Alberton',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD5OjL5fFG3bg8g9TSK_Tl-8tkssi-4cXBBC9mSrji4Fggqt6mqoCCbt4j0-WHOTL50ikJK2TjB_9lKCnOgDsmTVd7Itph68suVGkjC_328q4ST4o9ftphAGsbj5eD3k1-_X8asbinHYdnRg2Ieip4aNeNM9Km0sgwFXnNZn71sSoHWCTL1xCsfnBNJdpiKDlgjf0MvHeRYWie3KCpbdV3rFGUWJgTB4iXMYIzCrR7xyoLTKZnBvhwKeA',
    scope: [
      'Precision floor-to-ceiling built-in master bedroom wardrobes',
      'Soft-close concealed German hinges and heavy-duty drawer runners',
      'Integrated LED channel lighting recess carpentry',
      'Matching hardwood architraves and precision perimeter skirtings'
    ],
    description: 'Custom joinery and wardrobe cabinetry fitted directly against uneven walls with laser precision scribing. Clean, minimalist matte finish doors with interior organizers and shoe display shelving.'
  },
  {
    id: 'project-4',
    category: 'Plumbing',
    filterKey: 'plumbing',
    title: 'Plumbing',
    subtitle: 'Luxury Bathroom & Geyser Installations',
    cardSummary: 'Bathroom plumbing, sanitaryware installation and tested hot-water connections.',
    location: 'Sandton, Johannesburg',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAWjcarXKsl3O6UiJWxxL93fcrdvQPy5mB59SXy84-koWMYPu7Ph7W-l0t7JBozPyWcOniH8fVDd9A735tO-o1HQDgaYtHsQudA5mY_u2O4xeQ804YN0Ny0-SNLHAFVzU3N4uo3_AGE1pnatD_k-7wQEKJlGgismUGZSCSweMgwql6CoPxM30ozdG5yNYXv0yF-cdVTkbHmaCbUE_xHCTzT_vvCN3UCS3Umd0MZhi2-GnPnHxH5mbBvhA',
    scope: [
      'Complete copper-to-PEX water reticulation re-pipe',
      'Freestanding designer stone bath and thermostatic mixer install',
      'Concealed in-wall cistern and wall-hung toilet fitting',
      'High-pressure geyser thermostat & vacuum breaker replacement'
    ],
    description: 'Full bathroom sanitaryware plumbing installation including wall chasing for concealed mixer valves, precision waste falls, and pressure-tested hot water plumbing with zero leaks.'
  },
  {
    id: 'project-5',
    category: 'Palisades & Carports',
    filterKey: 'palisades',
    additionalFilterKeys: ['gutters-fascia'],
    title: 'Palisades & Carports',
    subtitle: 'Custom Steel Fabrication & Automation',
    cardSummary: 'Custom steel carport fabrication and installation for vehicle protection.',
    location: 'Centurion',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCWBax_T46uynpNADscXDGNia53Vtqt3pDjUalC-YisLuULknn1B90Koezbct_9d1CQTMsgPGcZeV4vymQHc6C5YAk9OTLt12X49yKeFuVC8hRqcNjBs1YFZ1Zf440cOvK0Ktuvsjy4LWfilLn3g0XBglfqc-l-R8bLP57-hQyAlbCaGLEPLIK4rAM_HIIdvnGpTkYX_m-Shw8JtnQ8IUr9Q4KvhmztTLBh33a5HQCKVt05tNFuDDlxVw',
    scope: [
      'Heavy-gauge galvanized steel cantilever 2-vehicle carport',
      'Corrugated IBR roof sheeting with integrated seamless guttering',
      'Concrete footing excavation and precision upright post casting',
      'Anti-corrosive primer and architectural dark charcoal enamel'
    ],
    description: 'Engineered vehicle protection carport designed to match contemporary architectural aesthetics. Built with structural steel hollow tubing and reinforced cantilever gussets to withstand severe hail.'
  },
  {
    id: 'project-6',
    category: 'Renovations',
    filterKey: 'maintenance',
    title: 'Renovations',
    subtitle: 'Corporate Office Alterations & Fit-Out',
    cardSummary: 'Office alterations with updated lighting, meeting spaces and plaster finishes.',
    location: 'New Redruth, Alberton',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDMZZfvYj_ogC5PHef0pfHlXLvLzpPTh-RMe90qSLqs4X9KVxWpGb-A6pnZAblexERrNdb1071916ossFFyR8nCya2G-g-A88PJZL10Ll7H-zEAAtFnpSMg8emwJ-Ut4Qe77-ExeaPX8jOVIYzIZPOgK4Pf9dY72OPMbf36GmZLOxJrwPT8dQbwt_ufRzMrlbsXzbXV2kM65P0p4aLdJfZvr-ppHZcuyxcOk0EXXvao_O09Hu49gEKmog',
    scope: [
      'Commercial drywall partition construction and acoustic insulation',
      'Commercial grade suspended ceiling tile repairs and realignment',
      'Dedicated data cable raceway trunking and power floor boxes',
      'Durable scuff-resistant paint application for high-traffic corridors'
    ],
    description: 'Turnkey alterations for an expanding commercial enterprise. Completed after-hours to avoid commercial disruption, delivering clean demarcated meeting rooms, updated lighting circuits, and seamless plaster finishes.'
  },
  {
    id: 'project-7',
    category: 'Renovations',
    filterKey: 'paving',
    title: 'Structural Alterations',
    subtitle: 'Engineered Paving & Boundary Integration',
    cardSummary: 'Driveway paving and boundary work with improved drainage away from foundations.',
    location: 'Alberton, Johannesburg',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDhn1sUA6cb-u7_UcSjwVtj8mYU_9j9n2KM-whcFNotHerF1_AL4BDn6l5hxIcs7BnakIhhjbw-rjNRkdaigAzx8BCN0nldDNdOLdJDM8-HkAMDMkgyYgXK9E2UZ-FbxS3vGj3n9DAcq0vRFFpMC5-JovMRR_Y7C9oFUrPv0BuQf2FPXmvyW1ZDyoNaWWPG4nx0iT75PQIPYG6D_WhOp1dYapgfiYYyFYaOqAiTGkKC3w4iw6ZqKl7diw',
    scope: [
      'Excavation and 150mm compacted sub-base preparation',
      'Interlocking heavy-duty concrete bevel pavers laying',
      'Boundary retaining kerb casting with drainage gradient',
      'Weed-barrier polymeric sand joint consolidation'
    ],
    description: 'Turnkey driveway paving overhaul and boundary retaining structure. Fixed persistent pooling water by re-engineering ground fall angles away from foundations.'
  },
  {
    id: 'project-8',
    category: 'Carpentry',
    filterKey: 'carpentry',
    title: 'Carpentry',
    subtitle: 'Timber Partitioning & Ceiling Lining',
    cardSummary: 'Timber decking with durable framing for a smooth indoor-outdoor transition.',
    location: 'Silver Lakes, Pretoria',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBU_gfQYJFb2m2FmgnHV0RjZK7LSAUjtk1-lhmRfHpaFzNW3A3VKYSeBrVyGBsh517HezrI6-nWw-SbfhQjoNXbtb7nVllPQjKnP3zB_lYjNbxYrvf8wr26THxkthEa2P5FRycWasPsKJ8Yv0mvfIJJuJDA56L-AYKlrCEl4IufQJPPkgpF-Dd9A781D0tFEGE_dDKLfJp_DP0vzwwerqNnNmU2XO4O7H7zWB7THJdVTzJ2OebE6DIEPg',
    scope: [
      'Architectural exterior timber decking and balustrading',
      'Precision stainless steel hidden fasteners fastening',
      'Pre-treated weather-sealed hardwood joist framing',
      'Protective natural exterior decking oil application'
    ],
    description: 'Custom hardwood timber decking installation executed to strict architectural tolerances. Provides seamless indoor-outdoor transition with durable structural framing.'
  },
  {
    id: 'project-9',
    category: 'Electrical',
    filterKey: 'electrical',
    title: 'Certified Compliance',
    subtitle: 'Commercial DB Board Inverter Backup System',
    cardSummary: 'Commercial distribution board and inverter backup installation with labelled wiring.',
    location: 'Fourways, Johannesburg',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAlAncPdCi5h4looGaNK6i0RNxit4Z-G83zVvVfDeYyynUQLgv-wWr6Pu5mEuSPpkO5T7CnxMZxFOJVgqmjPjs_a2Z2RAv9LjXgnXdGAXlGzqGoa1Y_M-X-B_YbEfQnmx88Y-aBCFdLfuAR_dOEHNstFr_ncJFuMTqD57noyGGeYv50u5bNYBYuOhqK2Cd5fZ-1qWp4pEy50ozkDZ47azkP3Jw4Fhn3jrW8ElV86G13d2LYULs3Vzzc7g',
    scope: [
      'Backup inverter and battery bank sub-distribution board setup',
      'Automatic transfer switch (ATS) and bypass switch wiring',
      'Essential vs non-essential circuit isolation and tagging',
      'Official Electrical COC inspection and sign-off'
    ],
    description: 'Critical power distribution installation ensuring zero downtime during grid disruptions. All wiring laid within neat enclosed trunking with clear labeling and safety breaker protections.'
  }
];
