import client from "@libs/prismadb";

export const PUT = async (
  req: any,
  { params: { id } }: { params: { id: string } }
) => {
  try {
    const { name, username, bio, profileImage, coverImage } = await req.json();

    if (!name || !username) {
      throw new Error("Missing Fields");
    }

    const updatedUser = await client.user.update({
      where: { id },
      data: { name, username, bio, profileImage, coverImage },
    });

    return new Response(JSON.stringify(updatedUser), { status: 201 });
  } catch (e) {
    console.log(e);
    return new Response(JSON.stringify({ message: e }), {
      status: 400,
    });
  }
};
