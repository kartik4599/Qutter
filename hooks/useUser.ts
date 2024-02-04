"use client";

import fetcher from "@libs/fetcher";
import useSWR from "swr";

export interface userInterFace {
  id: string;
  name: string;
  username: string;
  bio: string;
  email: string;
  emailVerified: Date;
  image: string;
  coverImage: string;
  profileImage: string;
  hashPassword: string;
  hasNotification: boolean;
  createdAt: Date;
  updatedAt: Date;
  followers: {
    id: string;
    followerId: string;
    followingID: string;
    following: userInterFace;
  }[];
  following: {
    id: string;
    followerId: string;
    followingID: string;
    following: userInterFace;
  }[];
}

const useUser = (userId: string) => {
  const { data, error, isLoading, mutate } = useSWR<userInterFace>(
    userId ? `/api/user/${userId}` : null,
    fetcher
  );

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useUser;
