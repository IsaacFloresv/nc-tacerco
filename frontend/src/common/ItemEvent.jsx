/* eslint-disable react/prop-types */
import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserStore } from '../store/UserStore';
import { CardEvent } from './CardEvent';
import closeIcon from '../assets/img/close.png';
import asistentes from '../assets/img/asistentesHardcode.png';
import place from '../assets/place.png';

// Importa las imagenes de las categorias para que dependiendo de la categoria que tenga el evento se le asigne la imagen correspondiente
import Image1 from '../assets/img/arte.png';
import Image2 from '../assets/img/aventuras.png';
import Image3 from '../assets/img/deporte.png';
import Image4 from '../assets/img/gastronomia.png';
import Image5 from '../assets/img/infancias.png';
import Image6 from '../assets/img/musica.png';

export function ItemEvent({ array }) {
   const [showModal, setShowModal] = useState(false);
   const [selectedEvent, setSelectedEvent] = useState(null);
   const { userLogged } = UserStore();
   const navigate = useNavigate();
   // Obtener la fecha actual
   const currentDate = new Date();

   const handleButtonClick = useCallback(
      (index) => {
         if (userLogged) {
            setSelectedEvent(array[index]);
            setShowModal(true);
         } else {
            // Si el usuario no está logueado, redirige a la página de login
            navigate('/login');
         }
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [array, userLogged]
   );
   //optimizar el manejo de eventos de cambio, tanto en handleButtonClick como en handleCloseModal, al usar useCallback y evitar que se cree una nueva funcion en cada renderizado.
   const handleCloseModal = useCallback(() => {
      setShowModal(false);
   }, []);

   // Mapea las categorias a las imagenes correspondientes
   const categoryImages = {
      Deportes: Image3,
      Gastronomia: Image4,
      Musica: Image6,
      Aventuras: Image2,
      Infancias: Image5,
      Arte: Image1
   };

   const formatDate = (dateStr) => {
      const [monthStr, dayStr] = dateStr.split('-');
      const month = parseInt(monthStr);
      const day = parseInt(dayStr);
      // Obtener el ano actual
      const year = new Date().getFullYear();

      const months = [
         'enero',
         'febrero',
         'marzo',
         'abril',
         'mayo',
         'junio',
         'julio',
         'agosto',
         'septiembre',
         'octubre',
         'noviembre',
         'diciembre'
      ];

      // Crear objeto de fecha
      const date = new Date(year, month - 1, day);
      const dayOfWeek = date.toLocaleDateString('es-ES', { weekday: 'long' });
      const monthName = months[month - 1];

      return `${dayOfWeek} ${day} de ${monthName}`;
   };

   // Filtra los eventos para mostrar solo aquellos cuya fecha de inicio es posterior a la fecha actual
   const upcomingEvents = array.filter((event) => {
      const eventDate = new Date(event.restriction.startDate);
      return eventDate > currentDate;
   });

   return (
      <section className='w-90 h-40vh  mx-auto relative grid grid-cols-1 md:grid-cols-2 gap-2 '>
         {upcomingEvents?.map((event, index) => (
            <div
               key={index}
               className='flex items-center mb-10 border-none rounded-3xl shadow-xl hover:shadow-2xl w-full lg:w-9/12 h-fit mx-auto bg-Blanco ring-gray-500 ring-opacity-50'
            >
               <img
                  // Utiliza la categoria del evento para seleccionar la imagen
                  src={categoryImages[event.preference.category.name]}
                  alt='Imagen'
                  title={event.preference.category.name}
                  className='sm:w-1/5 w-1/3  sm:max-h-24 max-w-full max-h-full object-cover p-0 overflow-hidden'
               />
               <div className='flex-1 sm:w-5/5 w-1/2 flex flex-col p-2 md:p-6 max-h-full'>
                  <div className='flex flex-col lg:flex-row items-center md:justify-between'>
                     <h2 className='m-0 text-start text-xs sm:text-sm'>
                        {event.name.charAt(0).toUpperCase() + event.name.slice(1)}
                     </h2>
                     <p className='text-Gris text-xs sm:text-sm'>
                        {formatDate(event.restriction.startDate.slice(0, -5).slice(5))}
                     </p>
                  </div>
                  <div className='m-0 text-Gris text-xs flex justify-center lg:justify-start'>
                     <img src={place} className='pr-1 w-3' />
                     <p className='text-center lg:text-start'>
                        {event.location.city} - {event.location.state}
                     </p>
                  </div>
                  <div className='hidden md:flex'>
                     <img src={asistentes} alt='Asistentes' />
                  </div>
                  <button
                     onClick={() => handleButtonClick(index)}
                     className='w-full bg-Coral text-white border-none mt-3 rounded-full cursor-pointer hover:bg-Rosa'
                  >
                     Ver evento
                  </button>
               </div>
            </div>
         ))}
         {showModal && (
            <div className='fixed top-0 left-0 w-full h-full flex justify-center items-center bg-Negro bg-opacity-50'>
               <div className='w-90 border-2 max-w-6xl bg-white rounded-lg relative h-5/6 overflow-y-scroll -mt-10'>
                  <button className='absolute top-2 right-2' onClick={handleCloseModal}>
                     <img src={closeIcon} alt='Cerrar' className='w-6 h-6' />
                  </button>
                  <CardEvent
                     onClose={() => setShowModal(false)}
                     dateComplete={formatDate(
                        selectedEvent.restriction.startDate.slice(0, -5).slice(5)
                     )}
                     image={categoryImages[selectedEvent.preference.category.name]}
                     // Pasa la imagen correspondiente como prop
                     selectedEvent={selectedEvent}
                  />
               </div>
            </div>
         )}
      </section>
   );
}
