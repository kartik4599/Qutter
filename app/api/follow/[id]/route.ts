import client from "@libs/prismadb";

export const DELETE = async (
  req: any,
  { params: { id } }: { params: { id: string } }
) => {
  try {

    const followRecord = await client.follow.findUnique({
      where: { id },
    });

    if (!followRecord) throw new Error("Record Not Found");

    await client.follow.delete({ where: { id } });

    return new Response("UnFollowed successfully", { status: 201 });
  } catch (e) {
    console.log(e);
    return new Response("Error Occured", { status: 400 });
  }
};
