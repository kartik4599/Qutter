import Button from "@components/Button";
import useEditModal from "@hooks/useEditModal";
import useFollow from "@hooks/useFollow";
import useUser from "@hooks/useUser";
import useUsers from "@hooks/useUsers";
import axios from "axios";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import { useMemo } from "react";
import { toast } from "react-hot-toast";
import { BiCalendar } from "react-icons/bi";

interface UserBio {
  userId: string;
}

const UserBio: React.FC<UserBio> = ({ userId }) => {
  const { data: userData, mutate: mutateUser } = useUser(userId);
  const { data: loggedinUser } = useSession();
  const { isFollow, followHandler } = useFollow(
    userId,
    loggedinUser?.user?.email ? loggedinUser?.user?.email : ""
  );

  const editModal = useEditModal();

  const createdAt = useMemo(() => {
    if (!userData) return null;

    return format(new Date(userData?.createdAt || ""), "MMMM yyyy");
  }, [userData?.createdAt]);

  return (
    <div className="border-b-[1px] border-neutral-800 pb-4">
      <div className="flex justify-end p-2">
        {loggedinUser?.user?.email === userData?.email ? (
          <Button lable="Edit" onClick={editModal.onOpen} />
        ) : (
          <Button
            lable={isFollow ? "Leave" : "Favorite"}
            secondary={isFollow}
            onClick={followHandler}
          />
        )}
      </div>
      <div className="mt-8 px-4">
        <div className="flex flex-col">
          <p className="text-white text-2xl font-semibold">{userData?.name}</p>
          <p className="text-md text-pink-300">@{userData?.username}</p>
        </div>
        <div className="flex flex-col mt-4">
          <p className="text-white">{userData?.bio}</p>
          <div className="flex flex-row items-center gap-2 mt-4 text-neutral-500">
            <BiCalendar size={24} />
            <p>Joined {createdAt}</p>
          </div>
        </div>
        <div className="flex flex-row items-center mt-4 gap-6">
          <div className="flex flex-row items-center gap-1">
            <p className="text-white">{userData?.following.length}</p>
            <p className="text-neutral-500">following</p>
          </div>
          <div className="flex flex-row items-center gap-1">
            <p className="text-white">{userData?.followers.length}</p>
            <p className="text-neutral-500">Follower</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserBio;
