/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.5rem",
        lg: "2.5rem",
        xl: "4rem",
      },
    },
    extend: {
      colors: {
        // 纸感底色系
        paper: {
          DEFAULT: "#F5F0E6", // 象牙白纸感底
          deep: "#EDE4D0", // 略深纸色
          warm: "#E8DFC8", // 羊皮纸米黄
          shade: "#DDD1B3", // 阴影纸色
        },
        ink: {
          DEFAULT: "#1A1614", // 深墨主文字
          soft: "#3A322B", // 柔墨
          muted: "#6B5D4F", // 暮色灰
          light: "#9A8B78", // 浅墨
        },
        gold: {
          DEFAULT: "#A8741A", // 古铜金强调
          light: "#C8962E", // 亮金
          dark: "#7C5410", // 深金
        },
        seal: {
          DEFAULT: "#8B2C2C", // 暗红印章
          dark: "#6B1F1F",
        },
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', '"Noto Serif SC"', "serif"],
        serif: ['"Lora"', '"Noto Serif SC"', "serif"],
        chinese: ['"Noto Serif SC"', "serif"],
        quote: ['"Italiana"', '"Noto Serif SC"', "serif"],
        sans: ['"Noto Sans SC"', "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-xl": ["clamp(3rem, 8vw, 6.5rem)", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "display-lg": ["clamp(2.25rem, 5vw, 4rem)", { lineHeight: "1.1", letterSpacing: "-0.01em" }],
        "display-md": ["clamp(1.75rem, 3.5vw, 2.75rem)", { lineHeight: "1.15" }],
      },
      letterSpacing: {
        widest2: "0.35em",
      },
      backgroundImage: {
        "paper-grain":
          "radial-gradient(circle at 20% 30%, rgba(168,116,26,0.04) 0%, transparent 40%), radial-gradient(circle at 80% 70%, rgba(139,44,44,0.03) 0%, transparent 45%)",
      },
      boxShadow: {
        page: "0 1px 2px rgba(26,22,20,0.04), 0 8px 24px -8px rgba(26,22,20,0.12)",
        spine: "inset -2px 0 6px rgba(0,0,0,0.25), 0 6px 20px -6px rgba(26,22,20,0.4)",
        "spine-hover": "inset -2px 0 8px rgba(0,0,0,0.3), 0 14px 36px -10px rgba(26,22,20,0.5)",
        gold: "0 0 0 1px rgba(168,116,26,0.4), 0 4px 16px -4px rgba(168,116,26,0.3)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.96)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "slide-in-right": {
          "0%": { opacity: "0", transform: "translateX(24px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "seal-stamp": {
          "0%": { opacity: "0", transform: "scale(1.4) rotate(-12deg)" },
          "60%": { opacity: "1", transform: "scale(0.94) rotate(-8deg)" },
          "100%": { opacity: "1", transform: "scale(1) rotate(-8deg)" },
        },
        "quill-sway": {
          "0%,100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        "scroll-hint": {
          "0%": { transform: "translateY(0)", opacity: "0.2" },
          "50%": { opacity: "0.7" },
          "100%": { transform: "translateY(10px)", opacity: "0.2" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s cubic-bezier(0.22,1,0.36,1) both",
        "fade-in": "fade-in 0.9s ease both",
        "scale-in": "scale-in 0.5s cubic-bezier(0.22,1,0.36,1) both",
        "slide-in-right": "slide-in-right 0.5s cubic-bezier(0.22,1,0.36,1) both",
        "seal-stamp": "seal-stamp 0.8s cubic-bezier(0.34,1.56,0.64,1) both",
        "quill-sway": "quill-sway 6s ease-in-out infinite",
        "scroll-hint": "scroll-hint 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
