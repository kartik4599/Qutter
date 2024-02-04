"use client"

import Form from "@components/Form";
import Header from "@components/Header/Header";
import React from "react";
import PostCard from "@components/Post/PostCard";
import { useParams } from "next/navigation";
import usePost from "@hooks/usePost";
import { Dna } from "react-loader-spinner";

const page = () => {
  const { id } = useParams();

  const { data: postData, isLoading } = usePost(id);

  if (isLoading || !postData) {
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
      <Header lable="Post" showBackArrow />
      <PostCard data={postData} />
      <Form postId={postData.id} isComment placeholder="Comment here" />
    </>
  );
};

export default page;
