import type { SiteConfig } from './types';
import heroImage from '../assets/hero.jpg';
import aboutImage from '../assets/about.jpg';
import gallery1 from '../assets/gallery-1.jpg';
import gallery2 from '../assets/gallery-2.jpg';
import gallery3 from '../assets/gallery-3.jpg';
import gallery4 from '../assets/gallery-4.jpg';

// SINGLE source of truth for this site. Every page and component reads from here.
// /new-site fills this from docs/intake.md. Nothing in src/pages or src/components
// should hard-code a business fact (name, phone, hours, prices, areas, reviews).
//
// Everything below is SAMPLE DATA for a fictional business so the template builds.
// Replace all of it. QA fails while any "[Sample" text remains.

export const site: SiteConfig = {
  name: 'Sample HVAC Co.',
  legalName: 'Sample HVAC Co. LLC',
  slug: 'sample-hvac-dallas',
  url: 'https://example.com/',
  primaryService: 'AC repair and installation',
  schemaType: 'HVACBusiness',
  foundingYear: 2015,
  licenses: ['TACLA00000000C [Sample license number]'],

  phone: { display: '(214) 555-0100', e164: '+12145550100', textable: true },
  email: 'office@example.com',
  address: { street: '100 Sample St', city: 'Dallas', region: 'TX', postalCode: '75201' },
  serviceAreaOnly: false,
  geo: { lat: 32.7767, lng: -96.797 },
  hours: [
    { label: 'Monday–Friday', days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '07:00', closes: '18:00' },
    { label: 'Saturday', days: ['Saturday'], opens: '08:00', closes: '14:00' },
    { label: 'Sunday', days: ['Sunday'], opens: null, closes: null },
  ],

  hero: {
    headline: 'Fast, honest AC repair in Dallas',
    lede: '[Sample] Same-day service from a family-owned crew. Upfront prices before any work starts, and a tech who explains what they found.',
    primaryCta: { label: 'Call (214) 555-0100', href: 'tel:+12145550100' },
    secondaryCta: { label: 'Get a free quote', href: '/contact/' },
    image: heroImage,
    imageAlt: '[Sample] Technician checking an outdoor AC unit',
  },
  about: {
    heading: 'Family-owned since 2015',
    paragraphs: [
      '[Sample] Who started the business, when and why, in the owner’s own words from the intake interview.',
      '[Sample] What customers can count on: licensed techs, upfront pricing, cleaning up after every job.',
    ],
    image: aboutImage,
    imageAlt: '[Sample] The owner standing next to a service van',
  },

  services: [
    {
      slug: 'ac-repair',
      name: 'AC repair',
      summary: '[Sample] Same-day diagnosis and repair for all major brands.',
      body: [
        '[Sample] Two or three short paragraphs about this service: what problems it fixes, what the visit looks like, and why customers pick this business.',
        '[Sample] Mention the areas served and how fast they can get there.',
      ],
      priceFrom: 'Diagnostic from $89',
    },
    {
      slug: 'ac-installation',
      name: 'AC installation',
      summary: '[Sample] New systems sized for your home, with financing options.',
      body: ['[Sample] Paragraphs about installation.'],
    },
    {
      slug: 'heating-repair',
      name: 'Heating repair',
      summary: '[Sample] Furnace and heat pump repair before the cold snap hits.',
      body: ['[Sample] Paragraphs about heating repair.'],
    },
  ],
  areas: [
    {
      slug: 'garland',
      name: 'Garland',
      summary: '[Sample] AC repair across Garland, usually same day.',
      body: ['[Sample] A page per service area. Write something specific to the area, not the same text with the city name swapped.'],
    },
    {
      slug: 'richardson',
      name: 'Richardson',
      summary: '[Sample] AC repair across Richardson.',
      body: ['[Sample] Area-specific paragraph.'],
    },
  ],
  reviews: [
    { text: '[Sample review: replace with a real review the client chose, word for word.]', name: 'Customer A.', source: 'Google' },
    { text: '[Sample review: replace with a real review the client chose, word for word.]', name: 'Customer B.', source: 'Google' },
    { text: '[Sample review: replace with a real review the client chose, word for word.]', name: 'Customer C.', source: 'Google' },
  ],
  googleReviewUrl: 'https://g.page/r/REPLACE_ME/review',
  gallery: [
    { src: gallery1, alt: '[Sample] Describe what the photo shows' },
    { src: gallery2, alt: '[Sample] Describe what the photo shows' },
    { src: gallery3, alt: '[Sample] Describe what the photo shows' },
    { src: gallery4, alt: '[Sample] Describe what the photo shows' },
  ],
  faqs: [
    { question: 'Do you charge for estimates?', answer: '[Sample] Answer from the intake form’s “top 3 questions customers ask”.' },
    { question: 'Are you licensed and insured?', answer: '[Sample] Answer.' },
    { question: 'How soon can you come out?', answer: '[Sample] Answer.' },
  ],
  cta: {
    heading: 'AC acting up? We can usually be there today.',
    text: '[Sample] One line that gives a reason to call now.',
    button: { label: 'Call (214) 555-0100', href: 'tel:+12145550100' },
  },

  booking: { provider: 'Calendly', url: 'https://calendly.com/REPLACE_ME', embedUrl: undefined },
  forms: {
    contactEndpoint: 'https://formspree.io/f/REPLACE_ME',
    quoteJobTypes: ['AC repair', 'AC installation', 'Heating repair', 'Maintenance', 'Something else'],
  },

  social: [
    { label: 'Facebook', href: 'https://facebook.com/REPLACE_ME' },
    { label: 'Instagram', href: 'https://instagram.com/REPLACE_ME' },
  ],
  nav: [
    { label: 'Services', href: '/#services' },
    { label: 'About', href: '/about/' },
    { label: 'Contact', href: '/contact/' },
  ],
  seo: {
    title: 'Sample HVAC Co. | AC repair in Dallas',
    description: '[Sample] 140–155 characters: what you do, where, and why someone should call you.',
    ogImage: '/og-image.jpg',
  },

  features: { blog: false, booking: false, map: true, gallery: true, quoteForm: true },
  credit: true,
};
