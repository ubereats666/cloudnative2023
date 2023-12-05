import { Button } from "@/components/ui/button";

const REMAIN_SPACES = [
  { key: "space-1", label: "F1", num_remained: 28 },
  { key: "space-2", label: "F2", num_remained: 11 },
  { key: "space-3", label: "F3", num_remained: 3 },
  { key: "space-4", label: "F4", num_remained: 5 },
];

export default function Home() {
  return (
    <section className="full-screen-container">
      <div className="flex-col flex-between grow px-8 pt-24 pb-16 gap-8 md:gap-12 bg-slate-600">
        <div className="flex flex-col gap-8 w-full md:flex-row md:grow">
          <div className="w-full aspect-[2] bg-black md:aspect-[0]">
            <h1>早安</h1>
          </div>

          <div className="flex-between w-full gap-6">
            <Button className="w-full aspect-square md:aspect-[0] md:h-full">
              快速停車
            </Button>
            <Button className="w-full aspect-square md:aspect-[0] md:h-full">
              自訂停車
            </Button>
          </div>
        </div>

        <div className="flex-col flex-between w-full gap-4">
          <h1 className="w-full">剩餘車位</h1>

          <div className="grid grid-cols-2 w-full gap-6">
            {REMAIN_SPACES.map((space) => {
              return (
                <Button
                  key={space.key}
                  size="md"
                  className="flex items-start justify-between"
                >
                  <h2 className="text-28">{space.label}</h2>
                  <div className="flex flex-col grow">
                    <p className="text-48">{space.num_remained}</p>
                    <p className="text-12">剩餘車位</p>
                  </div>
                </Button>
              );
            })}
          </div>
        </div>
      </div>
      <div className="relative w-[33%] h-screen bg-orange-700">
        <div className="absolute">
          <h2>我的預約</h2>
        </div>
      </div>
    </section>
  );
}
