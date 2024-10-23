import React from "react";
import Image from "next/image";
import { homeSec1 } from "@/utils/data";
import CommonButton from "../../commonButton/CommonButton";
import { BUTTON_LABELS } from "@/constants";

const SectionOne = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Left section */}
        <div className="text-left">
          {homeSec1.map((data) => (
            <div key={data.id} className="flex flex-col gap-4">
              <h1>
                {data.title} <span className="font_red">{data.span}</span>
              </h1>
              <p className="mb-8">{data.para}</p>
            </div>
          ))}
          <CommonButton label={BUTTON_LABELS.SCHEDULE_DEMO} />
        </div>
        {/* Right section  */}
        <div className="flex justify-center md:justify-end">
          <Image
            src="/images/dashboardIMG.png"
            alt="Sample Image"
            width={700}
            height={500}
          />
        </div>
      </div>
    </div>
  );
};

export default SectionOne;
