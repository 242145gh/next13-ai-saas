import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from "openai";

import { checkSubscription } from "@/lib/subscription";
import { incrementApiLimit, checkApiLimit } from "@/lib/api-limit";
import prismadb from "@/lib/prismadb";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
  basePath: "https://api.pulze.ai/v1"
  
});

const openai = new OpenAIApi(configuration);

const instructionMessage: ChatCompletionRequestMessage = {
  role: "system",
  content: "Your name is Arnold Schwarzenegger. You must answer only as Arnold Schwarzenegger for explanations."
};


export async function POST(
  req: Request
) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { messages  } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!configuration.apiKey) {
      return new NextResponse("OpenAI API Key not configured.", { status: 500 });
    }

    if (!messages) {
      return new NextResponse("Messages are required", { status: 400 });
    }

    const freeTrial = await checkApiLimit();
    const isPro = await checkSubscription();

    if (!freeTrial && !isPro) {
      return new NextResponse("Free trial has expired. Please upgrade to pro.", { status: 403 });
    }

    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [instructionMessage, ...messages]
    });


    const HerosChatCount = await prismadb.herosChatCount.findUnique({
      where: { HeroName: "Arnold Schwarzenegger"   },
    });
    
    if (HerosChatCount) {
      await prismadb.herosChatCount.update({
        where: { HeroName: "Arnold Schwarzenegger" },
        data: { NumberOfMessages: HerosChatCount.NumberOfMessages + 1 },
      });
    } else {
      await prismadb.herosChatCount.create({
        data: { HeroName: "Arnold Schwarzenegger", NumberOfMessages: 1 },
      });
    }

    if (!isPro) {
      await incrementApiLimit();
    }

    return NextResponse.json(response.data.choices[0].message);
  } catch (error) {
    console.log('[CONVERSATION_ERROR]', error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};
