# Portfolio Website

A modern, responsive personal portfolio website built with React, Vite, and Tailwind CSS. Ready for Chakra UI integration!

## 📁 Project Structure

```
portfolio/
├── src/
│   ├── assets/          # Images, icons, fonts
│   ├── components/      # Reusable components (Navbar, Footer)
│   ├── pages/           # Page sections (Hero, About, Projects, Contact)
│   ├── styles/          # Custom CSS files
│   ├── utils/           # Helper functions and utilities
│   ├── App.jsx          # Main app component
│   ├── main.jsx         # React entry point
│   └── index.css        # Global styles with Tailwind
├── public/              # Static assets
├── index.html           # HTML entry point
├── package.json         # Dependencies and scripts
├── vite.config.js       # Vite configuration
├── tailwind.config.js   # Tailwind CSS configuration
├── postcss.config.js    # PostCSS configuration
└── .gitignore          # Git ignore rules
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Navigate to the portfolio directory:
```bash
cd "Ruby and React/portfolio"
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The app will automatically open at `http://localhost:3000`

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

## 🎨 Features

- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Modern UI**: Dark theme with smooth animations
- **Components**:
  - **Navbar**: Fixed navigation with mobile menu toggle
  - **Hero**: Eye-catching landing section with CTA buttons
  - **About**: Introduction with skills showcase
  - **Projects**: Grid layout for project cards with technologies
  - **Contact**: Form with validation and social links
  - **Footer**: Multi-column footer with links

## 🛠️ Technology Stack

- **React 18.2** - UI library
- **Vite 5** - Build tool and dev server
- **Tailwind CSS 3.3** - Utility-first CSS framework
- **PostCSS & Autoprefixer** - CSS processing
- **Chakra UI** - Ready to integrate!

## 🎯 Customization

### Update Personal Information
Edit these components to personalize your portfolio:
- `src/pages/Hero.jsx` - Change your name and title
- `src/pages/About.jsx` - Update about section and skills
- `src/pages/Projects.jsx` - Add your projects
- `src/pages/Contact.jsx` - Update contact information
- `src/components/Footer.jsx` - Update footer details

### Add Images
Place images in `src/assets/` and import them:
```jsx
import myImage from '../assets/my-image.png'
```

### Customize Colors
Edit `tailwind.config.js` to change the color scheme:
```js
colors: {
  primary: '#your-color',
  secondary: '#your-color',
}
```

## 📦 Adding Chakra UI (When Ready)

```bash
npm install @chakra-ui/react @emotion/react @emotion/styled framer-motion
```

Update `src/main.jsx`:
```jsx
import { ChakraProvider } from '@chakra-ui/react'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
)
```

## 📱 Responsive Breakpoints

Using Tailwind's responsive classes:
- `sm` - 640px
- `md` - 768px
- `lg` - 1024px
- `xl` - 1280px

Example: `text-2xl md:text-4xl lg:text-5xl`

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Netlify
Connect your GitHub repo and it will auto-deploy on push.

### GitHub Pages
```bash
npm run build
# Deploy the dist folder
```

## 📚 Resources

- [React Documentation](https://react.dev)
- [Vite Guide](https://vitejs.dev)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Chakra UI Docs](https://chakra-ui.com/docs/getting-started)

## 💡 Tips

- Use `smooth scroll behavior` - Already enabled in `src/index.css`
- Add `custom animations` in `src/styles/App.css`
- Keep components small and reusable
- Use semantic HTML for better accessibility

## 📄 License

This project is open source and available under the MIT License.

---

**Happy Coding! 🎉**

For questions or improvements, feel free to modify the code and experiment!