module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ['Montserrat', 'sans-serif'],
      serif: ['Montserrat', 'serif'],
    },
    container: {
      center: true,
      padding: '1rem',
    },
    extend: {
      colors: {
        'pal-black': process.env.NEXT_PUBLIC_PALETTE_BLACK,
        'pal-white': process.env.NEXT_PUBLIC_PALETTE_WHITE,
        'pal-darkest': process.env.NEXT_PUBLIC_PALETTE_DARKEST,
        'pal-darker': process.env.NEXT_PUBLIC_PALETTE_DARKER,
        'pal-primary': process.env.NEXT_PUBLIC_PALETTE_PRIMARY,
        'pal-lighter': process.env.NEXT_PUBLIC_PALETTE_LIGHTER,
        'pal-lightest': process.env.NEXT_PUBLIC_PALETTE_LIGHTEST,
      },
      minHeight: {
        'screen-no-nav': 'calc(100vh - 4rem)',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
