'use client'

import { useState } from 'react'

export default function Hero() {
  const [lightboxOpen, setLightboxOpen] = useState(false)

  return (
    <section
      id="home"
      className="relative bg-gray-900 text-white font-poppins overflow-hidden min-h-screen flex items-center py-16"
    >
      {/* Radial background blur */}
      <div className="absolute top-1/2 left-3/4 w-[700px] h-[700px] bg-[radial-gradient(circle,_#38bdf8_0%,_transparent_70%)] -translate-x-1/2 -translate-y-1/2 blur-[90px] opacity-20 z-0" />

      {/* Main content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 flex flex-col-reverse md:flex-row items-center gap-12 md:gap-20">
        {/* Text Block */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Hello, I'm <span className="text-sky-400">Renie Namocot</span> 👋
          </h1>
          <p className="text-gray-300 text-lg leading-relaxed mb-6">
            I'm a Full Stack Web Developer crafting clean & scalable web experiences.
          </p>
          <a
            href="#projects"
            className="inline-block bg-sky-500 hover:bg-sky-600 transition text-white font-semibold py-3 px-6 rounded-md"
          >
            View My Work
          </a>
        </div>

        {/* Image Block */}
        <div className="flex-1 flex justify-center">
          <img
            src="/profile.JPG"
            alt="Renie Namocot"
            onClick={() => setLightboxOpen(true)}
            className="w-60 h-60 md:w-72 md:h-72 object-cover rounded-full border-4 border-sky-400 shadow-xl cursor-pointer hover:scale-105 transition"
          />
        </div>
      </div>

      {/* Lightbox Overlay */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 bg-slate-900/85 flex items-center justify-center z-50 cursor-zoom-out"
          onClick={() => setLightboxOpen(false)}
        >
          <img
            src="/profile.JPG"
            alt="Renie Full"
            className="max-w-[90%] max-h-[90%] rounded-xl border-2 border-sky-400 shadow-2xl"
          />
        </div>
      )}
    </section>
  )
}
