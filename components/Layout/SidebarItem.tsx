import useLoginModal from "@hooks/useLoginModal";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useCallback } from "react";
import { IconType } from "react-icons";

interface sidebarinferface {
  href: string;
  label: string;
  icon: IconType;
  onClick?: () => void;
  auth: boolean;
}

const SidebarItem: React.FC<sidebarinferface> = ({
  href,
  icon: Icon,
  label,
  onClick,
  auth,
}) => {
  const router = useRouter();
  const { data } = useSession();
  const loginModal = useLoginModal();

  const handleClick = useCallback(() => {
    if (onClick) {
      return onClick();
    }
 
    if (auth && !data) {
      loginModal.onOpen();
    } else if (href) {
      router.push(href);
    }
  }, [onClick, router, href, auth, data, loginModal]);

  return (
    <div onClick={handleClick} className="flex flex-row items-center">
      <div className="relative rounded-full h-14 w-14 flex items-center p-4 hover:bg-slate-300 hover:bg-opacity-10 cursor-pointer lg:hidden">
        <Icon size={28} color="white" />
      </div>
      <div className="relative hidden lg:flex items-center gap-4 p-4 rounded-full hover:bg-slate-300 hover:bg-opacity-10 cursor-pointer">
        <Icon size={28} color="white" />
        <p className="hidden lg:block text-white text-xl">{label}</p>
      </div>
    </div>
  );
};

export default SidebarItem;
