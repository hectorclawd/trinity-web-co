import type { SiteConfig, StudioOffer } from './types';

// SINGLE source of truth for trinitywebco.com. Prices, packages and care plans must match
// business/playbook.md sections 2 and 3: change the playbook first, then this file.

export const site: SiteConfig = {
  name: 'Trinity Web Co.',
  slug: 'trinity-web-co',
  url: 'https://trinitywebco.com/',
  primaryService: 'Websites for local businesses',
  schemaType: 'ProfessionalService',
  foundingYear: 2026,

  email: 'hello@trinitywebco.com',
  serviceAreaOnly: true,
  hours: [],

  hero: {
    headline: 'Websites that bring Dallas customers to your door.',
    lede: 'Trinity Web Co. builds fast, good-looking websites for local contractors, cleaning crews, salons, barbers and studios. Your site gets set up for Google from day one, and I look after it every month so you don’t have to.',
    primaryCta: { label: 'Book a free 20-minute call', href: '#contact' },
    secondaryCta: { label: 'See pricing', href: '#pricing' },
  },
  about: {
    heading: 'A neighbor, not an agency',
    paragraphs: [
      'I’m Hector, and Trinity Web Co. is my one-person studio here in Dallas. When you hire me, you work with me from the first call to the last edit. No account managers, no handoffs, no outsourcing.',
      'I started Trinity Web Co. because too many great local businesses are hard to find online. Some have a website from 2014, some just have a Facebook page, and some have nothing at all. You shouldn’t need a marketing department to fix that.',
    ],
  },

  services: [],
  areas: [{ slug: 'dallas', name: 'Dallas', summary: '', body: [] }],
  reviews: [],
  gallery: [],
  faqs: [
    {
      question: 'Do I own the website?',
      answer: 'Yes. Your domain stays in your own account, and once the project is paid in full, the code, words and photos made for your site are yours. Your Google Business Profile stays in your name too. I’m added as a manager, never the only owner.',
    },
    {
      question: 'What do I need to have ready?',
      answer: 'Your logo (if you have one), some photos, a list of your services and your hours. If you’re missing any of that, we’ll work it out together. I can help write the copy and connect you with a local photographer.',
    },
    {
      question: 'How long does it take?',
      answer: 'Starter takes 10 business days, Growth 15 and Premium 25, counted from the day your photos and business details are in. You’ll get a checklist and a due date at kickoff, because waiting on content is the most common delay.',
    },
    {
      question: 'I already have a website. Can you redo it?',
      answer: 'Yes. I’ll keep what’s working, fix what isn’t, and set up redirects from your old pages so you don’t lose the Google traffic you already have.',
    },
    {
      question: 'Do I have to sign up for a care plan?',
      answer: 'Every build includes the first 3 months of Care Standard, so you can see what it does. After that it continues at $99/mo, and you can switch plans or cancel with 30 days’ notice. If you’d rather host the site yourself, I’ll transfer the code to you and help move the hosting for a one-time $150.',
    },
    {
      question: 'Can you guarantee I’ll rank first on Google?',
      answer: 'No one honestly can. What I can promise is a fast site that’s set up the way Google expects, with your business details matching everywhere. Most local sites don’t get that far.',
    },
  ],
  cta: {
    heading: 'Book a free 20-minute call',
    text: 'No pressure, no sales pitch.',
    button: { label: 'Book a free call', href: '#contact' },
  },

  forms: { contactEndpoint: 'https://formspree.io/f/REPLACE_ME' },

  social: [],
  nav: [
    { label: 'What you get', href: '#what-you-get' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Demos', href: '#demos' },
    { label: 'How it works', href: '#process' },
    { label: 'About', href: '#about' },
  ],
  headerCta: { label: 'Book a free call', href: '#contact' },
  logo: { src: '/logo-mark.svg', width: 42, height: 28 },
  seo: {
    title: 'Trinity Web Co. | Websites for Dallas small businesses',
    description: 'Fast, mobile-friendly websites for Dallas contractors, cleaning crews, salons and barbers. Fixed prices from $1,500, set up for Google from day one.',
    ogImage: '/og-image.png',
  },

  features: { blog: false, booking: false, map: false, gallery: false, quoteForm: false },
  credit: false,
};

export const offer: StudioOffer = {
  features: {
    heading: 'What your new site will do',
    lede: 'Most local customers look you up on their phone before they call or visit. Your site’s job is to make that first look easy.',
    items: [
      { title: 'Show up when people search nearby', text: 'Your Google Business Profile, page titles and business details get set up the way Google expects, which most local sites skip.' },
      { title: 'Work on every phone', text: 'Every page is designed for a small screen first, then scaled up. No pinching, no tiny buttons, no PDF price lists.' },
      { title: 'Turn a visit into a call', text: 'Tap-to-call, directions, booking and a contact form on every page, right where people look for them.' },
      { title: 'Load fast', text: 'Hand-built pages instead of a heavy page builder, so the site opens quickly even on a weak signal.' },
      { title: 'Stay yours', text: 'The domain is registered in your name and the content is yours. If you ever leave, I hand everything over.' },
      { title: 'Get looked after', text: 'Hosting, security fixes, backups and small edits, all on a simple monthly care plan.' },
    ],
  },
  niches: {
    heading: 'Built for the businesses that make Dallas, Dallas',
    items: [
      'Contractors and home services',
      'Lawn care and cleaning crews',
      'Barbers, salons and nail studios',
      'Auto detailing and repair shops',
      'Trainers and fitness studios',
    ],
  },
  pricing: {
    heading: 'Pricing',
    lede: 'Fixed prices, agreed in writing before any work starts. You pay half to book and half before launch. Premium can be split into three payments.',
    note: 'Turnaround starts once your photos and business details are in.',
    packages: [
      {
        name: 'Starter',
        price: '$1,500',
        turnaround: 'Ready in 10 business days',
        bestFor: 'For new or very small businesses that need to look legit online.',
        includes: [
          'Up to 4 pages: Home, Services, About and Contact',
          'Contact form, tap-to-call and text buttons, map and hours',
          'A link to your booking tool, plus your 3 best reviews',
          'Google basics: page titles, descriptions, sitemap and Search Console',
          'You supply the words, and I edit and polish them',
          '2 rounds of revisions',
        ],
      },
      {
        name: 'Growth',
        price: '$2,800',
        turnaround: 'Ready in 15 business days',
        bestFor: 'For established businesses that want more calls and bookings. This is the one I recommend most often.',
        featured: true,
        includes: [
          'Up to 7 pages, including 2 service or service-area pages and a gallery or FAQ',
          'Quote-request form and online booking built into the site',
          'A reviews section, plus a QR code that asks customers for Google reviews',
          'Local search setup: business schema, service-area pages and your Google Business Profile',
          'I write your copy from a 30-minute interview',
          'Tracking for calls and form requests',
          '2 rounds of revisions',
        ],
      },
      {
        name: 'Premium',
        price: '$4,800',
        turnaround: 'Ready in 25 business days',
        bestFor: 'For businesses with many services or service areas, ready to invest in content.',
        includes: [
          'Up to 12 pages, plus a blog with 3 launch posts written for local search',
          'Everything in Growth, with a multi-step quote form and a reviews page',
          'A keyword plan for 10 local search terms',
          'I write all the copy',
          'A 1-hour photo session at your business',
          'A results report 30 days after launch',
          '3 rounds of revisions',
        ],
      },
    ],
  },
  care: {
    heading: 'Monthly care plans',
    intro: 'Every build includes the first 3 months of Care Standard. After that it continues at $99/mo, and you can switch plans or cancel with 30 days’ notice.',
    plans: [
      { name: 'Care Essential', price: '$49/mo', includes: 'Hosting, security updates, backups, monthly form and booking checks, and 30 minutes of edits a month. Replies within 3 business days.' },
      { name: 'Care Standard', price: '$99/mo', includes: 'Everything in Care Essential, plus 1 hour of edits a month, replies within 1 business day, a monthly one-page report, 2 Google Business Profile posts a month and a yearly refresh.' },
      { name: 'Care Plus', price: '$199/mo', includes: 'Everything in Care Standard, plus 3 hours of edits a month, same-day replies, 4 Google Business Profile posts a month with review replies drafted, a new blog post or service page every month and a quarterly call.' },
    ],
  },
  founding: {
    heading: 'Founding-client prices',
    text: 'My first three clients get Starter for $900 or Growth for $1,800 (Premium isn’t included). In return, you agree to a short written testimonial and to let me show your site as a case study. Founding Starter is paid in full upfront, and founding builds include the same 3 months of Care Standard as every build.',
    button: { label: 'Ask about a founding spot', href: '#contact' },
  },
  demos: {
    heading: 'Demo sites',
    lede: 'Two sites built for made-up businesses, so you can see the work before you hire me. Each one is labeled as a demo.',
    // Playbook section 7, week 1: one demo per target niche. Add url, image and pageSpeed when each is live.
    slots: [
      { niche: 'Home services', title: 'North Texas HVAC' },
      { niche: 'Barbers and salons', title: 'Oak Cliff barbershop' },
    ],
  },
  process: {
    heading: 'How it works',
    steps: [
      { title: 'Free call', text: '20 minutes on the phone or over coffee. You tell me about the business and what’s not working.' },
      { title: 'Proposal', text: 'Within 24 hours you get a fixed price, a timeline and a list of what I’ll need from you.' },
      { title: 'Design and build', text: 'I send a preview link you can open on your phone. You give feedback, and I make the changes.' },
      { title: 'Launch', text: 'The site goes live on your domain, and your Google, Yelp and social links get updated to point to it.' },
      { title: 'Care', text: 'Text or email when something needs to change. I keep the site fast, secure and up to date.' },
    ],
  },
  promises: [
    'Plain English, no tech jargon',
    'A reply within one business day',
    'Prices in writing before any work starts',
    'You own your domain and your content',
    'No promises of “#1 on Google.” Just honest work.',
  ],
  contact: {
    heading: 'Book a free 20-minute call',
    text: 'Tell me a little about your business, and I’ll reply within one business day to set up a time. No pressure, no sales pitch.',
    area: 'Based in Dallas, Texas. We can meet in person around Dallas or by video call.',
  },
};
