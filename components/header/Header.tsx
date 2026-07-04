"use client";

import { useState, useEffect, useRef } from "react";
import {
  ChartLine,
  Calendar,
  PlusCircle,
  UserPlus,
  Bell,
  LogOut,
  Search,
  Settings,
  HelpCircle,
  UserCircle2,
  ChevronDown,
  X,
} from "lucide-react";
import SkeletonDate from "./SkeletonDate";
import SearchBar from "./Search";
import HeaderUserBar from "./HeaderUserBar";
import HeaderRightActions from "./HeaderRightActions";

// Simulated notification data
const NOTIFICATIONS = [
  {
    id: 1,
    title: 'پروژه "فروشگاه آنلاین" به روز شد',
    time: "۲ دقیقه پیش",
    unread: true,
  },
  {
    id: 2,
    title: "لید جدید از سمت شرکت آلفا",
    time: "۱ ساعت پیش",
    unread: true,
  },
  { id: 3, title: "تسک شماره ۱۲ تکمیل شد", time: "۳ ساعت پیش", unread: false },
];

export default function DashboardHeader() {
  // --- State ---
  const [currentDate, setCurrentDate] = useState<string | null>(null);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCompact, setIsCompact] = useState(false);

  const userMenuRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // --- Effects ---
  // 1. Set Persian Date
  useEffect(() => {
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "long",
    };
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCurrentDate(now.toLocaleDateString("fa-IR", options));
  }, []);

  // 2. Scroll listener for compact mode
  useEffect(() => {
    const handleScroll = () => {
      setIsCompact(window.scrollY > 60);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 3. Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setIsUserMenuOpen(false);
      }
      if (
        notifRef.current &&
        !notifRef.current.contains(event.target as Node)
      ) {
        setIsNotifOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 4. Keyboard shortcut for search (⌘K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen(true);
        setTimeout(() => searchInputRef.current?.focus(), 50);
      }
      if (e.key === "Escape") {
        setIsSearchOpen(false);
        setIsUserMenuOpen(false);
        setIsNotifOpen(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // --- Handlers ---
  const handleNewProject = () => alert("✨ ایجاد پروژه جدید ...");
  const handleNewLead = () => alert("📋 ثبت لید جدید ...");
  const handleLogout = () => {
    if (confirm("آیا مطمئن هستید که می‌خواهید خارج شوید؟")) {
      alert("🚪 خروج از حساب کاربری ...");
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full bg-dark-color border-b border-white/10 shadow-xl backdrop-blur-sm transition-all duration-300 ${
        isCompact ? "py-1.5" : "py-3"
      } px-4 md:px-6 lg:px-8`}>
      <div className='mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2 md:gap-4'>
        {/* ===== LEFT: Logo and searchBar ===== */}
        <div className='flex items-center gap-3'>
          <div className='flex items-center gap-2.5 shrink-0 transition-all duration-300'>
            <div
              className={`flex items-center justify-center rounded-xl bg-linear-to-br from-[#f9b042] to-[#f58a2e] text-[#0b1a33] shadow-lg shadow-orange-500/30 transition-all duration-300 hover:scale-105 hover:shadow-orange-500/50 ${
                isCompact ? "h-8 w-8" : "h-10 w-10 md:h-11 md:w-11"
              }`}>
              <ChartLine
                className={`${isCompact ? "h-4 w-4" : "h-5 w-5 md:h-6 md:w-6"} stroke-[2.5]`}
              />
            </div>
            <div className='flex flex-col leading-tight'>
              <span
                className={`font-bold text-white transition-all duration-300 ${isCompact ? "text-xs" : "text-sm md:text-base"}`}>
                APEX <span className='text-red-color'>Workspace</span>
              </span>
              <span
                className={`font-medium uppercase tracking-wide text-white/60 transition-all duration-300 ${isCompact ? "text-[8px]" : "text-[10px] md:text-xs"}`}>
                پلتفرم مدیریت
              </span>
            </div>
          </div>

          {/* ===== Search Bar (Desktop) ===== */}
          <SearchBar />
        </div>

        {/* ===== CENTER: User + Date ===== */}
        <HeaderUserBar currentDate={currentDate} />

        {/* ===== RIGHT: Actions ===== */}
        <HeaderRightActions />
      </div>

      {/* ===== Mobile Search Overlay ===== */}
      {isSearchOpen && (
        <div className='fixed inset-0 z-60 bg-black/60 backdrop-blur-sm lg:hidden animate-in fade-in duration-200'>
          <div className='p-4'>
            <div className='relative'>
              <Search className='absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-white/40' />
              <input
                ref={searchInputRef}
                type='text'
                placeholder='جستجو...'
                className='w-full rounded-xl bg-[#1a2f4f] py-3 pr-12 text-white placeholder:text-white/30 border border-white/10 outline-none focus:border-[#f9b042]/50'
                autoFocus
              />
              <button
                onClick={() => setIsSearchOpen(false)}
                className='absolute left-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white'>
                <X className='h-5 w-5' />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
