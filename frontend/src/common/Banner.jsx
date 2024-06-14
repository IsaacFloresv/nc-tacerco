/* eslint-disable react/prop-types */
import { useNavigate } from 'react-router-dom';
import { UserStore } from '../store/UserStore';

export function Banner({ title, description, buttonText, color, nav, banner }) {
   const navigate = useNavigate();
   const { userLogged } = UserStore();
   return (
      <section
         className={`w-screen h-72 py-7 px-6 ${color} flex items-start lg: justify-around`}
      >
         <div className='hidden md:block mr-4 my-auto'>
            <img src={banner} alt='Banner' className='w-64 h-auto' />
         </div>
         <div className='flex flex-col md:flex-row md:items-center'>
            <div>
               <h2 className='mb-8 md:mb-10 text-3xl lg:text-5xl text-start text-Violeta font-bold'>
                  {title}
               </h2>
               <p className='mb-6 md:mb-10 text-start text-base lg:text-xl text-Violeta lg:w-9/12'>
                  {description}
               </p>
               <button
                  onClick={() =>
                     navigate(
                        userLogged || nav === 'home' || nav === 'list'
                           ? `/${nav}`
                           : '/login'
                     )
                  }
                  className='self-center p-2 bg-Rosa text-Blanco hover:bg-Coral rounded-full w-60 text-base lg:text-xl'
               >
                  {buttonText}
               </button>
            </div>
         </div>
      </section>
   );
}
