import { ArrowBack } from '../common/ArrowBack';
import { UserStore } from '../store/UserStore';
import { useState, useEffect } from 'react';
import providerData from '../mocks/providerData';
import SuccessPopup from '../common/successPopup';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import registroUsuario from '../assets/img/inicio-sesion.png';

const provincias = providerData.providerStates;
const obtenerlocalidades = providerData.providerCitysN;

export function ProfileChange() {
   const { userLogged, addUserLogged } = UserStore();
   const { updateUser } = UserStore();
   const [showPopup, setShowPopup] = useState('');
   const [province, setProvince] = useState([]);
   const [localidades, setLocalidades] = useState([]);
   const [firstname, setFirstname] = useState('');
   const [lastname, setLastname] = useState('');
   const [country, setCountry] = useState(userLogged.location.country);
   const [state, setState] = useState(userLogged.location.state);
   const [city, setCity] = useState(userLogged.location.city);
   const [password, setPassword] = useState(''); // Nuevo estado para la contraseña
   const navigate = useNavigate();
   useEffect(() => {
      setProvince(provincias());
      completeCitys(state);
   }, [state]);
   function completeCitys(provincia) {
      setLocalidades(obtenerlocalidades(provincia));
   }
   useEffect(() => {
      const obtenerUsuario = async () => {
         try {
            axios
               .get('https://s14-04-m-node-react-k5y9.onrender.com/api/v1/users', {
                  params: {
                     id: userLogged.id
                  }
               })
               .then((response) => {
                  // Maneja la respuesta exitosa aquí
                  setFirstname(response.data.firstName);
                  setLastname(response.data.lastName);
                  console.log('RESPONSE', response.data);
               })
               .catch((error) => {
                  console.error('Error al obtener datos:', error);
               });
         } catch (err) {
            console.log('errors en login de usuarios Service: ', err);
         }
      };
      obtenerUsuario();
   }, [userLogged.id]);

   const handleSubmit = async (e) => {
      e.preventDefault();

      // Verificar si falta completar algun dato
      if (!firstname || !lastname || !country || !state || !city || !password) {
         // Mostrar un mensaje de error al usuario
         setShowPopup('Por favor, complete todos los campos.');
         return; // Detener el envio del formulario
      }
      const datosActualizados = {
         id: userLogged.id,
         firstName: firstname,
         lastName: lastname,
         email: userLogged.email,
         password: password,
         location: {
            country: country,
            state: state,
            city: city
         }
      };
      updateUser(datosActualizados.id, datosActualizados);

      try {
         const response = await axios.put(
            'https://s14-04-m-node-react-k5y9.onrender.com/api/v1/users',
            datosActualizados
         );
         console.log('ACA MANDO', datosActualizados);
         // Verificar si la respuesta es negativa
         if (response.status !== 200) {
            setShowPopup('Hubo un problema al guardar los cambios.');
            return; // Detener el proceso si hay un error en la respuesta del servidor
         }
         setShowPopup('Datos guardados exitosamente!');
         // console.log('DATOS DEL USERLOGED', userLogged);
         // console.log('DATOS DEL USERACTUALI', datosActualizados);
         addUserLogged({
            id: userLogged.id,
            email: userLogged.email,
            name: `${firstname} ${lastname}`, // Unir firstname y lastname con un espacio en blanco,
            location: {
               city: city,
               state: state
            }
         });
         setTimeout(() => {
            navigate('/profile');
         }, 2000);
         console.log(response);
      } catch (err) {
         console.log('errores durante la actualizacion de datos');
         setShowPopup('Hubo un problema al guardar los cambios.');
      }
   };

   return (
      <div className='grid grid-cols-1 lg:grid-cols-2 max-w-6xl mx-auto my-4'>
         <div className='hidden lg:flex flex-col items-center justify-center'>
            <img src={registroUsuario} alt='Gente' className='max-w-full lg:scale-125' />
         </div>
         <div className='max-w-md mx-auto  p-6 bg-VioletaCasiBlanco rounded-lg shadow-md lg:shadow-2xl lg:min-w-full lg:mt-20 lg:mb-12'>
            <div className='bg-VioletaCasiBlanco p-2'>
               <ArrowBack />
            </div>
            <form onSubmit={handleSubmit} className='max-w-md mx-auto'>
               <div className='mb-4'>
                  <label
                     htmlFor='firstname'
                     className='block text-gray-700 font-bold mb-2'
                  >
                     Nombre
                  </label>
                  <input
                     type='text'
                     id='firstname'
                     value={firstname}
                     onChange={(e) => setFirstname(e.target.value)}
                     className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  />
               </div>

               <div className='mb-4'>
                  <label
                     htmlFor='lastname'
                     className='block text-gray-700 font-bold mb-2'
                  >
                     Apellido
                  </label>
                  <input
                     type='text'
                     id='lastname'
                     value={lastname}
                     onChange={(e) => setLastname(e.target.value)}
                     className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  />
               </div>

               <div className='mb-4'>
                  <label htmlFor='email' className='block text-gray-700 font-bold mb-2'>
                     Email
                  </label>
                  <input
                     type='email'
                     id='email'
                     value={userLogged.email}
                     disabled
                     className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-200'
                  />
               </div>

               <div className='mb-4'>
                  <label htmlFor='pais' className='block text-gray-700 font-bold mb-2'>
                     País
                  </label>
                  <select
                     id='pais'
                     value={country}
                     onChange={(e) => setCountry(e.target.value)}
                     className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  >
                     <option value=''>Seleccionar país</option>

                     <option key='1' value='Argentina'>
                        Argentina
                     </option>
                  </select>
               </div>

               <div className='mb-4'>
                  <label htmlFor='state' className='block text-gray-700 font-bold mb-2'>
                     Provincia
                  </label>
                  <select
                     id='state'
                     value={state}
                     onChange={(e) => setState(e.target.value)}
                     className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  >
                     <option value=''>Seleccionar provincia</option>

                     {province.map((provincia) => (
                        <option key={provincia.id} value={provincia.provincia}>
                           {provincia.provincia}
                        </option>
                     ))}
                  </select>
               </div>

               <div className='mb-4'>
                  <label htmlFor='city' className='block text-gray-700 font-bold mb-2'>
                     Localidad
                  </label>
                  <select
                     id='city'
                     value={city}
                     onChange={(e) => setCity(e.target.value)}
                     className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  >
                     <option value=''>Seleccionar localidad</option>
                     {localidades.map((localidad) => (
                        <option key={localidad.id} value={localidad.city}>
                           {localidad.city}
                        </option>
                     ))}
                  </select>
               </div>

               <div className='mb-4'>
                  <label
                     htmlFor='password'
                     className='block text-gray-700 font-bold mb-2'
                  >
                     Contraseña
                  </label>
                  <input
                     type='password'
                     id='password'
                     placeholder='Escriba su contraseña'
                     onChange={(e) => setPassword(e.target.value)} // Cambiar de setLastName a setPassword
                     className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  />
               </div>

               <div className='flex items-center justify-between'>
                  <Link
                     to='/profile'
                     className='bg-Coral hover:bg-Rosa text-gray-800 py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline'
                  >
                     Salir sin guardar
                  </Link>
                  <button
                     type='submit'
                     className='bg-Coral hover:bg-Rosa active:bg-blue-800 text-white font-lato py-2 px-4 rounded-lg m-4 focus:outline-none focus:ring focus:ring-violet-300'
                  >
                     Guardar cambios
                  </button>
               </div>
               {showPopup !== '' && <SuccessPopup message={showPopup} />}
            </form>
         </div>
      </div>
   );
}
