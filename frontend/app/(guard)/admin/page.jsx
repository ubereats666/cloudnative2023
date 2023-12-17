"use client";
import { useState } from "react";
import RemainSpace from "@/components/admin/remain-space";
import ParkingLot from "@/components/admin/parking-lot";
import SpaceHistory from "@/components/admin/space_history";
import AbnormalSpace from "@/components/admin/abnormal_space";
import SpaceUsageRate from "@/components/admin/space_usage_rate";
import Navbar from "@/components/admin/guard_navbar";


const Admin = () => {
  const [date, setDate] = useState(new Date());
  const [spaceSelected, setSpaceSelected] = useState(undefined)


  return (
    <>
      <Navbar
        date={date}
        setDate={setDate}
      />
      <div className="flex flex-col px-8 pt-24 pb-[27px] h-screen">
        <RemainSpace />
        <div className="flex flex-col w-full pt-[24px] h-screen gap-y-6">
          <div className="flex flex-col lg:flex-row gap-[24px]">
            <div className="relative flex flex-col rounded-2xl bg-[#fafafa] w-full lg:w-1/2 p-4 gap-y-2">
              <h2 className="text-20 text-t-title">停車場平面圖</h2>
              <ParkingLot setSelected={setSpaceSelected} />
            </div>
            <div className="relative flex flex-col rounded-2xl bg-[#fafafa] w-full lg:w-1/2 p-4 gap-y-2">
              <h2 className="text-20 text-t-title">停車歷程</h2>
              <SpaceHistory date={date} spaceSelected={spaceSelected} />
            </div>
          </div>
          <div className="flex flex-col lg:flex-row gap-[24px]">
            <div className="relative flex flex-col rounded-2xl bg-[#fafafa] w-full lg:w-1/2 p-4 gap-y-2">
              <div className="flex justify-between">
                <h2 className="text-20 text-t-title">車位使用率</h2>
                <div className="flex w-1/2 h-fit items-center justify-end">
                  <div className="w-3 h-3 rounded-full bg-[#7CA9ED]" />
                  <p className="pl-4 pr-8">佔用</p>
                  <div className="w-3 h-3 rounded-full bg-[#93E5AF]" />
                  <p className="pl-4 pr-8">閒置</p>
                </div>
              </div>
              <SpaceUsageRate />
            </div>
            <div className="relative flex flex-col rounded-2xl bg-[#fafafa] w-full lg:w-1/2 p-4 gap-y-2">
              <h2 className="text-20 text-t-title">停車異常</h2>
              <AbnormalSpace />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Admin;
