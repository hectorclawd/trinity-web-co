import type { Area, HoursRow, Service, SiteConfig } from '../content/types';

/** "09:00" → "9 am", "13:30" → "1:30 pm" */
export function formatTime(time: string): string {
  const [h, m] = time.split(':').map(Number);
  const suffix = h >= 12 ? 'pm' : 'am';
  const hour = h % 12 || 12;
  return m ? `${hour}:${String(m).padStart(2, '0')} ${suffix}` : `${hour} ${suffix}`;
}

export function formatHours(row: HoursRow): string {
  return row.opens && row.closes ? `${formatTime(row.opens)} – ${formatTime(row.closes)}` : 'Closed';
}

/** True while an endpoint or URL still holds a template placeholder */
export function isPlaceholder(value: string | undefined): boolean {
  return !value || value.includes('REPLACE_ME');
}

/** Form heading and button text, from site.forms (quote form on Growth and Premium) */
export function formLabels(site: SiteConfig) {
  const quote = site.features.quoteForm;
  return {
    heading: quote ? (site.forms.quoteHeading ?? 'Get a free quote') : 'Get in touch',
    submit: quote ? (site.forms.quoteSubmitLabel ?? 'Request my quote') : 'Send message',
  };
}

/** Link to a service's own page, or undefined when it has none (`page: false`) */
export function servicePath(service: Service): string | undefined {
  return service.page === false ? undefined : `/services/${service.slug}/`;
}

/** Link to an area's own page, or undefined when it has none (`page: false`) */
export function areaPath(area: Area): string | undefined {
  return area.page === false ? undefined : `/areas/${area.slug}/`;
}

/** "Heating repair" → "heating repair" for use mid-sentence; leaves "AC repair" alone */
export function midSentence(name: string): string {
  return /^[A-Z][a-z]/.test(name) ? name[0].toLowerCase() + name.slice(1) : name;
}

/** Shortens text to under `max` characters at a word boundary, e.g. for meta descriptions (under 155) */
export function clip(text: string, max = 155): string {
  if (text.length < max) return text;
  const cut = text.slice(0, max - 1);
  return `${cut.slice(0, cut.lastIndexOf(' ')).replace(/[\s,.;:–—-]+$/, '')}…`;
}

export function fullAddress(site: SiteConfig): string | undefined {
  const a = site.address;
  return a ? `${a.street}, ${a.city}, ${a.region} ${a.postalCode}` : undefined;
}

/** LocalBusiness JSON-LD. Name, address and phone must match the Google Business Profile exactly. */
export function localBusinessSchema(site: SiteConfig) {
  return {
    '@context': 'https://schema.org',
    '@type': site.schemaType,
    name: site.name,
    url: site.url,
    email: site.email,
    ...(site.phone && { telephone: site.phone.e164 }),
    image: new URL(site.seo.ogImage, site.url).href,
    ...(site.foundingYear && { foundingDate: String(site.foundingYear) }),
    ...(site.address && !site.serviceAreaOnly && {
      address: {
        '@type': 'PostalAddress',
        streetAddress: site.address.street,
        addressLocality: site.address.city,
        addressRegion: site.address.region,
        postalCode: site.address.postalCode,
        addressCountry: 'US',
      },
    }),
    ...(site.geo && {
      geo: { '@type': 'GeoCoordinates', latitude: site.geo.lat, longitude: site.geo.lng },
    }),
    ...(site.areas.length && {
      areaServed: site.areas.map((area) => ({ '@type': 'City', name: area.name })),
    }),
    openingHoursSpecification: site.hours
      .filter((row) => row.opens && row.closes)
      .map((row) => ({
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: row.days,
        opens: row.opens,
        closes: row.closes,
      })),
    sameAs: site.social.map((link) => link.href).filter((href) => !isPlaceholder(href)),
  };
}
