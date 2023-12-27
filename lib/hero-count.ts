import prismadb from "@/lib/prismadb";

export const getHeroCount = async (name: string): Promise<number> => {
  try {
    const HerosChatCount = await prismadb.herosChatCount.findUnique({
      where: {
        HeroName: name
      },
    });

    return HerosChatCount.NumberOfMessages || 0;
  } catch (error) {
    console.error(`Error fetching hero count for ${name}:`, error);
    return 0;
  }
};
