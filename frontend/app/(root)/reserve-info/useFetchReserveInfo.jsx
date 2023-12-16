"use client"

import { useState, useEffect } from "react";
import { useAuth } from "@clerk/nextjs";


const useFetchReserveInfo = () => {
  const { userId } = useAuth();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [floor, setFloor] = useState("");
  const [number, setNumber] = useState("");
  const [expireTime, setExpireTime] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const requestUrl = `${process.env.NEXT_PUBLIC_API_URL}get_reserve_info?user_id=${userId}`;

        const res = await fetch(requestUrl);

        if (!res.ok) {
          throw new Error("請檢查網路連線");
        }

        const responseData = await res.json();
        setData(responseData);

        if (responseData.floor) {
          setFloor(responseData.floor);
        }

        if (responseData.number) {
          setNumber(responseData.number);
        }

        if (responseData.expired_time) {
          setExpireTime(responseData.expired_time);
        }
      } catch (error) {
        setError("發生錯誤，請稍後再試");
        console.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, isLoading, error, floor, number, expireTime };
};

export default useFetchReserveInfo;