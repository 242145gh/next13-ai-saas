"use client";

import { Menu, MessageCircle } from "lucide-react"
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
      
      <Heros  MessageCircle={MessageCircle} Menu={Menu} HeroName={""} NumberOfMessages={0} Description={""} Image={""} id={0} category={""} Url={""}/>
      
   </>
   );
}
 
export default HeroPage;

