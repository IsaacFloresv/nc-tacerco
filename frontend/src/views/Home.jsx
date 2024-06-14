import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { STORE } from '../store/store';
import { fetchCategoriesComplete } from '../service';
import { useEventStore } from '../hooks/useEventStore';
import { useEventSearch } from '../hooks/useEventSearch';
import Carrusel from '../common/Carrousel';
import CreateEventButton from '../common/CreateEventButton';
import { ItemEvent } from '../common/ItemEvent';
import { Search } from '../common/Search';
import CitySearch from '../common/CitySearch';

export function Home() {
   const { getCategoriesApiResponse } = useEventStore();
   const { totalEvents, filterEventsBySearch } = STORE();
   const navigate = useNavigate();
   const { searchTerm, handleSearchChange, events } = useEventSearch(
      filterEventsBySearch,
      totalEvents
   );
   const [categories, setCategories] = useState([]);
   const [eventsByCategory, setEventsByCategory] = useState({});
   const [filteredEvents, setFilteredEvents] = useState([]);
   const [noEventsMessage, setNoEventsMessage] = useState('');

   useEffect(() => {
      const fetchCategories = async () => {
         const categoriesData = await fetchCategoriesComplete();
         setCategories(categoriesData);
         const eventsGroupedByCategory = {};
         categoriesData.forEach((category) => {
            const categoryEvents = events.filter(
               (event) => event.preference.category.name === category.name
            );
            eventsGroupedByCategory[category.name] = categoryEvents;
         });
         setEventsByCategory(eventsGroupedByCategory);
      };
      fetchCategories();
      getCategoriesApiResponse();
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [events]);

   const handleCarouselClick = (index, category) => {
      navigate('/list', { state: { category } });
   };

   // Función para actualizar los eventos filtrados
   const updateFilteredEvents = (filteredEvents) => {
      if (filteredEvents.length === 0) {
         setNoEventsMessage('No hay eventos en esta ciudad');
      } else {
         setNoEventsMessage('');
      }
      setFilteredEvents(filteredEvents);
   };

   return (
      <div className='w-full h-4/5 overflow-y-scroll overflow-x-hidden text-center'>
         <div className='py-6 bg-VioletaCasiBlanco'>
            <Search searchTerm={searchTerm} onChange={handleSearchChange} />
         </div>
         <Carrusel
            handleCarouselClick={handleCarouselClick}
            title={'Descubre y disfruta eventos increíbles!'}
            color={'lg:bg-VioletaCasiBlanco'}
         />
         <div className='my-6 mx-3'>
            <CreateEventButton />
         </div>
         <div className='relative hidden lg:block my-6 mx-3 h-28'>
            <CitySearch updateFilteredEvents={updateFilteredEvents} />
         </div>
         <div className='my-6 overflow-x-auto whitespace-nowrap'>
            <label className='font-lato text-left text-base flex flex-row items-start pl-12 mb-4'>
               Eventos para ti
            </label>
            {noEventsMessage ? (
               <p className='text-center text-Violeta text-lg my-4 w-full pb-12'>
                  {noEventsMessage}
               </p>
            ) : (
               categories.map((category) => (
                  <div className='flex-shrink-0 mr-4 px-4 pl-8' key={category.id}>
                     <label className='font-lato text-left flex flex-row items-start pl-4 text-Gris'>
                        {category.name}
                     </label>
                     <div className='flex overflow-x-auto relative min-h-36'>
                        <ItemEvent
                           array={
                              filteredEvents.length > 0
                                 ? filteredEvents.filter(
                                      (event) =>
                                         event.preference.category.name === category.name
                                   )
                                 : eventsByCategory[category.name]
                           }
                        />
                     </div>
                  </div>
               ))
            )}
         </div>
      </div>
   );
}
