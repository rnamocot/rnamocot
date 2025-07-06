'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import dynamic from 'next/dynamic'
import '@uiw/react-md-editor/markdown-editor.css'
import '@uiw/react-markdown-preview/markdown.css'

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false })
const MarkdownPreview = dynamic(() => import('@uiw/react-markdown-preview'), { ssr: false })

export default function EditBlogPage() {
  const { id } = useParams()
  const router = useRouter()

  const [form, setForm] = useState({
    title: '',
    slug: '',
    excerpt: '',
    imageURL: '',
    content: '',
    category: '',
    tags: '',
  })

  const [loading, setLoading] = useState(true)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    const fetchBlog = async () => {
      const ref = doc(db, 'posts', id)
      const snap = await getDoc(ref)
      if (snap.exists()) {
        const data = snap.data()
        setForm({
          title: data.title || '',
          slug: data.slug || '',
          excerpt: data.excerpt || '',
          imageURL: data.imageURL || '',
          content: data.content || '',
          category: data.category || '',
          tags: Array.isArray(data.tags) ? data.tags.join(', ') : '',
        })
      }
      setLoading(false)
    }

    fetchBlog()
  }, [id])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    const updatedData = {
      ...form,
      tags: form.tags.split(',').map(tag => tag.trim()).filter(Boolean),
    }
    await updateDoc(doc(db, 'posts', id), updatedData)
    setSuccess(true)
    setTimeout(() => router.push('/blog'), 1000)
  }

  if (loading) return <p className="text-white text-center py-16">Loading blog...</p>

  return (
    <section className="max-w-3xl mx-auto px-4 py-16 text-white font-poppins">
      <h2 className="text-2xl font-bold mb-6">Edit Blog</h2>
      {success && <p className="text-green-400 mb-4">✅ Blog updated successfully!</p>}

      <form onSubmit={handleUpdate} className="flex flex-col gap-4">
        <input type="text" name="title" placeholder="Title" value={form.title} onChange={handleChange} className="bg-slate-800 px-4 py-2 rounded" required />
        <input type="text" name="slug" placeholder="Slug" value={form.slug} onChange={handleChange} className="bg-slate-800 px-4 py-2 rounded" required />
        <input type="text" name="excerpt" placeholder="Excerpt" value={form.excerpt} onChange={handleChange} className="bg-slate-800 px-4 py-2 rounded" required />
        <input type="text" name="imageURL" placeholder="Image URL" value={form.imageURL} onChange={handleChange} className="bg-slate-800 px-4 py-2 rounded" required />
        <input type="text" name="category" placeholder="Category" value={form.category} onChange={handleChange} className="bg-slate-800 px-4 py-2 rounded" />
        <input type="text" name="tags" placeholder="Tags (comma separated)" value={form.tags} onChange={handleChange} className="bg-slate-800 px-4 py-2 rounded" />

        <div className="bg-slate-900 p-4 rounded">
          <label className="block mb-2 font-semibold">Blog Content (Markdown)</label>
          <MDEditor value={form.content} onChange={(val) => setForm({ ...form, content: val })} height={300} />
        </div>

        <div className="mt-8 bg-slate-900 p-4 rounded">
          <h3 className="text-lg font-semibold mb-2">Preview</h3>
          <MarkdownPreview source={form.content} className="bg-slate-900 text-white" />
        </div>

        <button type="submit" className="bg-sky-500 hover:bg-sky-600 px-4 py-2 rounded text-white w-fit mt-6">
          Update Blog
        </button>
      </form>
    </section>
  )
}
