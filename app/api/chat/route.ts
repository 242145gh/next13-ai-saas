import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";


export async function GET() {
  try {
    const chatroom = await prismadb.room.findMany()

      return NextResponse.json(chatroom)
    
  } catch (error) {
    console.error(`Error processing room: ${error.message}`);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}


   
