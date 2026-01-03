import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="w-full h-15 bg-slate-900/80 backdrop-blur-md border-b border-slate-700/50 flex flex-row items-center justify-between px-6 lg:px-20 sticky top-0 z-50">        <div className="flex items-center gap-3">
      <img
        src="/image.png"
        alt="PasteApp Logo"
        className="w-9 h-9 object-contain"
      />
      <span className="text-xl font-bold bg-linear-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
        Snippet.io
      </span>
    </div>
      <div className="flex flex-row gap-x-6">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `text-base font-semibold tracking-wide transition-all duration-300 hover:text-blue-400 ${isActive
              ? "text-blue-400 bg-blue-500/10 px-4 py-1.5 rounded-full ring-1 ring-blue-500/20"
              : "text-slate-400 px-4 py-1.5 hover:bg-slate-800/50 rounded-full"
            }`
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/paste"
          className={({ isActive }) =>
            `text-base font-semibold tracking-wide transition-all duration-300 hover:text-blue-400 ${isActive
              ? "text-blue-400 bg-blue-500/10 px-4 py-1.5 rounded-full ring-1 ring-blue-500/20"
              : "text-slate-400 px-4 py-1.5 hover:bg-slate-800/50 rounded-full"
            }`
          }
        >
          My Snippets
        </NavLink>
      </div>
    </nav>
  )
}

export default Navbar