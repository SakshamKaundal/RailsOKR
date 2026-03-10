# 🚀 Quick Start Guide

## Installation & Setup (5 minutes)

### Step 1: Install Dependencies
```bash
cd "Ruby and React/portfolio"
npm install
```

### Step 2: Start Development Server
```bash
npm run dev
```
Your portfolio will open automatically at `http://localhost:3000`

## 📝 What You Have

Your portfolio includes:
- ✅ Fixed navigation bar with mobile menu
- ✅ Hero section with CTA buttons
- ✅ About section with skills grid
- ✅ Projects showcase with technology tags
- ✅ Contact form with validation
- ✅ Footer with social links
- ✅ Dark theme with smooth animations
- ✅ Fully responsive design

## 🎨 Customize in 5 Minutes

### 1. Update Your Name
Open `src/pages/Hero.jsx` and replace:
```jsx
<h2>Hi, I'm Your Name</h2>
```

### 2. Update About Section
Edit `src/pages/About.jsx` - change the description and skills

### 3. Add Your Projects
Edit `src/pages/Projects.jsx` - update the projects array:
```jsx
const projects = [
  {
    id: 1,
    title: 'My Awesome Project',
    description: 'What it does',
    technologies: ['React', 'Tailwind CSS'],
    link: 'https://github.com/yourlink'
  },
  // Add more projects
]
```

### 4. Update Contact Info
Edit `src/pages/Contact.jsx` and `src/components/Footer.jsx` with your details

## 🎯 File Navigation

```
Most Important Files to Edit:
├── src/pages/Hero.jsx          → Your intro & title
├── src/pages/About.jsx         → About you & skills
├── src/pages/Projects.jsx      → Your projects
├── src/pages/Contact.jsx       → Contact form & email
└── src/components/Footer.jsx   → Footer links & info
```

## 🚀 Next Steps

1. **Add Images**: Save images to `src/assets/` and import them
2. **Change Colors**: Edit `tailwind.config.js` theme section
3. **Add Animations**: Write CSS in `src/styles/App.css`
4. **Deploy**: Build with `npm run build` and deploy to Vercel/Netlify

## 📦 When Ready for Chakra UI

```bash
npm install @chakra-ui/react @emotion/react @emotion/styled framer-motion
```

Then update `src/main.jsx` to wrap App with ChakraProvider.

## 🔧 Useful Commands

```bash
npm run dev      # Start dev server
npm run build    # Build for production
npm run preview  # Preview production build
```

## 💡 Pro Tips

- Use Tailwind classes like `hover:`, `md:`, `lg:` for responsive design
- Smooth scrolling is already enabled
- Mobile menu hamburger is already built-in
- Form data logs to console when submitted

## 📚 Learn More

- [Tailwind CSS](https://tailwindcss.com/docs)
- [React Docs](https://react.dev)
- [Vite Guide](https://vitejs.dev/guide/)

---

**You're ready to go! Edit the files above and see changes live.** 🎉