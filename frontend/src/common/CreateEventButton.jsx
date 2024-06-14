// CreateEventButton.js
import { Link } from 'react-router-dom';
import { UserStore } from '../store/UserStore';

const CreateEventButton = () => {
   const { userLogged } = UserStore();
   return (
      <div className='w-11/12 mx-auto lg:p-8 bg-Rosa rounded-2xl p-4 flex justify-center items-center'>
         <div className='text-left text-white self-end w-2/3 lg:ml-12'>
            <p className=' font-thin md:font-semibold mb-2 lg:mb-4 text-base lg:text-xl'>
               ¡Crea tu propio evento ahora!
            </p>
            <p className='hidden lg:flex text-xl font-extralight w-2/3'>
               Únete a nuestra comunidad, crea eventos únicos y contagia la
               inspiración.¡No te lo pierdas, colabora y crea con nosotros!
            </p>
         </div>
         <div className='w-1/3 lg:mr-12'>
            <Link to={userLogged ? '/create' : '/login'}>
               <button className='text-start bg-transparent hover:shadow-xl text-xs md:text-base text-Blanco border border-Blanco rounded-full py-2 lg:py-6 px-1 lg:px-6 w-fit'>
                  Crear evento
               </button>
            </Link>
         </div>
      </div>
   );
};

export default CreateEventButton;
