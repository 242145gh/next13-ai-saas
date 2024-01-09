"use client";

import { ImageIcon } from "lucide-react"
import { useRouter } from "next/navigation";
import { Heading } from "@/components/heading";


import CreateCharacter from "@/components/create-character";


const CreatePage = () => {
  const router = useRouter();
  return ( 
    <><div>
      <Heading
        title="Create a Wisdom Source Character"
        description="Make your own Character using wisdom sources's custom ai model"
        icon={ImageIcon}
        iconColor="text-violet-700"
        bgColor="bg-violet-500/30" 
        />
    </div>
      
      <CreateCharacter />
      
   </>
   );
}
 
export default CreatePage;

