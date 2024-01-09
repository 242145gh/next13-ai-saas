import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from '../app/Heros.module.css';
import { Icon } from 'lucide-react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { FreeMode, Mousewheel, Navigation } from 'swiper/modules';
import {Input} from '@/components/ui/input'; // Replace with actual path
import {Button} from '@/components/ui/button'; // Replace with actual path

interface HeroProps {
  image: string;
  name: string;
  url: string;
  icon: Icon;
  description: string;
  category: string;
}

interface Hero {
  HeroName: string;
  NumberOfMessages: number;
  Description: string;
  Image: string;
  id: number;
  category: string;
  Url: string;
}

interface HeroResponse {
  data: Hero[];
}

export const Heros: React.FC<HeroProps> = ({ icon: IconComponent }) => {
  const [slides, setSlides] = useState<Hero[]>([]);
  const [searchName, setSearchName] = useState('');
  const [searchCategory, setSearchCategory] = useState('');

  const handleSearch = () => {
    // Filter your slides based on searchName and searchCategory here
    const filteredSlides = slides.filter(
      (slide) =>
        slide.HeroName.toLowerCase().includes(searchName.toLowerCase()) &&
        (searchCategory === '' ||
          slide.category === searchCategory)
    );

    return filteredSlides;
  };

  const categoryButtons = [
    { label: 'All', variant: 'secondary', category: '' },
    { label: 'Actor', variant: 'secondary', category: 'Actor' },
    { label: 'President', variant: 'secondary', category: 'President' },
    { label: 'Cartoon', variant: 'secondary', category: 'Cartoon' },
    // Add more buttons as needed with their respective categories
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data }: HeroResponse = await axios.post('/api/cmessage');
        setSlides(data);

        // Optional: Log the response
        console.log('Data fetched:', data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); // Call the fetchData function immediately
  }, []); // Empty dependency array, run effect only on mount

  return (
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
      <Swiper
        direction={'horizontal'}
        slidesPerView={4}
        spaceBetween={55}
        slidesPerGroup={3}
        mousewheel={true}
        navigation={true}
        freeMode={true}
        modules={[Mousewheel, FreeMode, Navigation]}
        className=""
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
            <SwiperSlide key={index}>
              <a
                href={`/${slide.Url}`}
                className="relative block flex-shrink-0 top-5 left-5 hover:border-grey hover:bg-gray-700 rounded-lg gap-4 mx-auto"
              >
                <div className="flex justify-center p-4 ">
                  <Image
                    src={`/${slide.Image}`}
                    alt={slide.HeroName}
                    className={`object-cover rounded-lg ${styles.glowOnHover}`}
                    width={150}
                    height={150}
                  />
                </div>

                <div className="relative text-center">
                  <h1 className="text-violet-500 text-xs font-bold">{slide.HeroName}</h1>
                  <div className="text-xs text-grey-800 p-2 mx-auto">{slide.Description}</div>

                  <div className="relative">
                    <div className="flex items-center absolute text-violet-100 text-xs p-2">
                      <div className='text-xs mr-12'>@zser</div>
                      <div className='flex-grow'></div>
                      {IconComponent && <IconComponent size="14" className="flex text-violet-400 text-xs ml-12" />}
                      <div className='flex'>{slide.NumberOfMessages}</div>
                    </div>
                  </div>
                </div>
              </a>
            </SwiperSlide>
          ))
        ) : (
          <div className='mt-2 flex justify-center items-center mr-0'>No results found</div>
        )}
      </Swiper>
    </div>
  );
}

export default Heros;
