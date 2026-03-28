/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
  ],
  theme: {
    extend: {
      colors: {
        bg: '#0A0A0A',
        text: '#F5F5F0',
        accent: '#F5F5F0',
        border: '#2A2A2A',
        muted: '#8A8A8A',
      },
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        body: ['DM Sans', 'Syne', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
