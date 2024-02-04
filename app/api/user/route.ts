import client from "@libs/prismadb";

export const GET = async () => {
  try {
    const users = await client.user.findMany({
      orderBy: { createdAt: "desc" },
    });

    return new Response(JSON.stringify(users), { status: 201 });
  } catch (e) {
    return new Response("Error Occured", { status: 400 });
  }
};
