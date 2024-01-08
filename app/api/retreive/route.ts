import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

export async function POST(req: Request) {
  try {
    
    const existingHero = await prismadb.herosChatCount.findMany({
      where: {HeroName: undefined}
    }
    );
    

    return new NextResponse("got all records", { status: 200 });

  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
