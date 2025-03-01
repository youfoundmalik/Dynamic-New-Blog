import moment from "moment";
import { NormalizedArticle } from "@/types";
import Image from "next/image";
import Link from "next/link";

export const MajorStoryCard: React.FC<{ data?: NormalizedArticle }> = ({ data }) => {
  return (
    data && (
      <Link href={data?.link ?? "#"} target='_blank' className='bg-gray-200 w-full p-2.5 h-[400px] rounded-md flex items-end relative overflow-clip'>
        {data?.imageUrl && <Image src={data.imageUrl} alt='' fill sizes='100%' priority className='object-cover bg-center z-[1]' />}
        <div className='relative z-[2] rounded p-4 bg-white bg-opacity-75 w-full flex flex-col gap-2'>
          <h4 className='text-lg font-medium line-clamp-1'>{data?.title}</h4>
          <p className='text-sm opacity-80 line-clamp-2'>{data?.snippet || ""}</p>
          <p className='text-xs opacity-40'>
            <b className='capitalize'>{data?.author?.toLowerCase()?.replace("by ", "")}</b> | {moment(data?.date)?.format("MMM DD, YYYY")}
          </p>
        </div>
      </Link>
    )
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

export const NewStoryCard: React.FC<{ data?: NormalizedArticle }> = ({ data }) => {
  return (
    data && (
      <Link
        href={data?.link ?? "#"}
        target='_blank'
        className='bg-white p-2.5 rounded-xl cursor-pointer shadow-[0px_0px_32px_0px_rgba(0,_0,_0,_0.07)] flex flex-col gap-5 md:last:hidden lg:last:flex'
      >
        <div className='relative rounded-xl overflow-clip w-full h-[190px] bg-gray-100'>
          {data?.imageUrl && <Image src={data.imageUrl} alt='' fill sizes='100%' priority className='object-cover bg-center z-[1]' />}
        </div>
        <div className='flex flex-col gap-4 mx-1.5'>
          <h4 className='font-medium text-lg line-clamp-2'>{data?.title}</h4>
          <p className='opacity-75 line-clamp-2'>{data?.snippet || ""}</p>
          <p className='text-xs opacity-60 mb-3 line-clamp-1'>
            <b className='capitalize'>{data?.author?.toLowerCase()?.replace("by ", "")}</b> | {moment(data?.date)?.format("MMM DD, YYYY")}
          </p>
        </div>
      </Link>
    )
  );
};
