"use client";

import Header from "@components/Header/Header";
import PostFeed from "@components/Post/PostFeed";
import UserBio from "@components/users/UserBio";
import UserHero from "@components/users/UserHero";
import useUser from "@hooks/useUser";
import { useParams } from "next/navigation";
import { Dna } from "react-loader-spinner";

const page = () => {
  const { userId } = useParams();
  const { data: userData, isLoading } = useUser(userId);

  if (isLoading || !userData) {
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

  return (
    <>
      <Header showBackArrow lable={userData?.name} />
      <UserHero userId={userId} />
      <UserBio userId={userId} />
      <PostFeed userId={userId} />
    </>
  );
};
export default page;
