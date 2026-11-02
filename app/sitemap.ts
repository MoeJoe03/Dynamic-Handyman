import type { MetadataRoute } from 'next';

const siteUrl = 'https://dynamichandyman.co.za';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    { url: siteUrl, lastModified, changeFrequency: 'weekly', priority: 1 },
    { url: `${siteUrl}/services`, lastModified, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${siteUrl}/services/electrical`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${siteUrl}/services/painting`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${siteUrl}/services/carpentry`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${siteUrl}/services/plumbing`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${siteUrl}/services/palisades`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${siteUrl}/services/paving`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${siteUrl}/services/maintenance`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${siteUrl}/services/glass-works`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${siteUrl}/services/flooring`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${siteUrl}/services/gutters-fascia`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${siteUrl}/services/aluminium-windows-doors`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${siteUrl}/gallery`, lastModified, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${siteUrl}/about`, lastModified, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${siteUrl}/contact`, lastModified, changeFrequency: 'monthly', priority: 0.9 },
  ];
}
