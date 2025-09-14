import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Relaxing color palette
        sage: {
          50: '#f6f7f6',
          100: '#e3e7e3',
          200: '#c7d0c7',
          300: '#a3b1a3',
          400: '#7d8f7d',
          500: '#5f735f',
          600: '#4a5a4a',
          700: '#3d493d',
          800: '#333c33',
          900: '#2c322c',
        },
        lavender: {
          50: '#faf9fc',
          100: '#f3f1f7',
          200: '#e8e4ef',
          300: '#d6cfe2',
          400: '#bfb3d0',
          500: '#a896bc',
          600: '#937ba8',
          700: '#7d6590',
          800: '#685476',
          900: '#564661',
        },
        mint: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        }
      },
      fontFamily: {
        'sans': ['Poppins', 'system-ui', 'sans-serif'],
      },
      height: {
        '25': '6.25rem', // 100px
        '26': '6.625rem', // 106px
        '100px': '100px', // 100px
        '90px': '90px', // 90px
      },
      width: {
        '728': '45.5rem', // 728px
      }
    },
  },
  plugins: [],
};

export default config;
