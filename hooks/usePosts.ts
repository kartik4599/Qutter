"use client";

import fetcher from "@libs/fetcher";
import useSWR from "swr";
import { userInterFace } from "./useUser";

export interface Post {
  id: string;
  body: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  user: userInterFace;
  comments: any[];
}

const usePosts = (userId?: string) => {
  const url = userId ? `/api/post?userId=${userId}` : "/api/post";

  const { data, error, isLoading, mutate } = useSWR<Post[]>(url, fetcher);

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default usePosts;
