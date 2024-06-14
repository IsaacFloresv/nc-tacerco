import { useLocation } from 'react-router-dom';
import { ItemEvent } from '../common/ItemEvent';
import { ArrowBack } from '../common/ArrowBack';

// eslint-disable-next-line react/prop-types
export function UserEvents() {
   const location = useLocation();
   const eventsCreated = location.state.eventsCreated;

   return (
      <div className='w-full h-screen bg-VioletaCasiBlanco p-2'>
         <ArrowBack />
         <h3 className='font-lato text-center text-lg lg:text-xl py-10 text-Negro'>
            Mis eventos creados
         </h3>
         <ItemEvent array={eventsCreated} />
      </div>
   );
}
