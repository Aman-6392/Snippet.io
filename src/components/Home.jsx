import React, { useEffect } from 'react'
import { set } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from "react-router-dom";
import { addToPaste, updateToPaste } from '../redux/pasteSlice'
import { useParams } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';

const Home = () => {

  const [title, setTitle] = React.useState('')
  const [value, setValue] = React.useState('')
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");
  const allPastes = useSelector((state) => state.paste.pastes)
  const dispatch = useDispatch();
  const navigate = useNavigate();


  useEffect(() => {
    if (pasteId && allPastes) {
      const paste = allPastes.find((p) => p._id === pasteId);
      if (paste) {
        setTitle(paste.title);
        setValue(paste.content);
      }
    }
  }, [pasteId, allPastes]);


  function createPaste() {


    if (!title.trim()) {
      toast.error("Title is required!");
      return;
    }

    const paste = {
      title: title,
      content: value,
      _id: pasteId || Date.now().toString(36),
      createdAt: new Date().toISOString(),
    }



    if (pasteId) {
      //update existing paste
      dispatch(updateToPaste(paste));
      alert("Paste updated successfully!");
    }
    else {
      //create new paste
      dispatch(addToPaste(paste));
      alert("Paste created successfully!");
    }

    setTitle('');
    setValue('');
    setSearchParams({});

  }
  const lines = value.split("\n");
  return (
    <div className="w-full h-full py-10 max-w-300 mx-auto px-5 lg:px-0">
      <div className="flex flex-row gap-4 justify-between items-center">
        <input
          type="text"
          placeholder="Enter your title here..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-[85%] text-white p-3 px-5 rounded-xl border border-slate-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 bg-slate-900 shadow-inner transition-all"
        />

        <button onClick={createPaste} className="text-white bg-blue-600 hover:bg-blue-700 transition-all duration-200 font-medium rounded-xl text-sm px-6 py-3 text-center shadow-lg shadow-blue-500/20">
          {pasteId ? ("Update My Paste") : ("Create My Paste")}
        </button>
      </div>

      <div className="mt-8 relative border border-slate-700 rounded-2xl overflow-hidden shadow-2xl bg-slate-900">
        {/* Editor Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800 bg-slate-800/50">
          <div className="flex gap-x-2">
            <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
            <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
          </div>
          <div className="flex gap-x-5">
            <div className="text-slate-500 text-xs font-mono uppercase tracking-widest flex gap-x-2">
              <span className="text-slate-400">Lines:</span>
              <span className="text-blue-400 font-bold">{value.split("\n").length}</span>
            </div>
            <div className="text-slate-500 text-xs font-mono uppercase tracking-widest flex gap-x-2 border-l border-slate-700 pl-5">
              <span className="text-slate-400">Characters:</span>
              <span className="text-blue-400 font-bold">{value.length}</span>
            </div>
          </div>
        </div>

        {/* Editor Body */}
        <div className="flex h-[70vh] overflow-hidden">
          {/* Line Numbers Column */}
          <div
            className="w-12 bg-slate-800/30 border-r border-slate-800 flex flex-col items-center pt-8 font-mono text-sm text-slate-600 select-none text-right pr-3"
            aria-hidden="true"
          >
            {lines.map((_, index) => (
              <div key={index} className="leading-relaxed h-6.75">
                {index + 1}
              </div>
            ))}
          </div>

          {/* Textarea */}
          <textarea
            className="flex-1 p-8 pt-8 focus:outline-none text-slate-300 leading-relaxed resize-none bg-transparent font-mono text-lg overflow-y-auto"
            placeholder="Write your code snippet or notes here..."
            value={value}
            onChange={(e) => setValue(e.target.value)}
            spellCheck="false"
            style={{
              caretColor: "#3b82f6",
              lineHeight: "27px", // Matches the height of the line number divs
            }}
          ></textarea>
        </div>
      </div>
    </div>
  )
}

export default Home
