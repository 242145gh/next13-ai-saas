import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";


export async function POST(req: Request) {
  try {
    const newRoom = await req.json();

 
    console.log(newRoom);
    const newRoomData = {
        RoomName: newRoom.nameRoom,
        RoomMembers: newRoom.groupMembers,
        Description: newRoom.describeRoom,
        Url: newRoom.avatarUrls
    };
    const existingRoom = await prismadb.herosChatCount.findUnique({
        where: { id: newRoomData.RoomName }
      });
  
      if (!existingRoom) {
    
      await prismadb.room.create({
        data: newRoomData,
      });

    }

      return new NextResponse("OK", { status: 200 });
    
  } catch (error) {
    console.error(`Error processing room: ${error.message}`);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}


   
