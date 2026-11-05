import type { MetadataRoute } from 'next';

const siteUrl = 'https://dynamichandyman.co.za';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteUrl, changeFrequency: 'weekly', priority: 1 },
    { url: `${siteUrl}/services`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${siteUrl}/services/electrical`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${siteUrl}/services/painting`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${siteUrl}/services/carpentry`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${siteUrl}/services/plumbing`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${siteUrl}/services/palisades`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${siteUrl}/services/paving`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${siteUrl}/services/maintenance`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${siteUrl}/services/glass-works`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${siteUrl}/services/flooring`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${siteUrl}/services/gutters-fascia`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${siteUrl}/services/aluminium-windows-doors`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${siteUrl}/gallery`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${siteUrl}/areas-we-serve`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${siteUrl}/areas-we-serve/alberton`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${siteUrl}/areas-we-serve/albertsdal`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${siteUrl}/about`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${siteUrl}/contact`, changeFrequency: 'monthly', priority: 0.9 },
  ];
}
