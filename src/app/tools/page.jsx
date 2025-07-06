"use client"

import Link from 'next/link'
import { FaInstagram } from 'react-icons/fa'

export default function ToolsPage() {
  const tools = [
    {
      name: 'Instagram Caption Generator',
      description: 'Generate cool and creative Instagram captions instantly!',
      href: '/tools/instagram-caption-generator',
      icon: <FaInstagram className="text-pink-500 text-2xl" />,
    },
  ]

  return (
    <section className="max-w-4xl mx-auto px-4 py-16 text-white font-poppins">
      <h1 className="text-3xl font-bold mb-6 leading-snug">Tools</h1>
      <p className="text-gray-400 mb-10">Free tools to help with your development and content creation.</p>

      <div className="grid md:grid-cols-2 gap-6">
        {tools.map((tool, index) => (
          <Link
            key={index}
            href={tool.href}
            className="bg-slate-800 rounded-lg p-6 hover:bg-slate-700 transition block shadow-md border border-slate-700"
          >
            <div className="flex items-center gap-4">
              {tool.icon}
              <div>
                <h2 className="text-xl font-semibold mb-1">{tool.name}</h2>
                <p className="text-gray-400 text-sm">{tool.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
