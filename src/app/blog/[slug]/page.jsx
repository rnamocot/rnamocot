import BlogPostClient from './BlogPostClient'
import { db } from '@/lib/firebase'
import { collection, getDocs, query, where } from 'firebase/firestore'


export async function generateMetadata({ params }) {
  const slug = params.slug
  const q = query(collection(db, 'posts'), where('slug', '==', slug))
  const snapshot = await getDocs(q)

  if (snapshot.empty) {
    return {
      title: 'Post Not Found | Renie Namocot',
      description: 'This blog post could not be found.',
    }
  }

  const post = snapshot.docs[0].data()

  return {
    title: `${post.title} | Renie Namocot`,
    description: post.excerpt || post.content?.slice(0, 160),
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://renienamocot.com/blog/${slug}`,
      images: [{ url: post.imageURL || '/logo.png' }],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.imageURL || '/logo.png'],
    },
  }
}

export default function Page({ params }) {
  return <BlogPostClient slug={params.slug} />
}
