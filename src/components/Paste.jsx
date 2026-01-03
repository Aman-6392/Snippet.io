import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromPaste } from '../redux/pasteSlice'
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom'

const Paste = () => {

    const paste = useSelector((state) => state.paste.pastes)
    const [searchTerm, setSearchTerm] = useState('')
    const dispatch = useDispatch();
    const filteredData = paste.filter(
        (paste) => paste.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    const handleShare = (paste) => {
        // Construct the URL to the specific view page
        const shareUrl = `${window.location.origin}/paste/${paste?._id}`;

        if (navigator.share) {
            // Use native Web Share API
            navigator.share({
                title: paste.title,
                text: `Check out this paste: ${paste.title}`,
                url: shareUrl,
            })
                .then(() => toast.success("Shared successfully!"))
                .catch((error) => console.log("Error sharing", error));
        } else {
            // Fallback: Copy link to clipboard if Share API is not supported
            navigator.clipboard.writeText(shareUrl);
            toast.success("Share link copied to clipboard!");
        }
    };
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true // Shows AM/PM
        });
    };
    function handleDelete(pasteId) {
        dispatch(removeFromPaste(pasteId))
    }


    return (
        <div className="w-full max-w-4xl mx-auto p-4 flex flex-col items-center">
            {/* Centered Search Bar */}
            <div className="w-full flex justify-center mb-8">
                <input
                    type="search"
                    className="w-full max-w-2xl p-4 px-6 rounded-2xl bg-slate-800/50 border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-xl backdrop-blur-sm transition-all"
                    placeholder='Search your notes...'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Paste Cards */}
            <div className="w-full flex flex-col gap-6">
                {filteredData.length > 0 ? (
                    filteredData.map((paste) => (
                        <div className='group border border-slate-700 rounded-2xl p-6 bg-slate-900/40 hover:bg-slate-800/60 transition-all duration-300 shadow-lg' key={paste?._id}>
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-2xl font-bold text-slate-100">
                                    {paste.title}
                                </h2>
                                
                                <div className="flex items-center gap-2 text-slate-400 bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700 text-xs font-mono">
                                    <span>📅</span>
                                    {formatDate(paste.createdAt)}
                                </div>
                            </div>

                            <div className="text-slate-400 mb-6 line-clamp-3 bg-slate-950/50 p-4 rounded-xl border border-slate-800">
                                {paste.content}
                            </div>

                            <div className="flex flex-wrap items-center gap-3">
                                {/* Edit Button */}
                                <Link to={`/?pasteId=${paste?._id}`}>
                                <button className="px-4 py-2 bg-slate-800 text-blue-400 rounded-lg border border-slate-700 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all">
                                    Edit
                                </button>
                                </Link>

                                {/* View Button */}
                                <Link to={`/paste/${paste?._id}`}>
                                <button className="px-4 py-2 bg-slate-800 text-blue-400 rounded-lg border border-slate-700 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all">
                                    View
                                </button>
                                </Link>

                                {/* Delete Button */}
                                <button onClick={() => handleDelete(paste?._id)} className="px-4 py-2 bg-slate-800 text-red-400 rounded-lg border border-slate-700 hover:bg-red-600 hover:text-white hover:border-red-600 transition-all">
                                    Delete
                                </button>

                                {/* Copy/Share Buttons */}
                                <button onClick={() => {
                                    navigator.clipboard.writeText(paste?.content); // Copying content instead of ID is usually more helpful
                                    toast.success("Copied to Clipboard");
                                }} className="px-4 py-2 bg-slate-800 text-emerald-400 rounded-lg border border-slate-700 hover:bg-emerald-600 hover:text-white transition-all">
                                    Copy
                                </button>

                                <button onClick={() => handleShare(paste)} className="px-4 py-2 bg-slate-800 text-purple-400 rounded-lg border border-slate-700 hover:bg-purple-600 hover:text-white transition-all ml-auto">
                                    Share
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center text-slate-500 mt-20 text-xl font-medium">
                        No notes found...
                    </div>
                )}
            </div>
        </div>
    );
}

export default Paste


