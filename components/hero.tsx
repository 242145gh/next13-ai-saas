// Define your interface

export interface HeroProps {
    image: string;
    name: string;
    url: string;
}

// Use the interface in your component
export const Heros: React.FC<HeroProps> = ({ image, name,url  }) => {
    return (
<div className="flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4">
   <a href={url}><img src={image} alt={name}  className="w-full h-full object-cover" /></a>
    <div className="text-center">   
        <h1 className="text-violet-500 font-bold text-lg sm:text-xl md:text-2xl lg:text-2xl xl:text-2xl">
            {name}
        </h1>
    </div>
</div>
    );
};

