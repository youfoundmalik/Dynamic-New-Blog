"use client";

import { Fragment, useEffect } from "react";
import { MajorStoryCard, MajorStorySkeleton, NewStoryCard, NewStorySkeleton } from "@/components/news-cards";
import CategorySlider from "@/components/category-slider";
import { useDataContext } from "@/context/data-context";
import FilterOptions from "@/components/filter-options";
import SortOptions from "@/components/sort-options";
import DateSearch from "@/components/date-search";
import Pagination from "@/components/pagination";
import useFetchArticles from "@/hooks/useNews";

const Home: React.FC = () => {
  const { params, setParams } = useDataContext();
  const { isFetching, articles, fetchArticles, error } = useFetchArticles();

  if (error) { // Trigger error boundary component
    throw new Error(error);
  }

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  const handlePageChange = async (page: number) => {
    const payload = { ...params, page };
    window.scrollTo({ top: 0, behavior: "smooth" });
    await fetchArticles(payload);
    setParams(payload);
  };

  return (
    <Fragment>
      <CategorySlider isLoading={isFetching} />
      <section className='posts pt-2.5 nd:pt-5 mt-2.5 md:mt-5 border-t border-gray-100'>
        <div className='w-full flex flex-wrap items-end justify-between gap-3 md:gap-5 mb-5'>
          <DateSearch />
          <div className='flex justify-between md:justify-end items-center gap-2.5 flex-grow md:flex-grow-0'>
            <SortOptions />
            <FilterOptions />
          </div>
        </div>
        <div className='major-stories grid lg:grid-cols-2 gap-5 lg:gap-2.5 '>
          <div className='grid md:grid-cols-2 gap-5 md:gap-2.5'>
            {isFetching ? <MajorStorySkeleton /> : <MajorStoryCard data={articles?.[0]} />}
            {isFetching ? <MajorStorySkeleton /> : <MajorStoryCard data={articles?.[1]} />}
          </div>
          {isFetching ? <MajorStorySkeleton /> : <MajorStoryCard data={articles?.[2]} />}
        </div>
        <div className='latest-stories grid md:grid-cols-2 lg:grid-cols-3 gap-7 md:gap-5 mt-8 md:mt-16'>
          {isFetching
            ? new Array(articles && articles.length > 3 ? articles.length - 3 : 3).fill("").map((_, i) => <NewStorySkeleton key={i} />)
            : articles?.slice(3)?.map((item, i) => <NewStoryCard data={item} key={i} />)}
        </div>
      </section>
      <Pagination totalPage={12} page={params.page} onPageChange={handlePageChange} isLoading={isFetching} />
    </Fragment>
  );
};

export default Home;
