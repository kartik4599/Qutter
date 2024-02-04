import client from "@libs/prismadb";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const userId = req.nextUrl.searchParams.get("userId");

    let posts;

    if (userId) {
      posts = await client.post.findMany({
        where: { userId },
        include: { user: true, comments: true },
        orderBy: { createdAt: "desc" },
      });
    } else {
      posts = await client.post.findMany({
        include: { user: true, comments: true },
        orderBy: { createdAt: "desc" },
      });
    }

    return new Response(JSON.stringify(posts), { status: 200 });
  } catch (e) {
    console.log({ error: e });
    return new Response(JSON.stringify(e), { status: 400 });
  }
};
