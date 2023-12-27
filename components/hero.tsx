// Import necessary modules and styles
import Image from 'next/image';
import styles from '../app/Heros.module.css';
import prismadb from '@/lib/prismadb';
import { Icon } from 'lucide-react';

// Define the interface for HeroProps
export interface HeroProps {
  image: string;
  name: string;
  url: string;
  icon: Icon;
}

// Define the Heros component
const Heros: React.FC<HeroProps & { MessageCount: any }> = async ({ icon: IconComponent, image, name, url, MessageCount }) => {
  try {
    // Fetch heroes data from the database using prismadb
    const fetchedHeros = await prismadb.herosChatCount.findMany({
      where: { HeroName: name }
    });

    // Log the fetched data
    console.log('Fetched Heroes:', fetchedHeros);

    return (
      <div className="flex-shrink-0 w-full sm:w-1/6 md:w-1/6 lg:w-1/15 xl:w-1/15 p-1">
        <a href={url} className="relative block">
          <Image src={image} alt={name} className={`object-cover rounded-lg ${styles.glowOnHover}`} width="90" height="90" />
          {IconComponent && <IconComponent className={`absolute top-0 left-0 text-violet-400 w-full h-full ${styles.overlay}`} />} {/* Render the provided icon */}
        </a>
        <div className="relative">
          <h1 className="text-violet-500 text-xs">{name}</h1>
          {/* Display heroes information */}
          <ul>
            {fetchedHeros &&
              fetchedHeros.map((hero: any) => (
                <li key={hero.id}>{hero.NumberOfMessages}</li>
              ))}
          </ul>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error fetching heroes:', error);

    // If there's an error, return an empty array as props
    return (
      <div className="flex-shrink-0 w-full sm:w-1/6 md:w-1/6 lg:w-1/15 xl:w-1/15 p-1">
        <div className="relative">
          <h1 className="text-violet-500 text-xs">{name}</h1>
          {/* Display an error message */}
          <p>Error fetching heroes data</p>
        </div>
      </div>
    );
  }
};

// Export the Heros component
export default Heros;
