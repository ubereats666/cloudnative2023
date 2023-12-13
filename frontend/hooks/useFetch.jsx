"use client";

import { useUser } from "@clerk/nextjs";
import { useState, useEffect } from "react";

const useFetch = (url = "", queryParams = {}) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log(queryParams);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const queryString = new URLSearchParams(queryParams).toString();
        const requestUrl = `${process.env.NEXT_PUBLIC_API_URL}${url}${
          queryString ? `?${queryString}` : ""
        }`;

        const res = await fetch(requestUrl);
        if (!res.ok) {
          throw new Error("請檢查網路連線");
        }
        const responseData = await res.json();
        setData(responseData);
      } catch (error) {
        setError("發生錯誤，請稍後再試");
        console.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, isLoading, error };
};

export default useFetch;
