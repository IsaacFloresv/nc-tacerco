import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
// Importa el UserStore
import { UserStore } from '../store/UserStore';
import logo from '../assets/img/iconoT.png';
import logoT from '../assets/img/LogoLanding.png';

export function Navbar() {
   const navigate = useNavigate();
   const location = useLocation();
   // Obtener el estado del usuario logueado desde el UserStore
   const { userLogged } = UserStore();

   // Funcion para determinar si la ruta actual coincide con la ruta dada
   const isRouteActive = (route) => location.pathname === route;

   return (
      <div className='flex items-center w-full max-w-screen h-10v justify-between py-2 px-8 shadow-md'>
         <div>
            <img
               className='cursor-pointer hidden md:block w-20 lg:w-36 h-auto'
               src={logoT}
               alt='Icono/logo de T Acerco'
               onClick={() => navigate('/home')}
            />
            <img
               className='cursor-pointer md:hidden'
               src={logo}
               alt='Icono/logo de T Acerco'
               onClick={() => navigate('/home')}
            />
         </div>
         <div className='hidden md:block'>
            <button
               className={`self-center md:text-base text-lg border-none py-2 px-4 rounded-full  lg:mr-8 ${
                  isRouteActive('/profile')
                     ? 'bg-Violeta text-Blanco'
                     : 'text-Violeta hover:bg-Violeta hover:text-Blanco'
               }`}
               onClick={() => navigate(userLogged ? '/profile' : '/login')}
            >
               Perfil
            </button>
            <button
               className={`self-center md:text-base text-lg border-none py-2 px-4 rounded-full lg:mr-8 ${
                  isRouteActive('/list')
                     ? 'bg-Violeta text-Blanco'
                     : 'text-Violeta hover:bg-Violeta hover:text-Blanco'
               }`}
               onClick={() => navigate('/list')}
            >
               Explorar eventos
            </button>
            <button
               className={`self-center md:text-base text-lg border-none py-2 px-4 rounded-full  ${
                  isRouteActive('/create')
                     ? 'bg-Violeta text-Blanco'
                     : 'text-Violeta hover:bg-Violeta hover:text-Blanco'
               }`}
               onClick={() => navigate(userLogged ? '/create' : '/login')}
            >
               Crear evento
            </button>
         </div>
         <div className='flex'>
            {userLogged ? (
               <button
                  className='self-center md:text-base text-lg text-Violeta border-none hover:text-VioletaClaro'
                  onClick={() => navigate('/profile')}
               >
                  ¡Hola{' '}
                  <span style={{ textDecoration: 'underline' }}>
                     {userLogged.name && userLogged.name.split(' ')[0]}
                  </span>
                  !
               </button>
            ) : (
               <>
                  <button
                     className={`self-center text-xs md:text-base lg:text-lg border-none py-2 px-4 rounded-full mr-8 ${
                        isRouteActive('/register')
                           ? 'bg-Violeta text-Blanco'
                           : 'text-Violeta hover:bg-Violeta hover:text-Blanco'
                     }`}
                     onClick={() => navigate('/register')}
                  >
                     Registrarse
                  </button>
                  <button
                     className={`self-center  text-xs md:text-base lg:text-lg border-none py-2 px-4 rounded-full mr-8 ${
                        isRouteActive('/login')
                           ? 'bg-Violeta text-Blanco'
                           : 'text-Violeta hover:bg-Violeta hover:text-Blanco'
                     }`}
                     onClick={() => navigate('/login')}
                  >
                     Iniciar sesión
                  </button>
               </>
            )}
         </div>
      </div>
   );
}
