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

  /** Playbook §2: two packages, priced as ranges. The exact price is set in the proposal. */
  packages: [
    { id: 'launch', name: 'Launch', priceFrom: 750, priceTo: 1250, pages: 5 },
    { id: 'growth', name: 'Growth', priceFrom: 1500, priceTo: 2500, pages: 7 },
  ],

  /**
   * Playbook §3: one care plan, quoted per client within the range by edit time
   * (30 minutes a month at the low end, up to 1 hour at the high end). Billed from
   * launch, month to month, 30 days' notice to cancel. No included months.
   */
  care: { name: 'Care plan', monthlyFrom: 50, monthlyTo: 99, editMinutesFrom: 30, editMinutesTo: 60 },

  /**
   * Real numbers only. The demos have no production PageSpeed results yet, so these
   * stay as placeholders until launch day (plan, "Rules every piece follows").
   */
  demos: {
    purpleMartin: { name: 'Purple Martin Heating & Air', pageSpeed: '[score]', loadTime: '[load time]' },
    goodOak: { name: 'Good Oak Barbershop', pageSpeed: '[score]', loadTime: '[load time]' },
  },

  /**
   * The Reels' narrator (Hector, 2026-10-20): one ElevenLabs voice for English and Spanish.
   * Not a secret. The API key is in Bitwarden and the ELEVENLABS_API_KEY Windows user variable.
   */
  narrator: {
    name: 'Chris',
    voiceId: 'iP95p4xoKVk53GoZ742B',
    model: 'eleven_multilingual_v2',
    settings: { stability: 0.5, similarity_boost: 0.75, style: 0, use_speaker_boost: true },
  },

  /** Small interface words. Hector checks every Spanish string before it renders. */
  labels: {
    demo: { en: 'Demo', es: 'Demo' },
    example: { en: 'Example', es: 'Ejemplo' },
    swipe: { en: 'Swipe', es: 'Desliza' },
    perMonth: { en: '/mo', es: ' al mes' },
  },
} as const;
