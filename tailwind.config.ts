import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './styles/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#c6a85b',
        body: '#0c0c0d',
        suaveGrey: '#E5E5E5',
      },
      aspectRatio: {
        product: '5/4',
      },
      opacity: {
        hover: '.75',
      },
    },
  },
  plugins: [],
};
export default config;
