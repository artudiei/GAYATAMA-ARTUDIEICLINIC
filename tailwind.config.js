/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'xs': '480px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        theme: {
          darkMoss: '#120E0C',
          softSage: '#221B17',
          wallDark: '#1A1411',
          wallLight: '#3D2E27',
          accentGreen: '#FFB22C',
          accentGreenHover: '#FFC45E',
          accentAmber: '#FFB22C',
          accentAmberHover: '#FFC45E',
          russet: '#854836',
          russetHover: '#9F5742',
          russetDark: '#5E2F22',
          softTerracotta: '#854836',
          parchment: '#F7F7F7',
          parchmentMuted: '#D8D1C7',
          parchmentDark: '#1C1613',
          parchmentText: '#F7F7F7',
          pureBlack: '#000000'
        }
      },
      fontFamily: {
        pixel: ['"Press Start 2P"', 'monospace', 'system-ui'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace', 'ui-monospace']
      },
      boxShadow: {
        'pixel-sm': '2px 2px 0 0 rgba(0,0,0,0.6)',
        'pixel': '4px 4px 0 0 rgba(0,0,0,0.7)',
        'pixel-lg': '6px 6px 0 0 rgba(0,0,0,0.8)',
        'pixel-inset': 'inset 2px 2px 0 0 rgba(255,255,255,0.15), inset -2px -2px 0 0 rgba(0,0,0,0.5)'
      },
      height: {
        'screen-dvh': '100dvh',
      },
      maxHeight: {
        'screen-dvh': '100dvh',
      },
    },
  },
  plugins: [],
}
