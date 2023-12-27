"use client";

import * as z from "zod";
import axios from "axios";
import { AppWindow } from "lucide-react"
import { useRouter } from "next/navigation";
import { Heading } from "@/components/heading";
import Heros from "@/components/hero";
import {MessageCircleIcon} from "lucide-react";



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
    </div><div className="flex flex-wrap gap-2 p-4">
        <Heros icon={MessageCircleIcon} image="/Rocky Balboa.jpg" name="Rocky Balboa" url="/rocky" MessageCount={undefined} />
        <Heros icon={MessageCircleIcon} image="/james_bond.jpg" name="James Bond (Sean Connery)" url="/bond" MessageCount={undefined} />
        <Heros icon={MessageCircleIcon} image="/Sir_Winston_Churchill_-_19086236948.jpg" name="Sir Winston Churchill" url="/churchill" MessageCount={undefined}  />
        <Heros icon={MessageCircleIcon} image="/arnold.jpg" name="Arnold Schwarzenegger" url="/arnold" MessageCount={undefined}  />
        <Heros icon={MessageCircleIcon} image="/Xi Jinping.jpg" name="Xi Jinping" url="/jinping" MessageCount={undefined}  />
        <Heros icon={MessageCircleIcon} image="/putin.jpg" name="Vladimir Putin" url="/putin" MessageCount={undefined}  />
        <Heros icon={MessageCircleIcon} image="/super_woman.jpg" name="Super Woman" url="/swoman" MessageCount={undefined}  />
        <Heros icon={MessageCircleIcon} image="/skeletor.jpg" name="Skeletor" url="/skeletor" MessageCount={undefined}  />

      
      </div></>

   );
}
 
export default HeroPage;

