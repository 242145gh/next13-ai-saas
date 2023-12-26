import Image from "next/image";

export interface HeroProps {
    image: string;
    name: string;
    url: string;
}

// Use the interface in your component
export const Heros: React.FC<HeroProps> = ({ image, name,url  }) => {
    return (
<div className="flex-shrink-0 w-full sm:w-1/4 md:w-1/5 lg:w-1/7 xl:w-1/7 p-2">
   <a href={url}>
    <Image src={image} alt={name} className="object-cover rounded-lg" width="90" height="90"/>   
  </a>
    <div className="relative">   
        <h1 className="text-violet-500">
            {name}
        </h1>
    </div>
</div>
    );
};

