'use client'

import { useState } from 'react'
import { db } from '@/lib/firebase'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import dynamic from 'next/dynamic'

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false })

export default function AddBlog() {
  const [form, setForm] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    imageURL: '',
    category: '',
    tags: '',
  })

  const [success, setSuccess] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await addDoc(collection(db, 'posts'), {
        ...form,
        tags: form.tags.split(',').map(tag => tag.trim()),
        createdAt: serverTimestamp(),
        likes: 0,
        dislikes: 0,
      })
      setSuccess(true)
      setForm({ title: '', slug: '', excerpt: '', content: '', imageURL: '', category: '', tags: '' })
    } catch (error) {
      console.error('Error adding blog:', error)
    }
  }

  return (
    <section className="max-w-3xl mx-auto px-4 py-16 text-white font-poppins">
      <h2 className="text-2xl font-bold mb-6">Add Blog Post</h2>
      {success && <p className="text-green-400 mb-4">✅ Blog post added!</p>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input name="title" placeholder="Title" value={form.title} onChange={handleChange} required className="bg-slate-800 px-4 py-2 rounded" />
        <input name="slug" placeholder="Slug" value={form.slug} onChange={handleChange} required className="bg-slate-800 px-4 py-2 rounded" />
        <input name="excerpt" placeholder="Excerpt" value={form.excerpt} onChange={handleChange} required className="bg-slate-800 px-4 py-2 rounded" />
        <input name="imageURL" placeholder="Image URL" value={form.imageURL} onChange={handleChange} required className="bg-slate-800 px-4 py-2 rounded" />
        <input name="category" placeholder="Category" value={form.category} onChange={handleChange} className="bg-slate-800 px-4 py-2 rounded" />
        <input name="tags" placeholder="Tags (comma separated)" value={form.tags} onChange={handleChange} className="bg-slate-800 px-4 py-2 rounded" />

        <div data-color-mode="dark">
          <label className="text-sm text-gray-300 mb-1">Blog Content</label>
          <MDEditor value={form.content} onChange={(value) => setForm({ ...form, content: value })} height={300} />
        </div>

        <button type="submit" className="bg-sky-500 hover:bg-sky-600 px-4 py-2 rounded w-fit">Publish</button>
      </form>
    </section>
  )
}
