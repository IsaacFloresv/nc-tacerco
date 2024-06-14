// para crear el store
import { create } from 'zustand';
//para que los datos persistan en el localStorage ('tAcerco')
import { persist } from 'zustand/middleware';
// asegura q los datos persistan incluso despues de q el usuario cierre la app
const removeAccents = (text) => {
   return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
};
export const STORE = create(
   persist(
      (set, get) => ({
         // este seria el array con la totalidad de eventos
         totalEvents: [],
         // este seria el array con la totalidad de categorias con sus sub
         categories: [],

         // funcion para guardar todos los eventos dentro del totalEvents, cargando por primera vez lo que se encuentre en la db (o ANTES en el array falso)
         addTotalEvents: (eventsToSave) => {
            set(() => ({ totalEvents: eventsToSave }));
         },

         // funcion para guardar todas las categorias y subs
         addcategories: (categoriesToSave) => {
            set(() => ({ categories: categoriesToSave }));
         },

         //CREATE - funcion para guardar un unico evento dentro del totalEvents
         addEvent: (eventToSave) => {
            // traigo los eventos que hay en el state
            const { totalEvents } = get();
            let copyTotalEvents = [...totalEvents];
            const isArray = Array.isArray(eventToSave);
            // Dependiendo si renderiza por primera vez recibe [], o solo agrega un evento, recibe {}
            !isArray
               ? (copyTotalEvents = copyTotalEvents[copyTotalEvents.length] = eventToSave)
               : (copyTotalEvents = eventToSave);
            set(() => ({ events: copyTotalEvents }));
         },

         // funcion para buscar por tipo de evento
         searchEventsByType: (type) => {
            const { totalEvents } = get();
            return totalEvents.filter(
               (event) => event.type.toLowerCase() === type.toLowerCase()
            );
         },

         // funcion para buscar evento por input y palabras claves
         // Función de filtrado de eventos por búsqueda, ignorando los acentos
         filterEventsBySearch: (searchTerm) => {
            const { totalEvents } = get();
            const normalizedSearchTerm = removeAccents(searchTerm.toLowerCase());

            return totalEvents.filter((event) => {
               const normalizedEventName = removeAccents(event.name.toLowerCase());
               const normalizedDescription = removeAccents(
                  event.description.toLowerCase()
               );
               const normalizedCity = removeAccents(event.location.city.toLowerCase());
               const normalizedState = removeAccents(event.location.state.toLowerCase());
               const normalizedCountry = removeAccents(
                  event.location.country.toLowerCase()
               );
               const normalizedCategory = removeAccents(
                  event.preference.category.name.toLowerCase()
               );
               const normalizedSubCategory = removeAccents(
                  event.preference.name.toLowerCase()
               );
               return (
                  normalizedEventName.includes(normalizedSearchTerm) ||
                  normalizedDescription.includes(normalizedSearchTerm) ||
                  normalizedCity.includes(normalizedSearchTerm) ||
                  normalizedState.includes(normalizedSearchTerm) ||
                  normalizedCountry.includes(normalizedSearchTerm) ||
                  normalizedCategory.includes(normalizedSearchTerm) ||
                  normalizedSubCategory.includes(normalizedSearchTerm)
               );
            });
         },

         //DELETE -  funcion para eliminar un evento, para lo cual necesitamos el id del evento
         deleteEvent: (eventId) => {
            const { events } = get();
            // aca se encuentra el indice del evento a eliminar
            const eventToDelete = events.findIndex((item) => item.id === eventId);
            if (eventToDelete !== -1) {
               // si se encuentra el evento, crea una copia del array de eventos sin el evento que se elimina
               const finalEvents = [
                  ...events.slice(0, eventToDelete),
                  ...events.slice(eventToDelete + 1)
               ];
               // actualiza el estado del store con el nuevo array de eventos
               set({ events: finalEvents });
            }
         },

         //UPDATE - tampoco se si aca deberiamos agregar un updateEvents si es que tiene sentido para el tipo de proyecto y el tiempo q tenemos
         updateEvent: (eventId, updatedEventData) => {
            // trae todos los eventos
            const { events } = get();
            // encuentra el indice del evento que coincide con el id
            const eventToUpdate = events.findIndex((item) => item.id === eventId);
            if (eventToUpdate !== -1) {
               // si encuentra el evento se crea una copia del array de eventos
               const updatedEvents = [...events];
               // se actualiza los datos del evento en la copia del array
               updatedEvents[eventToUpdate] = {
                  ...updatedEvents[eventToUpdate],
                  ...updatedEventData
               };
               // se guarda el estado del store con el nuevo array de eventos
               set({ events: updatedEvents });
            }
         },

         // aca me sucede como con usuarios, no se si hay sentido de hacer un reset y eliminar todos los eventos q tenemos guardados. lo dejo como idea a debatir
         resetEvents: () => {
            set(() => ({ events: [] }));
         }
      }),
      // nombre que le damos para el localStorage
      { name: 'tAcerco' }
   )
);
