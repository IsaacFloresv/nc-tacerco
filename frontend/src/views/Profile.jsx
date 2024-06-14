import { useNavigate } from 'react-router-dom';
import { UserStore } from '../store/UserStore';
import { STORE } from '../store/store';
import { ArrowBack } from '../common/ArrowBack';
import dataProfile from '../assets/img/profile.png';
import createdEvents from '../assets/img/dateActive.png';
import savedEvents from '../assets/img/tagActive.png';
import close from '../assets/img/close.png';

export function Profile() {
   const { userLogged, addUserLogged } = UserStore();
   const { totalEvents } = STORE();
   const navigate = useNavigate();
   console.log(userLogged, 'USERLOG');
   function getInitials() {
      // Dividir el nombre completo en un array de palabras
      const words = userLogged.name.split(' ');

      // Obtener la primera letra de cada palabra y convertirla a mayúscula
      const initials = words.map((word) => word.charAt(0).toUpperCase());

      // Unir las iniciales en una sola cadena de caracteres
      const initialsString = initials.join('');

      return initialsString;
   }
   const iniciales = getInitials();

   const handleCloseSession = () => {
      console.log('click', userLogged);
      addUserLogged(null);
      console.log('click2', userLogged);
      navigate('/');
   };

   const eventsCreated = totalEvents.filter((event) => event.creatorId === userLogged.id);

   const handleUserEventsClick = () => {
      navigate('/profile/userEvents', { state: { eventsCreated } });
   };

   return (
      <section className='w-full h-screen overflow-y-scroll text-center'>
         <div className='bg-VioletaCasiBlanco p-2'>
            <ArrowBack />
         </div>
         <div className='bg-VioletaCasiBlanco w-full h-72 rounded-b-3xl flex flex-col justify-center items-center'>
            <div className='bg-VioletaClaro rounded-full w-24 h-24 flex items-center justify-center mb-4'>
               <p className='text-Blanco text-4xl'>{iniciales}</p>
            </div>
            <h3 className='text-Negro text-lg font-semibold'>{userLogged?.name}</h3>
            <h3 className='text-Negro text-base font-light'>{userLogged?.email}</h3>
         </div>

         <div className='flex flex-col mt-10 px-8'>
            <div className='flex justify-start mt-4'>
               <img src={dataProfile} alt='Perfil' className='mr-4' />
               <div className='flex justify-between w-full'>
                  <a
                     className='text-base font-thin cursor-pointer hover:text-Coral'
                     onClick={() => navigate('/profile/change')}
                  >
                     Mis datos
                  </a>
                  <p> &gt; </p>
               </div>
            </div>
            <div className='flex justify-start mt-4'>
               <img src={createdEvents} alt='Eventos creados' className='mr-4' />
               <div className='flex justify-between w-full'>
                  <p
                     onClick={handleUserEventsClick}
                     className='text-base font-thin cursor-pointer hover:text-Coral'
                  >
                     Mis eventos creados
                  </p>
                  <p> &gt; </p>
               </div>
            </div>
            <div className='flex justify-start mt-4'>
               <img src={savedEvents} alt='Guardar eventos' className='mr-4' />
               <div className='flex justify-between w-full'>
                  <p className='text-base font-thin '>Mis eventos guardados</p>
                  <p> &gt; </p>
               </div>
            </div>
            <div className='flex justify-start mt-4'>
               <img src={close} alt='Cerrar' className='mr-4' />
               <p
                  onClick={() => handleCloseSession()}
                  className='text-base font-thin cursor-pointer hover:text-Coral'
               >
                  Cerrar sesión
               </p>
            </div>
         </div>
      </section>
   );
}
