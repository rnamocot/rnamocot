'use client'

import './BlogContent.css'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { db, auth } from '@/lib/firebase'
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  addDoc,
  serverTimestamp,
  updateDoc,
  increment,
  doc,
  deleteDoc,
} from 'firebase/firestore'
import { onAuthStateChanged } from 'firebase/auth'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import { FaFacebookF, FaXTwitter, FaLinkedinIn } from 'react-icons/fa6'
import Link from 'next/link'

export default function BlogPost() {
  const { slug } = useParams()
  const router = useRouter()
  const [post, setPost] = useState(null)
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState('')
  const [name, setName] = useState('')
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser)
    return () => unsubscribe()
  }, [])

  useEffect(() => {
    const fetchPost = async () => {
      const q = query(collection(db, 'posts'), where('slug', '==', slug))
      const snapshot = await getDocs(q)
      if (!snapshot.empty) {
        const docData = snapshot.docs[0]
        setPost({ id: docData.id, ...docData.data() })
      }
      setLoading(false)
    }

    fetchPost()
  }, [slug])

  // View tracking effect
  useEffect(() => {
    if (!post?.id) return

    const viewedPosts = JSON.parse(localStorage.getItem('viewedPosts') || '[]')

    if (!viewedPosts.includes(post.id)) {
      viewedPosts.push(post.id)
      localStorage.setItem('viewedPosts', JSON.stringify(viewedPosts))

      const postRef = doc(db, 'posts', post.id)
      updateDoc(postRef, { views: increment(1) })
    }
  }, [post])

  useEffect(() => {
    const fetchComments = async () => {
      const q = query(
        collection(db, 'comments'),
        where('slug', '==', slug),
        orderBy('createdAt', 'desc')
      )
      const snapshot = await getDocs(q)
      const commentData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      setComments(commentData)
    }

    fetchComments()
  }, [slug])

  const handleCommentSubmit = async (e) => {
    e.preventDefault()
    if (!newComment || !name) return

    await addDoc(collection(db, 'comments'), {
      slug,
      name,
      text: newComment,
      createdAt: serverTimestamp(),
    })

    setNewComment('')
    setName('')

    const updated = await getDocs(
      query(collection(db, 'comments'), where('slug', '==', slug), orderBy('createdAt', 'desc'))
    )
    setComments(updated.docs.map(doc => doc.data()))
  }

  const handleLike = async () => {
    const likedPosts = JSON.parse(localStorage.getItem('likedPosts') || '[]')
    const dislikedPosts = JSON.parse(localStorage.getItem('dislikedPosts') || '[]')
    const postRef = doc(db, 'posts', post.id)
  
    if (likedPosts.includes(post.id)) {
      // Unlike
      await updateDoc(postRef, { likes: increment(-1) })
      localStorage.setItem('likedPosts', JSON.stringify(likedPosts.filter(id => id !== post.id)))
      setPost(prev => ({ ...prev, likes: (prev.likes || 1) - 1 }))
    } else {
      // Like
      await updateDoc(postRef, { likes: increment(1) })
      localStorage.setItem('likedPosts', JSON.stringify([...likedPosts, post.id]))
      setPost(prev => ({ ...prev, likes: (prev.likes || 0) + 1 }))
  
      // If previously disliked, remove dislike
      if (dislikedPosts.includes(post.id)) {
        await updateDoc(postRef, { dislikes: increment(-1) })
        localStorage.setItem('dislikedPosts', JSON.stringify(dislikedPosts.filter(id => id !== post.id)))
        setPost(prev => ({ ...prev, dislikes: (prev.dislikes || 1) - 1 }))
      }
    }
  }
  
  const handleDislike = async () => {
    const likedPosts = JSON.parse(localStorage.getItem('likedPosts') || '[]')
    const dislikedPosts = JSON.parse(localStorage.getItem('dislikedPosts') || '[]')
    const postRef = doc(db, 'posts', post.id)
  
    if (dislikedPosts.includes(post.id)) {
      // Remove dislike
      await updateDoc(postRef, { dislikes: increment(-1) })
      localStorage.setItem('dislikedPosts', JSON.stringify(dislikedPosts.filter(id => id !== post.id)))
      setPost(prev => ({ ...prev, dislikes: (prev.dislikes || 1) - 1 }))
    } else {
      // Add dislike
      await updateDoc(postRef, { dislikes: increment(1) })
      localStorage.setItem('dislikedPosts', JSON.stringify([...dislikedPosts, post.id]))
      setPost(prev => ({ ...prev, dislikes: (prev.dislikes || 0) + 1 }))
  
      // If previously liked, remove like
      if (likedPosts.includes(post.id)) {
        await updateDoc(postRef, { likes: increment(-1) })
        localStorage.setItem('likedPosts', JSON.stringify(likedPosts.filter(id => id !== post.id)))
        setPost(prev => ({ ...prev, likes: (prev.likes || 1) - 1 }))
      }
    }
  }
  
  

  const handleDelete = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this blog post?')
    if (!confirmDelete) return

    await deleteDoc(doc(db, 'posts', post.id))
    router.push('/blog')
  }

  if (loading) return <p className="text-white text-center py-16">Loading...</p>
  if (!post) return <p className="text-white text-center py-16">Post not found.</p>

  return (
    <section className="max-w-4xl mx-auto px-4 py-16 text-white font-poppins">
      <h1 className="text-3xl font-bold mb-4 leading-snug">{post.title}</h1>
      <p className="text-sm text-gray-400">
        {new Date(post.createdAt?.seconds * 1000).toLocaleDateString()}
      </p>
      <p className="text-sm text-gray-400 mb-6">👁️ {post.views || 0} views</p>

      {post.imageURL && (
        <img
          src={post.imageURL}
          alt={post.title}
          className="w-full h-[350px] object-cover rounded-lg mb-8"
        />
      )}

      {user && (
        <div className="flex gap-3 mb-8">
          <Link
            href={`/admin/edit-blog/${post.id}`}
            className="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded text-sm font-medium"
          >
            ✏️ Edit Blog
          </Link>
          <button
            onClick={handleDelete}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-sm font-medium"
          >
            🗑 Delete
          </button>
        </div>
      )}

      <div className="markdown-content mb-12">
        <ReactMarkdown rehypePlugins={[rehypeRaw]}>
          {post.content}
        </ReactMarkdown>
      </div>

      {/* Share Buttons */}
      <div className="mb-12">
        <p className="text-gray-400 mb-3">Share this post:</p>
        <div className="flex gap-4">
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=https://renienamocot.com/blog/${slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded inline-flex items-center"
            aria-label="Share on Facebook"
          >
            <FaFacebookF />
          </a>
          <a
            href={`https://twitter.com/intent/tweet?url=https://renienamocot.com/blog/${slug}&text=${encodeURIComponent(post.title)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#1DA1F2] hover:bg-blue-500 text-white px-3 py-2 rounded inline-flex items-center"
            aria-label="Share on Twitter"
          >
            <FaXTwitter />
          </a>
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=https://renienamocot.com/blog/${slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-800 hover:bg-blue-900 text-white px-3 py-2 rounded inline-flex items-center"
            aria-label="Share on LinkedIn"
          >
            <FaLinkedinIn />
          </a>
        </div>
      </div>

      {/* Like / Dislike */}
      <div className="flex gap-4 mb-10">
      <button onClick={handleLike} className="bg-sky-500 px-4 py-2 rounded hover:bg-sky-600 cursor-pointer">
        👍 Like ({post.likes || 0})
      </button>
      <button onClick={handleDislike} className="bg-slate-600 px-4 py-2 rounded hover:bg-slate-700 cursor-pointer">
        👎 Dislike ({post.dislikes || 0})
      </button>


      </div>

      <hr className="border-gray-700 mb-8" />

      {/* Comments */}
      <div>
        <h3 className="text-2xl font-semibold mb-4 leading-snug">Leave a Comment</h3>
        <form onSubmit={handleCommentSubmit} className="flex flex-col gap-3 mb-12">
          <input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-slate-800 rounded px-4 py-2 text-white"
            required
          />
          <textarea
            rows="3"
            placeholder="Your comment"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="bg-slate-800 rounded px-4 py-2 text-white"
            required
          />
          <button type="submit" className="bg-sky-500 px-4 py-2 rounded hover:bg-sky-600 w-fit">
            Submit
          </button>
        </form>

        <h3 className="text-xl font-medium mb-4 leading-snug">Comments ({comments.length})</h3>
        <div className="space-y-4">
          {comments.map((c, i) => (
            <div key={i} className="bg-slate-800 p-4 rounded">
              <p className="font-semibold">{c.name}</p>
              <p className="text-gray-300">{c.text}</p>
              <p className="text-xs text-gray-500">
                {c.createdAt?.seconds
                  ? new Date(c.createdAt.seconds * 1000).toLocaleDateString()
                  : ''}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
