/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Property {
  id: string;
  name: string;
  location: string;
  price: string;
  category: 'residential' | 'commercial' | 'experimental';
  style: string;
  size: string;
  bedrooms: number;
  bathrooms: number;
  yearBuilt: number;
  energyRating: string;
  imageUrl: string;
  tags: string[];
  features: string[];
  coordinates: { x: number; y: number }; // Relative position on the vector map
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatarUrl: string;
  quote: string;
  rating: number;
  projectAcquired: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  icon: string;
}

export interface StatDetail {
  label: string;
  value: string;
  change: string;
  isPositive: boolean;
  timeframe: string;
}
