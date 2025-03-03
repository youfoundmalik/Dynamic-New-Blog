import moment from "moment";
import { memo } from "react";

import { NormalizedArticle } from "@/types";

// Memoized card component to prevent unnecessary re-renders
export const NewStoryCard = memo<{ article: NormalizedArticle }>(({ article }) => {
  if (!article) return null;

  const formattedAuthor = article.author?.toLowerCase().replace("by ", "");
  const formattedDate = moment(article.date).format("MMM DD, YYYY");

  return (
    <a
      href={article.link ?? "#"}
      target='_blank'
      className='bg-white p-2.5 rounded-xl cursor-pointer shadow-[0px_0px_32px_0px_rgba(0,_0,_0,_0.07)] flex flex-col gap-5 md:last:hidden lg:last:flex'
    >
      <div className='relative rounded-xl overflow-clip w-full h-[190px] bg-gray-100'>
        {article.imageUrl && (
          <div
            className='absolute inset-0 w-full h-full top-0 left-0 bg-center bg-cover bg-no-repeat'
            style={{ backgroundImage: `url(${article.imageUrl})` }}
          />
        )}
      </div>
      <div className='flex flex-col gap-4 mx-1.5'>
        <h4 className='font-medium text-lg line-clamp-2'>{article.title}</h4>
        <p className='opacity-75 line-clamp-2'>{article.snippet || ""}</p>
        <p className='text-xs opacity-60 mb-3 line-clamp-1'>
          {formattedAuthor && <b className='capitalize'>{formattedAuthor}</b>} | {formattedDate}
        </p>
      </div>
    </a>
  );
});

NewStoryCard.displayName = "NewStoryCard";

// Memoized skeleton component since it doesn't need to re-render
export const NewStorySkeleton = memo(() => (
  <div className='w-full p-2.5 bg-gray-50 h-fit rounded-lg animate-pulse flex flex-col gap-5'>
    <div className='w-full bg-gray-100 rounded-lg h-[190px]' />
    <div>
      <div className='w-full h-7 bg-gray-100' />
      <div className='w-full h-5 bg-gray-100 mt-4' />
      <div className='w-full h-5 bg-gray-100 mt-2' />
    </div>
    <div className='w-full h-[76px] bg-gray-100 rounded' />
  </div>
));

NewStorySkeleton.displayName = "NewStorySkeleton";
