import { Swiper, SwiperSlide } from 'swiper/react';



// import required modules
import { FreeMode, Mousewheel, Navigation } from 'swiper/modules';
import { Button } from './ui/button';
import "../app/Heros.module.css"


export default function CaterogySwiper() {


    
  return (
    





      <Swiper
        direction={'horizontal'}
        slidesPerView={8}
        spaceBetween={5}
        slidesPerGroup={3}
        mousewheel={true}
        navigation={true}
        
        
        freeMode={true}
        modules={[Mousewheel,FreeMode,Navigation]}
        className=""
      >
        <SwiperSlide><Button variant="link" >Actors</Button></SwiperSlide>
        <SwiperSlide><Button variant="ghost" >Presidents</Button></SwiperSlide>
        <SwiperSlide><Button variant="premium" >Cartoons</Button></SwiperSlide>
        <SwiperSlide><Button variant="ghost" >Fictonal Characters</Button></SwiperSlide>
        <SwiperSlide><Button variant="default" >Anime</Button></SwiperSlide>
        <SwiperSlide><Button variant="ghost" >Actors</Button></SwiperSlide>
        <SwiperSlide><Button variant="outline" >Presidents</Button></SwiperSlide>
        <SwiperSlide><Button variant="ghost" >Cartoons</Button></SwiperSlide>
        <SwiperSlide><Button variant="secondary" >Fictonal Characters</Button></SwiperSlide>
        <SwiperSlide><Button variant="ghost" >Anime</Button></SwiperSlide>
        <SwiperSlide><Button variant="ghost" >Actors</Button></SwiperSlide>
        <SwiperSlide><Button variant="destructive" >Presidents</Button></SwiperSlide>
        <SwiperSlide><Button variant="ghost" >Cartoons</Button></SwiperSlide>
        <SwiperSlide><Button variant="ghost" >Fictonal Characters</Button></SwiperSlide>
        <SwiperSlide><Button variant="ghost" >Anime</Button></SwiperSlide>
    </Swiper>
  );
};
