"use client";

import { MessageCircle } from "lucide-react"
import { useRouter } from "next/navigation";
import { Heading } from "@/components/heading";
import ChatRoom from "@/components/chatroom";

const ChatRoomPage = () => {
  const router = useRouter();
  return ( 
    <><div>
      <Heading
        title="Join a Chat Room or create your own."
        description="Choose from previous made user defined chat rooms"
        icon={MessageCircle}
        iconColor="text-violet-700"
        bgColor="bg-violet-500/30" 
        />
       </div>
      
      <ChatRoom />
      
   </>
   );
}
 
export default ChatRoomPage;

