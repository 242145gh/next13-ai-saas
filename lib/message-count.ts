import prismadb from "@/lib/prismadb";

export const getMessageCount = async (name: string) => {

    const messageCount = prismadb.herosChatCount.findMany({
        where: {HeroName: name},
    });

   return messageCount;

}