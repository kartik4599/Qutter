import bcrypt from "bcrypt";
import client from "@libs/prismadb";

export const POST = async (req: any) => {
  try {
    const { email, username, name, password } = await req.json();

    const hashPassword = await bcrypt.hash(password, 10);
    console.log({ email, username, name, password, hashPassword });

    const user = await client.user.create({
      data: { email, username, name, hashPassword },
    });

    return new Response(
      JSON.stringify({ message: "Account Created", data: user }),
      { status: 201 }
    );
  } catch (e) {
    console.log(e);
    return new Response("Failed", { status: 500 });
  }
};
