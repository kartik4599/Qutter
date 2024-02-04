import ImageUpload from "@components/ImageUpload";
import Input from "@components/Input";
import useEditModal from "@hooks/useEditModal";
import useUser, { userInterFace } from "@hooks/useUser";
import useUsers from "@hooks/useUsers";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Modal from "./Modal";

const EditModal = () => {
  const [loggedUser, setLoggedUser] = useState<userInterFace>({
    id: "",
    name: "",
    username: "",
    bio: "",
    email: "",
    emailVerified: new Date(),
    image: "",
    coverImage: "",
    profileImage: "",
    hashPassword: "",
    hasNotification: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    following: [],
    followers: [],
  });
  const { data: alldata } = useUsers();
  const { mutate: mutateUser } = useUser(loggedUser.id);
  const { isOpen, onClose } = useEditModal();
  const { data: userData } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const loggedUser = alldata?.find(
      (user) => user.email === userData?.user?.email
    );
    if (loggedUser) setLoggedUser(loggedUser);
    setIsLoading(false);
  }, [alldata?.length, userData?.user?.email]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <ImageUpload
        value={loggedUser.profileImage}
        disable={isLoading}
        onChange={(image: string) =>
          setLoggedUser((pre) => {
            return { ...pre, profileImage: image };
          })
        }
        label="Upload Profile Image"
      />
      <ImageUpload
        value={loggedUser.coverImage}
        disable={isLoading}
        onChange={(image: string) =>
          setLoggedUser((pre) => {
            return { ...pre, coverImage: image };
          })
        }
        label="Upload Profile Image"
      />
      <Input
        placeholder="Name"
        value={loggedUser?.name}
        disabled={isLoading}
        onChange={(e) => setLoggedUser({ ...loggedUser, name: e.target.value })}
      />
      <Input
        placeholder="Username"
        value={loggedUser?.username}
        disabled={isLoading}
        onChange={(e) =>
          setLoggedUser({ ...loggedUser, username: e.target.value })
        }
      />
      <Input
        placeholder="Bio"
        value={loggedUser?.bio}
        disabled={isLoading}
        onChange={(e) => setLoggedUser({ ...loggedUser, bio: e.target.value })}
      />
    </div>
  );

  const submitHandler = async () => {
    try {
      setIsLoading(true);
      if (!loggedUser.id) return;
      await axios.put(`/api/edit/${loggedUser.id}`, loggedUser);
      toast.success("Saved");
      mutateUser();
      onClose();
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      disabled={isLoading}
      isOpen={isOpen}
      title="Edit your profile"
      actionLable="Save"
      onClose={onClose}
      onSubmit={submitHandler}
      body={bodyContent}
    />
  );
};

export default EditModal;
