import React from "react";

import { AspectRatio } from "@/components/ui/aspect-ratio"
import Image from 'next/image'

import Form from "./form";

const Setting = () => {
  return (
    <>
      <div className="flex flex-col-reverse gap-y-5 lg:flex-row w-screen h-fit lg:gap-x-16 pt-28 lg:pt-32 px-8 lg:px-16 pb-8">
        <Form />
        <div className="flex flex-1 justify-center items-start">
          <AspectRatio ratio={16 / 9}>
            <Image src="/images/16-9.png" fill={true} alt="Image" className="rounded-md object-cover" />
          </AspectRatio>
        </div>

      </div>
    </>
  );
};

export default Setting;
