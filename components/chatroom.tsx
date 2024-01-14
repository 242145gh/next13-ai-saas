import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Loader} from "@/components/loader"
import Link from "next/link";

const ChatRoom: React.FC = () => {
  const [chatRoomData, setChatRoomData] = useState<any[] | undefined>(undefined);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/chat'); // Replace with your API endpoint
        setChatRoomData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  if (chatRoomData === undefined) {
    // Loading state, you can display a loading spinner or message here
    return <Loader />
    
  }

  if (chatRoomData.length === 0) {
    // Handle case where there is no data
    return <div>No chat rooms available.</div>;
  }

 


  return (
    <div >
      {chatRoomData.map((chatroom: any) => (
       
        <div key={chatroom.id} className="mb-4 border ml-14 mr-4 rounded-lg p-4 w-3/4 items-center justify-center ">
          <Link href={`/chat/${chatroom.id}`} passHref={true}> <div className="flex items-center mb-2 ml-2 text-lg text-violet-400">
          
            <h2 className="text-xl font-bold hover:bg-grey-200">{chatroom.RoomName}</h2>
          </div></Link>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-lg font-semibold mb-2 text-sm text-violet-300">Room Members</h3>
              <div className="flex space-x-2">
              {chatroom.RoomMembers.split(',').map((member: string, index: number) => (
            <Avatar
                key={index}
                style={{
                    zIndex: chatroom.RoomMembers.length - index, // Increase z-index for each member
                    
                    left: `${index * -1}rem`, // Adjust left position for spacing
                    
                  }}
            >
                <AvatarImage
                key={index}
                className="h-10 w-10 rounded-full border-2 border-violet-500 text-violet-500 bg-opacity-50 overflow-hidden"
                src={chatroom.Url.split(', ')[index]}
                />
            </Avatar>
            ))}

              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2 text-lg text-violet-400">Description</h3>
              <p className='text-lg text-violet-200'>{chatroom.Description}</p>
            </div>
          </div>
        </div>
       
      ))}
    </div>
  );
};

export default ChatRoom;
