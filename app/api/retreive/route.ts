import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

export default async function POST(req: Request) {
  try {
    // Assuming you want to retrieve data from prismadb.herosChatCount
    const chatCountData = await prismadb.herosChatCount.findUnique({
      where: { HeroName: "Super Woman"  }
    });

    // You can do something with the retrieved data here
   // console.log("Retrieved data:", chatCountData);

    // Return a response
    return new NextResponse("Got all records", { status: 200 });
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
