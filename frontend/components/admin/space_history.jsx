"use client"

import { useEffect, useState } from "react";
import { Skeleton } from "../ui/skeleton";
import useFetchHistory from "./hooks/useFetchHistory";


const SpaceHistory = ({ date, spaceSelected }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [history, setHistory] = useState([]);

  const onChange = async () => {
    const y = date.getFullYear();
    const m = date.getMonth() + 1;
    const d = date.getDate();

    const date_string = y + '-' + String(m).padStart(2, '0') + '-' + String(d).padStart(2, '0');

    setIsLoading(true)
    const data = await useFetchHistory({ date: date_string, parking_space_id: spaceSelected });
    setIsLoading(false)

    if (!data || data.err_msg) {
      setError(true)
    } else {
      setHistory(data)
    }
  }

  useEffect(() => {
    if (spaceSelected) {
      onChange();
    }
  }, [date, spaceSelected])

  if (!spaceSelected) {
    return <div className="w-full h-full bg-orange-100 rounded-2xl p-8 text-center text-gray-500">請先選擇車位</div>
  }

  if (isLoading) {
    return <Skeleton className="w-full h-full" />;
  }

  if (error) {
    return (
      <div className="bg-slate-200 rounded-xl font-normal h-full w-full flex justify-center items-center">
        發生錯誤，請稍後再試
      </div>
    );
  }

  function convertToHoursAndMinutes(durationInMinutes) {
    const hours = Math.floor(durationInMinutes / 60); // 取得小時數
    const minutes = Math.floor(durationInMinutes % 60); // 取得剩餘的分鐘數

    const formattedHours = String(hours).padStart(2, "0"); // 轉換成兩位數的小時
    const formattedMinutes = String(minutes).padStart(2, "0"); // 轉換成兩位數的分鐘

    return `${formattedHours}h${formattedMinutes}m`; // 回傳格式化後的字串
  }

  const numOfRecords = history.length;

  return (
    <div className="flex flex-row">
      <div className="flex flex-col items-center justify-center px-4">
        <p className="text-48 lg:text-[96px] text-green-4 font-medium">{numOfRecords}</p>
        <p className="text-12 lg:text-[24px] text-gray-6 font-normal">資料筆數</p>
      </div>
      <div className="overflow-y-auto flex-1 max-h-[216px]">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50 sticky top-0">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                車牌號碼
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                進場時間
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                離場時間
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                停放時長
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {history.map((row, index) => (
              <tr key={index} className="text-center">
                <td className="px-6 py-4 whitespace-nowrap">{row.plate}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {row.enter_time}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{row.exit_time}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {convertToHoursAndMinutes(row.duration)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SpaceHistory;
