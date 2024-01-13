import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Avatar, AvatarImage } from '@/components/ui/avatar';

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
    return <div>Loading...</div>;
  }

  if (chatRoomData.length === 0) {
    // Handle case where there is no data
    return <div>No chat rooms available.</div>;
  }

  return (
    <div>
      {chatRoomData.map((chatroom: any) => (
        <div key={chatroom.id} className="mb-4 border rounded p-4">
          <div className="flex items-center mb-2">
            <h2 className="text-xl font-bold">{chatroom.RoomName}</h2>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Room Members</h3>
              <div className="flex space-x-2">
                {chatroom.RoomMembers.split(',').map((member: string, index: number) => (
                  <Avatar
                    key={index}
                    className="h-10 w-10 rounded-lg border-violet-500"
                    style={{ zIndex: chatroom.RoomMembers.length - index }}
                  >
                    <AvatarImage
                      className="h-10 w-10 rounded-full border-2 border-violet-500 text-violet-500 bg-opacity-50 overflow-hidden"
                      src={member}
                    />
                  </Avatar>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Description</h3>
              <p>{chatroom.Description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatRoom;
