"use client";

import { Fragment, useEffect, useCallback } from "react";
import { MajorStoryCard, MajorStorySkeleton } from "@/components/news/MajorStory";
import { NewStoryCard, NewStorySkeleton } from "@/components/news/NewStory";
import CategorySlider from "@/components/category-slider";
import { useDataContext } from "@/context/data-context";
import FilterOptions from "@/components/filter-options";
import SortOptions from "@/components/sort-options";
import DateSearch from "@/components/date-search";
import Pagination from "@/components/pagination";
import { NormalizedArticle } from "@/types";

export default function Home() {
  const { params, setParams, fetchData: fetchArticles, isLoading: isFetching, error, data, filters } = useDataContext();
  const { sortedData: articles } = data || {};

  const handlePageChange = useCallback(
    async (page: number) => {
      const payload = { ...params, page };
      window.scrollTo({ top: 0, behavior: "smooth" });
      await fetchArticles(payload);
      setParams(payload);
      window.scrollTo({ top: 0, behavior: "smooth" }); // enforce scroll to top
    },
    [params, fetchArticles, setParams]
  );

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  if (error) throw new Error(error);

  return (
    <Fragment>
      <CategorySlider isLoading={isFetching} />
      <section className='posts pt-2.5 nd:pt-5 mt-2.5 md:mt-5 border-t border-gray-100'>
        <FilterSection />
        <MajorStories isFetching={isFetching} articles={articles} />
        <LatestStories isFetching={isFetching} articles={articles} />
      </section>
      {articles.length > 0 && Object.keys(filters).every((key) => (filters as unknown as { [key: string]: unknown[] })[key].length === 0) && (
        <Pagination totalPage={12} page={params.page} onPageChange={handlePageChange} isLoading={isFetching} />
      )}
    </Fragment>
  );
}

interface StoryProps {
  isFetching: boolean;
  articles: NormalizedArticle[];
}

const MajorStories: React.FC<StoryProps> = ({ isFetching, articles }) => (
  <div className='major-stories grid lg:grid-cols-2 gap-5 lg:gap-2.5'>
    <div className='grid md:grid-cols-2 gap-5 md:gap-2.5'>
      {isFetching ? <MajorStorySkeleton /> : <MajorStoryCard article={articles?.[0]} />}
      {isFetching ? <MajorStorySkeleton /> : <MajorStoryCard article={articles?.[1]} />}
    </div>
    {isFetching ? <MajorStorySkeleton /> : <MajorStoryCard article={articles?.[2]} />}
  </div>
);

const LatestStories: React.FC<StoryProps> = ({ isFetching, articles }) => (
  <div className='latest-stories grid md:grid-cols-2 lg:grid-cols-3 gap-7 md:gap-5 mt-8 md:mt-16'>
    {isFetching
      ? new Array(articles && articles.length > 3 ? articles.length - 3 : 3).fill("").map((_, i: number) => <NewStorySkeleton key={i} />)
      : articles?.slice(3)?.map((article: NormalizedArticle, i: number) => <NewStoryCard article={article} key={i} />)}
  </div>
);

const FilterSection = () => (
  <div className='w-full flex flex-wrap items-end justify-between gap-3 md:gap-5 mb-5'>
    <DateSearch />
    <div className='flex justify-between md:justify-end items-center gap-2.5 flex-grow md:flex-grow-0'>
      <SortOptions />
      <FilterOptions />
    </div>
  </div>
);
