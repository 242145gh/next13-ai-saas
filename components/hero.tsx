import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from '../app/Heros.module.css';
import { Icon, Menu } from 'lucide-react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { FreeMode, Mousewheel, Navigation } from 'swiper/modules';
import { Input } from '@/components/ui/input'; // Replace with actual path
import { Button } from '@/components/ui/button'; // Replace with actual path

interface Hero {
  HeroName: string;
  NumberOfMessages: number;
  Description: string;
  Image: string;
  id: number;
  category: string;
  Url: string;
  MessageCircle: Icon;
  Menu: Icon;
}

interface Group{
  id: Number;
  GroupMember: String;

}


export const Heros: React.FC<Hero> = ({ MessageCircle: IconComponent, Menu: MenuComponent }) => {
  const [slides, setSlides] = useState<Hero[]>([]);
  const [searchName, setSearchName] = useState('');
  const [searchCategory, setSearchCategory] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState<number | null>(null);
  const [groupMembers, setGroupMembers] = useState<Group[]>([]);

  const handleMenuToggle = (index: number) => {
    setIsMenuOpen(isMenuOpen === index ? null : index);
  };


  const handleAddToGroup = (slide: Hero) => {
    // Check if the member already exists in the group
    if (groupMembers.some((member) => member.GroupMember === slide.HeroName)) {
      console.log(`${slide.HeroName} is already in the group.`);
      return; // Do not add duplicate members
    }
  
    // Generate a unique id for the new group member
    const newMemberId = groupMembers.length + 1;
  
    // Create a new group member object
    const newGroupMember: Group = {
      id: newMemberId,
      GroupMember: slide.HeroName,
    };
  
    // Update the group members state
    setGroupMembers((prevGroupMembers) => [...prevGroupMembers, newGroupMember]);
  
    console.log(`Adding ${slide.HeroName} to the group`);
    
    // Use setTimeout to log the updated groupMembers after the state is guaranteed to be updated
    setTimeout(() => {
      console.debug(`Total members: ${JSON.stringify(groupMembers)}`);
    }, 0);
  };
  

  const handleSearch = () => {
    // Filter your slides based on searchName and searchCategory here
    const filteredSlides = slides.filter(
      (slide) =>
        slide.HeroName.toLowerCase().includes(searchName.toLowerCase()) &&
        (searchCategory === '' || slide.category === searchCategory)
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
        const { data } = await axios.post('/api/cmessage');
        setSlides(data);
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
        className="HeroSwiper mb-8 p-4 h-55"
        style={{ height: '55rem' }} // Adjusted height to 55rem, you can change this value

        
       
      >
        {handleSearch().length > 0 ? (
          handleSearch().map((slide, index) => {
            let CompleteURL = '/';

            if (slide.Image.includes('data')) {
              CompleteURL = '';
            } else {
              CompleteURL = '/';
            }

            return (
              <SwiperSlide key={index}>
                <a
                  href={`${CompleteURL}${slide.Url}`}
                  className="relative block flex-shrink-0 top-5 left-5 hover:border-grey hover:bg-gray-700 rounded-lg gap-4 mx-auto"
                >
                  <div className="flex justify-center p-4 ">
                    <Image
                      src={`${CompleteURL}${slide.Image}`}
                      alt={slide.HeroName}
                      className={`object-cover rounded-lg ${styles.glowOnHover}`}
                      width={150}
                      height={150}
                    />
                  </div>

                </a>
                  <div className="relative text-center">
                    <h1 className="text-violet-500 text-xs font-bold justify-center items-center p-4">{slide.HeroName}</h1>
                    <div className="text-xs text-grey-800 p-2 mx-auto">{slide.Description}</div>

                    <div className="relative">
                      <div className="flex items-center absolute text-violet-100 text-xs p-2">
                        <div className='text-xs mr-12'>@zser</div>
                        <div className='flex-grow'></div>
                        {IconComponent && <IconComponent size="14" className="flex text-violet-400 text-xs" />}
                        <div className='flex'>{slide.NumberOfMessages}</div>
                       
                        {MenuComponent && (
                          <MenuComponent
                            size="14"
                            className="flex text-violet-400 text-xs cursor-pointer mb-0"
                            onClick={() => handleMenuToggle(index)}
                          />
                        )}
                        
                        {isMenuOpen === index && (
                          <div className="absolute right-0 top-0 mt-8 bg-black border border-gray-300 rounded-lg shadow-md p-2 z-10 ">
                            <div className="cursor-pointer hover:bg-gray-800 " onClick={() => handleAddToGroup(slide)}>
                              Add to Group Chat
                            </div>
                            {/* Add more options as needed */}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                
              </SwiperSlide>
            );
          })
        ) : (
          <div className='mt-2 flex justify-center items-center mr-0'>No results found</div>
        )}
      </Swiper>
    </div>
  );
};

export default Heros;
