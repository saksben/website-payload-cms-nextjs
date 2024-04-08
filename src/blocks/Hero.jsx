import React from "react";
import Image from "next/image";

export default function Hero({ heading, text, backgroundImage = {} }) {
  return (
    <div className="relative overflow-hidden">
      <div className="flex flex-col items-center justify-center w-full py-40 relative text-white z-10">
        <h2 className="font-bold text-3xl mb-4">{heading}</h2>
        <p className="text-lg">{text}</p>
      </div>
      <div className="absolute inset-0 bg-black/30 z-[5]"></div>
      <Image
        className="absolute inset-0 object-cover"
        src={backgroundImage.url}
        height={backgroundImage.height}
        width={backgroundImage.width}
        alt={backgroundImage.alt}
      />
    </div>
  );
}
