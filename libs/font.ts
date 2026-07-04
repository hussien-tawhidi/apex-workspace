import localFont from "next/font/local";

export const iranYekan = localFont({
  src: [
    {
      path: "../fonts/iranYekan/woff/iranyekanwebthinfanum.woff",
      weight: "100",
      style: "normal",
    },
    {
      path: "../fonts/iranYekan/woff/iranyekanweblightfanum.woff",
      weight: "300",
      style: "normal",
    },
    {
      path: "../fonts/iranYekan/woff/iranyekanwebregularfanum.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/iranYekan/woff/iranyekanwebmediumfanum.woff",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/iranYekan/woff/iranyekanwebboldfanum.woff",
      weight: "700",
      style: "normal",
    },
    {
      path: "../fonts/iranYekan/woff/iranyekanwebextraboldfanum.woff",
      weight: "800",
      style: "normal",
    },
    {
      path: "../fonts/iranYekan/woff/iranyekanwebblackfanum.woff",
      weight: "900",
      style: "normal",
    },
    {
      path: "../fonts/iranYekan/woff/iranyekanwebextrablackfanum.woff",
      weight: "950",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-iranyekan",
});
