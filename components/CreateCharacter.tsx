import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { FreeMode, Mousewheel, Navigation } from 'swiper/modules';
import { ImageIcon } from 'lucide-react';
import Heros from './hero';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import axios from 'axios'; // Import Axios

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

interface Character {
  name: string;
  category: string;
  description: string;
  image: string;
  
}

const initialCharacter: Character = {
  name: '',
  category: '',
  description: '',
  image: '',
};

const initialErrors: { [key in keyof Character]?: string } = {};


const CreateCharacter: React.FC = () => {
  const [newCharacter, setNewCharacter] = useState<Character>(initialCharacter);

  const [slides, setSlides] = useState<React.ReactElement<HeroProps>[]>([]);
 const [formErrors, setFormErrors] = useState<{ [key in keyof Character]?: string }>(initialErrors);

  useEffect(() => {
    // Fetch characters from JSON file on component mount using Axios
    axios
      .get('/characters.json')
      .then((response) => {
        const data = response.data;
        const loadedSlides = data.map((character: any) => (
          <SwiperSlide key={character.name}>
            <Heros
              icon={ImageIcon}
              image={character.image || '/placeholder.jpg'}
              name={character.name}
              url={`/${character.name.toLowerCase().replace(/\s+/g, '-')}`}
              description={character.description}
              category={character.category}
            />
          </SwiperSlide>
        ));

        setSlides(loadedSlides);
      })
      .catch((error) => console.error('Error fetching characters:', error));
  }, []);



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
    setFormErrors(errors);
    return Object.keys(errors).length === 0; // Return true if there are no errors
  };

  const addNewCharacter = async () => {
    if (!validateForm()) {
      // Don't proceed if the form is not valid
      return;
    }

    // Update newCharacter state with the current form values
    setNewCharacter((prevCharacter) => ({
      ...prevCharacter,
      url: `/${prevCharacter.name.toLowerCase().replace(/\s+/g, '-')}`,
    }));

    // Extract relevant data from slides to create updatedCharacters array
    const updatedCharacters = slides.map((slide, index) => ({
      name: `Character${index + 1}`,
      icon: 'IconComponent',
      image: '/placeholder.jpg',
      url: `/${newCharacter.name.toLowerCase().replace(/\s+/g, '-')}`,
      description: 'This is a sample character.',
      category: 'Fantasy',
    }));

    updatedCharacters.push({
      name: newCharacter.name,
      icon: 'IconComponent',
      image: newCharacter.image || '/placeholder.jpg',
      url: `/${newCharacter.name.toLowerCase().replace(/\s+/g, '-')}`,
      description: newCharacter.description,
      category: newCharacter.category,
    });

    try {
      // Send only the data needed (updatedCharacters) to the server
      await axios.post('/api/character', updatedCharacters, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      console.error('Error updating characters:', error);
    }

    // Update state with the new slide
    setSlides([
      <SwiperSlide key={newCharacter.name}>
        <Heros
          icon={ImageIcon}
          image={newCharacter.image || '/placeholder.jpg'}
          name={newCharacter.name}
          url={`/${newCharacter.name.toLowerCase().replace(/\s+/g, '-')}`}
          description={newCharacter.description}
          category={newCharacter.category}
        />
      </SwiperSlide>,
      ...slides, // Keep the existing slides
    ]);

    // Clear the form
    setNewCharacter({ name: '', category: '', description: '', image: '' });
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
      {/* Form to add a new character */}
      <form
        onSubmit={handleFormSubmit}
        className="container mx-auto mt-8 p-4 bg-gradient-to-r from-purple-500 to-pink-500 border-purple-500 border-10 rounded-lg shadow-md"
      >
        {Object.values(formErrors).some((error) => error !== '') && (
          <div className="mt-1 p-1 border-2 border-red-500 rounded-md text-white-500 text-sm w-1/2 mx-auto flex justify-center items-center">
  Please fill out all required fields.
</div>          )}
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
  
