"use client"

import Link from "next/link";
import SourceOptions from "../source-options";

const Header: React.FC = () => {
  return (
    <header className='w-full flex justify-between items-center'>
      <h1>
        <Link href='/' className='font-bold text-xl text-orange-600 w-fit'>
          MEGA.news
        </Link>
      </h1>
      <SourceOptions />
    </header>
  );
};

export default Header;
