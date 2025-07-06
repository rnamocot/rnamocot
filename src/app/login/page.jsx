'use client'

import { auth } from '@/lib/firebase' // ✅ use this auth instance
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signInWithEmailAndPassword } from 'firebase/auth'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')

    try {
      await signInWithEmailAndPassword(auth, email, password)
      router.push('/admin/add-blog')
    } catch (err) {
      console.error('❌ Firebase Login Error:', err.code, err.message)
      setError('Invalid email or password.')
    }
  }

  return (
    <section className="max-w-sm mx-auto px-4 py-20 text-white font-poppins">
      <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>
      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Email"
          className="bg-slate-800 px-4 py-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="bg-slate-800 px-4 py-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-sky-500 hover:bg-sky-600 px-4 py-2 rounded w-full"
        >
          Login
        </button>
        {error && <p className="text-red-400 text-sm">{error}</p>}
      </form>
    </section>
  )
}
