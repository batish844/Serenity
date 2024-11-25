/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./**/*.html",       
    "./src/**/*.{js,jsx,ts,tsx}",
    "/data.json",
  ],
    safelist: [
    'w-[199px]',
    'h-[42px]',
    'rounded-[10px]',
    'bg-[#e0c1ac]',
    'text-[#fdf8f0]',
    'z-10',
    'relative',
    'absolute',
    'mt-14'
  ],
  theme: {
    extend: {fontFamily: {
      billion: ['"The Billion"', 'serif'],
      width: {
        '161px': '161px',
        '428px': '428px',
        '429px': '429px',
        '436px': '436px',
      },
      height: {
        '42px': '42px',
        '51px': '51px',
        '123px': '123px',
        '455px': '455px',
      },
      borderRadius: {
        '10px': '10px',
        '44px': '44px',
      },
      fontSize: {
        '17px': '17px',
        '30px': '30px',
        '36px': '36px',
        '74px': '74px',
      },
      inset: {
        '46px': '46px',
        '66px': '66px',
        '83px': '83px',
        '332px': '332px',
        '365px': '365px',
        '373px': '373px',
      },
    },
  },
  },
  plugins: [],
}

