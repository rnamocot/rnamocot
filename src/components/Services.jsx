export default function Services() {
    const services = [
      {
        title: 'Frontend Development',
        icon: '🎨',
        desc: 'Responsive UI/UX using React, HTML, CSS, Tailwind, and JavaScript.',
      },
      {
        title: 'Backend Development',
        icon: '🛠️',
        desc: 'Node.js, PHP, REST APIs, databases, and server-side logic.',
      },
      {
        title: 'WP & WooCommerce',
        icon: '🛒',
        desc: 'Custom themes, plugins, speed optimization, and online stores.',
      },
      {
        title: 'Maintenance & Optimization',
        icon: '⚙️',
        desc: 'Bug fixes, performance tuning, security updates, and ongoing support.',
      },
    ]
  
    return (
      <section id="services" className="py-20 bg-gray-950 text-white border-t border-gray-800 font-poppins">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-2">Services</h2>
          <p className="text-gray-400 mb-10">Things I can help you build, fix, or scale</p>
  
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-sky-500 hover:shadow-xl transition duration-300"
              >
                <div className="text-3xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-sky-400">{service.title}</h3>
                <p className="text-sm text-gray-300 leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }
  