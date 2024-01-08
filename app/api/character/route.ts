import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";


export async function POST(req: Request) {
  try {
    const newCharacter = await req.json();

    console.debug(newCharacter);
    // Ensure newCharacter is an array
    if (!Array.isArray(newCharacter)) {
      throw new Error('Invalid data format. Expected an array.');
    }

    // Iterate over each character and update the database
    for (const character of newCharacter) {
      try {
        await updateCharacterInDatabase(character);
        // Uncomment the following line if you need to update characters in a file
        // await updateCharactersInFile(character);
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

    let createData = {
      HeroName: newCharacter.name,
      category: newCharacter.category,
      NumberOfMessages: 0,
      Image: newCharacter.image,
      Url: newCharacter.url,
      Description: newCharacter.description,
  
    }

    
    const existingHero = await prismadb.herosChatCount.findUnique({
      where: { HeroName: newCharacter.name }
    });

    if (!existingHero) {
      // Hero doesn't exist, so create a new entry
      await prismadb.herosChatCount.create({
        data:  createData 
      });
    }
  } catch (error: any) {
    throw new Error(`Error updating character in the database: ${error.message}`);
  }
}

// Uncomment the following block if you need to update characters in a file
/*
async function updateCharactersInFile(newCharacter: any) {
  try {
    // Update the path to the characters.json file
    // const filePath = './public/characters.json';
    
    // const filePath = process.cwd() + '/tmp/data.json';
    
    // Read the current content of characters.json
    const currentCharacters = await fs.readFile(filePath, 'utf-8');
    const charactersData = JSON.parse(currentCharacters);
    charactersData.push(newCharacter);

    // Add the new character entry to charactersData
  
    // serverless no file storage writing can't do. 

    // Write the updated data back to characters.json
    await fs.writeFile(filePath, JSON.stringify(charactersData, null, 2), 'utf-8');
  } catch (error: any) {
    throw new Error(`Error updating characters in file: ${error.message}`);
  }
}
*/
