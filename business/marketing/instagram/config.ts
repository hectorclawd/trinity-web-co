/**
 * Trinity Web Co. Instagram kit: every fact a piece shows lives here, so one change
 * updates all 40 files (20 pieces in English and Spanish).
 *
 * After editing, run `npm run sync`. It writes brand/generated.js for the compositions
 * and stops if a price here differs from business/playbook.md §2–3 (the playbook wins).
 */

export type Lang = 'en' | 'es';

export const config = {
  business: {
    name: 'Trinity Web Co.',
    city: 'Dallas',
    handle: '@trinitywebco',
    /** Free checks and calls happen in either language (plan, 2026-10-15). Same text in both. */
    languages: 'English · Español',
  },

  /** The call to action on most pieces. {keyword} is drawn as a message bubble. */
  dm: {
    keyword: { en: 'CHECK', es: 'REVISAR' },
    endCard: {
      en: 'DM {keyword} for a free site check',
      es: 'Manda {keyword} para una revisión gratis',
    },
    carouselCta: {
      en: 'Free site check: DM {keyword}',
      es: 'Revisión gratis: manda {keyword}',
    },
  },

  /** Playbook §2. Founding prices appear only in the held H1 carousel. */
  packages: [
    { id: 'starter', name: 'Starter', price: 1500, foundingPrice: 900, pages: 4 },
    { id: 'growth', name: 'Growth', price: 2800, foundingPrice: 1800, pages: 7 },
    { id: 'premium', name: 'Premium', price: 4800, foundingPrice: null, pages: 12 },
  ],

  /** Playbook §3. */
  carePlans: [
    { id: 'essential', name: 'Care Essential', monthly: 49 },
    { id: 'standard', name: 'Care Standard', monthly: 99 },
    { id: 'plus', name: 'Care Plus', monthly: 199 },
  ],

  /** Playbook §3 Default: every build includes the first 3 months of Care Standard. */
  includedCareMonths: 3,

  /** Playbook §2: founding prices are for the first 3 clients only. */
  foundingSpots: 3,

  /**
   * Real numbers only. The demos have no production PageSpeed results yet, so these
   * stay as placeholders until launch day (plan, "Rules every piece follows").
   */
  demos: {
    purpleMartin: { name: 'Purple Martin Heating & Air', pageSpeed: '[score]', loadTime: '[load time]' },
    goodOak: { name: 'Good Oak Barbershop', pageSpeed: '[score]', loadTime: '[load time]' },
  },

  /** Small interface words. Hector checks every Spanish string before it renders. */
  labels: {
    demo: { en: 'Demo', es: 'Demo' },
    example: { en: 'Example', es: 'Ejemplo' },
    swipe: { en: 'Swipe', es: 'Desliza' },
    perMonth: { en: '/mo', es: ' al mes' },
  },
} as const;
