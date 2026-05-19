/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        /* ── Pure white surfaces ── */
        slate: {
          DEFAULT: "#ffffff",
          deep:    "#f4f4f2",
          soft:    "#fafafa"
        },
        /* ── Dark text ── */
        pearl: {
          DEFAULT: "#1a1a18",
          soft:    "#3a3a36",
          warm:    "#6b6b64"
        },
        /* ── Amber-yellow primary ── */
        gold: {
          DEFAULT: "#f59e0b",
          dark:    "#d97706",
          light:   "#fcd34d",
          glow:    "#fef3c7"
        },
        /* ── Red + light-green ── */
        ember: {
          DEFAULT: "#ef4444",
          dark:    "#b91c1c",
          light:   "#86efac",
          green:   "#22c55e"
        }
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Playfair Display", "ui-serif", "serif"],
        sans:  ["var(--font-inter)", "Inter", "ui-sans-serif", "system-ui", "sans-serif"]
      },
      letterSpacing: {
        widest: ".2em",
        ultra:  ".35em"
      },
      animation: {
        "slow-zoom": "slowZoom 22s ease-in-out infinite alternate",
        "shimmer":   "shimmer 4s linear infinite",
        "float":     "float 4s ease-in-out infinite"
      },
      keyframes: {
        slowZoom: {
          "0%":   { transform: "scale(1)" },
          "100%": { transform: "scale(1.18)" }
        },
        shimmer: {
          "0%":   { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" }
        },
        float: {
          "0%,100%": { transform: "translateY(0px)" },
          "50%":     { transform: "translateY(-8px)" }
        }
      }
    }
  },
  plugins: []
};
