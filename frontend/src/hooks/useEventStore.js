import {
   fetchEvents,
   updateEvent as updateEventService,
   addEvent as addEventService,
   fetchCategoriesComplete,
   deleteEventByIdService
} from '../service';
import { STORE as EventStore } from '../store/store';

export function useEventStore() {
   const { totalEvents, addTotalEvents, addcategories } = EventStore();

   // para traerme los eventos de la db
   const getEventApiResponse = async () => {
      try {
         const eventApiResponse = await fetchEvents();
         addTotalEvents(eventApiResponse);
      } catch (error) {
         console.error('Error fetching events:', error);
      }
   };

   // para traerme las categorias y sub de la db
   const getCategoriesApiResponse = async () => {
      try {
         const categoriesApiResponse = await fetchCategoriesComplete();
         addcategories(categoriesApiResponse);
      } catch (error) {
         console.error('Error fetching events:', error);
      }
   };

   // elimina un evento del store por su ID
   const deleteEventById = async (eventId) => {
      const updatedEvents = totalEvents.filter((event) => event.id !== eventId);
      // Eliminar el evento de la base de datos
      await deleteEventByIdService(eventId);
      // Eliminar el evento del store
      addTotalEvents(updatedEvents);
   };

   const addEventFromForm = async (newEvent) => {
      try {
         const eventApiResponse = await addEventService(newEvent);
         console.log('Event added successfully:', eventApiResponse);
      } catch (error) {
         console.error('Error adding event:', error);
         throw error;
      }
   };

   const updateEventDetails = async (eventId, updatedEventData) => {
      try {
         await updateEventService(eventId, updatedEventData);
         // Actualizar el store local no es necesario, ya que el estado se actualiza automáticamente
      } catch (error) {
         console.error('Error updating event details:', error);
         throw error;
      }
   };

   return {
      getEventApiResponse,
      addEventFromForm,
      updateEventDetails,
      getCategoriesApiResponse,
      deleteEventById
   };
}
