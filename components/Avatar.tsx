import useUser from "@hooks/useUser";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useCallback } from "react";

interface AvatarProps {
  userId: string;
  isLarge?: boolean;
  hasBorder?: boolean;
}

const Avatar: React.FC<AvatarProps> = ({ userId, hasBorder, isLarge }) => {
  const router = useRouter();
  const { data: userData } = useUser(userId);

  const onClick = useCallback(
    (event: any) => {
      event.stopPropagation();
      router.push(`/users/${userId}`);
    },
    [userId, router]
  );

  return (
    <div
      className={`
      ${hasBorder && "border-4 border-black"}
      ${isLarge ? "h-32 w-32" : "h-12 w-12"}
      rounded-full
      hover:opacity-90
      transition
      cursor-pointer
      relative
      `}
    >
      <Image
        fill
        style={{ borderRadius: "100%", objectFit: "cover" }}
        alt="avatar"
        onClick={onClick}
        src={userData?.profileImage || "/images/defaultProfilePic.png"}
      />
    </div>
  );
};

export default Avatar;
