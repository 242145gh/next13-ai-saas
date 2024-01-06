import { NextResponse } from "next/server";
import fs from 'fs/promises';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '1mb', // Set the limit according to your needs
    },
  },
};

export async function POST(req: Request) {
  try {
    // Parse the incoming JSON data
    const updatedCharacters = await req.json();

    await updateCharactersInFile(updatedCharacters);

    // Return a JSON success response
    return new NextResponse({
      status: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: "Character updated successfully" }),
    });
  } catch (error) {
    console.error("Error handling the request:", error);

    // Return a JSON error response
    return new NextResponse({
      status: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: "Internal Server Error" }),
    });
  }
}

async function updateCharactersInFile(updatedCharacters) {
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
