"use client";

import fetcher from "@libs/fetcher";
import useSWR from "swr";

const useCurrentUser = (username: string) => {
  const { data, error, isLoading, mutate } = useSWR(
    `/api/current/${username}`,
    fetcher
  );

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useCurrentUser;
