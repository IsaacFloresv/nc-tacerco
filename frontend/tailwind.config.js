/** @type {import('tailwindcss').Config} */
export default {
   content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
   theme: {
      extend: {
         colors: {
            Negro: '#000000',
            Gris: '#4A4A4A',
            Blanco: '#FFFFFF',
            Rosa: '#FA5DC7',
            Violeta: '#6859C6',
            Coral: '#FF8989',
            VioletaClaro: '#6859C67A',
            VioletaCasiBlanco: '#F1F0FA',
            RosaClaro: '#FDF1F9',
            CoralClaro: '#FDF1F1'
         },
         fontFamily: {
            lato: ['Lato', 'sans-serif']
         },
         height: {
            200: '200px',
            600: '600px',
            '10v': '10vh',
            '6v': '6vh',
            '84v': '84vh',
            '50v': '50vh'
         },
         width: {
            350: '350px',
            600: '600px',
            90: '90%',
            '50v': '50vw'
         },
         maxHeight: {
            100: '100vh'
         },
         maxWidth: {
            100: '100vw'
         }
      }
   },
   plugins: []
};
