"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
const SidebarLogo = () => {
  const router = useRouter();

  return (
    <div onClick={() => router.push("/")} className="px-4 cursor-pointer ">
      <Image src={"/logo.png"} alt={""} width={60} height={60} />
    </div>
  );
};

export default SidebarLogo;
