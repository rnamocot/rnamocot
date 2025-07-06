'use client'

import { useState } from 'react'
import { FaEnvelope, FaLinkedin, FaGithub } from 'react-icons/fa'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState({})

  const validate = () => {
    const newErrors = {}
    if (!form.name) newErrors.name = 'Name is required'
    if (!form.email) newErrors.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Invalid email'
    if (!form.message) newErrors.message = 'Message is required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: '' })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validate()) {
      alert('Message sent successfully!')
      setForm({ name: '', email: '', message: '' })
    }
  }

  return (
    <section id="contact" className="py-20 border-t border-gray-800 bg-gray-950 text-white font-poppins">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row gap-12">
        {/* Contact Info */}
        <div className="flex-1 space-y-4">
          <h2 className="text-3xl font-bold mb-4">Contact Me</h2>
          <p className="flex items-center gap-2 text-gray-300">
            <FaEnvelope className="text-sky-400" />
            <a href="mailto:rnamocotdev@gmail.com" className="hover:text-sky-400 transition">rnamocotdev@gmail.com</a>
          </p>
          <p className="flex items-center gap-2 text-gray-300">
            <FaLinkedin className="text-sky-400" />
            <a href="https://www.linkedin.com/in/renie-namocot-43700818b/" target="_blank" className="hover:text-sky-400 transition">
              LinkedIn
            </a>
          </p>
          <p className="flex items-center gap-2 text-gray-300">
            <FaGithub className="text-sky-400" />
            <a href="https://github.com/rnamocot" target="_blank" className="hover:text-sky-400 transition">GitHub</a>
          </p>
        </div>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="flex-1 space-y-4 max-w-xl">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-md bg-slate-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
          {errors.name && <span className="text-red-400 text-sm">{errors.name}</span>}

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-md bg-slate-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
          {errors.email && <span className="text-red-400 text-sm">{errors.email}</span>}

          <textarea
            name="message"
            rows="5"
            placeholder="Your Message"
            value={form.message}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-md bg-slate-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
          {errors.message && <span className="text-red-400 text-sm">{errors.message}</span>}

          <button
            type="submit"
            className="bg-sky-500 hover:bg-sky-600 transition text-white px-6 py-3 rounded-md font-semibold"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  )
}
