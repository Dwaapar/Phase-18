/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'monks-black': '#000000',
        'monks-white': '#FFFFFF',
        'monks-gray': '#525252',
        'monks-light-gray': '#F4F4F4',
        'monks-dark-gray': '#161616',
        'monks-medium-gray': '#393939',
        'monks-text-gray': '#6F6F6F',
        'monks-accent': '#0F62FE',
        'monks-hover': '#0043CE',
      },
      fontFamily: {
        'sans': ['IBM Plex Sans', 'Helvetica Neue', 'Arial', 'sans-serif'],
        'display': ['IBM Plex Sans', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      fontSize: {
        'hero': ['clamp(2.5rem, 8vw, 6rem)', { lineHeight: '1.1' }],
        'display': ['clamp(1.75rem, 5vw, 3.5rem)', { lineHeight: '1.2' }],
        'large': ['clamp(1.125rem, 3vw, 2rem)', { lineHeight: '1.3' }],
        'hero-xl': ['clamp(6rem, 15vw, 12rem)', { lineHeight: '0.8' }],
        'display-xl': ['clamp(4rem, 10vw, 8rem)', { lineHeight: '0.8' }],
        'mega': ['clamp(8rem, 20vw, 16rem)', { lineHeight: '0.7' }],
      },
      boxShadow: {
        'subtle': '0 2px 16px rgba(0,0,0,0.1)',
        'card': '0 4px 24px rgba(0,0,0,0.15)',
        'elevated': '0 8px 32px rgba(0,0,0,0.12)',
        'glow': '0 0 40px rgba(15,98,254,0.3)',
        'glow-lg': '0 0 60px rgba(15,98,254,0.4)',
        'glow-xl': '0 0 80px rgba(15,98,254,0.5)',
        'glow-2xl': '0 0 120px rgba(15,98,254,0.6)',
        'monks-shadow': '0 25px 50px -12px rgba(0,0,0,0.25)',
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out',
        'slide-up': 'slideUp 0.8s ease-out',
        'scroll': 'scroll 30s linear infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 2s infinite',
        'spin-slow': 'spin 3s linear infinite',
        'float': 'float 15s ease-in-out infinite',
        'glow-pulse': 'glowPulse 4s ease-in-out infinite',
        'float-slow': 'float-slow 20s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(180deg)' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-30px) rotate(180deg)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(15,98,254,0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(15,98,254,0.6)' },
        },
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
        '88': '22rem',
        '128': '32rem',
        '144': '36rem',
        '160': '40rem',
        '192': '48rem',
      },
      screens: {
        'xs': '475px',
        '3xl': '1600px',
        ...require('tailwindcss/defaultTheme').screens,
      },
      backdropBlur: {
        xs: '2px',
      },
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
      },
    },
  },
  plugins: [],
};