import type { ImageMetadata } from 'astro';

// Shapes for src/content/site.ts. Change these only when the template itself changes.

export type DayOfWeek =
  | 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';

export interface Link {
  label: string;
  href: string;
}

export interface HoursRow {
  /** What visitors see, e.g. "Monday–Friday" */
  label: string;
  /** Used for the LocalBusiness schema */
  days: DayOfWeek[];
  /** 24-hour "HH:MM", or null when closed */
  opens: string | null;
  closes: string | null;
}

export interface Service {
  slug: string;
  name: string;
  /** One or two sentences for cards */
  summary: string;
  /** Paragraphs for the service's own page */
  body: string[];
  /** Shown only if the client publishes prices, e.g. "From $89" */
  priceFrom?: string;
}

export interface Area {
  slug: string;
  name: string;
  summary: string;
  body: string[];
}

export interface Review {
  /** Word for word, as the client provided it. Never invented. */
  text: string;
  /** Customer first name (and last initial) as the client provided it */
  name: string;
  source: string;
}

export interface GalleryImage {
  src: ImageMetadata;
  alt: string;
}

export interface SiteConfig {
  name: string;
  legalName?: string;
  /** Client slug from the playbook naming conventions, e.g. "rivera-hvac-garland" */
  slug: string;
  /** Production URL with trailing slash */
  url: string;
  /** Main service in plain words, used in page headings, e.g. "AC repair and installation" */
  primaryService: string;
  /** schema.org LocalBusiness subtype: HVACBusiness, Plumber, HairSalon, BarberShop, AutoRepair, ... */
  schemaType: string;
  foundingYear?: number;
  licenses?: string[];

  phone?: { display: string; e164: string; textable: boolean };
  email: string;
  address?: { street: string; city: string; region: string; postalCode: string };
  /** True when the business travels to customers and doesn't show a street address */
  serviceAreaOnly: boolean;
  geo?: { lat: number; lng: number };
  hours: HoursRow[];

  hero: {
    headline: string;
    lede: string;
    primaryCta: Link;
    secondaryCta?: Link;
    image?: ImageMetadata;
    imageAlt?: string;
  };
  about: {
    heading: string;
    paragraphs: string[];
    image?: ImageMetadata;
    imageAlt?: string;
  };

  services: Service[];
  areas: Area[];
  reviews: Review[];
  googleReviewUrl?: string;
  gallery: GalleryImage[];
  faqs: { question: string; answer: string }[];
  cta: { heading: string; text: string; button: Link };

  booking?: { provider: string; url: string; embedUrl?: string };
  forms: {
    /** Formspree or Web3Forms endpoint. Leave "REPLACE_ME" until it exists. */
    contactEndpoint: string;
    /** Job types for the quote form (Growth and Premium) */
    quoteJobTypes?: string[];
  };

  social: Link[];
  nav: Link[];
  /** Header button. Defaults to "Call <phone>", or "Contact us" when there's no phone */
  headerCta?: Link;
  /** Logo mark shown before the name in the header, e.g. "/logo-mark.svg" */
  logo?: { src: string; width: number; height: number };
  seo: { title: string; description: string; ogImage: string };

  /** Turn sections on or off to match the package (playbook section 2) */
  features: {
    blog: boolean;
    booking: boolean;
    map: boolean;
    gallery: boolean;
    quoteForm: boolean;
  };
  /** "Website by Trinity Web Co." in the footer */
  credit: boolean;
}
