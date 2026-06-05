/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Property, Testimonial, Service, StatDetail } from './types';

export const PROPERTIES: Property[] = [
  {
    id: 'prop-1',
    name: 'Solaria Canopy Villa',
    location: 'Neo-Tokyo Overlook, Sector 7',
    price: '$18.4M',
    category: 'residential',
    style: 'Parametric Minimalism',
    size: '8,450 sqft',
    bedrooms: 5,
    bathrooms: 6,
    yearBuilt: 2026,
    energyRating: 'A+++ Net-Zero',
    imageUrl: '/src/assets/images/hero_luxury_villa_1780669272122.png',
    tags: ['Eco-Luxury', 'Private Skydeck', 'Active Solar'],
    features: [
      'Self-regulating glass facade',
      'Geothermal climate regulation',
      'Gravity-defying volumetric cantilevers',
      'Automated subterranean security pod'
    ],
    coordinates: { x: 34, y: 45 }
  },
  {
    id: 'prop-2',
    name: 'Phyto-Biophilic Terraces',
    location: 'Zurich Alpine Cloud Basin',
    price: '$24.5M',
    category: 'residential',
    style: 'Organic Eco-Brutalist',
    size: '12,200 sqft',
    bedrooms: 6,
    bathrooms: 8,
    yearBuilt: 2026,
    energyRating: 'Micro-Hydro Generated',
    imageUrl: '/src/assets/images/biophilic_terrace_1780669291014.png',
    tags: ['Biophilic', 'Smart Dome', 'Cascading Pools'],
    features: [
      'Interactive vertical waterfall & mist filters',
      'Micro-climate domes per balcony',
      'Self-sustaining botanical oxygen gardens',
      'Enclosed helipad and VTOL zone'
    ],
    coordinates: { x: 67, y: 28 }
  },
  {
    id: 'prop-3',
    name: 'Parametric Void Complex',
    location: 'Singapore Smart Shore, District 11',
    price: '$42.0M',
    category: 'commercial',
    style: 'Neo-Metabolist Loop',
    size: '34,500 sqft',
    bedrooms: 0,
    bathrooms: 16,
    yearBuilt: 2026,
    energyRating: 'Quantum Grid Bound',
    imageUrl: '/src/assets/images/parametric_void_1780669307575.png',
    tags: ['Premium Commercial', 'Holographic Workspace', 'Solar Glazing'],
    features: [
      'Smart glass walls with dynamic layout projection',
      'Kinetic facade responding to wind and sun angles',
      'Central cavernous ventilation void with passive chilling',
      'Biometric authentication gates throughout'
    ],
    coordinates: { x: 50, y: 72 }
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Dame Veronique Thorne',
    role: 'Principal Investor',
    company: 'Thorne Quantum Capital',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200',
    quote: 'The architectural vision seamlessly integrated quantum-solar efficiency with an elite sculptural form. It behaves less like a building and more like an adaptive living organism.',
    rating: 5,
    projectAcquired: 'Solaria Canopy Villa'
  },
  {
    id: 'test-2',
    name: 'Kenji Takahashi',
    role: 'Founder & CEO',
    company: 'Aether Neurochips',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    quote: 'Our executive offices in the Parametric Loop have boosted structural creativity by 40%. The kinetic responsive facade is an engineering marvel that sparks daily inspiration.',
    rating: 5,
    projectAcquired: 'Parametric Void Complex'
  },
  {
    id: 'test-3',
    name: 'Elena Rostova',
    role: 'Eco-Architecture Enthusiast',
    company: 'Siberian Carbon Trust',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200',
    quote: 'Living here is like residing in a living forest of the 22nd century. The biophilic microclimates offer cleaner air and deep, unparalleled acoustic rest.',
    rating: 5,
    projectAcquired: 'Phyto-Biophilic Terraces'
  }
];

export const SERVICES: Service[] = [
  {
    id: 'serv-1',
    title: 'Parametric Designing',
    description: 'Bespoke computational architecture configured dynamically for sunlight, wind loads, and thermal efficiency.',
    techStack: ['Rhino Grasshopper', 'Generative Algorithms', 'Structural Optimization'],
    icon: 'Compass'
  },
  {
    id: 'serv-2',
    title: 'Eco-Structural Engineering',
    description: 'Active net-zero integration featuring organic solar glazing, vertical biophilic purifiers, and micro-hydro loops.',
    techStack: ['Quantum PV Glass', 'Botanical Air Filtration', 'Circular Waste Reclamation'],
    icon: 'Leaf'
  },
  {
    id: 'serv-3',
    title: 'Holographic Space Sculpting',
    description: 'Immersive dynamic rooms outfitted with smart molecular screens, allowing layouts and ambiances to shift in real time.',
    techStack: ['Smart Projections', 'Spatial Acoustics', 'Tactile Glass Elements'],
    icon: 'Cpu'
  },
  {
    id: 'serv-4',
    title: 'Quantum Investment Sourcing',
    description: 'Fractional spatial ownership structures and smart real estate secure transactions for VIP elite portfolios.',
    techStack: ['Smart Escrow', 'Durable Title Security', 'Algorithmic Arbitrage'],
    icon: 'ShieldCheck'
  }
];

export const STATISTICS: StatDetail[] = [
  {
    label: 'Total Asset Valuation',
    value: '$1.48B',
    change: '+14.2%',
    isPositive: true,
    timeframe: 'Annual Growth Rate'
  },
  {
    label: 'Architecture Index Rating',
    value: '9.82',
    change: '+0.15',
    isPositive: true,
    timeframe: 'Global Premium Benchmark'
  },
  {
    label: 'Green Energy Autonomy',
    value: '94.8%',
    change: '+3.1%',
    isPositive: true,
    timeframe: 'Consumable Footprint Net'
  },
  {
    label: 'VIP Portfolio Retainers',
    value: '142',
    change: '+18',
    isPositive: true,
    timeframe: 'Active Ultra-Net Clients'
  }
];
