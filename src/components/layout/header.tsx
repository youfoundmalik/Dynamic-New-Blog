"use client";

import Link from "next/link";
import Image from "next/image";
import { FormEvent, useRef, memo, useCallback } from "react";

import logo from "../../../public/innoscripta-logo.svg";

import CustomInput from "../shared/input";
import SourceOptions from "../source-options";
import { useDataContext } from "@/context/data-context";

const Logo: React.FC = memo(() => {
  return (
    <div className='flex-grow order-1'>
      <Link href='/' className='font-bold text-xl text-orange-600 w-fit'>
        <Image src={logo} alt='Innoscripta' width={100} className='w-[130px] md:w-[150px]' priority />
      </Link>
    </div>
  );
});

Logo.displayName = "Logo";

const SearchBar: React.FC = memo(() => {
  const { params, setParams, fetchData: fetchArticles, isLoading: isFetching } = useDataContext();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const payload = { ...params, query: inputRef.current?.value ?? "" };
      await fetchArticles(payload);
      setParams(payload);
    },
    [fetchArticles, params, setParams]
  );

  return (
    <form className='order-3 md:order-2 min-w-[250px] w-full md:w-auto' onSubmit={handleSubmit}>
      <CustomInput ref={inputRef} disabled={isFetching} className='text-sm w-full' placeholder='Search...' aria-label='Search articles' />
    </form>
  );
});

SearchBar.displayName = "SearchBar";

const Header: React.FC = memo(() => {
  const { error } = useDataContext();
  return (
    <header className='w-full flex flex-wrap gap-2.5 items-center pb-2.5 md:pb-5 border-b border-gray-100'>
      <Logo />
      {!error && (
        <>
          <SearchBar />
          <SourceOptions />
        </>
      )}
    </header>
  );
});

Header.displayName = "Header";

export default Header;
