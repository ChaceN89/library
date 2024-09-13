/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],  theme: {
    extend: {
      colors: {
        // background: "var(--background)",
        // foreground: "var(--foreground)",

        primary: '#B7C6C6',  // Lighter primary color
        'primary-dark': '#8A9A9A',  // Darker version of primary (closer to grayish black)
      
        secondary: '#000000',  // Black as secondary color
        'secondary-dark': '#1A1A1A',  // Darker version (slightly lighter than pure black)
      
        accent: '#F8843D',  // Lighter accent color (orange)
        'accent-dark': '#CC5500',  // Darker version of accent (deep orange)
      },
      fontFamily: {
        'open-sans': ['Open Sans', 'sans-serif'],
        'roboto': ['Roboto', 'sans-serif'],
        'lato': ['Lato', 'sans-serif'],
        'montserrat': ['Montserrat', 'sans-serif'],
        'nunito': ['Nunito', 'sans-serif'],
        'chalkduster': ['Chalkduster', 'cursive'],
        'wingdings': ['Wingdings', 'cursive'], 
        'mangold': ['Mangold', 'sans-serif'],
        'techead': ['Techead', 'sans-serif'],
        'sharung': ['Sharung', 'sans-serif'],
        'baddest': ['Baddest', 'sans-serif'],
        'mageri': ['Mageri', 'sans-serif'],
        'poppins': ['Poppins', 'sans-serif'], 
        'bebas-neue': ['Bebas Neue', 'sans-serif'], 
      },
      fontSize: {
        medium: '0.950rem',
      },
      maxHeight: {
        '102': '28rem',
        '108': '32rem',
        '111': '33rem',
        '114': '36rem',
        '120': '40rem',
        '126': '44rem',
        '132': '48rem',
        '138': '52rem',
        '144': '56rem',
        '152': '60rem',
        '158': '64rem',
        '164': '68rem',
        '170': '72rem',
        'section-height': 'calc(100lvh - 4rem)', 
        'section-height-small': 'calc(100lvh - 14rem)',
      },
      minHeight: {
        'section-height': 'calc(100lvh - 4rem)',
        'section-height-small': 'calc(100lvh - 14rem)',
        '102': '28rem',
        '108': '32rem',
        '111': '33rem',
        '114': '36rem',
        '120': '40rem',
        '126': '44rem',
        '132': '48rem',
        '138': '52rem',
        '144': '56rem',
        '152': '60rem',
        '158': '64rem',
        '164': '68rem',
        '170': '72rem',
      },
      height: {
        'section-height': 'calc(100lvh - 4rem)',
        'section-height-small': 'calc(100lvh - 14rem)',
        '102': '28rem',
        '108': '32rem',
        '111': '33rem',
        '114': '36rem',
        '120': '40rem',
        '126': '44rem',
        '132': '48rem',
        '138': '52rem',
        '144': '56rem',
        '152': '60rem',
        '158': '64rem',
        '164': '68rem',
        '170': '72rem',
      },
      zIndex: {
        '5': '5',
        '15': '15',
        '25': '25',
        '35': '35',
        '45': '45',
      },
      blur: {
        xs: '1.5px', // Add custom blur-xs utility with a value of 2px
      },
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
}