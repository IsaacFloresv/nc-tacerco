import { Link } from 'react-router-dom';
import { FaApple, FaFacebook } from 'react-icons/fa';
// desde aca vamos a importar la funcion de inicio de sesion, para ello llamamos al hook useUserStore
// import { useUserStore } from '../hooks/useUserStore';
import axios from 'axios';
import { UserStore } from '../store/UserStore';
import { useNavigate } from 'react-router-dom';
import SuccessPopup from '../common/successPopup';
import { useState } from 'react';
import inicioSesion from '../assets/img/inicio-sesion.png';
import google from '../assets/img/google.png';

export const Login = () => {
   // y aca simplemente llamo para usar la funcion que me sirve
   // const { validationUserToLogin } = useUserStore();
   const navigate = useNavigate();
   const [message, setMessage] = useState('');
   const { addUserLogged } = UserStore();
   const handleSubmit = async (event) => {
      event.preventDefault();
      setMessage('');
      const email = event.target.email.value;
      const password = event.target.password.value;

      // try {

      try {
         axios
            .get('https://s14-04-m-node-react-k5y9.onrender.com/api/v1/login', {
               params: {
                  email: email,
                  password: password
               }
            })
            .then((response) => {
               // Maneja la respuesta exitosa aquí
               addUserLogged(response.data);
               setMessage(`Bienvenido ${response.data.name}!!`);
               setTimeout(() => {
                  navigate('/home');
               }, 2000);
            })
            .catch((error) => {
               // Maneja el error aquí
               setMessage(
                  'Usuario o contraseña incorrectos, verifíquelo y vuelva a intentar'
               );
               console.error('Error al obtener datos:', error);
            });
      } catch (err) {
         console.log('errors en login de usuarios Service: ', err);
      }
   };

   return (
      <div className='grid grid-cols-1 lg:grid-cols-2 max-w-6xl mx-auto bg-transparent'>
         {/* para pantallas grandes */}
         <div className='hidden lg:flex flex-col items-center justify-center'>
            <h1 className='text-4xl font-bold mb-4 text-Violeta m-6 font-lato'>
               Bienvenido/a!!
            </h1>
            <p className='font-lato text-Rosa text-center mt-8'>
               Descubre eventos únicos y crea
            </p>
            <p className='font-lato text-Rosa text-center mb-12'>
               recuerdos que durarán para siempre
            </p>
            <img
               src={inicioSesion}
               alt='Descripción de la imagen'
               className='max-w-full xl:scale-125'
            />
         </div>
         <div className='min-h-screen flex flex-col items-center justify-center bg-transparent lg:bg-white mt-1'>
            <div className='flex flex-col bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 rounded-3xl w-full max-w-md lg:shadow-xl lg:shadow-top lg:mt-20 lg:mb-12 lg:mr-8 lg:max-w-lg xl:max-w-xl'>
               <div className='font-medium font-lato self-center text-xl sm:text-3xl text-gray-800 pt-6'>
                  Iniciar sesión
               </div>

               <div className='mt-10'>
                  <form onSubmit={handleSubmit} action='#'>
                     <div className='flex flex-col mb-5'>
                        <label
                           htmlFor='email'
                           className='mb-1 text-xs font-lato tracking-wide text-gray-600'
                        >
                           E-Mail:
                        </label>
                        <div className='relative'>
                           <div className='inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400'>
                              <i className='fas fa-at text-blue-500'></i>
                           </div>
                           <input
                              id='email'
                              type='email'
                              name='email'
                              className='text-sm font-lato placeholder-gray-500 pl-10 pr-4 rounded-xl border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400'
                              placeholder='Enter your email'
                           />
                        </div>
                     </div>
                     <div className='flex flex-col mb-6'>
                        <label
                           htmlFor='password'
                           className='mb-1 text-xs font-lato sm:text-sm tracking-wide text-gray-600'
                        >
                           Password:
                        </label>
                        <div className='relative'>
                           <div className='inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400'>
                              <span>
                                 <i className='fas fa-lock text-blue-500'></i>
                              </span>
                           </div>
                           <input
                              id='password'
                              type='password'
                              name='password'
                              className='text-sm font-lato placeholder-gray-500 pl-10 pr-4 rounded-xl border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400'
                              placeholder='Enter your password'
                           />
                        </div>
                     </div>
                     <div className='mt-4 font-lato text-right text-sm sm:text-sm text-Rosa'>
                        Olvidaste tu contraseña?
                     </div>

                     <div className='flex w-full pt-20'>
                        <button
                           type='submit'
                           className='flex mt-2 items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-Coral hover:bg-Rosa rounded-2xl py-2 w-full transition duration-150 ease-in'
                        >
                           <span className='mr-2 font-lato'>Iniciar sesión</span>
                        </button>
                     </div>
                     <div className='mt-4 font-lato pt-20 text-center text-sm sm:text-sm text-gray-800'>
                        - O continúa con -
                     </div>
                     <div className='flex justify-center space-x-4 pt-9'>
                        <button className='rounded-full border border-blue-400 bg-pink-100 text-green-700 p-2'>
                           <img
                              src={google} // Reemplaza esta ruta con la ruta real de tu imagen
                              alt='Nuevo Icono'
                              style={{ width: '30px', height: '30px' }} // Establece el tamaño del icono según tus necesidades
                           />
                        </button>

                        <button className='rounded-full border border-blue-400 bg-pink-100 text-black p-2'>
                           <FaApple size={30} />
                        </button>
                        <button className='rounded-full border border-blue-400 bg-pink-100 text-blue-800 p-2'>
                           <FaFacebook size={30} />
                        </button>
                     </div>
                  </form>
                  <div className='flex justify-center items-center mt-6 pt-10'>
                     <Link
                        to='#'
                        className='inline-flex items-center text-gray-700 font-lato font-medium text-xs text-center'
                     ></Link>
                     <span className='text-xs ml-2 mb-10'>
                        No tienes cuenta?
                        <Link
                           to='/register'
                           className='text-xs ml-2 text-Rosa font-lato font-semibold'
                        >
                           Regístrate ahora
                        </Link>
                     </span>
                     {message && <SuccessPopup message={message} />}
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

// export default Login;
