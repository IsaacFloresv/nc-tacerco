import { useNavigate } from 'react-router-dom';
import arrowBack from '../assets/img/arrowBack.png';

export function ArrowBack() {
   const navigate = useNavigate();

   const handleGoBack = () => {
      navigate(-1);
   };

   return (
      <img
         className='cursor-pointer'
         src={arrowBack}
         alt='Flecha para ir a la anterior vista'
         onClick={handleGoBack}
      />
   );
}
