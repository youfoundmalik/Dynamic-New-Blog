"use client";

import Link from "next/link";
import SourceOptions from "../source-options";
import { FormEvent, useRef } from "react";
import useFetchArticles from "@/hooks/useNews";

const Header: React.FC = () => {
  const { isFetching, fetchArticles } = useFetchArticles();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchArticles(inputRef.current?.value ?? "");
  };

  return (
    <header className='w-full flex justify-between items-center'>
      <h1>
        <Link href='/' className='font-bold text-xl text-orange-600 w-fit'>
          MEGA.news
        </Link>
      </h1>
      <div className='flex gap-2.5'>
        <form onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            disabled={isFetching}
            className='border border-gray-200 rounded h-[42px] p-2 min-w-[250px] text-sm !outline-none focus-visible:bg-gray-50 focus-visible:border-gray-300'
            placeholder='Search...'
          />
        </form>
        <SourceOptions />
      </div>
    </header>
  );
};

export default Header;
