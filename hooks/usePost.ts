"use client";

import fetcher from "@libs/fetcher";
import useSWR from "swr";
import { Post } from "./usePosts";

const usePost = (postId: string) => {

  const { data, error, isLoading, mutate } = useSWR<Post>(
    `/api/post/${postId}`,
    fetcher
  );

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default usePost;
