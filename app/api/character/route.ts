import cloudinary from 'cloudinary';
import { NextResponse } from 'next/server';
import prismadb from '@/lib/prismadb';

export async function POST(req: Request) {
  try {
    const newCharacter = await req.json();

    console.debug('request debug: ', newCharacter);
    // Ensure newCharacter is an array
    if (!Array.isArray(newCharacter)) {
      throw new Error('Invalid data format. Expected an array.');
    }

    // Iterate over each character and update the database
    for (const character of newCharacter) {
      try {
        const imageUrl = await uploadToCloudinary(character.image);
        await updateCharacterInDatabase({ ...character, image: imageUrl });
      } catch (error: any) {
        console.error(`Error processing character: ${error.message}`);
      }
    }

    return new NextResponse('OK', { status: 200 });
  } catch (error) {
    console.error(error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

async function updateCharacterInDatabase(character: any) {
  try {
    const createData = {
      HeroName: character.name,
      category: character.category,
      NumberOfMessages: 0,
      Image: character.image,
      Url: character.url,
      Description: character.description,
    };

    const existingHero = await prismadb.herosChatCount.findUnique({
      where: { id: createData.HeroName },
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

async function uploadToCloudinary(image: string) {
  try {
    // Configure Cloudinary with your Cloudinary credentials
    cloudinary.v2.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
      secure: true,
    });

    // Upload the image to Cloudinary
    const result = await cloudinary.v2.uploader.upload(image);

    // Return the URL of the uploaded image
    console.log(result.secure_url);

    return result.secure_url;


  } catch (error: any) {
    throw new Error(`Error uploading image to Cloudinary: ${error.message}`);
  }
}

  

