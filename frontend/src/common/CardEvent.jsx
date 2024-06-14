/* eslint-disable react/prop-types */
import { useState } from 'react';
import { ArrowBack } from '../common/ArrowBack';
import { UserStore } from '../store/UserStore';
import { useEventStore } from '../hooks/useEventStore';
import tagActive from '../assets/img/tagActive.png';
import dateActive from '../assets/img/dateActive.png';
import timeActive from '../assets/img/timeActive.png';
import placeActive from '../assets/img/placeActive.png';
import petsAllowed from '../assets/img/petsAllowed.png';
import petsNoAllowed from '../assets/img/petsNoAllowed.png';
import childAllowed from '../assets/img/childAllowed.png';
import childNoAllowed from '../assets/img/childNoAllowed.png';
import asistentes from '../assets/img/asistentesHardcode.png';
import { useNavigate } from 'react-router-dom';
import SuccessPopup from './successPopup';

export function CardEvent({ selectedEvent, image, dateComplete, onClose }) {
   const [attendees, setAttendees] = useState(0);
   const [isAttending, setIsAttending] = useState(false);
   const { userLogged } = UserStore();
   const { deleteEventById } = useEventStore();
   const navigate = useNavigate();

   const handleDeleteEvent = async () => {
      try {
         const eventId = selectedEvent.id; // Obteniendo el ID del evento desde selectedEvent
         // Eliminar el evento del store local
         deleteEventById(eventId);
         onClose();
         navigate('/list');
      } catch (error) {
         console.error('Error al eliminar evento:', error);
      }
   };

   const handleAttend = () => {
      setAttendees((prevAttendees) => {
         if (isAttending) {
            return prevAttendees - 1; // se resta 1 al numero de asistentes (si ya estaba asistiendo)
         } else {
            return prevAttendees + 1; // Se suma 1 al numero de asistentes si no estaba asistiendo
         }
      });

      setIsAttending((prevIsAttending) => !prevIsAttending); // Cambia el estado de asistencia
   };

   return (
      <div className='w-full mx-auto bg-Blanco border-none py-4 px-6 rounded-lg shadow-md hover:shadow-xl overflow-hidden'>
         <p className='w-full flex justify-between text-Gris font-semibold text-base h-fit mt-6 mb-2'>
            <ArrowBack />
            {selectedEvent.preference.category.name}
         </p>
         <div className='flex flex-col lg:flex-row'>
            <div className='lg:mr-10'>
               <img
                  src={image}
                  alt={selectedEvent.preference.category.name}
                  className='mx-auto'
               />
            </div>
            <div>
               <div className='flex justify-between mb-4 items-center'>
                  <p className='text-Gris font-light'>
                     {' '}
                     {dateComplete} del {selectedEvent.restriction.startDate.slice(0, 4)}{' '}
                     a las {selectedEvent.restriction.startDate.slice(-5)}hs
                  </p>
                  <img
                     src={tagActive}
                     alt='Guardar'
                     className='w-auto h-4'
                     title='Guardar evento'
                  />
               </div>
               <h2 className='text-xl text-start w-full font-semibold text-Negro'>
                  {selectedEvent.name}
               </h2>
               <h3 className='w-fit text-start text-Negro text-base font-semibold h-fit mb-4'>
                  {selectedEvent.preference.name}
               </h3>
               <p className='text-Negro w-full text-start mb-4'>
                  {selectedEvent.description}
               </p>
               <div className='flex justify-between mb-1'>
                  <div className='flex text-sm text-Gris font-extralight'>
                     <strong>Asistentes: </strong>
                     <p className='text-Gris ml-1'>
                        {attendees}/{selectedEvent.restriction.capacity}
                     </p>
                     {attendees === selectedEvent.restriction.capacity && (
                        <p className=' text-red-500 ml-2'>
                           Evento completo, no se permiten más asistentes
                        </p>
                     )}
                  </div>
                  {/* <p className=''>Participantes</p> */}
                  <img src={asistentes} alt='Asistentes' />
               </div>

               <div className='-mx-6 mb-4 lg:hidden'>
                  <hr className='w-full border-t border-Gris m-0 p-0' />
               </div>

               <h2 className='text-xl text-start w-full font-semibold text-Negro mb-4'>
                  Fecha y hora
               </h2>
               <div className='flex justify-between mb-4'>
                  <div className='flex justify-around'>
                     <img src={dateActive} alt='Calendrio' className='w-5 h-5 mr-2' />
                     <p className='text-sm text-Negro'>
                        {selectedEvent.restriction.startDate.slice(0, -5)}
                     </p>
                  </div>
                  <div className='flex justify-around'>
                     <img src={timeActive} alt='Reloj' className='w-6 h-6 mr-2' />
                     <div className='flex flex-col'>
                        <p className='text-sm text-Negro text-start'>
                           Inicia: {selectedEvent.restriction.startDate.slice(10)}hs
                        </p>
                        <p className='text-sm text-Negro text-start'>
                           Finaliza: {selectedEvent.restriction.endDate.slice(10)}hs
                        </p>
                     </div>
                  </div>
               </div>

               <div className='-mx-6 mb-4'>
                  <hr className='w-full border-t border-Gris m-0 p-0 lg:hidden' />
               </div>

               <h2 className='text-xl text-start w-full font-semibold text-Negro mb-4'>
                  Ubicación
               </h2>
               <div className='flex justify-around mb-4 items-center'>
                  <img src={placeActive} alt='Ubicación' className='w-4 h-auto mr-2' />
                  <p className='text-sm text-Negro'>
                     {selectedEvent.address} - {selectedEvent.location.city} -{' '}
                     {selectedEvent.location.state} - Argentina
                  </p>
               </div>

               <div className='-mx-6 mb-4'>
                  <hr className='w-full border-t border-Gris m-0 p-0 lg:hidden' />
               </div>

               <h2 className='text-xl text-start w-full font-semibold text-Negro mb-4'>
                  A tener en cuenta
               </h2>
               <div className='flex justify-between'>
                  <div className='flex justify-around w-1/3'>
                     {selectedEvent.restriction.permitChild === true ? (
                        <>
                           <img
                              src={childAllowed}
                              alt='Se permiten menores'
                              className='w-auto h-7 mr-2'
                           />
                           <p className='text-sm text-Violeta font-thin'>
                              Apto para asistir con niños/as
                           </p>
                        </>
                     ) : (
                        <>
                           <img
                              src={childNoAllowed}
                              alt='Se permiten menores'
                              className='w-auto h-7 mr-2'
                           />
                           <p className='text-sm text-Violeta font-thin'>
                              No apto para asistir con niños/as
                           </p>
                        </>
                     )}
                  </div>
                  <div className='flex justify-around w-1/3'>
                     {selectedEvent.restriction.permitPets === true ? (
                        <>
                           <img
                              src={petsAllowed}
                              alt='Se permiten mascotas'
                              className='w-auto h-7 mr-2'
                           />
                           <p className='text-sm text-Violeta font-thin'>
                              Apto para asistir con mascotas
                           </p>
                        </>
                     ) : (
                        <>
                           <img
                              src={petsNoAllowed}
                              alt='No se permiten mascotas'
                              className='w-auto h-7 mr-2'
                           />
                           <p className='text-sm text-Violeta font-thin'>
                              No apto para asistir con mascotas
                           </p>
                        </>
                     )}
                  </div>
               </div>
            </div>
         </div>

         <div className='flex justify-end p-2 mt-10 mb-2'>
            {attendees === selectedEvent.restriction.capacity ? (
               <button
                  className='bg-Gris text-Blanco font-semibold px-2 py-1 rounded-full w-90'
                  onClick={handleAttend}
               >
                  Cancelar asistencia
               </button>
            ) : (
               <button
                  className={`bg-${isAttending ? 'Rosa' : 'Coral'} hover:bg-${
                     isAttending ? 'Coral' : 'Rosa'
                  } text-Blanco font-semibold px-2 py-1 rounded-full focus:outline-none focus:shadow-outline mx-auto w-90`}
                  onClick={handleAttend}
                  disabled={
                     attendees >= selectedEvent.personLimit ||
                     (isAttending && attendees <= 0)
                  }
               >
                  {isAttending ? 'No asistir' : 'Asistir a evento'}

                  {isAttending && (
                     <SuccessPopup message='Vas a asistir al evento! 🎉😊' />
                  )}
               </button>
            )}

            {userLogged && userLogged.id === selectedEvent.creatorId ? (
               <button
                  onClick={handleDeleteEvent}
                  className='bg-VioletaClaro hover:bg-Violeta text-Blanco font-semibold px-2 py-1 rounded-full focus:outline-none focus:shadow-outline mx-auto w-90 ml-1'
               >
                  Eliminar evento
               </button>
            ) : (
               <></>
            )}
         </div>
      </div>
   );
}
