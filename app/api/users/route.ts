// /app/api/posts/feed.ts

import { NextApiRequest, NextApiResponse } from 'next';
import prismadb from '@/lib/prismadb';
import Cors from 'cors';

const cors = Cors({
  methods: ['GET'], // Adjust based on your requirements
});

export default async function get(req: NextApiRequest, res: NextApiResponse) {

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const herosChatCount = await prismadb.herosChatCount.findMany({
      where: { HeroName: "James Bond (Sean Connery)" },
    });
    res.json(herosChatCount);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
function next(err?: any) {
  throw new Error('Function not implemented.');
}

