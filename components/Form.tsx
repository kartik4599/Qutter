"use client"

import useLoginModal from "@hooks/useLoginModal";
import usePosts from "@hooks/usePosts";
import useRegisterModal from "@hooks/useRegesterModal";
import useUsers from "@hooks/useUsers";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { Dna } from "react-loader-spinner";
import Avatar from "./Avatar";
import Button from "./Button";

interface FormProps {
  placeholder: string;
  isComment?: boolean;
  postId?: string;
}

const Form: React.FC<FormProps> = ({ placeholder, isComment, postId }) => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  const { mutate: mutatePosts } = usePosts(postId);
  const { data: loggedUser, status } = useSession();
  const { data: allUsers } = useUsers();

  const [body, setBody] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-full">
        <Dna
          visible={true}
          height="100"
          width="100"
          ariaLabel="dna-loading"
          wrapperStyle={{}}
          wrapperClass="dna-wrapper"
        />
      </div>
    );
  }

  const onSubmit = async () => {
    try {
      setIsLoading(true);
      const id = allUsers?.find(
        (user) => user.email === loggedUser?.user?.email
      )?.id;

      
      await axios.post(`/api/post/${id}`, { body });

      toast.success("Post Created");
      setBody("");
      mutatePosts();
    } catch (e) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="border-b-[1px] border-neutral-800 px-5 py-2">
      {loggedUser?.user ? (
        <div className="flex flex-row gap-4">
          <div>
            <Avatar
              userId={
                allUsers?.find((user) => user.email === loggedUser?.user?.email)
                  ?.id || ""
              }
            />
          </div>
          <div className="w-full">
            <textarea
              disabled={isLoading}
              value={body}
              placeholder={placeholder}
              onChange={(e) => setBody(e.target.value)}
              className="disabled:opacity-80 peer resize-none mt-3 w-full bg-black ring-0 outline-none text-[20px] placeholder-neutral-500 text-white"
            />
            <hr className="opacity-0 peer-focus:opacity-100 h-[1px] w-full border-neutral-800 transition" />
            <div className="mt-4 flex flex-row justify-end text-sm">
              <Button
                disabled={isLoading || !body}
                onClick={onSubmit}
                lable="Post"
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="py-8">
          <h1 className="text-white text-2xl text-center mb-4 font-bold">
            Welcome to Quitter
          </h1>
          <div className="flex flex-row items-center justify-center gap-4 text-lg">
            <Button lable="Login" onClick={loginModal.onOpen} />
            <Button lable="Register" secondary onClick={registerModal.onOpen} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Form;
