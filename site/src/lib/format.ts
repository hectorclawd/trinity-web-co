import type { HoursRow, SiteConfig } from '../content/types';

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
