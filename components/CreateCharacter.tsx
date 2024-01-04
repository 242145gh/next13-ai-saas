// CreateCharacter.tsx
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { FreeMode, Mousewheel, Navigation } from 'swiper/modules';
import { ImageIcon } from 'lucide-react';
import Heros from './hero';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface HeroProps {
  children: React.ReactElement<HeroProps, string | React.JSXElementConstructor<any>>;
  key: string;
  icon: React.ReactElement;
  image: string;
  name: string;
  url: string;
  description: string;
  category: string;
}

const CreateCharacter: React.FC = () => {
  const [newCharacter, setNewCharacter] = useState({
    name: '',
    category: '',
    description: '',
    image: '',
  });

  const [slides, setSlides] = useState<React.ReactElement<HeroProps>[]>([]);

  const addNewCharacter = () => {
    const newSlide = (
      <SwiperSlide key={newCharacter.name}>
        <Heros
          icon={ImageIcon}
          image={newCharacter.image || '/placeholder.jpg'}
          name={newCharacter.name}
          url={`/${newCharacter.name.toLowerCase().replace(/\s+/g, '-')}`}
          description={newCharacter.description}
          category={newCharacter.category}
        />
      </SwiperSlide>
    );

    setSlides([...slides, newSlide]);
    setNewCharacter({ name: '', category: '', description: '', image: '' });
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewCharacter((prevCharacter) => ({ ...prevCharacter, [name]: value }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageDataUrl = event.target?.result as string;
        setNewCharacter((prevCharacter) => ({ ...prevCharacter, image: imageDataUrl }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    addNewCharacter();
  };

  return (
    <>
      {/* Form to add new character */}
      <form onSubmit={handleFormSubmit} className="container mx-auto mt-8 p-4 bg-gradient-to-r from-purple-500 to-pink-500 border-purple-500 border-10 rounded-lg shadow-md">
        <div className="grid grid-cols-2 gap-4">
          <Input
            type="text"
            name="name"
            placeholder="Character Name"
            value={newCharacter.name}
            onChange={handleInputChange}
            className="p-2 border-2 border-purple-500 rounded-lg focus:outline-none focus:border-pink-500"
          />
          <Input
            type="text"
            name="category"
            placeholder="Category"
            value={newCharacter.category}
            onChange={handleInputChange}
            className="p-2 border-2 border-purple-500 rounded-lg focus:outline-none focus:border-pink-500"
          />
        </div>
        <Input
          type="text"
          name="description"
          placeholder="Description"
          value={newCharacter.description}
          onChange={handleInputChange}
          className="p-2 mt-4 border-2 border-purple-500 rounded-lg focus:outline-none focus:border-pink-500"
        />
        <Input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleImageChange}
          className="mt-4"
        />
        <Button variant="secondary" type="submit" className="p-2 text-white rounded-lg hover:bg-pink-600 focus:outline-none mt-4">
          Add Character
        </Button>
      </form>

      {/* Swiper component for displaying characters */}
      <Swiper
        direction={'horizontal'}
        slidesPerView={5}
        spaceBetween={5}
        slidesPerGroup={5}
        mousewheel={true}
        navigation={true}
        freeMode={true}
        modules={[Mousewheel, Navigation, FreeMode]}
        className="HeroSwiper mt-8"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>{slide}</SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default CreateCharacter;
