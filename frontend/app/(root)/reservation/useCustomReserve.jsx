"use client";

import { useAuth } from "@clerk/nextjs";
import { useState } from "react";

const useCustomReserve = () => {
  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { userId } = useAuth();

  const customReserve = async (parking_space_id) => {
    setIsLoading(true);

    try {
      const requestUrl = `${process.env.NEXT_PUBLIC_API_URL}create_record`;

      const res = await fetch(requestUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: userId, parking_space_id }),
      });

      const data = await res.json();
      setResponse(data);

      if (data.isSuccess) {
        return { isSuccess: true, message: "預約成功" };
      }

      return { isSuccess: false, message: "預約失敗" };
    } catch (error) {
      return { isSuccess: false, message: "預約失敗" };
    } finally {
      setIsLoading(false);
    }
  };

  return { response, isLoading, customReserve };
};

export default useCustomReserve;
