/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./script.js"],
  theme: {
    extend: {
      colors:{
        darkModeEl: 'hsl(209, 23%, 22%)',
        darkModeBg: 'var(--color-bg2)',
        LightModeText: 'var(--color-text)',
        LightModeInput: 'hsl(0, 0%, 52%)',
        LightModeBg: 'var(--color-bg)',
        pWhite: 'var(--color-highlight)'
      },
      fontFamily:{
        myFont:['Nunito Sans']
      },
      fontSize:{
        homepage:['14px'],
        detailPage:['16px']
      }
    },
  },
  plugins: [],
}

