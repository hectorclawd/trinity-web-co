import type { SiteConfig, StudioOffer } from './types';
// Each demo's whole homepage at 1440px wide; DemoSlots shows it in a small scrollable window
import demoPurpleMartin from '../assets/demo-purple-martin-scroll.jpg';
import demoGoodOak from '../assets/demo-good-oak-scroll.jpg';

// SINGLE source of truth for trinitywebdallas.com. Prices, packages and care plans must match
// business/playbook.md sections 2 and 3: change the playbook first, then this file.

export const site: SiteConfig = {
  name: 'Trinity Web Co.',
  slug: 'trinity-web-co',
  url: 'https://trinitywebdallas.com/',
  primaryService: 'Websites for local businesses',
  schemaType: 'ProfessionalService',
  foundingYear: 2026,

  phone: { display: '(214) 730-8304', e164: '+12147308304', textable: true },
  email: 'hello@trinitywebdallas.com',
  serviceAreaOnly: true,
  hours: [],

  hero: {
    headline: 'Websites that bring Dallas customers in.',
    lede: 'Web design for Dallas contractors, cleaning crews, salons, barbers and studios. Fast sites, set up for Google from day one and looked after every month.',
    primaryCta: { label: 'Book a free 20-minute call', href: '#contact' },
    secondaryCta: { label: 'See pricing', href: '#pricing' },
  },
  about: {
    heading: 'A neighbor, not an agency',
    // Hector's own story, approved 2026-10-13; last line rewritten 2026-10-23 when the founding offer was dropped
    paragraphs: [
      'I’m Hector, a Dallas local. I build websites for the small businesses that make this city what it is: the barbershops, the HVAC crews, the salons and the shops you drive past every day.',
      'I didn’t start out in web design. I’ve done network installation jobs in businesses all over DFW, and I started paying attention to how customers actually find the places I was working in. A lot of great local businesses are hard to find online, and that felt like a fixable problem.',
      'I’m also studying marketing and economics, so I think about websites the way a business owner does: does this get you more calls? Every site I build is fast, easy to use on a phone, and set up so customers can call, text or book in one tap.',
      'When you work with me, you work with me, not an agency or a call center. I’ll explain things in plain English, keep your site up to date, and answer your texts, usually the same day.',
      'Right now I’m taking on my first few clients, and my Launch package is priced low while I build my portfolio. If your business deserves a better website, let’s talk.',
    ],
  },

  services: [],
  areas: [{ slug: 'dallas-fort-worth', name: 'Dallas–Fort Worth', summary: '', body: [] }],
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
      answer: 'Launch takes 10 business days and Growth 15, counted from the day your photos and business details are in. You’ll get a checklist and a due date at kickoff, because waiting on content is the most common delay.',
    },
    {
      // Matches the service agreement section 4 and the scope page section 4
      question: 'What counts as a round of revisions?',
      answer: 'When I send you the preview link, you have 5 business days to send back one list with all your changes. That list is one round, and I make the changes in about 2 to 3 business days. New pages, new features or a new design direction aren’t revisions. I quote those in writing, and work starts only after you approve the quote. Each extra round beyond the ones in your package is $150.',
    },
    {
      question: 'I already have a website. Can you redo it?',
      answer: 'Yes. I’ll keep what’s working, fix what isn’t, and set up redirects from your old pages so you don’t lose the Google traffic you already have.',
    },
    {
      // No add-on price here: playbook section 2 sells add-ons once the package is agreed
      question: 'Can my site be in Spanish too?',
      answer: 'Yes, and the free call can be in English or Spanish too. A Spanish version of your site is an add-on I’ll quote with your package.',
    },
    {
      question: 'Do I have to sign up for a care plan?',
      answer: 'No, it’s optional. If you want it, it starts on launch day at $50 to $99 a month, depending on how much edit time you want, and you can cancel with 30 days’ notice. If you’d rather host the site yourself, I’ll transfer the code to you and help move the hosting for a one-time $150.',
    },
    {
      question: 'Can you build an online store?',
      answer: 'Not right now. I build sites for businesses that get customers by phone, booking or quote requests. If you already sell online with something like Square or Shopify, your site can link to your store.',
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

  forms: { contactEndpoint: 'https://formspree.io/f/xvkzedbz' },

  social: [],
  nav: [
    // Root-relative, so the header still works on /privacy/ and the 404 page
    { label: 'What you get', href: '/#what-you-get' },
    { label: 'Pricing', href: '/#pricing' },
    { label: 'Demos', href: '/#demos' },
    { label: 'How it works', href: '/#process' },
    { label: 'About', href: '/#about' },
  ],
  headerCta: { label: 'Book a free call', href: '/#contact' },
  logo: { src: '/logo-mark.svg', width: 42, height: 28 },
  seo: {
    title: 'Trinity Web Co. | Websites for Dallas small businesses',
    description: 'Fast, mobile-friendly websites for Dallas contractors, cleaning crews, salons and barbers. Prices from $750, set up for Google from day one.',
    ogImage: '/og-image.png',
    ogImageAlt: 'Trinity Web Co.: “Websites that bring Dallas customers in,” above a line drawing of the Trinity River',
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
    lede: 'Your exact price is set in writing after our call, before any work starts. You pay half to book and half before launch.',
    note: 'Turnaround starts once your photos and business details are in.',
    packages: [
      {
        name: 'Launch',
        price: '$750–$1250',
        turnaround: 'Ready in 10 business days',
        bestFor: 'For new or very small businesses that need to look legit online.',
        includes: [
          'Up to 5 pages: Home, About, Services, Gallery or Work, and Contact',
          'Contact form, tap-to-call and text buttons, map and hours',
          'A link to your booking tool, plus your 3 best reviews',
          'Google basics: page titles, descriptions, sitemap and Search Console',
          'Simple visitor stats, so you can see how many people visit',
          'You supply the words, and I edit and polish them',
          '2 rounds of revisions',
        ],
      },
      {
        name: 'Growth',
        price: '$1500–$2500',
        turnaround: 'Ready in 15 business days',
        bestFor: 'For established businesses that want more calls and bookings. This is the one I recommend most often.',
        featured: true,
        includes: [
          'Up to 7 pages: everything in Launch, plus 2 service or service-area pages',
          'Quote-request form and online booking built into the site',
          'A reviews section, plus a QR code that asks customers for Google reviews',
          'Local search setup: business schema, service-area pages and your Google Business Profile',
          'I write your copy from a 30-minute interview',
          'Tracking for calls and form requests',
          '2 rounds of revisions',
        ],
      },
    ],
  },
  care: {
    heading: 'Monthly care plan',
    intro: 'Optional. It starts on launch day, and you can cancel with 30 days’ notice.',
    plans: [
      { name: 'Care plan', price: '$50–$99/mo', includes: 'Hosting, security updates, backups, monthly form and booking checks, and replies within 1 business day. The price depends on how much edit time you want: 30 minutes a month at $50, up to 1 hour at $99.' },
    ],
  },
  demos: {
    heading: 'Demo sites',
    lede: 'Two sites built for made-up businesses, so you can see the work before you hire me. Each one is labeled as a demo. Scroll inside a preview to see its whole homepage.',
    // Playbook section 7, week 1: one demo per target niche.
    // The urls are Vercel previews behind Vercel login until launch. On launch day, swap in the
    // production urls and add pageSpeed (mobile PageSpeed Insights on the production url) before
    // deploying this site (CHECKLIST.md, launch day).
    slots: [
      {
        niche: 'Home services',
        // Non-breaking spaces keep "Heating & Air" on one line on phones
        title: 'Demo: Purple Martin Heating & Air',
        url: 'https://site-purple-martin-air-lake-highlands-9qqg0rano-hlm10.vercel.app',
        image: demoPurpleMartin,
        imageAlt:
          'Homepage of the Purple Martin Heating & Air demo: “Heating and air repair for East Dallas homes,” call, quote and text buttons, and an illustration of a ranch house with an AC unit',
      },
      {
        niche: 'Barbers and salons',
        title: 'Demo: Good Oak Barbershop',
        url: 'https://site-good-oak-barbers-oak-cliff-aj3do2wcx-hlm10.vercel.app',
        image: demoGoodOak,
        imageAlt:
          'Homepage of the Good Oak Barbershop demo: “Sharp cuts and hot towel shaves in Oak Cliff,” call and text buttons, “Open now · until 7 pm,” and an illustration of a corner barbershop',
      },
    ],
  },
  process: {
    heading: 'How it works',
    steps: [
      { title: 'Free call', text: '20 minutes on the phone or over coffee. You tell me about the business and what’s not working.' },
      { title: 'Proposal', text: 'Within 24 hours you get a fixed price, a timeline and a list of what I’ll need from you. If it looks right, you sign online, pay to hold your spot and fill in a form about your business.' },
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
    area: 'Based in Dallas, working with businesses across Dallas–⁠Fort Worth. We can meet in person around Dallas or by video call.',
  },
};
