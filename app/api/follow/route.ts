import client from "@libs/prismadb";

export const POST = async (req: any) => {
  try {
    const { userId, currentId } = await req.json();

    if (!userId || !currentId) throw new Error("Invalid data");

    const currentUser = await client.user.findUnique({
      where: { id: currentId },
    });

    const followUser = await client.user.findUnique({ where: { id: userId } });

    if (!currentUser || !followUser) throw new Error("Invalid User");

    await client.follow.create({
      data: { followingId: currentUser.id, followerId: followUser.id },
    });

    return new Response("Followed successfully", { status: 201 });
  } catch (e) {
    console.log(e);
    return new Response("Error Occured", { status: 400 });
  }
};
