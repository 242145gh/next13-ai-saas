import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

export async function POST(req: Request) {
  try {
    const newCharacters = await req.json();
    console.log(newCharacters)
    // Ensure newCharacters is an array
    if (!Array.isArray(newCharacters)) {
      throw new Error('Invalid data format. Expected an array.');
    }

    // Iterate over each character and update the database
    for (const newCharacter of newCharacters) {
      try {
        await updateCharacterInDatabase(newCharacter);
      } catch (error: any) {
        console.error(`Error processing character: ${error.message}`);
      }
    }

    return new NextResponse("OK", { status: 200 });

  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

async function updateCharacterInDatabase(newCharacter: any) {
  try {
    const createData = {
      HeroName: newCharacter.name,
      category: newCharacter.category,
      NumberOfMessages: 0,
      Image: newCharacter.image, // Assuming newCharacter.image is Uint8Array
      Url: newCharacter.url,
      Description: newCharacter.description,
    };

    const existingHero = await prismadb.herosChatCount.findUnique({
      where: { HeroName: newCharacter.name }
    });

    if (!existingHero) {
      // Hero doesn't exist, so create a new entry
      await prismadb.herosChatCount.create({
        data: createData,
      });
    }
  } catch (error: any) {
    throw new Error(`Error updating character in the database: ${error.message}`);
  }
}
