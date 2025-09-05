import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin/',
          '/api/',
          '/_next/',
          '/private/',
          '/test-auth/',
          '/verify-email/',
          '/forgot-password/',
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/admin/',
          '/api/',
          '/_next/',
          '/private/',
          '/test-auth/',
          '/verify-email/',
          '/forgot-password/',
        ],
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: [
          '/admin/',
          '/api/',
          '/_next/',
          '/private/',
          '/test-auth/',
          '/verify-email/',
          '/forgot-password/',
        ],
      },
    ],
    sitemap: 'https://modernappstore.com/sitemap.xml',
    host: 'https://modernappstore.com',
  }
}
