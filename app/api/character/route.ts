import { NextApiResponse } from "next";
import fs from 'fs/promises';


export async function POST(req: Request, res: NextApiResponse ) {
  try {
    // Parse the incoming JSON data
    const updatedCharacters = await req.json();

    await updateCharactersInFile(updatedCharacters);

    return res.status(200).json({ message: "Success" });
  } catch (error) {
    console.error("Error handling the request:", error);
    return res.status(500).json({ error: "Internal Server Error" });
 
  }
}

async function updateCharactersInFile(updatedCharacters: any) {
  try {
    // Update the path to the characters.json file
    const filePath = './public/characters.json';

    // Read the current content of characters.json
    const currentCharacters = await fs.readFile(filePath, 'utf-8');
    const charactersData = JSON.parse(currentCharacters);

    console.debug("character data", charactersData);
    console.debug("updatedCharacters data", updatedCharacters);

    // Assuming updatedCharacters is an array, update the charactersData
    if (Array.isArray(updatedCharacters)) {
      charactersData.push(...updatedCharacters);
    } else {
      throw new Error('Invalid data format. Expected an array.');
    }

    // Write the updated data back to characters.json
    await fs.writeFile(filePath, JSON.stringify(charactersData, null, 2), 'utf-8');
  } catch (error) {
    throw new Error(`Error updating characters in file: ${error.message}`);
  }
}
