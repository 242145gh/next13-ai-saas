import React, { useState, ReactElement, JSXElementConstructor } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { FreeMode, Mousewheel, Navigation } from 'swiper/modules';
import { MessageCircleIcon } from 'lucide-react';
import Heros from './hero';
import { Button } from '@/components/ui/button';
import Select from 'react-select';
import { Input } from '@/components/ui/input';
import TypewriterComponent from 'typewriter-effect';

interface HeroProps {
  children: ReactElement<HeroProps, string | JSXElementConstructor<any>>;
  key: string;
  icon: ReactElement;
  image: string;
  name: string;
  url: string;
  description: string;
  category: string;
}

export default function HeroSwiper() {
  const [searchName, setSearchName] = useState('');
  const [searchCategory, setSearchCategory] = useState('');

  const handleSearch = () => {
    // Filter your slides based on searchName and searchCategory here
    const filteredSlides = slides.filter(
      (slide) =>
        (slide.props.children as ReactElement<HeroProps>).props.name
          .toLowerCase()
          .includes(searchName.toLowerCase()) &&
        (searchCategory === '' ||
          (slide.props.children as ReactElement<HeroProps>).props.category ===
            searchCategory)
    );

    return filteredSlides;
  };

  const categoryButtons = [
    { label: 'All', variant: 'premium', category: '' },
    { label: 'Actors', variant: 'secondary', category: 'actor' },
    { label: 'Presidents', variant: 'secondary', category: 'president' },
    { label: 'Cartoons', variant: 'secondary', category: 'cartoons' },
    // Add more buttons as needed with their respective categories
  ];

  const slides: ReactElement<HeroProps>[] = [
    <SwiperSlide key="rocky">
      <Heros
        icon={MessageCircleIcon}
        image="/Rocky Balboa.jpg"
        name="Rocky Balboa"
        url="/rocky"
        description="a boxer who fought Muhammad Ali and lost on a TKO in the 15th round"
        category="actor"
      />
    </SwiperSlide>,
    <SwiperSlide key="james_bond">
      <Heros
        icon={MessageCircleIcon}
        image="/james_bond.jpg"
        name="James Bond (Sean Connery)"
        url="/bond"
        description="a Scottish actor. He was the first actor to portray fictional British secret agent"
        category="actor"
      />
    </SwiperSlide>,
    <SwiperSlide key="winston_churchill">
      <Heros
        icon={MessageCircleIcon}
        image="/Sir_Winston_Churchill_-_19086236948.jpg"
        name="Sir Winston Churchill"
        url="/churchill"
        description="Former Prime Minister of the United Kingdom in from the 40s"
        category="president"
      />
    </SwiperSlide>,
    <SwiperSlide key="arnold_schwarzenegger">
      <Heros
        icon={MessageCircleIcon}
        image="/arnold.jpg"
        name="Arnold Schwarzenegger"
        url="/arnold"
        description="an Austrian and American actor, businessman, filmmaker, former politician, and former professional bodybuilder best known for his roles in high-profile action movies"
        category="actor"
      />
    </SwiperSlide>,
    <SwiperSlide key="xi_jinping">
      <Heros
        icon={MessageCircleIcon}
        image="/Xi Jinping.jpg"
        name="Xi Jinping"
        url="/jinping"
        description="a Chinese politician who has been the general secretary of the Chinese Communist Party (CCP) and chairman of the Central Military Commission (CMC), and thus as the paramount leader of China, since 2012"
        category="president"
      />
    </SwiperSlide>,
    <SwiperSlide key="vladimir_putin">
      <Heros
        icon={MessageCircleIcon}
        image="/putin.jpg"
        name="Vladimir Putin"
        url="/putin"
        description="a Russian politician and former intelligence officer who has been President of Russia since 2012. Putin has held continuous positions as president or prime minister since 1999"
        category="president"
      />
    </SwiperSlide>,
    <SwiperSlide key="super_woman">
      <Heros
        icon={MessageCircleIcon}
        image="/super_woman.jpg"
        name="Super Woman"
        url="/swoman"
        description="The first appearance of Superwoman in a DC comic Was in a May 1943 story in Action Comics #60 by Jerry Siegel and George Roussos, where Lois Lane dreams that she has gained superpowers from a blood transfusion from Superman and launches a career as Superwoman"
        category="cartoons"
      />
    </SwiperSlide>,
    <SwiperSlide key="skeletor">
      <Heros
        icon={MessageCircleIcon}
        image="/Skeletor.jpg"
        name="Skeletor"
        url="/skeletor"
        description="a supervillain and the main antagonist of the Masters of the Universe franchise created by Mattel. He is usually depicted as an evil skull-faced, blue-skinned sorcerer who serves as the archenemy of He-Man"
        category="cartoons"
      />
    </SwiperSlide>,
  ];

  return (
    <>
      <div className="container mx-auto mt-8 p-4 relative object-cover rounded-lg b-1">
        <div className="flex items-center space-x-4 mb-4">
          <Input
            type="text"
            placeholder="Search by Name"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            className="p-2 border-2 border-purple-500 rounded-lg focus:outline-none focus:border-pink-500"
          />
 
          <Button
            type="button"
            onClick={handleSearch}
            className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:bg-pink-600 focus:outline-none"
          >
            Search
          </Button>
          <Button
            type="button"
            onClick={() => setSearchCategory('')}
            className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:bg-pink-600 focus:outline-none"
          >
            Show All
          </Button>
        </div>
      </div>
  
      <Swiper
        direction={'horizontal'}
        slidesPerView={8}
        spaceBetween={5}
        slidesPerGroup={3}
        mousewheel={true}
        navigation={true}
        freeMode={true}
        modules={[Mousewheel, FreeMode, Navigation]}
        className="CatSwiper left-5"
      >
        {categoryButtons.map((button, index) => (
          <SwiperSlide key={index}> 
            <Button
              variant={button.variant as "link" | "premium" | "secondary" | "default" | "destructive" | "outline" | "ghost" | null | undefined}
              onClick={() => setSearchCategory(button.category)}
            >
              {button.label}
            </Button>
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        direction={'horizontal'}
        slidesPerView={5}
        spaceBetween={5}
        slidesPerGroup={5}
        mousewheel={true}
        navigation={true}
        freeMode={true}
        modules={[Mousewheel, Navigation, FreeMode]}
        className="HeroSwiper"
      >
        {handleSearch().length > 0 ? (
          handleSearch().map((slide, index) => (
            <SwiperSlide key={index}>{slide}</SwiperSlide>
          ))
        ) : (
          <div className='justify-center items-center mr-0'>No results found</div>
        )}
      </Swiper>
      
    
    </>
  );
}
