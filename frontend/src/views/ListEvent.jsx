import { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { STORE } from '../store/store';
import { UserStore } from '../store/UserStore';
import { useEventSearch } from '../hooks/useEventSearch';
import { useEventStore } from '../hooks/useEventStore';
import { ItemEvent } from '../common/ItemEvent';
import { Search } from '../common/Search';

export function ListEvent() {
   const { getEventApiResponse, getCategoriesApiResponse } = useEventStore();
   const location = useLocation();
   // Inicialmente seleccionamos 'todos'
   const [selectedCategory, setSelectedCategory] = useState('todos');
   const [selectedSubcategory, setSelectedSubcategory] = useState(null);
   const { totalEvents, filterEventsBySearch, categories } = STORE();
   // Mostramos todos los eventos por defecto
   const [eventsToShow, setEventsToShow] = useState(totalEvents);
   const { searchTerm, handleSearchChange, events } = useEventSearch(
      filterEventsBySearch,
      totalEvents
   );
   // me traigo el usuario loggeado
   const { userLogged } = UserStore();

   useEffect(() => {
      // Traigo todos los eventos y categorias con sus subcategorias
      getEventApiResponse();
      getCategoriesApiResponse();
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   useEffect(() => {
      if (location.state && location.state.category) {
         const selectedCat = location.state.category.toLowerCase();
         setSelectedCategory(selectedCat);
         // Reinicia la subcategoria
         setSelectedSubcategory(null);
      } else {
         // Si no hay estado de ubicacion, seleccionamos 'todos'
         setSelectedCategory('todos');
         setSelectedSubcategory(null);
      }
   }, [location.state]);

   useEffect(() => {
      let filteredEvents = totalEvents;

      if (selectedCategory !== 'todos') {
         filteredEvents = totalEvents.filter(
            (event) =>
               event.preference.category.name.toLowerCase() ===
               selectedCategory.toLowerCase()
         );
      }

      if (selectedSubcategory) {
         filteredEvents = filteredEvents.filter(
            (event) =>
               event.preference.name.toLowerCase() === selectedSubcategory.toLowerCase()
         );
      }

      setEventsToShow(filteredEvents);
   }, [selectedCategory, selectedSubcategory, totalEvents]);

   const handleCategoryClick = (category) => {
      setSelectedCategory(category.toLowerCase());
      // Limpiar la subcategoria cuando cambia la categoria principal
      setSelectedSubcategory(null);
   };

   const handleSubcategoryClick = useCallback((subcategory) => {
      setSelectedSubcategory(subcategory.name.toLowerCase());
   }, []);

   // Filtrar eventos por la localidad del usuario, sino mostrarlos todos.
   const filteredEventsByLocation =
      userLogged && userLogged.location.city
         ? eventsToShow.filter(
              (event) =>
                 event.location.city.toLowerCase() ===
                 userLogged.location.city.toLowerCase()
           )
         : eventsToShow;

   return (
      <div className='w-full h-screen bg-whiteOpacity text-center p-4 overflow-y-auto'>
         <Search searchTerm={searchTerm} onChange={handleSearchChange} />

         <div className='w-90 mx-auto pb-3 overflow-x-auto mt-6'>
            <div className='flex'>
               <button
                  id={`categoryButton-todos`}
                  className={`w-2/5 min-w-28 font-bold text-base md:text-lg h-fit px-2 py-1 border border-VioletaClaro rounded-full mr-4 ${
                     selectedCategory === 'todos'
                        ? 'bg-Violeta text-Blanco'
                        : 'text-VioletaClaro bg-transparent'
                  }`}
                  onClick={() => handleCategoryClick('todos')}
               >
                  Todos
               </button>

               {categories?.map((category, index) => (
                  <button
                     key={index}
                     // Identificador basado en el nombre de la categoria
                     id={`categoryButton-${category.name}`}
                     className={`w-2/5 min-w-fit font-bold text-base md:text-lg h-fit px-2 py-1 border border-VioletaClaro rounded-full mr-4 ${
                        selectedCategory === category.name.toLowerCase()
                           ? 'bg-Violeta text-Blanco'
                           : 'text-VioletaClaro bg-transparent'
                     }`}
                     onClick={() => handleCategoryClick(category.name)}
                  >
                     {category.name.charAt(0).toUpperCase() + category.name.slice(1)}
                  </button>
               ))}
            </div>
         </div>

         {selectedCategory !== 'todos' && (
            <div className='w-90 mx-auto pb-3 overflow-x-auto mt-6'>
               <div className='flex'>
                  {(
                     categories?.find(
                        (cat) => cat.name.toLowerCase() === selectedCategory
                     )?.preferences || []
                  )?.map((option, index) => (
                     <button
                        key={index}
                        className={`w-2/5 min-w-fit font-bold text-base md:text-lg h-fit px-2 py-1 border border-Coral rounded-full mr-4 mb-2 ${
                           selectedSubcategory === option.name.toLowerCase()
                              ? 'bg-Coral text-Blanco'
                              : 'text-Coral bg-transparent'
                        }`}
                        onClick={() => handleSubcategoryClick(option)}
                     >
                        {option.name}
                     </button>
                  ))}
               </div>
            </div>
         )}
         <h3 className='text-Negro text-base md:text-lg text-left mt-6 pl-6 font-semibold mb-6'>
            {userLogged ? (
               <p>Eventos cerca de {userLogged.location.city}</p>
            ) : (
               <p>Todos los eventos</p>
            )}
         </h3>
         <ItemEvent array={searchTerm ? events : filteredEventsByLocation} />
      </div>
   );
}
