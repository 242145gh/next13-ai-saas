// HorizontalScrollCard.js

import Heros from "@/components/hero";
import { MessageCircleIcon } from "lucide-react";



import { motion, useTransform, useScroll } from "framer-motion";
import { useRef } from "react";


const HorizontalScrollCarousel = () => {
  const targetRef = useRef(null);
  const { scrollXProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollXProgress, [0, 1], ["95%", "-1%"]);

  return (
    <section ref={targetRef} className="relative h-[45vh] bg-neutral-900 overflow-x-scroll text-center overflow-hidden">
    <div className="sticky top-0 flex h-45 w-1/2 items-center">

        <motion.div style={{ x }} className="flex gap-2 p-5">
        <Heros icon={MessageCircleIcon} image="/Rocky Balboa.jpg" name="Rocky Balboa" url="/rocky" description="a boxer who fought Muhammad Ali and lost on a TKO in the 15th round"/>     
         <Heros icon={MessageCircleIcon} image="/james_bond.jpg" name="James Bond (Sean Connery)" url="/bond" description="a Scottish actor. He was the first actor to portray fictional British secret agent" />
      <Heros icon={MessageCircleIcon} image="/Sir_Winston_Churchill_-_19086236948.jpg" name="Sir Winston Churchill" url="/churchill" description="Former Prime Minister of the United Kingdom in from the 40's"  />
      <Heros icon={MessageCircleIcon} image="/arnold.jpg" name="Arnold Schwarzenegger" url="/arnold"  description="an Austrian and American actor, businessman, filmmaker, former politician, and former professional bodybuilder best known for his roles in high-profile action movies" />
      <Heros icon={MessageCircleIcon} image="/Xi Jinping.jpg" name="Xi Jinping" url="/jinping" description="a Chinese politician who has been the general secretary of the Chinese Communist Party (CCP) and chairman of the Central Military Commission (CMC), and thus as the paramount leader of China, since 2012"  />
      <Heros icon={MessageCircleIcon} image="/putin.jpg" name="Vladimir Putin" url="/putin"  description="a Russian politician and former intelligence officer who has been President of Russia since 2012. Putin has held continuous positions as president or prime minister since 1999" />
      <Heros icon={MessageCircleIcon} image="/super_woman.jpg" name="Super Woman" url="/swoman"  description="The first appearance of 'Superwoman' in a DC comic Was in a May 1943 story in Action Comics #60 by Jerry Siegel and George Roussos, where Lois Lane dreams that she has gained superpowers from a blood transfusion from Superman and launches a career as Superwoman" />
      <Heros icon={MessageCircleIcon} image="/Skeletor.jpg" name="Skeletor" url="/skeletor" description="a supervillain and the main antagonist of the Masters of the Universe franchise created by Mattel. He is usually depicted as an evil skull-faced, blue-skinned sorcerer who serves as the archenemy of He-Man"  />
      
        </motion.div>
      </div>
    </section>
  );
};

export default HorizontalScrollCarousel;

