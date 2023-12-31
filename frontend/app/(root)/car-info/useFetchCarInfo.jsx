"use client";

import { useAuth } from "@clerk/nextjs";
import { useState, useEffect } from "react";

const useFetchCarInfo = () => {
  const { userId } = useAuth();

  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [plate, setPlate] = useState("");
  const [parkingSpaceId, setParkingSpaceId] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const requestUrl = `${process.env.NEXT_PUBLIC_API_URL}get_car_info?user_id=${userId}`;

        const res = await fetch(requestUrl);

        if (!res.ok) {
          throw new Error("請檢查網路連線");
        }

        const responseData = await res.json();
        setData(responseData);

        if (responseData.plate) {
          setPlate(responseData.plate);
        }

        if (responseData.parking_space_id) {
          setParkingSpaceId(responseData.parking_space_id);
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

  return { data, isLoading, error, plate, parkingSpaceId };
};

export default useFetchCarInfo