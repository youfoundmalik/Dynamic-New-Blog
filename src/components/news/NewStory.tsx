import Link from "next/link";
import Image from "next/image";
import moment from "moment";
import { NormalizedArticle } from "@/types";

export const NewStoryCard: React.FC<{ article: NormalizedArticle }> = ({ article }) => {
  if (!article) return null;
  return (
    <Link
      href={article.link ?? "#"}
      target='_blank'
      className='bg-white p-2.5 rounded-xl cursor-pointer shadow-[0px_0px_32px_0px_rgba(0,_0,_0,_0.07)] flex flex-col gap-5 md:last:hidden lg:last:flex'
    >
      <div className='relative rounded-xl overflow-clip w-full h-[190px] bg-gray-100'>
        {article.imageUrl && <Image src={article.imageUrl} alt='' fill sizes='100%' priority className='object-cover bg-center z-[1]' />}
      </div>
      <div className='flex flex-col gap-4 mx-1.5'>
        <h4 className='font-medium text-lg line-clamp-2'>{article.title}</h4>
        <p className='opacity-75 line-clamp-2'>{article.snippet || ""}</p>
        <p className='text-xs opacity-60 mb-3 line-clamp-1'>
          {article.author && <b className='capitalize'>{article.author.toLowerCase()?.replace("by ", "")}</b>} |{" "}
          {moment(article.date)?.format("MMM DD, YYYY")}
        </p>
      </div>
    </Link>
  );
};

export const NewStorySkeleton: React.FC = () => {
  return (
    <div className='w-full p-2.5 bg-gray-50 h-fit rounded-lg animate-pulse flex flex-col gap-5'>
      <div className='w-full bg-gray-100 rounded-lg h-[190px]' />
      <div>
        <div className='w-full h-7 bg-gray-100' />
        <div className='w-full h-5 bg-gray-100 mt-4' />
        <div className='w-full h-5 bg-gray-100 mt-2' />
      </div>
      <div className='w-full h-[76px] bg-gray-100 rounded' />
    </div>
  );
};
