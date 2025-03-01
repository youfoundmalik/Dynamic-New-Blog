"use client";

import Image from "next/image";
import { useEffect } from "react";

import errorImg from "../../public/error-image.svg";

export default function ErrorPage({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error("News Page Error:", error.message);
  }, [error]);

  return (
    <div className='text-center mt-10 mx-auto px-5 flex flex-col items-center gap-5'>
      <Image src={errorImg} className='w-full md:w-[350px]' alt='Error' width={100} />
      <div className='flex flex-col gap-1'>
        <h1 className='text-2xl md:text-3xl font-bold text-primary'>Something went wrong!</h1>
        <p className='text-gray-500'>Failed to load news at this time.</p>
      </div>
      <button onClick={reset} className='px-4 bg-gradient-to-r to-primary from-secondary h-[45px] w-full md:w-[200px] rounded font-medium text-white'>
        Try Again
      </button>
    </div>
  );
}
