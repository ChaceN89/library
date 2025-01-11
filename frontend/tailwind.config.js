/**
 * @file tailwind.config.js
 * @module TailwindConfiguration
 * @description Custom Tailwind CSS configuration file for the PageFlow Library application. 
 * This file defines the content paths, enables dark mode, and extends the default Tailwind CSS theme settings 
 * to include custom colors, font families, font sizes, dimensions, and other utilities.
 *
 * @configuration
 * - **Content Paths**: Specifies directories to scan for class names.
 * - **Dark Mode**: Enabled using the `class` strategy.
 * - **Theme Extensions**:
 *   - Custom colors: Adds primary, secondary, accent, and their dark mode variants.
 *   - Font families: Includes multiple font families for various text elements.
 *   - Font sizes: Adds a custom `medium` font size.
 *   - Dimensions: Extends maxHeight, minHeight, and height with custom values.
 *   - Z-Index: Adds custom layers for z-index.
 *   - Blur: Includes a custom `blur-xs` utility.
 * - **Plugins**: Adds the Tailwind aspect-ratio plugin for handling responsive aspect ratios.
 *
 * @see {@link https://tailwindcss.com/docs/configuration | Tailwind CSS Configuration Documentation}
 * 
 * @author Chace Nielson
 * @since 1.0
 * @created 2025-01-08
 * @updated 2025-01-08
 */

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],  
  darkMode: 'class', // Enable dark mode via 'class'
  theme: {
    extend: {
      colors: {
        primary: "#ffffff",
        "primary-dark": "#f0f0f0",
        secondary: "#171717",
        "secondary-dark": "#0a0a0a",
        accent: "#7F1D1D",
        "accent-dark": "#3b1010",
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