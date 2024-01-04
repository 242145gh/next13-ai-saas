import React, { useState, ReactElement, JSXElementConstructor } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { FreeMode, Mousewheel, Navigation } from 'swiper/modules';
import { MessageCircleIcon } from 'lucide-react';
import Heros from './hero';
import {Button} from "@/components/ui/button";
import Select from 'react-select'
import { Input } from '@/components/ui/input';

interface HeroProps {
  children: ReactElement<HeroProps, string | JSXElementConstructor<any>>;
  icon: ReactElement;
  image: string;
  name: string;
  url: string;
  description: string;
  catergory: string;
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
          (slide.props.children as ReactElement<HeroProps>).props.catergory ===
            searchCategory)
    );

    return filteredSlides;
  };

  const categoryButtons = [
    { label: 'Actors', variant: 'secondary', category: 'actor' },
    { label: 'Presidents', variant: 'secondary', category: 'president' },
    { label: 'Cartoons', variant: 'secondary', category: 'catoons' },
    // Add more buttons as needed with their respective categories
  ];

  const slides: ReactElement<HeroProps>[] = [
    <SwiperSlide>
      <Heros
        icon={MessageCircleIcon}
        image="/Rocky Balboa.jpg"
        name="Rocky Balboa"
        url="/rocky"
        description="a boxer who fought Muhammad Ali and lost on a TKO in the 15th round"
        catergory="actor"
      />
    </SwiperSlide>,
    <SwiperSlide>
      <Heros
        icon={MessageCircleIcon}
        image="/james_bond.jpg"
        name="James Bond (Sean Connery)"
        url="/bond"
        description="a Scottish actor. He was the first actor to portray fictional British secret agent"
        catergory="actor"
      />
    </SwiperSlide>,
    <SwiperSlide>
      <Heros
        icon={MessageCircleIcon}
        image="/Sir_Winston_Churchill_-_19086236948.jpg"
        name="Sir Winston Churchill"
        url="/churchill"
        description="Former Prime Minister of the United Kingdom in from the 40s"
        catergory="president"
      />
    </SwiperSlide>,
    <SwiperSlide>
      <Heros
        icon={MessageCircleIcon}
        image="/arnold.jpg"
        name="Arnold Schwarzenegger"
        url="/arnold"
        description="an Austrian and American actor, businessman, filmmaker, former politician, and former professional bodybuilder best known for his roles in high-profile action movies"
        catergory="actor"
      />
    </SwiperSlide>,
    <SwiperSlide>
      <Heros
        icon={MessageCircleIcon}
        image="/Xi Jinping.jpg"
        name="Xi Jinping"
        url="/jinping"
        description="a Chinese politician who has been the general secretary of the Chinese Communist Party (CCP) and chairman of the Central Military Commission (CMC), and thus as the paramount leader of China, since 2012"
        catergory="president"
      />
    </SwiperSlide>,
    <SwiperSlide>
      <Heros
        icon={MessageCircleIcon}
        image="/putin.jpg"
        name="Vladimir Putin"
        url="/putin"
        description="a Russian politician and former intelligence officer who has been President of Russia since 2012. Putin has held continuous positions as president or prime minister since 1999"
        catergory="president"
      />
    </SwiperSlide>,
    <SwiperSlide>
      <Heros
        icon={MessageCircleIcon}
        image="/super_woman.jpg"
        name="Super Woman"
        url="/swoman"
        description="The first appearance of Superwoman in a DC comic Was in a May 1943 story in Action Comics #60 by Jerry Siegel and George Roussos, where Lois Lane dreams that she has gained superpowers from a blood transfusion from Superman and launches a career as Superwoman"
        catergory="catoons"
      />
    </SwiperSlide>,
    <SwiperSlide>
      <Heros
        icon={MessageCircleIcon}
        image="/Skeletor.jpg"
        name="Skeletor"
        url="/skeletor"
        description="a supervillain and the main antagonist of the Masters of the Universe franchise created by Mattel. He is usually depicted as an evil skull-faced, blue-skinned sorcerer who serves as the archenemy of He-Man"
        catergory="catoons"
      />
    </SwiperSlide>,
  ];

  return (
    <><div className="container mx-auto mt-8 p-4">
      <div className="flex items-center space-x-4 mb-4">
        <Input
          type="text"
          placeholder="Search by Name"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          className="p-2 border-2 border-purple-500 rounded-lg focus:outline-none focus:border-pink-500" />
        <div className="relative">
          <Select
            value={searchCategory}
            onChange={(e) => setSearchCategory(e.target.value)}
            className="p-2 pr-8 appearance-none border-2 border-purple-500 rounded-lg focus:outline-none focus:border-pink-500"
          >
            <option value="">All Categories</option>
            <option value="actor">Actor</option>
            <option value="president">President</option>
            <option value="catoons">Cartoons</option>
          </Select>
          <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
            <svg
              className="w-5 h-5 text-purple-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
        <Button
          type="button"
          onClick={handleSearch}
          className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:bg-pink-600 focus:outline-none"
        >
          Search
        </Button>
      </div>
    </div><Swiper
      direction={'horizontal'}
      slidesPerView={8}
      spaceBetween={5}
      slidesPerGroup={3}
      mousewheel={true}
      navigation={true}
      freeMode={true}
      modules={[Mousewheel, FreeMode, Navigation]}
      className="CatSwiper"
    >
        {categoryButtons.map((button, index) => (
          <SwiperSlide key={index}>
            <Button
              variant={button.variant}
              onClick={() => setSearchCategory(button.category)}
            >
              {button.label}
            </Button>
          </SwiperSlide>
        ))}
      </Swiper><Swiper
        direction={'horizontal'}
        slidesPerView={2}
        spaceBetween={5}
        slidesPerGroup={8}
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
          <div>No results found</div>
        )}
      </Swiper></>
    
  );
}

