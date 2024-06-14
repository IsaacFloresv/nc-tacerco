import { useEffect, useRef, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useNavigate } from 'react-router-dom';
import { STORE } from '../store/store';
import { UserStore } from '../store/UserStore';
import { useEventSearch } from '../hooks/useEventSearch';
import { useUserStore } from '../hooks/useUserStore';
import { Search } from '../common/Search';
import { ItemEvent } from '../common/ItemEvent';
import { Banner } from '../common/Banner';
import Carrusel from '../common/Carrousel';
import bannerHome from '../assets/img/Banner1.png';
import bannerList from '../assets/img/bannerList.png';
import bannerCreate from '../assets/img/bannerCreate.png';
import frame1 from '../assets/img/Frame1.png';
import frame2 from '../assets/img/Frame2.png';
import frame3 from '../assets/img/Frame3.png';
import frame4 from '../assets/img/Frame4.png';

export function LandingPage() {
   const { totalEvents, filterEventsBySearch } = STORE();
   const { userLogged } = UserStore();
   const { searchTerm, handleSearchChange, events } = useEventSearch(
      filterEventsBySearch,
      totalEvents
   );
   const [currentSlide, setCurrentSlide] = useState(0); // Estado para rastrear el slide actual
   const sliderRef = useRef(null);
   const navigate = useNavigate();
   const { getUserApiResponse } = useUserStore();

   useEffect(() => {
      getUserApiResponse();
   }, []);

   const dotStyle = {
      border: 'none',
      fontSize: '25px',
      cursor: 'pointer',
      marginRight: '10px'
   };

   const activeDotStyle = {
      ...dotStyle,
      color: '#FF8989'
   };

   const inactiveDotStyle = {
      ...dotStyle,
      color: '#FFD1D1'
   };

   // Render custom dots
   const renderDots = (dots) => (
      <div
         style={{
            position: 'absolute',
            bottom: '-20px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
         }}
      >
         {dots.map((dot, index) => (
            <button
               key={index}
               style={index === currentSlide ? activeDotStyle : inactiveDotStyle}
               onClick={() => {
                  setCurrentSlide(index); // Actualiza el estado cuando se hace clic en un botón de punto
                  if (sliderRef && sliderRef.current) {
                     sliderRef.current.slickGoTo(index);
                  }
               }}
            >
               ●
            </button>
         ))}
      </div>
   );

   // settings para el carousel de react
   const settings = {
      dots: true,
      infinite: true,
      speed: 700,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 5000,
      appendDots: renderDots, // Render custom dots
      beforeChange: (oldIndex, newIndex) => setCurrentSlide(newIndex)
   };

   const handleCarouselClick = (index, category) => {
      navigate('/list', { state: { buttonIndex: index, category } }); // Navega a listEvent con el indice del boton como estado
   };

   return (
      <div className='w-screen overflow-x-hidden min-h-screen flex-grow overflow-auto text-center'>
         <Slider ref={sliderRef} {...settings} className='relative'>
            <div className='mb-6'>
               <Banner
                  title={'Crea tu próxima aventura'}
                  description={
                     'Explora todas las categorías de eventos en los que puedes participar y comparte tu pasión'
                  }
                  buttonText={'¡Comienza ahora!'}
                  color={'bg-VioletaCasiBlanco'}
                  nav={'home'}
                  banner={bannerHome}
               />
            </div>
            <div className='mb-6'>
               <Banner
                  title={'Comparte lo que te gusta hacer'}
                  description={
                     'Crea eventos personalizados y haz conexiones significativas con personas que comparten tus intereses'
                  }
                  buttonText={'Crear evento'}
                  color={'bg-RosaClaro'}
                  nav={'create'}
                  banner={bannerCreate}
               />
            </div>
            <div className='mb-6'>
               <Banner
                  title={'Descubre propuestas para ti'}
                  description={
                     'Encuentra eventos únicos y crea recuerdos que durarán para siempre'
                  }
                  buttonText={'Explorar eventos'}
                  color={'bg-CoralClaro'}
                  nav={'list'}
                  banner={bannerList}
               />
            </div>
         </Slider>
         <div className='my-6'>
            <Search searchTerm={searchTerm} onChange={handleSearchChange} />
         </div>
         <div className='my-6 bg-transparent w-screen'>
            <Carrusel
               handleCarouselClick={handleCarouselClick}
               title={'Explora todas las categorías de eventos'}
               color={'lg:bg-Blanco'}
            />
         </div>
         <div className='w-screen my-6 flex flex-col py-6 items-center bg-gray-100 md:flex-row justify-center'>
            <img
               src={frame1}
               className='w-36 lg:w-40 cursor-pointer mb-8 md:mr-16 lg:mr-32'
               onClick={() => navigate('/home')}
            />
            <img
               src={frame2}
               className='w-36 lg:w-40 cursor-pointer mb-8 md:mr-16 lg:mr-32'
               onClick={() => navigate(userLogged ? '/create' : '/login')}
            />
            <img
               src={frame3}
               className='w-36 lg:w-40 cursor-pointer mb-8 md:mr-16 lg:mr-32'
               onClick={() => navigate('/list')}
            />
            <img
               src={frame4}
               className='w-36 lg:w-40 cursor-pointer '
               onClick={() => navigate(userLogged ? '/create' : '/login')}
            />
         </div>
         <label className='font-lato font-thin text-left p-2 lg:p-8 flex flex-row items-start sm:text-xl xl:text-2xl lg:ml-8'>
            Eventos para participar
         </label>
         <div className='w-screen bg-CoralClaro mt-4 p-4 rounded-xl'>
            <ItemEvent array={events} />
         </div>
      </div>
   );
}
