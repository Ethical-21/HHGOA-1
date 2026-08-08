/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        goa: {
          green: '#125A32',
          deep: '#062E1E',
          darkGreen: '#031D13',
          yellow: '#FFEA00',
          pink: '#FF008A',
          cream: '#FFFDF2',
          sand: '#F7B801',
          ink: '#0A0A0A',
        },
        hhg: {
          bg: '#08090C',
          card: '#111319',
          cardHover: '#181A22',
          border: '#22252E',
          lime: '#CCFF00',
          limeHover: '#B8E600',
          white: '#FFFFFF',
          muted: '#8E95A5',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        heading: ['"Space Grotesk"', 'sans-serif'],
        imbue: ['"Imbue"', 'serif'],
        victor: ['"Victor Mono"', 'monospace'],
        mono: ['"JetBrains Mono"', 'monospace'],
        deva: ['"Noto Sans Devanagari"', 'sans-serif'],
      },
      boxShadow: {
        'glow-lime': '0 0 25px rgba(204, 255, 0, 0.3)',
        'glow-yellow': '0 0 25px rgba(255, 234, 0, 0.3)',
        'glow-pink': '0 0 25px rgba(255, 0, 138, 0.3)',
      },
    },
  },
  plugins: [],
}
