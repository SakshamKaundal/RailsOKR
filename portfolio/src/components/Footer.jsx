export default function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-gray-700 py-8">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h4 className="text-xl font-bold text-blue-500 mb-4">Portfolio</h4>
            <p className="text-gray-400">Building amazing web experiences</p>
          </div>
          <div>
            <h5 className="text-lg font-semibold mb-4">Quick Links</h5>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#home" className="hover:text-blue-400 transition">Home</a></li>
              <li><a href="#about" className="hover:text-blue-400 transition">About</a></li>
              <li><a href="#projects" className="hover:text-blue-400 transition">Projects</a></li>
              <li><a href="#contact" className="hover:text-blue-400 transition">Contact</a></li>
            </ul>
          </div>
          <div>
            <h5 className="text-lg font-semibold mb-4">Social</h5>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-blue-400 transition">GitHub</a></li>
              <li><a href="#" className="hover:text-blue-400 transition">LinkedIn</a></li>
              <li><a href="#" className="hover:text-blue-400 transition">Twitter</a></li>
              <li><a href="#" className="hover:text-blue-400 transition">Email</a></li>
            </ul>
          </div>
          <div>
            <h5 className="text-lg font-semibold mb-4">Contact</h5>
            <p className="text-gray-400 mb-2">Email: your@email.com</p>
            <p className="text-gray-400">Phone: +1 (555) 123-4567</p>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Your Name. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
