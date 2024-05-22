import { error } from "console";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";



const openai = new OpenAI(
    { apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY })

export default async function Post(req: NextApiRequest, res: NextApiResponse) {
    console.log("зашли", process.env.NEXT_PUBLIC_OPENAI_API_KEY)
    const { imagePrompt } = await req.body
    console.log("imagePrompt = ", imagePrompt)

    if (!imagePrompt) {
        res.status(400).json({ error: 'Please provide an image prompt' });
        return;
    }
    try {
        const { data } = await openai.images.generate({
            model: "dall-e-2",
            prompt: imagePrompt,
            n: 1,
            size: "256x256"
        })
        if (!data) {
            throw new Error('Failed to generate image')

        }
        res.status(200).json({ data });
    }
    catch (e) {
        console.error(e)
        res.status(500).json({
            error: 'Failed to generate image due to internal server error'
        });
    }
}