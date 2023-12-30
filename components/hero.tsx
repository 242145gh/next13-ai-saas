import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from '../app/Heros.module.css';
import { Icon } from 'lucide-react';
import axios from 'axios';


interface HeroProps {
  image: string;
  name: string;
  url: string;
  icon: Icon;
  description: string;
}

interface Hero {
  HeroName: string;
  NumberOfMessages: number;

}

interface HeroResponse {
  data: Hero[];
  
}

const Heros: React.FC<HeroProps> = ({ icon: IconComponent, image, name, url,description }) => {
  const [response, setResponse] = useState<Hero[]>([]);
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!name) {
          console.log("No name provided");
          return;
        }

        const { data }: HeroResponse = await axios.post('/api/cmessage', { name });
        setResponse(data);
    

        // Optional: Log the response
        console.log('Data fetched:', data);
      } catch (error) {
        console.error('Error fetching data:', error);
   
      }
    };

    fetchData(); // Call the fetchData function immediately


    return () => {
    
    };
  }, [name]); // Dependency array, re-run effect when 'name' changes

  const hero = response.find((h) => h.HeroName === name);
  const maxLength = 100;

  function limitCharacters(inputString: string, maxLength: number) {
    if (inputString.length > maxLength) {
      return inputString.substring(0, maxLength); // or inputString.slice(0, maxLength)
    }
    return inputString;
  }
  
  const shortDescription = limitCharacters(description, maxLength)
  return (
<div className="w-1/4 flex-shrink-0 top-0 hover:border-grey hover:bg-gray-700 rounded-lg gap-4">
  <a href={url} className="relative block">
    <div className="flex justify-center p-4">
      <Image src={image} alt={name} className={`object-cover rounded-lg ${styles.glowOnHover}`} width="120" height="120" />
    </div>
  </a>
  <div className="relative text-center">
    <h1 className="text-violet-500 text-xs font-bold">{name}</h1>
    <div className="text-xs text-grey-800 p-2 w-3/4 mx-auto"> {/* Set 'mx-auto' for centering */}
      {shortDescription}
    </div>
    {hero ? (
      <div className="absolute text-violet-100 text-xs p-2"> 
        {IconComponent && <IconComponent className="flex text-violet-400" />}
        {hero.NumberOfMessages}
      </div>
    ) : (
      <div></div>
    )}
  </div>
</div>

     
    
  );
};

export default Heros;
