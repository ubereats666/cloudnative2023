"use client";
import RemainSpace from "@/components/admin/remain-space";
import ParkingLot from "@/components/admin/parking-lot";
import SpaceHistory from "@/components/admin/space_history";
import AbnormalSpace from "@/components/admin/abnormal_space";

const Admin = () => {
  return (
    <div className="flex flex-col px-8 pt-24 pb-[27px] h-screen">
      <RemainSpace />
      <div className="flex flex-col w-full pt-[24px] h-screen gap-[30px]">
        <div className="flex flex-row gap-[24px]">
          <div className="relative flex flex-col flex-1 bg-slate-300">
            <h2 className="p-2 text-20 text-t-title">停車場平面圖</h2>
            <div className="">
              <ParkingLot />
            </div>
          </div>
          <div className="relative flex flex-col flex-1 bg-slate-300">
            <h2 className="p-2 text-20 text-t-title">停車歷程</h2>
            <div className="">
              <SpaceHistory />
            </div>
          </div>
        </div>
        <div className="flex flex-row grow gap-6">
          <div className="flex flex-1 shrink-0 bg-slate-300">
            <h2 className="p-2 text-20 text-t-title">車位使用率</h2>
          </div>
          <div className="relative flex flex-col flex-1 bg-slate-300">
            <h2 className="p-2 text-20 text-t-title">停車異常</h2>
            <div className="">
              <AbnormalSpace />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Admin;
