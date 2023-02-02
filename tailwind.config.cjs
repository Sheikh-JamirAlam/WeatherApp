/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'josefin': ['Josefin Sans', 'system-ui'],
      },
      backgroundImage: {
        'thunderstorm': "url('./assets/thunderstorm.jpg')",
        'haze': "url('./assets/haze.jpg')",
        'drizzle': "url('./assets/drizzle.jpg')",
        'rain': "url('./assets/rain.jpg')",
        'snow': "url('./assets/snow.jpg')",
        'clouds': "url('./assets/clouds.jpg')",
        'clear': "url('./assets/clear.jpg')",
      },
      colors: {
        card: 'rgba(17, 25, 40, 0.25)',
        fadedborder: 'rgba(31, 41, 55, 0.25)'
      },
      boxShadow: {
        'card': '0px 0px 20px 3px rgba(0,0,0,0.5)',
      },
      spacing: {
        '128': '32rem',
      }
    }
  },
  plugins: []
}
