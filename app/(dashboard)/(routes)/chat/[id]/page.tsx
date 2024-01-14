"use client"
import { Menu, MessageCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { Heading } from "@/components/heading";
import { Heros } from "@/components/hero";
import { Loader } from "@/components/loader";
import axios from "axios";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import React, { useState, useEffect } from "react";

export default function ChatRoomPage({ params }: { params: { id: string } }) {
  const [avatars, setAvatars] = React.useState<string[]>([]);
  const [roomMembers, setRoomMembers] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          `http://localhost:3006/api/groupchat`,
          {
            id: params.id,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        console.log(response.data);
        setAvatars(response.data.Url.split(',').map((url: string) => url.trim()));
        setRoomMembers(response.data.RoomMembers || null);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [params.id]);

  return (
    <>
      <div>
        <Heading
          title={roomMembers}
          description="Chat with User defined Members or create your own!"
          icon={MessageCircle}
          iconColor="text-violet-700"
          bgColor="bg-violet-500/30"
        />
      </div>

      {/*<div className="text-xl font-bold ">{params.id}</div>*/}

      {avatars.map((url: string, index: number) => (
        <Avatar
          key={index}
          style={{
            zIndex: avatars.length - index,
            left: 40,
            marginTop: index !== 0 ? '1rem' : 0, // Add margin to separate avatars
          }}
        >
          <AvatarImage
            key={index}
            className="flex h-10 w-10 rounded-full border-2 border-violet-500 text-violet-500 bg-opacity-50 overflow-hidden"
            src={url}
          />
        </Avatar>
      ))}
    </>
  );
}
