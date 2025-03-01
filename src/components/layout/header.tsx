"use client";

import Link from "next/link";
import SourceOptions from "../source-options";
import { FormEvent, useRef } from "react";
import useFetchArticles from "@/hooks/useNews";
import { useDataContext } from "@/context/data-context";
import CustomInput from "../shared/input";

const Header: React.FC = () => {
  const { isFetching, fetchArticles } = useFetchArticles();
  const { params, setParams } = useDataContext();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const payload = { ...params, query: inputRef.current?.value ?? "" };
    await fetchArticles(payload);
    setParams(payload);
  };

  return (
    <header className='w-full flex flex-wrap gap-2.5 items-center pb-2.5 md:pb-5 border-b border-gray-100'>
      <h1 className='flex-grow order-1'>
        <Link href='/' className='font-bold text-xl text-orange-600 w-fit'>
          MEGA.news
        </Link>
      </h1>
      <form className='order-3 md:order-2 min-w-[250px] w-full md:w-auto' onSubmit={handleSubmit}>
        <CustomInput ref={inputRef} disabled={isFetching} className='text-sm w-full' placeholder='Search...' />
      </form>
      <SourceOptions />
    </header>
  );
};

export default Header;
