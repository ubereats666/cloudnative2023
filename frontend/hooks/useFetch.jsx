"use client";

import { useState, useEffect } from "react";

const useFetch = (url = "", params = {}) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const requestUrl = `${process.env.NEXT_PUBLIC_API_URL}${url}`;

        const res = await fetch(requestUrl, params);

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
