"use client";

import { useEffect, useState } from "react";
import { Search, X } from "lucide-react";

export default function SearchBar() {
  const [open, setOpen] = useState(false);

  // ⌨️ Shortcut (Ctrl + K / Cmd + K)
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen(true);
      }
      if (e.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <>
      {/* 🔍 Trigger Button */}
      <button
        onClick={() => setOpen(true)}
        className='flex items-center gap-2 rounded-full bg-white/5 text-white/70 hover:bg-white/10 transition'>
        <Search className='w-4 h-4' />
       
      </button>

      {/* 🌑 Modal */}
      {open && (
        <div className='fixed inset-0 z-50 h-screen w-screen flex items-start justify-center bg-dark-color/50 backdrop-blur-sm'>
          {/* Click outside to close */}
          <div className='absolute inset-0' onClick={() => setOpen(false)} />

          {/* Modal Box */}
          <div className='relative mt-32 w-full max-w-2xl rounded-2xl bg-dark-color shadow-2xl animate-fadeIn'>
            {/* Input */}
            <div className='flex items-center gap-3 px-4 py-3 border-b border-dark-white/50'>
              <Search className='w-5 h-5 text-dark-white' />
              <input
                autoFocus
                type='text'
                placeholder='جستجو در پروژه‌ها، لیدها...'
                className='w-full bg-transparent outline-none text-dark-white placeholder:text-dark-white placeholder:text-sm'
              />
              <button onClick={() => setOpen(false)}>
                <X className='w-5 h-5 text-white-color/40 hover:text-dark-white' />
              </button>
            </div>

            {/* Results */}
            <div className='p-4 text-sm text-dark-white'>
              🔎 نتیجه‌ای برای نمایش نیست
            </div>
          </div>
        </div>
      )}
    </>
  );
}
