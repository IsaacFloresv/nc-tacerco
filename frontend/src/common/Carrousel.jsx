/* eslint-disable react/prop-types */
import { useRef } from 'react';
import Image1 from '../assets/img/cat-arte.png';
import Image2 from '../assets/img/cat-aventuras.png';
import Image3 from '../assets/img/cat-deporte.png';
import Image4 from '../assets/img/gastrono.png';
import Image5 from '../assets/img/cat-infancias.png';
import Image6 from '../assets/img/cat-musica.png';
// import Image7 from '../assets/img/cat-reuniones.png';

const Carrusel = ({ handleCarouselClick, title, color }) => {
   const slider = useRef();
   const images = [Image3, Image4, Image6, Image2, Image5, Image1];
   const categories = [
      'Deportes',
      'Gastronomia',
      'Musica',
      'Aventuras',
      'Infancias',
      'Arte'
   ];

   const handleClick = (index) => {
      handleCarouselClick(index, categories[index]); // Llama a la función pasada desde el componente Home
   };

   return (
      <div
         className={`mx-4 bg-transparent ${color} w-full h-2/5 md:h-3/5 overflow-x-scroll xl:overflow-hidden lg:mx-0 xl:h-72`}
      >
         <label className='font-lato font-thin text-left  p-2 lg:ml-12 flex flex-row items-start sm:text-xl lg:text-2xl'>
            {title}
         </label>
         <div
            className={`flex items-center justify-center w-full h-full bg-transparent ${color} `}
         >
            <div
               ref={slider}
               className='snap-x overflow-scroll scroll-smooth h-full flex items-center justify-start lg:justify-center xl:w-full xl:scale-150'
            >
               {images.map((image, i) => (
                  <div
                     key={i}
                     className='snap-start flex flex-shrink-0 w-1/3 xs:w-1/3 sm:w-1/4 lg:w-1/5 xl:w-1/12'
                  >
                     {/* Contenedor para cada imagen, se muestra una de cada tres */}
                     <img
                        src={image}
                        alt={`images${i}`}
                        className='object-cover object-center w-full h-auto mt-4 cursor-pointer hover:shadow hover:rounded-xl' // Tamaño de la imagen
                        onClick={() => handleClick(i)} // Maneja el click en la imagen y pasa el indice como parametro
                     />
                  </div>
               ))}
            </div>
         </div>
      </div>
   );
};

export default Carrusel;
