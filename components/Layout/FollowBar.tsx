import Avatar from "@components/Avatar";
import useUsers from "@hooks/useUsers";
import React from "react";

const FollowBar = () => {
  const { data: userData } = useUsers() as { data: any[] };

  if (!userData) return null;
  if (userData && userData.length === 0) return null;

  return (
    <div className="px-6 py-4 hidden lg:block">
      <div className="bg-pink-400 bg-opacity-20	rounded-xl p-4">
        <h2 className="text-white text-xl font-semibold">Who to follow</h2>
        <div className="flex flex-col gap-4 mt-4">
          {userData.map((user: Record<string, any>) => (
            <div key={user.id} className="flex flex-row gap-4">
              <Avatar userId={user.id} />
              <div className="flex flex-col">
                <p className="text-white font-semibold text-sm">{user.name}</p>
                <p className="text-pink-200 text-sm">@{user.username}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FollowBar;
