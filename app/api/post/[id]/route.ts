import client from "@libs/prismadb";

export const GET = async (
  req: any,
  { params: { id } }: { params: { id: string } }
) => {
  try {
    if (!id) {
      throw new Error("Id not found");
    }

    const post = await client.post.findUnique({
      where: { id },
      include: {
        user: true,
        comments: { include: { user: true }, orderBy: { createdAt: "desc" } },
      },
    });

    return new Response(JSON.stringify(post), { status: 200 });
  } catch (e) {
    return new Response("Error Occured", { status: 400 });
  }
};

export const POST = async (
  req: any,
  { params: { id } }: { params: { id: string } }
) => {
  try {
    const { body } = await req.json();

    if (!id) throw new Error("Id not found");
    if (!body) throw new Error("Missing Data");

    const user = await client.user.findUnique({ where: { id } });
    if (!user) throw new Error("User not found");

    const createdPost = await client.post.create({
      data: { body, userId: id },
    });

    return new Response(JSON.stringify(createdPost), { status: 201 });
  } catch (e) {
    return new Response("Error Occured", { status: 400 });
  }
};
