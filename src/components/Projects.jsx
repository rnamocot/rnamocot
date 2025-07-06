export default function Projects() {
    const defaultImage =
      'https://img.freepik.com/free-vector/desktop-smartphone-app-development_23-2148683810.jpg'
  
    const projectGroups = [
      {
        title: 'Featured Projects',
        items: [
          {
            title: 'E-commerce Website',
            desc: 'Built a scalable store with React, Node.js, and MongoDB.',
            image: '',
            link: 'https://n-essentials.com.au/',
          },
          {
            title: 'Portfolio Website',
            desc: 'Personal website using React and Vite, deployed on Vercel.',
            image: '',
            link: '#',
          },
          {
            title: 'Booking System',
            desc: 'Online appointment system with notifications and admin panel.',
            image: '',
            link: '#',
          },
          {
            title: 'Inventory Management',
            desc: 'Track stock and suppliers with a custom dashboard.',
            image: '',
            link: '#',
          },
        ],
      },
      {
        title: 'Web Applications',
        items: [
          {
            title: 'WordPress Blog',
            desc: 'Custom WordPress theme and speed-optimized blog setup.',
            image: '',
            link: '#',
          },
          {
            title: 'Real Estate Platform',
            desc: 'Searchable listings with filtering and map integration.',
            image: '',
            link: '#',
          },
          {
            title: 'Freelance Dashboard',
            desc: 'Multi-role dashboard for project & client management.',
            image: '',
            link: '#',
          },
          {
            title: 'Restaurant Ordering App',
            desc: 'Mobile-friendly food menu and cart experience.',
            image: '',
            link: '#',
          },
        ],
      },
      {
        title: 'Custom Solutions',
        items: [
          {
            title: 'Crypto Tracker',
            desc: 'Live prices and charts using public APIs.',
            image: '',
            link: '#',
          },
          {
            title: 'School Management System',
            desc: 'Modules for students, teachers, grades, and attendance.',
            image: '',
            link: '#',
          },
          {
            title: 'Landing Page Funnel',
            desc: 'High-converting landing page with lead capture.',
            image: '',
            link: '#',
          },
          {
            title: 'WooCommerce Builder',
            desc: 'Custom product builder with dynamic pricing.',
            image: '',
            link: '#',
          },
        ],
      },
    ]
  
    return (
      <section id="projects" className="py-20 bg-gray-950 text-white border-t border-gray-800 font-poppins">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-2 text-sky-400 relative">
            Projects
            <span className="block w-16 h-[3px] bg-sky-400 mx-auto mt-2 rounded"></span>
          </h2>
          <p className="text-center text-gray-400 mb-10 text-sm">
            Some of the work I've built with passion & purpose
          </p>
  
          {projectGroups.map((group, index) => (
            <div key={index} className="mb-12">
              <h3 className="text-xl text-sky-400 font-semibold mb-6">{group.title}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {group.items.map((proj, i) => (
                  <div
                    key={i}
                    className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden flex flex-col hover:shadow-xl transition-all duration-300"
                  >
                    <img
                      src={proj.image || defaultImage}
                      alt={proj.title}
                      className="w-full h-44 object-cover"
                      loading="lazy"
                    />
                    <div className="p-4 flex flex-col flex-grow">
                      <h4 className="text-lg font-semibold text-white mb-1">{proj.title}</h4>
                      <p className="text-gray-400 text-sm flex-grow">{proj.desc}</p>
                      <a
                        href={proj.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-block text-center bg-sky-500 text-white text-sm font-medium py-2 px-4 rounded-md hover:bg-sky-600 transition"
                      >
                        View Project
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    )
  }
  