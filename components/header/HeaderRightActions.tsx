"use client";

import { PlusCircle, UserPlus, Bell, LogOut } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import HeaderUserActionBtn from "./HeaderUserActionBtn";

/* ================= TYPES ================= */
type Notification = {
  id: number;
  title: string;
  time: string;
  unread: boolean;
  type: "success" | "warning" | "info";
};

/* ================= COMPONENT ================= */
export default function HeaderRightActions() {
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      title: "پروژه جدید ایجاد شد",
      time: "۲ دقیقه پیش",
      unread: true,
      type: "success",
    },
    {
      id: 2,
      title: "لید جدید ثبت شد",
      time: "۵ دقیقه پیش",
      unread: true,
      type: "info",
    },
  ]);

  const notifRef = useRef<HTMLDivElement>(null);

  /* ================= ACTIONS ================= */
  const handleNewProject = () => console.log("new project");
  const handleNewLead = () => console.log("new lead");
  const handleLogout = () => console.log("logout");

  /* ================= CLOSE HANDLERS ================= */
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (!notifRef.current?.contains(e.target as Node)) {
        setIsNotifOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  useEffect(() => {
    const esc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsNotifOpen(false);
    };
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, []);

  /* ================= FAKE REALTIME ================= */
  useEffect(() => {
    const interval = setInterval(() => {
      const newNotif: Notification = {
        id: Date.now(),
        title: "اعلان جدید 🚀",
        time: "لحظاتی پیش",
        unread: true,
        type: "info",
      };

      setNotifications((prev) => [newNotif, ...prev]);

      // 🔔 optional sound
      const audio = new Audio("/notif.mp3");
      audio.volume = 0.2;
      audio.play().catch(() => {});
    }, 20000);

    return () => clearInterval(interval);
  }, []);

  /* ================= HELPERS ================= */
  const unreadCount = notifications.filter((n) => n.unread).length;

  const getNotifColor = (type: Notification["type"]) => {
    switch (type) {
      case "success":
        return "bg-green-400";
      case "warning":
        return "bg-yellow-400";
      default:
        return "bg-[#f9b042]";
    }
  };

  /* ================= UI ================= */
  return (
    <div className='flex items-center gap-2 md:gap-3'>
      {/* 🚀 Primary */}
      <HeaderUserActionBtn
        label='پروژه جدید'
        icon={<PlusCircle className='h-4 w-4' />}
        onClick={handleNewProject}
        variant='primary'
      />

      <HeaderUserActionBtn
        label='ثبت لید'
        icon={<UserPlus className='h-4 w-4 text-red-color' />}
        onClick={handleNewLead}
        variant='secondary'
        hideLabelOnMobile
      />

      {/* 🔔 Notifications */}
      <div ref={notifRef} className='relative'>
        {/* Trigger button (unchanged) */}
        <button
          onClick={() => setIsNotifOpen(!isNotifOpen)}
          className='relative flex h-7 w-7 items-center justify-center rounded-full border border-dark-white text-white-color transition-all duration-300 hover:bg-white-color/20 hover:scale-105 md:h-9 md:w-9'
          aria-expanded={isNotifOpen}
          aria-label='اعلان‌ها'>
          <Bell className='h-4 w-4 md:h-4 md:w-4' />
          <span className='absolute -right-0.5 -top-0.5 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-red-color text-[9px] font-bold text-white shadow-lg shadow-red-500/50 border-2 border-[#0b1a33] md:h-5 md:w-5 md:text-[10px]'>
            {unreadCount}
          </span>
        </button>

        {/* Dropdown panel - fully responsive */}
        <div
          className={`fixed z-50 mt-2 rounded-xl border border-dark-white bg-dark-color backdrop-blur-xl shadow-2xl transition-all duration-200 origin-top-right left-0 right-0 mx-4 w-auto sm:left-auto sm:right-0 sm:mx-0 sm:w-80
      ${
        isNotifOpen
          ? "opacity-100 scale-100 translate-y-0"
          : "pointer-events-none opacity-0 scale-95 -translate-y-2"
      }
    `}>
          {/* Header */}
          <div className='flex items-center justify-between px-4 py-3 border-b border-dark-white/10'>
            <span className='text-sm text-white-color font-medium'>
              اعلان‌ها
            </span>
            <button
              onClick={() =>
                setNotifications((prev) =>
                  prev.map((n) => ({ ...n, unread: false })),
                )
              }
              className='text-xs text-dark-white hover:text-white-color transition-colors'>
              خواندن همه
            </button>
          </div>

          {/* List */}
          <div className='max-h-72 overflow-y-auto p-2 space-y-1'>
            {notifications.length === 0 && (
              <p className='text-center text-xs text-dark-white py-6'>
                اعلان جدیدی ندارید 🎉
              </p>
            )}

            {notifications.map((n) => (
              <div
                key={n.id}
                className={`flex items-start gap-3 rounded-lg px-3 py-2 text-sm cursor-pointer transition ${
                  n.unread
                    ? "bg-white-color/5 hover:bg-white/10"
                    : "opacity-60 hover:bg-white/5"
                }`}>
                <span
                  className={`mt-1.5 h-2.5 w-2.5 rounded-full ${getNotifColor(n.type)}`}
                />
                <div className='flex-1'>
                  <p className='text-white-color'>{n.title}</p>
                  <p className='text-[11px] text-dark-white'>{n.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* 🚪 Logout */}
      <HeaderUserActionBtn
        label='خروج'
        icon={<LogOut className='h-4 w-4 text-red-color' />}
        onClick={handleLogout}
        variant='secondary'
        hideLabelOnMobile
      />
    </div>
  );
}
