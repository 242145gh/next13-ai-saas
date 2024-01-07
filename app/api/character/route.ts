import type { NextApiRequest, NextApiResponse } from 'next';
import {NextResponse} from "next/server";
import fs from 'fs/promises';


export async function POST(req: Request) {
  try {
   
      const newCharacter = await req.json();

      // Ensure newCharacter is an array
      if (!Array.isArray(newCharacter)) {
        throw new Error('Invalid data format. Expected an array.');
      }

      // Iterate over each character and update the file
      for (const character of newCharacter) {
        await updateCharactersInFile(character);
      }

      return new NextResponse("OK", { status: 200 });
   
  } catch (error) {
    console.error(error);
    return new NextResponse("500", { status: 500 });
  }
}

async function updateCharactersInFile(newCharacter: any) {
  try {
    // Update the path to the characters.json file
    // locally this directory const filePath = './public/characters.json';
    
    // Read the current content of characters.json
    const currentCharacters = await fs.readFile(process.cwd() + '/app/characters.json', 'utf-8');
    const charactersData = JSON.parse(currentCharacters);

    // Add the new character entry to charactersData
    charactersData.push(newCharacter);

    // Write the updated data back to characters.json
    await fs.writeFile(process.cwd() + '/app/characters.json', JSON.stringify(charactersData, null, 2), 'utf-8');
  } catch (error: any) {
    throw new Error(`Error updating characters in file: ${error.message}`);
  }
}
