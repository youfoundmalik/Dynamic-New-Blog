"use client";

import Link from "next/link";
import SourceOptions from "../source-options";
import { FormEvent, useRef } from "react";
import useFetchArticles from "@/hooks/useNews";
import { useDataContext } from "@/context/data-context";
import CustomInput from '../shared/input';

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
    <header className='w-full flex justify-between items-center'>
      <h1>
        <Link href='/' className='font-bold text-xl text-orange-600 w-fit'>
          MEGA.news
        </Link>
      </h1>
      <div className='flex gap-2.5'>
        <form onSubmit={handleSubmit}>
          <CustomInput
            ref={inputRef}
            disabled={isFetching}
            className='text-sm min-w-[250px]'
            placeholder='Search...'
          />
        </form>
        <SourceOptions />
      </div>
    </header>
  );
};

export default Header;
