/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                'light-green': '#41b883',
                'dark-green': '#00bd7e',
                'font-color': '#d1d4da'
            }
        }
    },
    plugins: []
};
