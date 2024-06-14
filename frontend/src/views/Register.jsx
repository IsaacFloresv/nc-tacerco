import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SuccessPopup from '../common/successPopup';
import providerData from '../mocks/providerData';
/*import {addUserFromRegister}  from '../hooks/useUserStore';*/
import { addUser as addUserService, fetchUsers } from '../service';
import registroUsuario from '../assets/img/registro-usuario.png';

const addUserFromRegister = async (newUser) => {
   try {
      const userApiResponse = await addUserService(newUser);
      console.log('User added successfully:', userApiResponse);
   } catch (error) {
      console.error('Error adding user:', error);
      throw error;
   }
};
const Register = () => {
   const [selectedCountry, setSelectedCountry] = useState('');
   const [stateOptions, setStateOptions] = useState([]);
   const [selectedState, setSelectedState] = useState('');
   const [cityOptions, setCityOptions] = useState([]);
   const [selectedCity, setSelectedCity] = useState('');
   const [selectedLocation, setSelectedLocation] = useState([]);
   const [passwordError, setPasswordError] = useState('');
   const navigate = useNavigate();
   const [errorMessage, setErrorMessage] = useState('');
   const [showConfirmationPopup, setShowConfirmationPopup] = useState(false);

   const countries = [{ id: 0, país: 'Argentina' }];
   const states = providerData.providerStates;
   const citysN = providerData.providerCitysN;

   // Configurar objeto de estado
   const [newUserData, setnewUserData] = useState({
      firstName: '',
      lastName: '',
      birthDay: '',
      email: '',
      password: '',
      confirmPassword: '',
      location: {
         country: '',
         province: '',
         city: ''
      }
   });

   useEffect(() => {
      if (selectedCountry) {
         setStateOptions(states());
      }
   }, [selectedCountry, states]);

   useEffect(() => {
      if (selectedState) {
         setCityOptions(citysN(selectedState));
      }
   }, [citysN, selectedState]);

   useEffect(() => {
      if (selectedCountry) {
         setStateOptions(states());
      }
   }, [selectedCountry, states]);

   useEffect(() => {
      if (selectedState) {
         setCityOptions(citysN(selectedState));
      }
   }, [citysN, selectedState]);

   const handleChangeCountry = (e) => {
      setSelectedCountry(e.target.value);
   };

   const handleChangeState = (e) => {
      setSelectedState(e.target.value);
   };

   const handleChangeCity = (e) => {
      setSelectedCity(e.target.value);
      setSelectedLocation({
         country: selectedCountry,
         state: selectedState,
         city: e.target.value
      });
   };

   const [showPopup, setShowPopup] = useState(false);

   const validateName = (value) => {
      // Expresión regular que verifica que el input solo contenga letras y espacios
      const regex = /^[a-zA-Z\s]*$/;

      if (!value) {
         return 'Nombre es obligatorio.';
      } else if (!regex.test(value)) {
         return 'El input solo puede contener letras y espacios.';
      } else {
         return null;
      }
   };

   const validateLastName = (value) => {
      // Expresión regular que verifica que el input solo contenga letras y espacios
      const regex = /^[a-zA-Z\s]*$/;

      if (!value) {
         return 'Apellido es obligatorio.';
      } else if (!regex.test(value)) {
         return 'El input solo puede contener letras y espacios.';
      } else {
         return null;
      }
   };

   const validateBirthDate = (birthDate) => {
      // Convierte la fecha de nacimiento a un objeto Date
      const birthDateObj = new Date(birthDate);

      // Verifica si la fecha de nacimiento es una fecha válida
      if (isNaN(birthDateObj.getTime())) {
         return 'Por favor, ingresa una fecha válida.';
      }

      // Obtiene la fecha actual
      const currentDate = new Date();

      // Calcula la edad según el año
      let age = currentDate.getFullYear() - birthDateObj.getFullYear();

      const m = currentDate.getMonth() - birthDateObj.getMonth();

      // Resta 1 a la edad si aún no llega el cumpleaños
      if (m < 0 || (m === 0 && currentDate.getDate() < birthDateObj.getDate())) {
         age--;
      }

      // Verifica si la persona es mayor de edad
      if (age < 18) {
         return 'Debes ser mayor de 18 años.';
      }

      return null;
   };
   // no funcionaba asi por lo que lo cambie
   // const validatePassword = (password, confirmPassword) => {
   //    // Aquí puedes agregar las validaciones para la contraseña
   //    console.log('contraseña = ', password, 'confirmar', confirmPassword);
   //    if (password !== confirmPassword) {
   //       return 'Las contraseñas no coinciden.';
   //    } else {
   //       return null;
   //    }
   // };

   const handleChange = (e) => {
      const { name, value } = e.target;
      // Actualiza el estado con el nuevo valor
      const cargarDato = () => {
         setnewUserData({
            ...newUserData,
            [name]: value
         });
      };

      let error = '';

      // Se usa un switch para manejar la validación de diferentes campos
      switch (name) {
         case 'firstName':
            error = validateName(value);
            break;
         case 'lastName':
            error = validateLastName(value);
            break;
         case 'birthDay':
            error = validateBirthDate(value);
            break;
         case 'password':
            error = null;
            break;
         case 'email':
            error = null;
            break;
         case 'confirmPassword':
            //David, no funcionaba la logica asi que la cambie
            // if (value !== '') {
            //    error = validatePassword(
            //       newUserData.password,
            //       newUserData.confirmPassword
            //    );
            //    console.log(error);
            // }
            error = null;
            break;
         default:
            break;
      }

      if (error === null) cargarDato();
      else alert(error);
   };
   const handleChangeConfirmPassword = (e) => {
      const { name, value } = e.target;
      setnewUserData({
         ...newUserData,
         [name]: value
      });
      if (name === 'confirmPassword') {
         setPasswordError(
            value !== newUserData.password ? 'Las contraseñas no coinciden.' : ''
         );
         return;
      }
   };

   const cleanData = () => {
      setnewUserData({
         firstName: '',
         lastName: '',
         birthDay: '',
         email: '',
         password: '',
         location: {
            country: '',
            province: '',
            city: ''
         }
      });
   };
   const handleConfirmRegistration = async () => {
      // Ocultar el popup de confirmación
      setShowConfirmationPopup(false);

      // Lógica para registrar al usuario
      try {
         // Verificar si el email ya está registrado
         const existingUsers = await fetchUsers();
         const isEmailRegistered = existingUsers.some(
            (user) => user.email === newUserData.email
         );

         if (isEmailRegistered) {
            console.log(isEmailRegistered, 'isemail');
            setErrorMessage('El email ya está registrado. Por favor, usa otro email');
            return;
         }
         const newUser = {
            firstName: newUserData.firstName,
            lastName: newUserData.lastName,
            /*birthDay: newUserData.birthDay,*/
            email: newUserData.email,
            password: newUserData.password,
            location: selectedLocation
         };
         // console.log('newUser que se enviará', newUser);
         await addUserFromRegister(newUser);
         // Mostrar un mensaje de confirmación
         cleanData(); // Limpia los datos después de confirmar el éxito
         setShowPopup(true); // Muestra el popup de éxito
         setTimeout(() => {
            navigate('/');
         }, 2000);
      } catch (error) {
         // Mostrar un mensaje con el error
         console.error('Error al registrar el usuario:', error);
      }
   };

   const handleCancelRegistration = () => {
      // Ocultar el popup de confirmación
      setShowConfirmationPopup(false);
      // Navegar de vuelta a la página principal
      navigate('/');
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      if (passwordError) {
         alert(passwordError);
         return;
      }

      // Mostrar el popup de confirmación
      setShowConfirmationPopup(true);
   };

   // para borrar la primera letra de los input nombre y apellido
   const handleBackspace = (e, fieldName) => {
      if (e.key === 'Backspace' && newUserData[fieldName].length === 1) {
         setnewUserData({
            ...newUserData,
            [fieldName]: ''
         });
      }
   };

   return (
      <div className='grid grid-cols-1 lg:grid-cols-2 max-w-6xl mx-auto my-4'>
         <div className='hidden lg:flex flex-col items-center justify-center'>
            <img src={registroUsuario} alt='Gente' className='max-w-full lg:scale-125' />
         </div>
         <div
            className='max-w-md mx-auto  p-6 bg-white rounded-lg shadow-md 
         lg:shadow-2xl lg:min-w-full lg:mt-20 lg:mb-12'
         >
            <h2 className='text-2xl mb-4 font-lato text-center'>Registro</h2>
            <form onSubmit={handleSubmit}>
               <div className='mb-4'>
                  <label
                     className='block font-lato text-gray-700 text-sm mb-2 h-3'
                     htmlFor='firstName'
                  >
                     Nombre
                  </label>
                  <input
                     id='firstName'
                     name='firstName'
                     value={newUserData.firstName}
                     onChange={handleChange}
                     onKeyDown={(e) => handleBackspace(e, 'firstName')}
                     className='h-9 w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                     maxLength='50'
                     required
                  />
               </div>
               <div className='mb-4'>
                  <label
                     className='block font-lato text-gray-700 text-sm mb-2 h-3'
                     htmlFor='lastName'
                  >
                     Apellido
                  </label>
                  <input
                     id='lastName'
                     name='lastName'
                     value={newUserData.lastName}
                     onChange={handleChange}
                     onKeyDown={(e) => handleBackspace(e, 'lastName')}
                     className='h-9 w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                     maxLength='50'
                     required
                  />
               </div>
               <div className='mb-4'>
                  <label
                     className='block text-gray-700 text-sm mb-2 h-3'
                     htmlFor='birthDay'
                  >
                     Fecha de Nacimiento
                  </label>
                  <input
                     id='birthDay'
                     type='date'
                     name='birthDay'
                     value={newUserData.birthDay}
                     onChange={handleChange}
                     className='h-9 w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                     required
                  />
               </div>

               <div className='flex flex-col mb-6'>
                  <label
                     htmlFor='country'
                     className='block text-gray-700 text-sm mb-2 h-3'
                  >
                     País
                  </label>
                  <select
                     className='h-9 text-sm placeholder-gray-500 pl-2 pr-4 rounded-md 
      border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400'
                     id='country'
                     value={selectedCountry}
                     onChange={handleChangeCountry}
                  >
                     <option value=''>Selecciona un país</option>
                     {countries.map((country) => (
                        <option key={country.id} value={country.país}>
                           {country.país}
                        </option>
                     ))}
                  </select>
                  <label
                     htmlFor='provincia'
                     className='block text-gray-700 text-sm mb-2 h-3 mt-4'
                  >
                     Provincia
                  </label>
                  <select
                     className='h-9 text-sm placeholder-gray-500 pl-2 pr-4 rounded-md 
                  border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400'
                     id='provincia'
                     value={selectedState}
                     onChange={handleChangeState}
                  >
                     <option value=''>Selecciona una provincia</option>
                     {stateOptions.map((state) => (
                        <option key={state.id} value={state.provincia}>
                           {state.provincia}
                        </option>
                     ))}
                  </select>
                  <label
                     htmlFor='ciudad'
                     className='block text-gray-700 text-sm mb-2 h-3 mt-4'
                  >
                     Ciudad
                  </label>
                  <select
                     className='h-9 text-sm placeholder-gray-500 pl-2 pr-4 rounded-md 
                  border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400'
                     id='ciudad'
                     value={selectedCity}
                     onChange={handleChangeCity}
                  >
                     <option value=''>Selecciona una ciudad</option>
                     {cityOptions.map((city) => (
                        <option key={city.id} value={city.value}>
                           {city.city}
                        </option>
                     ))}
                  </select>
               </div>
               <div className='mb-4'>
                  <label className='block text-gray-700 text-sm mb-2 h-3' htmlFor='email'>
                     Email
                  </label>
                  <input
                     id='email'
                     type='email'
                     name='email'
                     value={newUserData.email}
                     onChange={handleChange}
                     className='h-9 w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                     maxLength='50'
                     required
                  />
                  {errorMessage && (
                     <p className='text-red-500 text-sm mt-1'>{errorMessage}</p>
                  )}
               </div>
               <div className='mb-4'>
                  <label
                     className='block text-gray-700 text-sm mb-2 h-3'
                     htmlFor='password'
                  >
                     Contraseña
                  </label>
                  <input
                     id='password'
                     type='password'
                     name='password'
                     value={newUserData.password}
                     onChange={handleChange}
                     className='h-9 w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                     maxLength='50'
                     required
                  />
               </div>
               <div className='mb-4'>
                  <label
                     className='block text-gray-700 text-sm mb-2 h-3'
                     htmlFor='confirmPassword'
                  >
                     Confirmar Contraseña
                  </label>
                  <input
                     id='confirmPassword'
                     type='password'
                     name='confirmPassword'
                     value={newUserData.confirmPassword}
                     onChange={handleChangeConfirmPassword}
                     className='h-9 w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                     maxLength='50'
                     required
                  />
                  {passwordError && (
                     <p className='text-red-500 text-sm mt-1'>{passwordError}</p>
                  )}
               </div>
               <div className='mb-4 flex justify-around'>
                  <Link
                     to='/'
                     className='w-2/5 bg-white py-2 text-Rosa border-2 border-Rosa mt-3 rounded-full cursor-pointer hover:bg-Rosa hover:text-Blanco text-center flex items-center justify-center'
                  >
                     Cancelar
                  </Link>
                  <button
                     type='submit'
                     className='w-2/5  bg-Coral py-2 text-Blanco border-none mt-3 rounded-full cursor-pointer hover:bg-Rosa'
                  >
                     Registrarse
                  </button>
                  {/* {showPopup && alert('Exito')} */}
                  {showPopup && (
                     <SuccessPopup message='¡Registro exitoso! Ahora inicia sesión' />
                  )}
                  {showConfirmationPopup && (
                     <div className='fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center'>
                        <div className='bg-white p-6 rounded-lg shadow-md max-w-md'>
                           <h2 className='text-2xl mb-4 font-lato text-center'>
                              ¿Confirmas ser mayor de edad para poder registrarte?
                           </h2>
                           <div className='flex justify-center space-x-4'>
                              <button
                                 onClick={handleConfirmRegistration}
                                 className='w-2/5 bg-Coral py-2 text-Blanco border-none rounded-full cursor-pointer hover:bg-Rosa'
                              >
                                 Sí
                              </button>
                              <button
                                 onClick={handleCancelRegistration}
                                 className='w-2/5 bg-white py-2 text-Rosa border-2 border-Rosa rounded-full cursor-pointer hover:bg-Rosa hover:text-Blanco'
                              >
                                 No
                              </button>
                           </div>
                        </div>
                     </div>
                  )}
               </div>
            </form>
         </div>
      </div>
   );
};

export default Register;
