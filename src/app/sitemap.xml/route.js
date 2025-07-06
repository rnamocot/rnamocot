import { db } from '@/lib/firebase'
import { collection, getDocs } from 'firebase/firestore'

export async function GET() {
  const baseUrl = 'https://renienamocot.com'

  const staticRoutes = [
    '',
    '/blog',
    '/tools/instagram-caption-generator'
  ]

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`

  // Static pages
  staticRoutes.forEach(route => {
    xml += `  <url><loc>${baseUrl}${route}</loc></url>\n`
  })

  // Dynamic blog posts
  const snapshot = await getDocs(collection(db, 'posts'))
  snapshot.forEach(doc => {
    const data = doc.data()
    if (data.slug) {
      xml += `  <url><loc>${baseUrl}/blog/${data.slug}</loc></url>\n`
    }
  })

  xml += '</urlset>'

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  })
}
