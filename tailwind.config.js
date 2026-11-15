/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        space: {
          deep: '#02040A',
          abyss: '#050B17',
          navy: '#0A1329',
          surface: '#0E1A38',
          midnight: '#101F42',
          cyan: '#55DDF5',
          stellar: '#38BDF8',
          ice: '#A5E9F5',
          lunar: '#94A3B8',
          starlight: '#F0F6FC',
          amber: '#FF9F1C',
          solar: '#F59E0B',
          mars: '#E26D5C',
          marsRust: '#C2410C',
          nebulaViolet: '#8B5CF6',
          border: 'rgba(85, 221, 245, 0.2)',
          panel: 'rgba(7, 13, 26, 0.85)',
        }
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', 'monospace'],
        sans: ['"Inter"', 'sans-serif'],
        display: ['"Space Grotesk"', 'sans-serif'],
      },
      backgroundImage: {
        'radial-gradient': 'radial-gradient(var(--tw-gradient-stops))',
        'subtle-grid': 'radial-gradient(rgba(85, 221, 245, 0.08) 1px, transparent 1px)',
        'cosmic-gradient': 'linear-gradient(to bottom, #02040A, #060B18, #02040A)',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-slow': 'float 6s ease-in-out infinite',
        'spin-slow': 'spin 25s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        }
      }
    },
  },
  plugins: [],
}
