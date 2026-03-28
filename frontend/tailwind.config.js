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
        bg: '#FFFFFF',
        surface: '#F4F6FF',
        text: '#000000',
        accent: '#0FEFAA',
        accentAlt: '#11EDE2',
        border: '#CACADD',
        muted: '#000000',
      },
      fontFamily: {
        display: ['Sora', 'sans-serif'],
        body: ['Red Hat Text', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
