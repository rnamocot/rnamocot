'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { FaCode } from 'react-icons/fa'
import { FiMenu, FiX } from 'react-icons/fi'
import { IoChevronDown, IoChevronUp } from 'react-icons/io5'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [projectsOpen, setProjectsOpen] = useState(false)
  const [mobileProjectsOpen, setMobileProjectsOpen] = useState(false)

  const pathname = usePathname()
  const router = useRouter()

  const handleScrollLink = (sectionId) => {
    setMenuOpen(false)
    if (pathname !== '/') {
      router.push('/')
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    } else {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header className="bg-gray-900 text-white sticky top-0 z-50 font-poppins p-5 shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-2 text-xl font-bold text-sky-400 cursor-pointer">
          <FaCode />
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-6 items-center">
          <button onClick={() => handleScrollLink('home')} className="hover:text-sky-400 cursor-pointer">Home</button>
          <button onClick={() => handleScrollLink('about')} className="hover:text-sky-400 cursor-pointer">About</button>
          <button onClick={() => handleScrollLink('services')} className="hover:text-sky-400 cursor-pointer">Services</button>

          {/* Projects Dropdown Click */}
          <div className="relative">
            <button onClick={() => setProjectsOpen(!projectsOpen)} className="hover:text-sky-400 flex items-center gap-1 cursor-pointer">
              Projects {projectsOpen ? <IoChevronUp /> : <IoChevronDown />}
            </button>
            {projectsOpen && (
              <div className="absolute top-full mt-2 bg-gray-800 border border-gray-700 rounded shadow w-40 z-20">
                <Link href="/tools" className="block px-4 py-2 hover:bg-gray-700 cursor-pointer">Tools</Link>
              </div>
            )}
          </div>

          <button onClick={() => handleScrollLink('skills')} className="hover:text-sky-400 cursor-pointer">Skills</button>
          <Link href="/blog" className="hover:text-sky-400 cursor-pointer">Blog</Link>
          <button onClick={() => handleScrollLink('contact')} className="hover:text-sky-400 cursor-pointer">Contact</button>
        </nav>

        {/* Hamburger Icon */}
        <button className="md:hidden text-2xl cursor-pointer" onClick={() => setMenuOpen(true)}>
          <FiMenu />
        </button>
      </div>

      {/* Overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50"
          onClick={() => setMenuOpen(false)}
        ></div>
      )}

      {/* Off-canvas Mobile Menu */}
      <div className={`fixed top-0 right-0 h-full w-[75%] max-w-xs bg-gray-900 text-white shadow-lg transform transition-transform z-50
        ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <span className="text-xl font-semibold text-sky-400">Menu</span>
          <button onClick={() => setMenuOpen(false)} className="cursor-pointer">
            <FiX className="text-2xl" />
          </button>
        </div>

        <div className="flex flex-col items-start p-6 space-y-4 text-left font-poppins text-base">
          <button onClick={() => handleScrollLink('home')} className="cursor-pointer">Home</button>
          <button onClick={() => handleScrollLink('about')} className="cursor-pointer">About</button>
          <button onClick={() => handleScrollLink('services')} className="cursor-pointer">Services</button>

          {/* Mobile Projects Dropdown */}
          <div className="w-full">
            <button
              onClick={() => setMobileProjectsOpen(!mobileProjectsOpen)}
              className="flex items-center justify-between w-full cursor-pointer"
            >
              <span>Projects</span>
              {mobileProjectsOpen ? <IoChevronUp /> : <IoChevronDown />}
            </button>
            {mobileProjectsOpen && (
              <div className="ml-4 mt-2 space-y-2">
                <Link href="/tools" onClick={() => setMenuOpen(false)} className="block cursor-pointer">Tools</Link>
              </div>
            )}
          </div>

          <button onClick={() => handleScrollLink('skills')} className="cursor-pointer">Skills</button>
          <Link href="/blog" onClick={() => setMenuOpen(false)} className="cursor-pointer">Blog</Link>
          <button onClick={() => handleScrollLink('contact')} className="cursor-pointer">Contact</button>
        </div>
      </div>
    </header>
  )
}
