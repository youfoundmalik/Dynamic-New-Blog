"use client";

import { Fragment, useEffect } from "react";
import CategorySlider from "@/components/category-slider";
import useFetchArticles from "@/hooks/useNews";
import FilterOptions from "@/components/filter-options";
import SortOptions from "@/components/sort-options";
import DateSearch from "@/components/date-search";
import { MajorStoryCard, MajorStorySkeleton, NewStoryCard, NewStorySkeleton } from "@/components/news-cards";

export default function Home() {
  const { isFetching, articles, fetchArticles } = useFetchArticles();

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  return (
    <Fragment>
      <CategorySlider isLoading={isFetching} />
      <section className='posts mt-8'>
        <div className='w-full flex items-end justify-between gap-5 mb-4'>
          <DateSearch />
          <div className='flex items-center gap-2.5'>
            <SortOptions />
            <FilterOptions />
          </div>
        </div>
        <div className='major-stories grid grid-cols-2 gap-2.5 '>
          <div className='grid grid-cols-2 gap-2.5'>
            {isFetching ? <MajorStorySkeleton /> : <MajorStoryCard data={articles?.[0]} />}
            {isFetching ? <MajorStorySkeleton /> : <MajorStoryCard data={articles?.[1]} />}
          </div>
          {isFetching ? <MajorStorySkeleton /> : <MajorStoryCard data={articles?.[2]} />}
        </div>
        <div className='latest-stories grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-16'>
          {isFetching
            ? new Array(articles && articles.length > 3 ? articles.length - 3 : 3).fill("").map((_, i) => <NewStorySkeleton key={i} />)
            : articles?.slice(3)?.map((item, i) => <NewStoryCard data={item} key={i} />)}
        </div>
      </section>
    </Fragment>
  );
}
