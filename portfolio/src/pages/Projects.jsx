export default function Projects() {
  const projects = [
    {
      id: 1,
      title: 'Project 1',
      description: 'A description of your first project goes here',
      technologies: ['React', 'Tailwind CSS'],
      link: '#'
    },
    {
      id: 2,
      title: 'Project 2',
      description: 'A description of your second project goes here',
      technologies: ['React', 'Node.js', 'MongoDB'],
      link: '#'
    },
    {
      id: 3,
      title: 'Project 3',
      description: 'A description of your third project goes here',
      technologies: ['JavaScript', 'API'],
      link: '#'
    },
  ]

  return (
    <section id="projects" className="py-20 bg-gray-900">
      <div className="max-w-6xl mx-auto px-6">
        <h3 className="text-4xl font-bold mb-12 text-center">My Projects</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-gray-800 p-6 rounded-lg hover:bg-gray-700 transition duration-300 transform hover:scale-105"
            >
              <h4 className="text-2xl font-bold mb-2 text-white">{project.title}</h4>
              <p className="text-gray-300 mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="bg-blue-600 text-white text-sm px-3 py-1 rounded"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <a
                href={project.link}
                className="text-blue-400 hover:text-blue-300 font-semibold transition"
              >
                View Project →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
