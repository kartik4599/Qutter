import client from "@libs/prismadb";
import { NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const { postId, currentId } = await req.json();

    const previousLike = await client.like.findUnique({
      where: { postId_userId: { postId, userId: currentId } },
    });

    if (!previousLike) {
      await client.like.create({
        data: { postId, userId: currentId },
      });

      return new Response(JSON.stringify({ error: false, message: "Liked" }), {
        status: 200,
      });
    }

    await client.like.delete({
      where: { postId_userId: { postId, userId: currentId } },
    });

    return new Response(JSON.stringify({ error: false, message: "Un-liked" }), {
      status: 200,
    });
  } catch (e) {
    return new Response(
      JSON.stringify({ error: true, message: "Error Occuured" }),
      { status: 400 }
    );
  }
};
