'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { db } from '@/lib/firebase'
import { collection, getDocs, orderBy, query } from 'firebase/firestore'

export default function BlogPage() {
  const [blogs, setBlogs] = useState([])
  const [latestBlogs, setLatestBlogs] = useState([])
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedTag, setSelectedTag] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const postsPerPage = 10

  useEffect(() => {
    const fetchPosts = async () => {
      const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'))
      const snapshot = await getDocs(q)
      const blogList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      setBlogs(blogList)
      setLatestBlogs(blogList.slice(0, 12))

      const categorySet = new Set(blogList.map(post => post.category).filter(Boolean))
      setCategories(['All', ...Array.from(categorySet)])
    }

    fetchPosts()
  }, [])

  const filteredBlogs = blogs.filter(post => {
    const categoryMatch = selectedCategory === 'All' || post.category === selectedCategory
    const tagMatch = !selectedTag || (post.tags || []).includes(selectedTag)
    return categoryMatch && tagMatch
  })

  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentBlogs = filteredBlogs.slice(indexOfFirstPost, indexOfLastPost)
  const totalPages = Math.ceil(filteredBlogs.length / postsPerPage)

  return (
    <>

      <section className="max-w-7xl mx-auto px-4 py-16 font-poppins text-white">
      <div className="text-center py-12 b text-white">
        <h1 className="text-4xl font-bold mb-2">Blog</h1>
        <p className="text-gray-400">Latest insights, tutorials, and updates</p>
      </div> 
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="md:col-span-2 space-y-10">
            <div className="grid md:grid-cols-2 gap-8">
              
              {currentBlogs.map(post => (
                <div key={post.id} className="bg-slate-900 rounded-lg shadow">
                  {post.imageURL && (
                    <div className="relative">
                      <img src={post.imageURL} alt={post.title} className="w-full h-60 object-cover rounded-t-lg" />
                      <div className="absolute bottom-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
                        {post.category || 'Uncategorized'}
                      </div>
                      <div className="absolute bottom-2 right-2 flex flex-wrap gap-1">
                        {(post.tags || []).map(tag => (
                          <span
                            key={tag}
                            onClick={() => setSelectedTag(tag)}
                            className="bg-sky-700 text-white px-2 py-1 rounded text-xs cursor-pointer"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="p-6">
                    <h2 className="text-2xl font-bold mb-2">
                      <Link href={`/blog/${post.slug}`} className="hover:text-sky-400">
                        {post.title}
                      </Link>
                    </h2>
                    <p className="text-gray-400 text-sm mb-4">
                      {new Date(post.createdAt?.seconds * 1000).toLocaleDateString()}
                    </p>
                    <p className="text-gray-300 mb-4">{post.excerpt}</p>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-block bg-sky-500 hover:bg-sky-600 px-4 py-2 rounded"
                    >
                      Read More
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex justify-center mt-8 gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-4 py-2 rounded ${currentPage === page ? 'bg-sky-500' : 'bg-slate-700 hover:bg-slate-600'}`}
                  >
                    {page}
                  </button>
                ))}
              </div>
            )}
          </div>

          <aside className="space-y-10">
            <div>
              <h3 className="text-xl font-semibold border-b border-gray-700 pb-2 mb-4">Filter by Category</h3>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-slate-800 text-white px-4 py-2 rounded"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            <div>
              <h3 className="text-xl font-semibold border-b border-gray-700 pb-2 mb-4">Latest Posts</h3>
              <ul className="space-y-3">
                {latestBlogs.map(post => (
                  <li key={post.id}>
                    <Link href={`/blog/${post.slug}`} className="hover:text-sky-400 text-gray-300">
                      {post.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold border-b border-gray-700 pb-2 mb-4">Popular Tags</h3>
              <div className="flex flex-wrap gap-2">
                {[...new Set(blogs.flatMap(b => b.tags || []))].map(tag => (
                  <span
                    key={tag}
                    onClick={() => setSelectedTag(tag)}
                    className="bg-sky-700 text-white px-3 py-1 rounded text-sm cursor-pointer"
                  >
                    #{tag}
                  </span>
                ))}
                {selectedTag && (
                  <button
                    onClick={() => setSelectedTag(null)}
                    className="text-sm text-sky-400 underline cursor-pointer ml-2"
                  >
                    Clear Filter
                  </button>
                )}
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  )
}
