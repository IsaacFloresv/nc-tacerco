import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { UserStore } from '../store/UserStore';
import explorarInactivo from '../assets/img/ExplorarInactivo.png';
import explorarActivo from '../assets/img/ExplorarActivo.png';
import perfilInactivo from '../assets/img/perfilInactivo.png';
import perfilActivo from '../assets/img/perfilActio.png';
import crearEvento from '../assets/img/crearEvento.png';
import crearEventoHover from '../assets/img/crearEventoHover.png';
import logoLanding from '../assets/img/LogoLanding.png';
import footer from '../assets/img/footer.png';

export function Footer() {
   const navigate = useNavigate();
   const location = useLocation();
   const [isExploringActive, setIsExploringActive] = useState(false);
   const [isProfileActive, setIsProfileActive] = useState(false);
   const [isCrearEventoHovered, setIsCrearEventoHovered] = useState(false);
   const { userLogged } = UserStore();

   const handleExploringClick = () => {
      navigate('/list');
      setIsExploringActive(true);
   };

   const handleProfileClick = () => {
      if (userLogged) {
         navigate('/profile');
      } else {
         navigate('/login');
      }
      setIsProfileActive(true);
   };

   const handleCrearEventoMouseEnter = () => {
      setIsCrearEventoHovered(true);
   };

   const handleCrearEventoMouseLeave = () => {
      setIsCrearEventoHovered(false);
   };

   useEffect(() => {
      if (location.pathname !== '/list') {
         setIsExploringActive(false);
      }
      if (location.pathname !== '/profile') {
         setIsProfileActive(false);
      }
   }, [location.pathname]);

   return (
      <>
         {location.pathname === '/' ||
         location.pathname === '/home' ||
         location.pathname === '/login' ||
         location.pathname === '/register' ? (
            <div className='mt-auto mx-auto w-full'>
               <img src={logoLanding} className='m-auto w-32 mb-4' />
               <img src={footer} className='hidden w-full lg:flex' />
            </div>
         ) : (
            <div className='relative w-full h-10v bg-Blanco shadow-xl shadow-Gris text-center p-4 flex justify-around items-center border-2 lg:hidden'>
               <button
                  onClick={() => navigate(userLogged ? '/create' : '/login')}
                  className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-full'
               >
                  <img
                     src={isCrearEventoHovered ? crearEventoHover : crearEvento}
                     alt='Crear evento'
                     onMouseEnter={handleCrearEventoMouseEnter}
                     onMouseLeave={handleCrearEventoMouseLeave}
                  />
               </button>
               <button onClick={handleExploringClick}>
                  <img
                     src={isExploringActive ? explorarActivo : explorarInactivo}
                     alt='Explorar'
                  />
               </button>
               <button onClick={handleProfileClick}>
                  <img
                     src={isProfileActive ? perfilActivo : perfilInactivo}
                     alt='Perfil'
                  />
               </button>
            </div>
         )}
      </>
   );
}
