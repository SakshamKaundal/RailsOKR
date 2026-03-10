export default function About() {
  return (
    <section id="about" className="py-20 bg-gray-800">
      <div className="max-w-4xl mx-auto px-6">
        <h3 className="text-4xl font-bold mb-8">About Me</h3>
        <p className="text-lg text-gray-300 mb-4">
          I'm a passionate developer with experience in React, JavaScript, and full-stack development.
        </p>
        <p className="text-lg text-gray-300 mb-6">
          With a strong foundation in web technologies, I love building beautiful and functional applications that solve real-world problems.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gray-700 p-4 rounded-lg text-center">
            <p className="text-2xl font-bold text-blue-400">React</p>
          </div>
          <div className="bg-gray-700 p-4 rounded-lg text-center">
            <p className="text-2xl font-bold text-blue-400">JavaScript</p>
          </div>
          <div className="bg-gray-700 p-4 rounded-lg text-center">
            <p className="text-2xl font-bold text-blue-400">Tailwind</p>
          </div>
          <div className="bg-gray-700 p-4 rounded-lg text-center">
            <p className="text-2xl font-bold text-blue-400">Node.js</p>
          </div>
        </div>
      </div>
    </section>
  )
}
