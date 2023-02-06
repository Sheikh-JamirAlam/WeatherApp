/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/*.{js,ts,jsx,tsx}",
    "./src/components/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'josefin': ['Josefin Sans', 'system-ui'],
      },
      colors: {
        card: 'rgba(17, 25, 40, 0.25)',
        fadedborder: 'rgba(31, 41, 55, 0.25)'
      },
      boxShadow: {
        'card': '0px 0px 20px 3px rgba(0,0,0,0.5)',
      },
      spacing: {
        '102': '26rem',
        '128': '32rem'
      },
      keyframes: {
        expand: {
          "100%": {
            "width": "32rem",
            "border-radius": "0.75rem"
          }
        },
        expand_mobile: {
          "100%": {
            "width": "18rem",
            "border-radius": "0.75rem"
          }
        }
      },
      animation: {
        expand: "expand 150ms ease forwards",
        expand_mobile: "expand_mobile 150ms ease forwards"
      }
    }
  },
  plugins: []
}
