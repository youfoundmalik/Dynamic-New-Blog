"use client";

import { useCallback } from "react";
import { useDataContext } from "@/context/data-context";
import { fetchNews } from "@/services/newsService";
import { shuffleArray } from "@/utils/functions";

const useFetchArticles = () => {
  const { setArticles, setLocallyManipulatedData, setAuthors, setCategories, setSources, data, isLoading, setIsLoading, selectedApis } =
    useDataContext();

  const fetchArticles = useCallback(
    async (query?: string, apis = selectedApis) => {
      setIsLoading(true);

      try {
        const response = await fetchNews(query, apis);
        const shuffledArray = shuffleArray(response);
        setCategories([...new Set(shuffledArray.map((article) => article.category))]);
        setAuthors([...new Set(shuffledArray.map((article) => article.author))]);
        setSources([...new Set(shuffledArray.map((article) => article.source))]);
        setLocallyManipulatedData(shuffledArray);
        setArticles(shuffledArray);
      } finally {
        setIsLoading(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return { fetchArticles, isFetching: isLoading, articles: data.sortedData };
};

export default useFetchArticles;
