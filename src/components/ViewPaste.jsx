
import React, { useEffect } from 'react'
import { set } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useSearchParams } from 'react-router-dom'
import { addToPaste, updateToPaste } from '../redux/pasteSlice'

const ViewPaste = () => {

  const { id } = useParams()
  const allPastes = useSelector((state) => state.paste.pastes)
  const paste = allPastes.filter((p) => p._id === id)[0]


  return (
    <div className="w-full max-w-225 mx-auto p-4 md:p-8 animate-fadeIn">
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <input
          type="text"
          placeholder="Enter your title here..."
          value={paste.title}
          disabled
          onChange={(e) => setTitle(e.target.value)}
          className="w-full text-slate-900 p-3 px-5 rounded-lg border border-slate-300 bg-white cursor-not-allowed font-bold text-xl shadow-sm transition-all focus:ring-0" />

      </div>

      <div className="mt-8 flex flex-col border border-slate-300 rounded-xl overflow-hidden shadow-xl bg-white">
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200 bg-slate-50/80 backdrop-blur-sm">
          <div className="flex gap-x-2">
            <div className="w-3.5 h-3.5 rounded-full bg-[#ff5f56] shadow-sm"></div>
            <div className="w-3.5 h-3.5 rounded-full bg-[#ffbd2e] shadow-sm"></div>
            <div className="w-3.5 h-3.5 rounded-full bg-[#27c93f] shadow-sm"></div>
          </div>


          <div className="text-xs font-bold text-slate-400 uppercase tracking-widest hidden sm:block">
            Read-Only Mode
          </div>
        </div>
        <textarea
          className="w-full h-[60vh] p-8 bg-white text-slate-700 font-mono text-sm md:text-base leading-relaxed resize-none cursor-text select-text focus:outline-none"
          placeholder="Write or paste your notes here..."
          value={paste.content}
          disabled
          onChange={(e) => setValue(e.target.value)}
        ></textarea>
      </div>
      <div className="mt-4 flex justify-end">
        <p className="text-slate-500 text-xs italic">
          Viewing content created on {new Date(paste.createdAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  )
}

export default ViewPaste
