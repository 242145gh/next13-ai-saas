"use client";

import { AppWindow } from "lucide-react"
import { useRouter } from "next/navigation";
import { Heading } from "@/components/heading";

import HeroSwiper from "@/components/HeroSwiper";
import CaterogySwiper from "@/components/CaterogySwiper";

 

const HeroPage = () => {
  const router = useRouter();
  return ( 
    <><div>
      <Heading
        title="Talk with heros"
        description="Our most advanced brains captured with ai."
        icon={AppWindow}
        iconColor="text-violet-700"
        bgColor="bg-violet-500/30" 
        />
    </div>
      <CaterogySwiper />
      <HeroSwiper />
      
   </>
   );
}
 
export default HeroPage;

