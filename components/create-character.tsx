import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { FreeMode, Mousewheel, Navigation } from 'swiper/modules';
import { ImageIcon } from 'lucide-react';
import Heros from './hero';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import axios from 'axios';
import {Loader} from '@/components/loader';



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
  const [formErrors, setFormErrors] = useState({
    name: '',
    category: '',
    description: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);


  const validateForm = () => {
    const errors: { [key: string]: string } = {};
    if (!newCharacter.name.trim()) {
      errors.name = 'Name is required';
    }
    if (!newCharacter.category.trim()) {
      errors.category = 'Category is required';
    }
    if (!newCharacter.description.trim()) {
      errors.description = 'Description is required';
    }
    setFormErrors(errors as any);
    return Object.keys(errors).length === 0;
  };

  const addNewCharacter = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const newCharacterData = {
        name: newCharacter.name,
        icon: 'IconComponent',
        image: newCharacter.image || '/placeholder.jpg',
        url: `/${newCharacter.name.toLowerCase().replace(/\s+/g, '-')}`,
        description: newCharacter.description,
        category: newCharacter.category,
      };

      await axios.post('/api/character', [newCharacterData], {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      setSuccess(true);
    } catch (error) {
      console.error('Error updating characters:', error);
    }

    setLoading(false);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewCharacter((prevCharacter) => ({ ...prevCharacter, [name]: value }));
    setFormErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
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
      <form
        onSubmit={handleFormSubmit}
        className="ml-14 p-4 mt-4 mr-4 w-3/4 container mx-auto mt-8 p-4 bg-gradient-to-r from-purple-500 to-pink-500 border-purple-500 border-10 rounded-lg shadow-md relative"
      >
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <Loader />
          </div>
        )}
        {success && (
          <div className="absolute inset-0 flex items-center justify-center bg-green-500 bg-opacity-75 text-white text-xl font-bold">
            Character added successfully!
          </div>
        )}
        {Object.values(formErrors).some((error) => error !== '') && (
          <div className="mt-1 p-1 border-2 border-red-500 rounded-md text-white-500 text-sm w-1/2 mx-auto flex justify-center items-center w-3/4">
            Please fill out all required fields.
          </div>
        )}
        <div className="mt-2 grid grid-cols-2 gap-4">
          <Input
            type="text"
            name="name"
            placeholder="Character Name"
            value={newCharacter.name}
            onChange={handleInputChange}
            className={`p-2 border-2 rounded-lg focus:outline-none ${
              formErrors.name ? 'border-red-500' : 'border-purple-500'
            }`}
          />
          <Input
            type="text"
            name="category"
            placeholder="Category"
            value={newCharacter.category}
            onChange={handleInputChange}
            className={`p-2 border-2 rounded-lg focus:outline-none ${
              formErrors.category ? 'border-red-500' : 'border-purple-500'
            }`}
          />
        </div>
        <Input
          type="text"
          name="description"
          placeholder="Description"
          value={newCharacter.description}
          onChange={handleInputChange}
          className={`p-2 mt-4 border-2 rounded-lg focus:outline-none ${
            formErrors.description ? 'border-red-500' : 'border-purple-500'
          }`}
        />
        <Input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleImageChange}
          className="mt-4"
        />
        <Button
          variant="secondary"
          type="submit"
          className="p-2 text-white rounded-lg hover:bg-pink-600 focus:outline-none mt-4"
        >
          Add Character
        </Button>
      </form>

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
        {/* slides.map((slide, index) => (
          <SwiperSlide key={index}>{slide}</SwiperSlide>
        )) */}
      </Swiper>
    </>
  );
};

export default CreateCharacter;
