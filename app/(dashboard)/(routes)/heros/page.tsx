"use client";

import * as z from "zod";
import axios from "axios";
import { AppWindow } from "lucide-react"
import { useRouter } from "next/navigation";
import { Heading } from "@/components/heading";
import {Heros} from "@/components/hero";

const HeroPage = () => {
  const router = useRouter();
  return ( 
    <><div>
      <Heading
        title="Talk with heros"
        description="Our most advanced brains captured with ai."
        icon={AppWindow}
        iconColor="text-violet-700"
        bgColor="bg-violet-500/30" />
    </div><div className="flex flex-wrap gap-8 p-4">
        <Heros image="Rocky Balboa.jpg" name="Rocky Balboa" url="/rocky" />
        <Heros image="james_bond.jpg" name="James Bond (Sean Connery)" url="/bond" />
        <Heros image="Sir_Winston_Churchill_-_19086236948.jpg" name="Sir Winston Churchill" url="/churchill"  />
        <Heros image="arnold.jpg" name="Arnold Schwarzenegger" url="/arnold"  />
      
      </div></>

   );
}
 
export default HeroPage;

