"use client";

import { useCallback, useEffect, useState } from "react";
import { useDataContext } from "@/context/data-context";
import { fetchNews } from "@/services/newsService";
import { shuffleArray } from "@/utils/functions";

const useFetchArticles = () => {
  const { setArticles, setLocallyManipulatedData, setAuthors, setCategories,setSources, data } = useDataContext();
  const [isFetching, setIsFetching] = useState(false);

  const fetchArticles = useCallback(
    async (query?: string) => {
      setIsFetching(true);

      try {
        const response = await fetchNews(query);
        console.log(response);
        const shuffledArray = shuffleArray(response);
        setCategories([...new Set(shuffledArray.map((article) => article.category))]);
        setAuthors([...new Set(shuffledArray.map((article) => article.author))]);
        setSources([...new Set(shuffledArray.map((article) => article.source))]);
        setLocallyManipulatedData(shuffledArray);
        setArticles(shuffledArray);
      } finally {
        setIsFetching(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  return { fetchArticles, isFetching, articles: data.sortedData };
};

export default useFetchArticles;
