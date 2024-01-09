"use client";

import { MessageCircle } from "lucide-react"
import { useRouter } from "next/navigation";
import { Heading } from "@/components/heading";
import {Heros} from "@/components/hero";

const HeroPage = () => {
  const router = useRouter();
  return ( 
    <><div>
      <Heading
        title="Have a Conversation with anyone."
        description="harness wisdom sources powerful ai engine"
        icon={MessageCircle}
        iconColor="text-violet-700"
        bgColor="bg-violet-500/30" 
        />
    </div>
      
      <Heros  image={""} name={""} url={""} description={""} category={""} icon={MessageCircle}  />
      
   </>
   );
}
 
export default HeroPage;

