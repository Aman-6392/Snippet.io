# Snippet.io 🚀

**Snippet.io** is a sleek and efficient web application for developers to create, manage, and organize their code snippets. Built with speed in mind, it uses local storage to ensure your snippets are always available instantly without the need for a complex backend setup.

## 🌐 Live Demo
Check out the live project here: [https://snippet-io.vercel.app/](https://snippet-io.vercel.app/)

---

## ✨ Features
- **Local Persistence:** Data is stored directly in your browser's `LocalStorage`—no database configuration required.
- **Modern UI:** Built with **React** and **Tailwind CSS** for a responsive and clean user experience.
- **Fast Performance:** Powered by **Vite** for lightning-fast development and build times.
- **Code Organization:** Easily add, edit, and delete snippets with a few clicks.
- **Copy to Clipboard:** Quickly copy your snippets to use them in your IDE.

---

## 🛠 Tech Stack
- **Frontend:** [React.js](https://react.dev/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **State Management:** React Hooks (useState, useEffect)
- **Data Storage:** Browser LocalStorage API

---

## 📦 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation & Local Development

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/Aman-6392/Snippet.io.git](https://github.com/Aman-6392/Snippet.io.git)
   cd Snippet.io

2. **Install dependencies:**
   ```bash
   npm install
3. **Start the development server:**
   ```bash
   npm run dev
4. **Build for production:**
   ```bash
   npm run build

## 📂 Project Structure
   
      ├── src/
      │   ├── components/    # UI components (Navbar, Sidebar, Cards)
      │   ├── App.jsx        # Main application logic
      │   ├── main.jsx       # Entry point
      │   └── index.css      # Tailwind directives and global styles
      ├── public/            # Static assets
      ├── index.html         # HTML template
      ├── tailwind.config.js # Tailwind CSS configuration
      └── package.json       # Project dependencies and scripts



## 💡 How it Works
**This application functions as a Client-Side Only app. When you create or update a snippet:**

1. **The app updates the React state.**

2. **A useEffect hook triggers a save to localStorage.setItem('snippets', ...).**

3. **On page reload, the app retrieves the data via localStorage.getItem('snippets').**


> [!WARNING]  
> **Data Loss Prevention:** Since Snippet.io uses `LocalStorage`, clearing your browser's "Site Data" or "Cookies & Cache" will permanently delete your saved snippets. Always keep a backup of important code!
