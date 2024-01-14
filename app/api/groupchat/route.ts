import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";


export async function POST(req: Request) {
  try {
    const {id} = await req.json();

 
    const chatroom = await prismadb.room.findUnique({
        where: {id: id }
    });

    return NextResponse.json(chatroom)
    
  } catch (error: any) {
    console.error(`Error processing room: ${error.message}`);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}


   
