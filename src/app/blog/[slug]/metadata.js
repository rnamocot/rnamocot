import { db } from '@/lib/firebase'
import { collection, query, where, getDocs } from 'firebase/firestore'

export async function generateMetadata({ params }) {
  const slug = params.slug
  const q = query(collection(db, 'posts'), where('slug', '==', slug))
  const snapshot = await getDocs(q)

  if (snapshot.empty) return { title: 'Blog Post Not Found' }

  const post = snapshot.docs[0].data()

  return {
    title: `${post.title} | Renie Namocot`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://renienamocot.com/blog/${slug}`,
      images: [
        {
          url: post.imageURL || '/default-og-image.jpg',
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.imageURL || '/default-og-image.jpg'],
    },
  }
}
