"use client";

import { MessageCircle } from "lucide-react"
import { useRouter } from "next/navigation";
import { Heading } from "@/components/heading";
import HeroSwiper from "@/components/HeroSwiper";

const HeroPage = () => {
  const router = useRouter();
  return ( 
    <><div>
      <Heading
        title="Talk with heros"
        description="Our most advanced brains captured with ai."
        icon={MessageCircle}
        iconColor="text-violet-700"
        bgColor="bg-violet-500/30" 
        />
    </div>
      
      <HeroSwiper />
      
   </>
   );
}
 
export default HeroPage;

