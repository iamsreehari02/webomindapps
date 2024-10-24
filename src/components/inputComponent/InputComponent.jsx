import { TEXT } from "@/constants";
import Image from "next/image";
import React from "react";

const InputComponent = ({ icon, icon_alt, placeholder, type = TEXT }) => {
  return (
    <div className="flex items-center border-b-2 rounded-md px-3 py-2">
      <div className="mr-3">{icon && <Image src={icon} alt={icon_alt} />}</div>
      <input
        type={type}
        placeholder={placeholder}
        className="flex-1 focus:outline-none"
      />
    </div>
  );
};

export default InputComponent;
