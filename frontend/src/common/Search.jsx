/* eslint-disable react/prop-types */
import search from '../assets/img/search.png';

export function Search({ searchTerm, onChange }) {
   return (
      <div className='w-90 mx-auto sm:w-8/12 lg:w-2/5 relative'>
         <label className='relative'>
            <input
               type='text'
               placeholder='Buscar'
               className='w-full border border-Gris rounded-lg shadow-sm px-10 py-2 focus:outline-none focus:border-Coral'
               value={searchTerm}
               onChange={onChange}
            />
            <img
               src={search}
               alt='Search'
               className='absolute left-2 top-1/2 transform -translate-y-1/2'
            />
         </label>
      </div>
   );
}
