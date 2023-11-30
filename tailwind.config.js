/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./script.js"],
  theme: {
    extend: {
      colors:{
        darkModeEl: 'hsl(209, 23%, 22%)',
        darkModeBg: 'hsl(207, 26%, 17%)',
        LightModeText: 'hsl(200, 15%, 8%)',
        LightModeInput: 'hsl(0, 0%, 52%)',
        LightModeBg: 'hsl(0, 0%, 98%)',
        pWhite: 'hsl(0, 0%, 100%)'
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

