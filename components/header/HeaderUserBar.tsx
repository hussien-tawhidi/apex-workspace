"use client";

import { useEffect, useRef, useState } from "react";
import {
  ChevronDown,
  UserCircle2,
  Settings,
  HelpCircle,
  LogOut,
  Calendar,
} from "lucide-react";
import SkeletonDate from "./SkeletonDate";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function HeaderUserBar({ currentDate }: any) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // 🔒 Close on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // ⌨️ ESC close
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <div className='order-3 flex w-full items-center justify-between gap-3 rounded-full px-3 py-1.5 backdrop-blur-xl border border-dark-white shadow-inner md:order-0 md:w-auto md:px-4 md:py-2'>
      {/* 👤 USER */}
      <div className='relative' ref={ref}>
        <button
          onClick={() => setOpen((p) => !p)}
          className='flex items-center gap-2 rounded-full px-1.5 py-1 transition-all duration-200 active:scale-[0.97]'>
          {/* Avatar */}
          <div className='relative flex h-8 w-8 items-center justify-center rounded-full bg-linear-to-br from-dark-color to-dark-white text-xs font-bold text-white-color'>
            ع.ر
            {/* 🟢 Online dot */}
            <span className='absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-[#05df72]' />
          </div>

          {/* Name */}
          <div className='hidden text-right sm:block'>
            <p className='text-sm text-white-color leading-none'>علی رضایی</p>
            <p className='text-[11px] text-dark-white'>آنلاین</p>
          </div>

          <ChevronDown
            className={`h-4 w-4 text-dark-white transition ${
              open ? "rotate-180 text-white-color" : ""
            }`}
          />
        </button>

        {/* Dropdown */}
        <div
          className={`absolute left-0 mt-2 w-60 origin-top-left rounded-xl bg-dark-color backdrop-blur-xl shadow-2xl transition-all duration-200 ${
            open
              ? "opacity-100 scale-100 translate-y-0"
              : "pointer-events-none opacity-0 scale-95 -translate-y-2"
          }`}>
          {/* Header */}
          <div className='px-4 py-3 border-b border-dark-white/50'>
            <p className='text-sm text-white-color font-medium'>علی رضایی</p>
            <p className='text-xs text-dark-white'>ali.rezaei@email.com</p>
          </div>

          {/* Items */}
          <div className='p-1.5 space-y-1'>
            <MenuItem icon={<UserCircle2 />} label='پروفایل' />
            <MenuItem icon={<Settings />} label='تنظیمات' />
            <MenuItem icon={<HelpCircle />} label='راهنما' />

            <div className='my-1 border-t border-white/10' />

            <MenuItem icon={<LogOut />} label='خروج' danger />
          </div>
        </div>
      </div>

      {/* 📅 DATE */}
      <div className='flex items-center gap-2 border-r border-dark-white/50 pr-3 text-sm text-white-color'>
        <div className='flex h-7 w-7 items-center justify-center rounded-full bg-[#f9b042]/10'>
          <Calendar className='h-4 w-4 text-red-color' />
        </div>

        <span className='whitespace-nowrap text-xs md:text-sm'>
          {currentDate ?? <SkeletonDate />}
        </span>
      </div>
    </div>
  );
}

// 🔹 Menu Item
function MenuItem({
  icon,
  label,
  danger,
}: {
  icon: React.ReactNode;
  label: string;
  danger?: boolean;
}) {
  return (
    <button
      className={`flex w-full items-center gap-2.5 text-dark-white rounded-lg px-3 py-2 text-[12px] transition-all ${
        danger
          ? "text-red-color bg-white-color"
          : "hover:bg-white/10 hover:text-white"
      }`}>
      <span className=' '>{icon}</span>
      {label}
    </button>
  );
}
