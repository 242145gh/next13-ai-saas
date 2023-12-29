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
}

interface Hero {
  HeroName: string;
  NumberOfMessages: number;

}

interface HeroResponse {
  data: Hero[];
  
}

const Heros: React.FC<HeroProps> = ({ icon: IconComponent, image, name, url }) => {
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

  return (
    <div className="flex-shrink-0 w-full sm:w-1/6 md:w-1/6 lg:w-1/15 xl:w-1/15 p-1">
      <a href={url} className="relative block">
        <Image src={image} alt={name} className={`object-cover rounded-lg ${styles.glowOnHover}`} width="90" height="90" />
        {IconComponent && <IconComponent className={`absolute top-0 left-0 text-violet-400 w-full h-full ${styles.overlay}`} />}
        </a><div className="relative">
        <h1 className="text-violet-500 text-xs">{name}</h1>
          {hero ? (
            <div className="text-violet-500 text-xs">{hero.NumberOfMessages} messages</div>
          ) : (
            <div></div>
          )}
        </div>
      
      
      </div>
    
  );
};

export default Heros;
