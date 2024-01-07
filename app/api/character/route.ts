
import fs from 'fs/promises';

export async function POST(req: Request) {


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

        return new Response("Hello, 200 Next.js!");
      } catch (error: any) {
        console.error("Error handling the request:", error);

        return new Response("Hello, 500 Next.js!");
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
}