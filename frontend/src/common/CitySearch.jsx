import { useState, useEffect } from 'react';
import providerData from '../mocks/providerData';
const provincias = providerData.providerStates;
const obtenerlocalidades = providerData.providerCitysN;
import { STORE } from '../store/store';
import logo from '../assets/img/placeActive.png';
// eslint-disable-next-line react/prop-types
export default function CitySearch({ updateFilteredEvents }) {
   const { totalEvents } = STORE();

   // eslint-disable-next-line no-unused-vars

   // const [eventsToShow, setEventsToShow] = useState(totalEvents);
   const [province, setProvince] = useState([]);
   const [localidad, setLocalidad] = useState([]);
   const [selectData, setSelectData] = useState({
      country: '',
      state: '',
      city: ''
   });

   useEffect(() => {
      setProvince(provincias());
      if (province !== '') completeCitys(selectData.state);
      else console.log('sin provincia');
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [selectData.state]);

   useEffect(() => {
      console.log('city en useEffect', selectData.city);
      // setEventsToShow(totalEvents);
      console.log('total de eventos ', totalEvents);
      if (selectData.city !== '') {
         const eventoFiltrado = totalEvents.filter(
            (evento) =>
               // console.log(evento)
               evento.location.city.toLowerCase() === selectData.city.toLowerCase()
         );

         console.log('eventos filtrados', eventoFiltrado);
         // setEventsToShow(() => eventoFiltrado);
         updateFilteredEvents(eventoFiltrado); // Aquí actualizamos los eventos filtrados en Home
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [selectData.city, totalEvents]);

   function completeCitys(provincia) {
      setLocalidad(obtenerlocalidades(provincia));
   }
   const handleChange = (e) => {
      const { name, value } = e.target;
      setSelectData((prevState) => ({
         ...prevState,
         [name]: value
      }));
   };

   return (
      <div
         className='w-11/12 mx-auto lg:bg-transparent lg:h-20 
      xl:h-3/4 flex row-span-3 rounded-2xl'
      >
         <img src={logo} alt='logo ubicacion' className='w-auto h-8 my-auto mx-3' />
         <div className='flex flex-row mb-3 mr-0'>
            <select
               id='country'
               name='country'
               className='h-10 font-lato text-m mr-0 mt-5 placeholder-transparent pl-1 pr-2 rounded-md border-none bg-transparent text-Violeta w-fit py-2 focus:outline-none focus:border-Violeta'
               onChange={handleChange}
            >
               <option key='' value='' className='text-Violeta'>
                  Selecciona un país
               </option>
               <option key='1' value='1' className='text-Violeta'>
                  Argentina
               </option>
            </select>
         </div>
         <div className='flex flex-row mb-3 mx-0'>
            <select
               id='state'
               name='state'
               className='h-10 font-lato text-s mr-0 mt-5 placeholder-transparent pl-1 pr-2 rounded-md text-Violeta bg-transparent border-none w-fit py-2 focus:outline-none focus:border-Violeta'
               onChange={handleChange}
               disabled={selectData.country === ''}
            >
               <option key='' value='' className='text-Violeta'>
                  Selecciona una provincia
               </option>
               {province.map((provincia) => (
                  <option key={provincia.id} value={provincia.provincia}>
                     {provincia.provincia}
                  </option>
               ))}
            </select>
         </div>
         <div className='flex flex-row mb-3 mr-2'>
            <select
               id='city'
               name='city'
               className='h-10 font-lato text-m mr-0 mt-5 placeholder-transparent bg-transparent text-Violeta pl-1 pr-2 rounded-md border-none w-fit py-2 focus:outline-none focus:border-Violeta'
               onChange={handleChange}
               disabled={selectData.state === ''}
            >
               <option key='' value='' className=''>
                  Selecciona una ciudad
               </option>
               {localidad.map((localidad) => (
                  <option key={localidad.id} value={localidad.city}>
                     {localidad.city}
                  </option>
               ))}
            </select>
         </div>
      </div>
   );
}
