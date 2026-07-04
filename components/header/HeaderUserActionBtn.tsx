"use client";

import { ReactNode } from "react";

type ActionButtonProps = {
  label: string;
  icon?: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary";
  hideLabelOnMobile?: boolean;
};

export default function HeaderUserActionBtn({
  label,
  icon,
  onClick,
  variant = "primary",
  hideLabelOnMobile = false,
}: ActionButtonProps) {
  const base =
    "inline-flex items-center rounded-full transition-all active:scale-95";

  const variants = {
    primary:
      "group gap-2 bg-linear-to-br from-red-color to-red-color/50 px-3.5 py-1.5 text-xs md:px-4 md:py-2 md:text-sm font-bold text-white-color shadow-lg hover:-translate-y-0.5",

    secondary:
      "gap-1.5 bg-dark-white/10 px-3 py-1.5 text-xs md:text-sm text-white-color border border-white/10 backdrop-blur-md hover:bg-white/15 hover:text-white hover:border-white/30",
  };

  return (
    <button onClick={onClick} className={`${base} ${variants[variant]}`}>
      {icon && (
        <span
          className={`flex items-center ${
            variant === "primary"
              ? "transition-transform group-hover:rotate-90"
              : ""
          }`}>
          {icon}
        </span>
      )}

      <span className={hideLabelOnMobile ? "hidden sm:inline" : ""}>
        {label}
      </span>
    </button>
  );
}
