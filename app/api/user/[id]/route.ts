import client from "@libs/prismadb";
import { NextRequest } from "next/server";

export const GET = async (
  req: NextRequest,
  { params: { id } }: { params: { id: string } }
) => {
  try {
    if (!id) {
      throw new Error("Invaild user id");
    }

    const user = await client.user.findUnique({
      where: { id },
      include: {
        followers: {
          include: { following: true },
        },
        following: true,
      },
    });

    if (!user) throw new Error("User not found");

    return new Response(JSON.stringify(user), {
      status: 200,
    });
  } catch (e) {
    console.log(e);
    return new Response("Error Occured", { status: 400 });
  }
};
