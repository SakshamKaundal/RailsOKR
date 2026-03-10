export default function Hero() {
  return (
    <section id="home" className="pt-32 pb-20 text-center min-h-screen flex items-center justify-center">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-5xl md:text-7xl font-bold mb-6 text-white">Hi, I'm Saksham</h2>
        <p className="text-xl text-gray-400 mb-8">Full Stack Developer | Problem Solver</p>
        <div className="flex gap-4 justify-center">
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-lg transition duration-300 transform hover:scale-105">
            View My Work
          </button>
          <button className="border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white font-bold py-3 px-8 rounded-lg transition duration-300">
            Download CV
          </button>
        </div>
      </div>
    </section>
  )
}
