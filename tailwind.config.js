/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                'navbar-bg': '#181818',
                'light-green': '#41b883'
            }
        }
    },
    plugins: []
};
