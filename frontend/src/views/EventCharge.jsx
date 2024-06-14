/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import providerData from '../mocks/providerData';
import SuccessPopup from '../common/successPopup';
import axios from 'axios';
import nuevoEvento from '../assets/img/nuevo-evento.png';

const provincias = providerData.providerStates;
const obtenerlocalidades = providerData.providerCitysN;
import { UserStore } from '../store/UserStore';

const EventCharge = () => {
   const [province, setProvince] = useState([]);
   const [localidades, setLocalidades] = useState([]);
   const [selectedCategory, setSelectedCategory] = useState([]);
   const [selectedSubCategory, setSelectedSubCategory] = useState([]);
   const [showPopup, setShowPopup] = useState(false);
   const [errorPopup, sertErrorPopup] = useState(false);
   const navigate = useNavigate();
   const { userLogged } = UserStore();
   let isValidDate = false;
   let usuario = userLogged.id;
   const [eventData, setEventData] = useState({
      creatorId: usuario,
      name: '',
      description: '',
      address: '',
      startDate: '',
      endDate: '',
      permitChild: false,
      permitPets: false,
      preferenceId: '',
      capacity: '',
      location: {
         city: '',
         state: '',
         country: ''
      },
      isactive: true,
      date: '',
      start: '',
      end: '',
      category: ''
   });

   const handleLocationChange = (e) => {
      const { name, value } = e.target;
      setEventData((prevEventData) => ({
         ...prevEventData,
         location: {
            ...prevEventData.location,
            [name]: value
         }
      }));
   };

   const handleChange = (e) => {
      const { name, value, type, checked } = e.target;

      isValidDate = name === 'date' ? new Date(value) > new Date() : true;
      if (name === 'date') {
         if (isValidDate) {
            //si la fecha es valida
            setEventData((prevState) => ({
               ...prevState,
               date: value
            }));
         } else {
            alert('La fecha debe ser posterior al dia de hoy');
            return;
         }
      }
      if (name === 'start' || name === 'end') {
         if (name === 'start' && eventData.date !== '') {
            setEventData((prevState) => ({
               ...prevState,
               startDate: eventData.date + ' ' + value,

               start: value
            }));
         }
         if (name === 'end' && eventData.date !== '') {
            setEventData((prevState) => ({
               ...prevState,
               endDate: eventData.date + ' ' + value,
               end: value
            }));
         }
      } else {
         if (name === 'capacity') {
            const isValidNumber = /^\d*$/.test(value);
            if (isValidNumber) {
               setEventData((prevState) => ({
                  ...prevState,
                  [name]: Number(value)
               }));
            } else {
               alert('el numero debe ser positivo y sin decimales');
            }
         } else {
            if (type === 'text') {
               if (value.length < eventData[name].length) {
                  setEventData((prevState) => ({
                     ...prevState,
                     [name]: value
                  }));
               } else {
                  setEventData({ ...eventData, [name]: value });
               }
            }
            if (value !== '') {
               setEventData((prevState) => ({
                  ...prevState,
                  [name]: type === 'checkbox' ? checked : value
               }));
            }
         }
      }
   };
   const cleanData = () => {
      isValidDate = 'false';
      setEventData({
         creatorId: usuario,
         name: '',
         description: '',
         preferenceId: '',
         start: '',
         end: '',
         date: '',
         startDate: '',
         endDate: '',
         capacity: '',
         address: '',
         permitChild: false,
         permitPets: false,
         location: {
            city: '',
            state: '',
            country: ''
         }
      });
   };

   // Manejador de envío del formulario
   const handleSubmit = async (e) => {
      e.preventDefault();
      sertErrorPopup(false);
      try {
         const response = await axios.post(
            'https://s14-04-m-node-react-k5y9.onrender.com/api/v1/events',
            eventData
         );
         console.log('Solicitud POST exitosa:', response.data);
         // Aquí puedes manejar la respuesta si es necesario
         setShowPopup(true);
         cleanData();
         setTimeout(() => {
            navigate('/home');
         }, 2000);
      } catch (error) {
         console.error('Error al enviar la solicitud POST:', error);
         sertErrorPopup(true);
      }
   };
   useEffect(() => {
      setProvince(provincias());
      if (eventData.location.state !== '') completeCitys(eventData.location.state);
      else console.log('sin provincia');
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [eventData.location.state]);
   useEffect(() => {
      const obtenerCategorias = async () => {
         try {
            const { data } = await axios.get(
               `https://s14-04-m-node-react-k5y9.onrender.com/api/v1/category`
            );
            // console.log('todos las categorias:', data);
            setSelectedCategory(data);
         } catch (err) {
            console.log('errors en : ', err);
         }
      };
      obtenerCategorias();
   }, []);
   useEffect(() => {
      let numero = Number(eventData.category);
      console.log(selectedCategory);
      const getPreferenceNames = (categoryId) => {
         const category = selectedCategory.find((c) => c.id === categoryId);
         if (category) {
            // return category.preferences.map((p) => p.name);
            return category.preferences.map((p) => ({ id: p.id, name: p.name }));
         }
         return [];
      };

      setSelectedSubCategory(getPreferenceNames(numero));
   }, [eventData.category, selectedCategory]);

   function completeCitys(provincia) {
      setLocalidades(obtenerlocalidades(provincia));
   }

   return (
      <div className='grid grid-cols-1 lg:grid-cols-2 max-w-6xl mx-auto'>
         <div className='hidden lg:flex flex-col items-center justify-center'>
            <img src={nuevoEvento} alt='Gente' className='max-w-full lg:scale-125' />
         </div>
         <div
            className='max-w-md mx-auto  p-6 bg-white rounded-lg shadow-md 
         lg:shadow-2xl lg:min-w-full lg:mt-20 lg:mb-12 '
         >
            <h2 className='text-2xl mb-4 font-lato text-center'>Nuevo Evento</h2>
            <form onSubmit={handleSubmit}>
               <div className='mb-4'>
                  <label
                     className='block font-lato text-gray-700 text-sm mb-2 h-3'
                     htmlFor='name'
                  >
                     Nombre del Evento
                  </label>
                  <input
                     name='name'
                     id='name'
                     value={eventData.name}
                     onChange={handleChange}
                     className='h-9 w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                     maxLength='50'
                     rows='4'
                     required
                  />
               </div>
               <div className='mb-4'>
                  <label
                     className='block text-gray-700 text-sm mb-2 h-3'
                     htmlFor='description'
                  >
                     Descripción del Evento
                  </label>
                  <textarea
                     name='description'
                     id='description'
                     value={eventData.description}
                     onChange={handleChange}
                     className='h-24 w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                     maxLength='500'
                     rows='4'
                     required
                  />
               </div>
               <div className='flex flex-col mb-6'>
                  <label
                     htmlFor='category'
                     className='block text-gray-700 text-sm mb-2 h-3'
                  >
                     Categoría:
                  </label>
                  <select
                     id='category'
                     name='category'
                     className='h-9 text-sm placeholder-gray-500 pl-2 pr-4 rounded-md border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400'
                     onChange={handleChange}
                     // value={selectedProvincia}
                     required
                  >
                     <option value={eventData.category}>Selecciona una categoría</option>
                     {selectedCategory.map((categoria) => (
                        <option key={categoria.id} value={categoria.id}>
                           {categoria.name}
                        </option>
                     ))}
                  </select>
               </div>
               <div className='flex flex-col mb-6'>
                  <label
                     htmlFor='preferenceId'
                     className='block text-gray-700 text-sm mb-2 h-3'
                  >
                     SubCategoría:
                  </label>
                  <select
                     id='preferenceId'
                     name='preferenceId'
                     className='h-9 text-sm placeholder-gray-500 pl-2 pr-4 rounded-md border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400'
                     onChange={handleChange}
                     // value=
                     required
                     disabled={eventData.category === ''}
                  >
                     <option value={eventData.preferenceId}>
                        Selecciona una subcategoría
                     </option>
                     {selectedSubCategory.map((subCategoria) => (
                        <option key={subCategoria.id} value={subCategoria.id}>
                           {subCategoria.name}
                        </option>
                     ))}
                  </select>
               </div>
               <div className='mb-4'>
                  <label className='block text-gray-700 text-sm mb-2 h-3' htmlFor='date'>
                     Fecha del Evento
                  </label>
                  <input
                     type='date'
                     name='date'
                     id='date'
                     value={eventData.date}
                     onChange={handleChange}
                     // onBlur={handleBlur}
                     className='h-9 w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                     required
                  />
               </div>
               <div className='mb-4'>
                  <label
                     className='block text-gray-700 text-sm mb-2 h-3'
                     htmlFor='capacity'
                  >
                     Cantidad de Personas que Pueden Asistir
                  </label>
                  <input
                     type='number'
                     name='capacity'
                     id='capacity'
                     value={eventData.capacity}
                     onChange={handleChange}
                     className='h-9 w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                     required
                     pattern='\d+'
                     title='Por favor ingrese solo números enteros positivos'
                  />
               </div>

               <div className='flex flex-col mb-6'>
                  <label
                     htmlFor='country'
                     className='block text-gray-700 text-sm mb-2 h-3'
                  >
                     País:
                  </label>
                  <select
                     id='country'
                     name='country'
                     className='h-9 text-sm placeholder-gray-500 pl-2 pr-4 rounded-md border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400'
                     onChange={handleLocationChange}
                     // value=''
                     required
                  >
                     <option key='' value={eventData.country}>
                        Selecciona un país
                     </option>
                     <option key='1' value='Argentina'>
                        Argentina
                     </option>
                  </select>
               </div>
               <div className='flex flex-col mb-6'>
                  <label htmlFor='state' className='block text-gray-700 text-sm mb-2 h-3'>
                     Provincia:
                  </label>
                  <select
                     id='state'
                     name='state'
                     className='h-9 text-sm placeholder-gray-500 pl-2 pr-4 rounded-md border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400'
                     onChange={handleLocationChange}
                     // value=''
                     required
                     disabled={eventData.location.country === ''}
                  >
                     <option key='' value={eventData.location.state}>
                        Selecciona una provincia
                     </option>
                     {province.map((prov) => (
                        <option key={prov.id} value={prov.provincia}>
                           {prov.provincia}
                        </option>
                     ))}
                  </select>
               </div>
               <div className='flex flex-col mb-6'>
                  <label htmlFor='city' className='block text-gray-700 text-sm mb-2 h-3'>
                     Ciudad:
                  </label>
                  <select
                     id='city'
                     name='city'
                     className='h-9 text-sm placeholder-gray-500 pl-2 pr-4 rounded-md border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400'
                     onChange={handleLocationChange}
                     // value=''
                     required
                     disabled={eventData.location.state === ''}
                  >
                     <option key='' value=''>
                        Selecciona una ciudad
                     </option>
                     {localidades.map((localidad) => (
                        <option key={localidad.id} value={localidad.city}>
                           {localidad.city}
                        </option>
                     ))}
                  </select>
               </div>
               <div className='mb-4'>
                  <label
                     className='block text-gray-700 text-sm mb-2 h-3'
                     htmlFor='adress'
                  >
                     Dirección:
                  </label>
                  <input
                     name='address'
                     id='address'
                     value={eventData.address}
                     onChange={handleChange}
                     className='h-9 w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                     maxLength='50'
                     rows='4'
                     required
                  />
               </div>

               <div className='mb-4 flex'>
                  <div className='mr-2 w-1/2'>
                     <label
                        className='block text-gray-700 text-sm mb-2 h-3'
                        htmlFor='start'
                     >
                        Hora de Inicio
                     </label>
                     <input
                        type='time'
                        name='start'
                        id='start'
                        value={eventData.start}
                        onChange={handleChange}
                        className='h-9 w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        required
                     />
                  </div>
                  <div className='w-1/2'>
                     <label
                        className='block text-gray-700 text-sm mb-2 h-3'
                        htmlFor='end'
                     >
                        Hora de Finalización
                     </label>
                     <input
                        type='time'
                        name='end'
                        id='end'
                        value={eventData.end}
                        onChange={handleChange}
                        className='h-9 w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        required
                     />
                  </div>
               </div>
               <div className='flex columns-1 p-5'>
                  <div className='mb-4'>
                     <label className='flex items-center text-gray-700 text-sm h-3 p-3'>
                        Permiten Menores
                        <input
                           type='checkbox'
                           name='permitChild'
                           checked={eventData.permitChild}
                           onChange={handleChange}
                           className='form-checkbox h-5 w-5 ml-2 bg-VioletaClaro'
                        />
                     </label>
                  </div>
                  <div className='mb-4'>
                     <label className='flex items-center text-gray-700 text-sm h-3 p-3'>
                        Permiten Mascotas
                        <input
                           type='checkbox'
                           name='permitPets'
                           checked={eventData.permitPets}
                           onChange={handleChange}
                           className='form-checkbox h-5 w-5 ml-2 bg-VioletaClaro'
                        />
                     </label>
                  </div>
               </div>
               <div className='flex justify-between'>
                  <Link
                     to='/'
                     className='bg-pink-50 hover:bg-Coral text-gray-800 py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline'
                  >
                     Salir sin guardar
                  </Link>
                  <button
                     type='submit'
                     className='bg-Coral hover:bg-Rosa active:bg-blue-800 text-white font-lato py-2 px-4 rounded-lg focus:outline-none focus:ring focus:ring-violet-300'
                  >
                     Guardar Evento
                  </button>
                  {/* {showPopup && alert('Exito')} */}
                  {showPopup && <SuccessPopup message='¡Evento guardado exitosamente!' />}
                  {errorPopup && (
                     <SuccessPopup message='Hubo un error al intentar guardar el evento, intentelo mas tarde' />
                  )}
               </div>
            </form>
         </div>
      </div>
   );
};

export default EventCharge;
