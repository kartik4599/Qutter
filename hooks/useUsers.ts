"use client";

import fetcher from "@libs/fetcher";
import useSWR from "swr";
import { userInterFace } from "./useUser";

const useUsers = () => {
  const { data, error, isLoading, mutate } = useSWR<userInterFace[]>(
    "/api/user",
    fetcher
  );

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useUsers;
