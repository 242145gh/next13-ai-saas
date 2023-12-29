// Import necessary modules and dependencies
import { NextResponse } from "next/server";
import prismadb from '@/lib/prismadb';

// Define the POST handler function
export async function POST(req: Request, name: string) {
  try {
    // Fetch data from the database using Prisma
    const messageCount = await prismadb.herosChatCount.findMany({
      where: { HeroName: name },
    });
    
    // Send the data as a JSON response
    return NextResponse.json(messageCount);

  } catch (error) {
    // Handle errors and send an appropriate response
    console.error('Error fetching data:', error);
    // You might want to send a specific error response
    return NextResponse.json({ error: 'Internal Server Error' });
  }
}
