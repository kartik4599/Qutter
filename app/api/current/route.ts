import serverAuth from "@libs/serverAuth";

export const GET = async (req: any) => {
  try {
    const { currentUser } = await serverAuth(req);
    return new Response(JSON.stringify(currentUser), { status: 201 });
  } catch (e) {
    console.log(e);
    return new Response(JSON.stringify({ message: "Current User not found" }), {
      status: 500,
    });
  }
};
