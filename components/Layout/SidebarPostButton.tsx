"use client";

import useLoginModal from "@hooks/useLoginModal";
import { useRouter } from "next/navigation";
import { FaFeather } from "react-icons/fa";

const SidebarPostButton = () => {
  const router = useRouter();
  const login = useLoginModal();

  return (
    <div
      onClick={() => {
        login.onOpen();
        router.push("/");
      }}
    >
      <div className="mt-6 ml-2 lg:hidden rounded-full h-14 w-14 p-4 flex items-center bg-pink-500 hover:bg-opacity-80 transition cursor-pointer">
        <FaFeather size={24} color="white" />
      </div>
      <div className="mt-6 ml-2 hidden lg:block px-4 py-2 rounded-full bg-pink-500 hover:bg-opacity-90 cursor-pointer transition">
        <p className="text-center font-semibold text-white text-[20px]">Post</p>
      </div>
    </div>
  );
};

export default SidebarPostButton;
