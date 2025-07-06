import {
    FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs,
    FaPhp, FaWordpress, FaGitAlt
  } from 'react-icons/fa'
  import {
    SiMysql, SiTailwindcss, SiMongodb, SiFigma, SiLaravel
  } from 'react-icons/si'
  
  export default function Skills() {
    const toolGroups = {
      frontend: [
        { name: 'HTML5', icon: <FaHtml5 /> },
        { name: 'CSS3', icon: <FaCss3Alt /> },
        { name: 'JavaScript', icon: <FaJs /> },
        { name: 'React', icon: <FaReact /> },
        { name: 'Tailwind CSS', icon: <SiTailwindcss /> },
      ],
      backend: [
        { name: 'Node.js', icon: <FaNodeJs /> },
        { name: 'PHP', icon: <FaPhp /> },
        { name: 'Laravel', icon: <SiLaravel /> },
        { name: 'MySQL', icon: <SiMysql /> },
        { name: 'MongoDB', icon: <SiMongodb /> },
      ],
      tools: [
        { name: 'Git', icon: <FaGitAlt /> },
        { name: 'WordPress', icon: <FaWordpress /> },
        { name: 'Figma', icon: <SiFigma /> },
      ],
    }
  
    return (
      <section id="skills" className="py-20 bg-gray-950 text-white border-t border-gray-800 font-poppins">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-2">Tools & Stacks</h2>
          <p className="text-gray-400 mb-10 text-sm">Technologies I use to build and ship full-stack projects</p>
  
          {Object.entries(toolGroups).map(([groupTitle, tools], index) => (
            <div key={index} className="mb-10 text-left">
              <h3 className="text-sky-400 font-semibold text-lg mb-4 capitalize">{groupTitle}</h3>
  
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {tools.map((tool, i) => (
                  <div
                    key={i}
                    className="bg-gray-900 rounded-xl p-4 flex flex-col items-center justify-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="text-3xl text-sky-400 mb-2">{tool.icon}</div>
                    <div className="text-gray-300 text-sm font-medium">{tool.name}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    )
  }
  