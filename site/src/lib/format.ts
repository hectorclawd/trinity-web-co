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
  const hours = site.hours
    .filter((row) => row.opens && row.closes)
    .map((row) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: row.days,
      opens: row.opens,
      closes: row.closes,
    }));
  const sameAs = site.social.map((link) => link.href).filter((href) => !isPlaceholder(href));
  return {
    '@context': 'https://schema.org',
    '@type': site.schemaType,
    name: site.name,
    description: site.seo.description,
    url: site.url,
    ...(site.logo && { logo: new URL(site.logo.src, site.url).href }),
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
      // Place, not the template's City: this site serves the Dallas–Fort Worth area, which isn't a city
      areaServed: site.areas.map((area) => ({ '@type': 'Place', name: area.name })),
    }),
    // Empty arrays are left out: they add nothing and the Rich Results Test flags them
    ...(hours.length > 0 && { openingHoursSpecification: hours }),
    ...(sameAs.length > 0 && { sameAs }),
  };
}
