/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';

const SuccessPopup = ({ message }) => {
   const [show, setShow] = useState(false);

   useEffect(() => {
      setShow(true);
      const timer = setTimeout(() => {
         setShow(false);
      }, 2000); // Mostrar durante 2 segundos

      return () => clearTimeout(timer);
   }, []);

   return (
      <div>
         {show && (
            <div className='fixed inset-0 flex items-center justify-center'>
               <div className='py-2 px-4 rounded-md font-lato font-bold text-xl bg-VioletaCasiBlanco text-Violeta w-1/3 h-auto overflow-auto'>
                  {message}
               </div>
            </div>
         )}
      </div>
   );
};

export default SuccessPopup;
