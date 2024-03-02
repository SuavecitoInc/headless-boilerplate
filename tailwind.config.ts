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
        primary: '#595db2',
        secondary: '#2F4F4F',
        tertiary: '#1a1a1a',
        body: '#1a1a1a',
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
