import axios from "axios";
import { toast } from "react-hot-toast";
import useLoginModal from "./useLoginModal";
import useUser from "./useUser";
import useUsers from "./useUsers";

const useFollow = (userId: string, loggedUserEmail: string) => {
  const { data: userData, mutate: mutateUser } = useUser(userId);
  const { data: allUsers } = useUsers();
  const { onOpen } = useLoginModal();

  const followInfo = userData?.followers.find(
    (follow) => follow.following.email === loggedUserEmail
  );

  const followHandler = async () => {
    if (!followInfo) {
      const currentUser = allUsers?.find(
        (user) => user.email === loggedUserEmail
      );
      if (currentUser) {
        await axios.post(`/api/follow`, { userId, currentId: currentUser.id });
        toast.success("Followed");
      } else {
        onOpen();
      }
    } else {
      await axios.delete(`/api/follow/${followInfo.id}`);
      toast.success("Un-Followed");
    }
    mutateUser();
  };

  return { followHandler, isFollow: followInfo ? true : false };
};

export default useFollow;
