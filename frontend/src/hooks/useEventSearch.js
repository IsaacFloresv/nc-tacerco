import { useState } from 'react';

export function useEventSearch(filterFunction, initialEvents) {
   const [searchTerm, setSearchTerm] = useState('');
   const initialEventsByDate = initialEvents?.sort(
      (a, b) => new Date(a.restriction.startDate) - new Date(b.restriction.startDate)
   );
   const [events, setEvents] = useState(initialEventsByDate);

   const handleSearchChange = (event) => {
      const searchTerm = event.target.value.toLowerCase();
      setSearchTerm(searchTerm);
      const filteredEvents = filterFunction(searchTerm);
      const eventsByDate = filteredEvents.sort(
         (a, b) => new Date(a.restriction.startDate) - new Date(b.restriction.startDate)
      );
      setEvents(eventsByDate);
   };

   return { searchTerm, handleSearchChange, events };
}
