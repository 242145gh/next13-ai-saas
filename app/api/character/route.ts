import { NextApiResponse } from "next";
import fs from 'fs/promises';

export default async function POST(req: Request, res: NextApiResponse) {
  try {
    // Parse the incoming JSON data
    const newCharacter = await req.json();

    // Ensure newCharacter is an array
    if (!Array.isArray(newCharacter)) {
      throw new Error('Invalid data format. Expected an array.');
    }

    // Iterate over each character and update the file
    for (const character of newCharacter) {
      await updateCharactersInFile(character);
    }

    res.status(200).json({ message: "Character updated successfully" });
  } catch (error) {
    console.error("Error handling the request:", error);

     // Return a JSON error response
     res.status(500).json({ error: "Internal Server Error" });
  }
}

async function updateCharactersInFile(newCharacter: any) {
  try {
    // Update the path to the characters.json file
    const filePath = './public/characters.json';

    // Read the current content of characters.json
    const currentCharacters = await fs.readFile(filePath, 'utf-8');
    const charactersData = JSON.parse(currentCharacters);

    // Add the new character entry to charactersData
    charactersData.push(newCharacter);

    // Write the updated data back to characters.json
    await fs.writeFile(filePath, JSON.stringify(charactersData, null, 2), 'utf-8');
  } catch (error) {
    throw new Error(`Error updating characters in file: ${error.message}`);
  }
}
