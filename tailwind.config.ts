import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        'sm': '768px', // Tablets
        'xl': '1280px', // 1280px wide desktops
        '2xl': '1440px', // 1440px wide desktops
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        denk: ['Denk One', 'sans-serif'],
      },
      height: {
        'screen-minus-20': 'calc(100vh - 240px)',
        'screen-minus-10': 'calc(100vh - 225px)',
        // 'screen-minus-30': 'calc(100vh - 135px)',
      },
    },
  },
  plugins: [],
};

export default config;
