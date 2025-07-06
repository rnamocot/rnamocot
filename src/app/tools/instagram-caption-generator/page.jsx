'use client'

import { useState } from 'react'
import { FaCopy, FaFacebookF, FaXTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa6'
import { usePathname } from 'next/navigation'
import Head from 'next/head'

export default function InstagramCaptionGenerator() {
  const [description, setDescription] = useState('')
  const [tone, setTone] = useState('funny')
  const [captions, setCaptions] = useState([])
  const [loading, setLoading] = useState(false)
  const pathname = usePathname()

  const generateCaptions = async () => {
    if (!description) return
    setLoading(true)
    setCaptions([])

    try {
      const response = await fetch('/api/generate-captions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description, tone }),
      })

      const data = await response.json()
      if (data?.captions?.length) {
        setCaptions(data.captions)
      } else {
        alert('No captions returned from the server.')
      }
    } catch (err) {
      console.error('❌ Error fetching captions:', err)
      alert('Oops! Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <>
      <Head>
        <title>Instagram Caption Generator | Tools by Renie Namocot</title>
        <meta
          name="description"
          content="Generate creative and catchy Instagram captions with a tone you choose. Powered by AI inspiration."
        />
        <meta property="og:title" content="Instagram Caption Generator" />
        <meta
          property="og:description"
          content="Generate creative and catchy Instagram captions with a tone you choose."
        />
        <meta property="og:image" content="/profile.JPG" />
        <meta property="og:url" content={`https://renienamocot.com${pathname}`} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <section className="max-w-3xl mx-auto px-4 py-16 text-white font-poppins">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 flex items-center gap-3">
          <FaInstagram className="text-pink-500" />
          Instagram Caption Generator
        </h1>
        <p className="text-gray-400 mb-8">
          Generate creative captions based on your description and tone. Use them to spice up your Instagram posts!
        </p>

        <div className="flex flex-col gap-4">
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe your post (e.g. beach day, food, selfie)"
            className="bg-slate-800 px-4 py-2 rounded text-white placeholder:text-gray-400"
          />

          <select
            value={tone}
            onChange={(e) => setTone(e.target.value)}
            className="bg-slate-800 px-4 py-2 rounded text-white"
          >
            <option value="funny">Funny</option>
            <option value="professional">Professional</option>
            <option value="inspirational">Inspirational</option>
            <option value="casual">Casual</option>
          </select>

          <button
            onClick={generateCaptions}
            disabled={loading}
            className="bg-sky-500 hover:bg-sky-600 px-4 py-2 rounded w-fit"
          >
            {loading ? 'Generating...' : 'Generate Captions'}
          </button>
        </div>

        {/* Results */}
        {captions.length > 0 && (
          <div className="mt-10 space-y-4">
            <h2 className="text-xl font-semibold">Generated Captions</h2>
            {captions.map((caption, index) => (
              <div
                key={index}
                className="bg-slate-800 p-4 rounded flex justify-between items-center"
              >
                <p className="text-white">{caption}</p>
                <button
                  onClick={() => copyToClipboard(caption)}
                  className="text-sky-400 hover:text-sky-300"
                  aria-label="Copy caption"
                >
                  <FaCopy />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Share Buttons */}
        <div className="mt-12">
          <p className="text-gray-400 mb-3">Share this tool:</p>
          <div className="flex gap-4">
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=https://renienamocot.com${pathname}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded inline-flex items-center"
              aria-label="Share on Facebook"
            >
              <FaFacebookF />
            </a>
            <a
              href={`https://twitter.com/intent/tweet?url=https://renienamocot.com${pathname}&text=Try this cool Instagram Caption Generator!`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#1DA1F2] hover:bg-blue-500 text-white px-3 py-2 rounded inline-flex items-center"
              aria-label="Share on Twitter"
            >
              <FaXTwitter />
            </a>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=https://renienamocot.com${pathname}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-800 hover:bg-blue-900 text-white px-3 py-2 rounded inline-flex items-center"
              aria-label="Share on LinkedIn"
            >
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
