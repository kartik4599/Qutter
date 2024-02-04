import Avatar from "@components/Avatar";
import useUser from "@hooks/useUser";
import Image from "next/image";
import React from "react";

interface UserHeroInterFace {
  userId: string;
}

const UserHero: React.FC<UserHeroInterFace> = ({ userId }) => {
  const { data: userData } = useUser(userId);

  return (
    <div>
      <div className="bg-neutral-700 h-44 relative">
        {userData?.coverImage && (
          <Image
            src={userData.coverImage}
            fill
            alt="cover image"
            style={{ objectFit: "cover" }}
          />
        )}
        <div className="absolute -bottom-16 left-4">
          <Avatar userId={userId} isLarge hasBorder />
        </div>
      </div>
    </div>
  );
};

export default UserHero;
