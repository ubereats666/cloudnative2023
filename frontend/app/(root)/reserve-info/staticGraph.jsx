import React from "react";

const StaticGraph = ({ number }) => {
  const current = number.slice(0, 2);
  const selectedKey = parseInt(number.slice(2)) - 1;
  const keys = Array.from(Array(20).keys());

  const selectedClassName = "lg:w-28 bg-[#CFE8C6] rounded text-[#75B066] flex justify-center px-1 py-2 lg:p-2 border-4 border-[#75B066]";
  const othersClassName = "lg:w-28 bg-neutral-400 rounded text-neutral-300 flex justify-center px-1 py-2 lg:p-2 border-4 border-neutral-200";


  return (
    <div className="rounded-3xl bg-neutral-200 p-3 lg:p-5 flex-1 flex justify-between items-center">
      <div className="flex-col">
        {
          keys.slice(0, 6).map((key) => (
            key === selectedKey ? (
              <div className={selectedClassName}>
                <p className="text-[18px] lg:text-32">
                  {number}
                </p>
              </div>
            ) : (
              <div className={othersClassName}>
                <p className="text-[18px] lg:text-32">
                  {current + (parseInt(key) + 1).toString().padStart(2, '0')}
                </p>
              </div>
            )
          ))
        }
      </div>
      <div className="flex">
        <div className="flex-col">
          {
            keys.slice(6, 10).map((key) => (
              key === selectedKey ? (
                <div className={selectedClassName}>
                  <p className="text-[18px] lg:text-32">
                    {number}
                  </p>
                </div>
              ) : (
                <div className={othersClassName}>
                  <p className="text-[18px] lg:text-32">
                    {current + (parseInt(key) + 1).toString().padStart(2, '0')}
                  </p>
                </div>
              )
            ))
          }
        </div>
        <div className="flex-col">
          {
            keys.slice(10, 14).map((key) => (
              key === selectedKey ? (
                <div className={selectedClassName}>
                  <p className="text-[18px] lg:text-32">
                    {number}
                  </p>
                </div>
              ) : (
                <div className={othersClassName}>
                  <p className="text-[18px] lg:text-32">
                    {current + (parseInt(key) + 1).toString().padStart(2, '0')}
                  </p>
                </div>
              )
            ))
          }
        </div>
      </div>
      <div className="flex-col">
        {
          keys.slice(14, 20).map((key) => (
            key === selectedKey ? (
              <div className={selectedClassName}>
                <p className="text-[18px] lg:text-32">
                  {number}
                </p>
              </div>
            ) : (
              <div className={othersClassName}>
                <p className="text-[18px] lg:text-32">
                  {current + (parseInt(key) + 1).toString().padStart(2, '0')}
                </p>
              </div>
            )
          ))
        }
      </div>
    </div>
  );
};

export default StaticGraph;