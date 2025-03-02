"use client";

import Link from "next/link";
import Image from "next/image";
import moment from "moment";

import { NormalizedArticle } from "@/types";

export const MajorStoryCard: React.FC<{ article: NormalizedArticle }> = ({ article }) => {
  if (!article) return null;

  const formattedAuthor = article.author?.toLowerCase().replace("by ", "");
  const formattedDate = moment(article.date).format("MMM DD, YYYY");

  return (
    <Link href={article.link || "#"} target='_blank' className='bg-gray-200 w-full p-2.5 h-[400px] rounded-md flex items-end relative overflow-clip'>
      {article.imageUrl && (
        <Image src={article.imageUrl} alt={article.title || "Article image"} fill sizes='100%' priority className='object-cover bg-center z-[1]' />
      )}
      <div className='relative z-[2] rounded p-4 bg-white bg-opacity-75 w-full flex flex-col gap-2'>
        <h4 className='text-lg font-medium line-clamp-1'>{article.title}</h4>
        <p className='text-sm opacity-80 line-clamp-2'>{article.snippet}</p>
        <p className='text-xs opacity-40'>
          {formattedAuthor && <b className='capitalize'>{formattedAuthor}</b>}
          {formattedAuthor && " | "}
          {formattedDate}
        </p>
      </div>
    </Link>
  );
};

export const MajorStorySkeleton: React.FC = () => {
  return (
    <div className='w-full p-2.5 h-[400px] rounded bg-gray-100 flex items-end animate-pulse'>
      <div className='rounded p-4 bg-gray-50 w-full'>
        <div className='w-full h-5 bg-gray-100' />
        <div className='w-full h-1.5 bg-gray-100 mt-2' />
        <div className='w-full h-1.5 bg-gray-100 mt-1' />
        <div className='w-full h-1.5 bg-gray-100 mt-1' />
      </div>
    </div>
  );
};
