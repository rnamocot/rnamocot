import './globals.css'
import Header from '../components/Header'
import Footer from '../components/Footer'
export const metadata = {
  title: 'Renie Namocot – Full Stack Developer',
  description:
    'A versatile full stack web developer from the Philippines specializing in React, Laravel, Node.js, CMS, and scalable web apps.',
  keywords:
    'Full Stack Developer, React Developer, Laravel, Node.js, CMS, Web App Developer, Philippines, Firebase, Tailwind CSS, Developer Portfolio',
  authors: [{ name: 'Renie Namocot', url: 'https://renienamocot.com' }],
  openGraph: {
    title: 'Renie Namocot – Full Stack Developer',
    description:
      'Crafting modern websites and full stack web applications using React, Laravel, Node.js, and CMS platforms.',
    url: 'https://renienamocot.com',
    siteName: 'Renie Namocot Portfolio',
    images: [
      {
        url: '/profile.JPG',
        width: 1200,
        height: 630,
        alt: 'Renie Namocot Profile',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Renie Namocot – Full Stack Developer',
    description:
      'Full stack web developer skilled in React, Laravel, Node.js, and modern CMS-based solutions.',
    images: ['/profile.JPG'],
  },
  icons: {
    icon: '/logo.png',
  },
}


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-950 text-white scroll-smooth">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
