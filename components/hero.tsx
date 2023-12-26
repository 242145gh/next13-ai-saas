import Image from "next/image";
import styles from "../app/Heros.module.css";

export interface HeroProps {
    image: string;
    name: string;
    url: string;
}

// Use the interface in your component
export const Heros: React.FC<HeroProps> = ({ image, name,url  }) => {
    return (
<div className="flex-shrink-0 w-full sm:w-1/6 md:w-1/6 lg:w-1/15 xl:w-1/15 p-1">
   <a href={url}>
    <Image src={image} alt={name} className={`object-cover rounded-lg ${styles.glowOnHover}`} width="90" height="90"/>   
  </a>
    <div className="relative">   
        <h1 className="text-violet-500 text-xs">
            {name}
        </h1>
    </div>
</div>
    );
};

