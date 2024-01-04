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
  WisdomSourceName: string;
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

  const hero = response.find((h) => h.WisdomSourceName === name);
  const maxLength = 75;

  function limitCharacters(inputString: string, maxLength: number) {
    if (inputString.length > maxLength) {
      return inputString.substring(0, maxLength)+"..."; // or inputString.slice(0, maxLength)
    }
    return inputString;
  }
  
  const shortDescription = limitCharacters(description, maxLength)
  return (
    <a href={url} className="relative block  flex-shrink-0 top-0 hover:border-grey hover:bg-gray-700 rounded-lg gap-4 mx-auto">
  <div className="flex justify-center p-4 ">
  <Image src={image} alt={name} className={` object-cover rounded-lg ${styles.glowOnHover}`} width={150} height={150}/>

  </div>

  <div className="relative text-center">
    <h1 className="text-violet-500 text-xs font-bold">{name}</h1>
    <div className="text-xs text-grey-800 p-2 w-full mx-auto"> {/* Set 'mx-auto' for centering */}
      {shortDescription}
    </div>
    {hero ? (
  <div className="relative">
    <div className="flex items-center absolute text-violet-100 text-xs p-2">
      <div className='text-xs mr-12'>@zser</div>
      <div className='flex-grow'></div> {/* This will take up remaining space */}
      {IconComponent && <IconComponent size="14" className="flex text-violet-400 text-xs ml-12" />}
      <div className='flex'>{hero.NumberOfMessages}</div>
    </div>
  </div>
) : (
  <div></div>
)}

  </div>
</a>


    
  );
};

export default Heros;
