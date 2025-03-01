"use client";

import { useCallback, useState } from "react";
import { useDataContext } from "@/context/data-context";
import { fetchNews } from "@/services/newsService";
import { shuffleArray, sortDescending } from "@/utils/functions";

const useFetchArticles = () => {
  const [error, setError] = useState<string | null>(null);
  const { setArticles, setLocallyManipulatedData, setAuthors, params, setCategories, setSources, data, isLoading, setIsLoading, selectedApis } =
    useDataContext();

  const fetchArticles = useCallback(
    async (options = params, apis = selectedApis) => {
      setError(null);
      setIsLoading(true);
      try {
        const response = await fetchNews(options, apis);
        const shuffledArray = options.sort === "newest" ? sortDescending(response) : shuffleArray(response);
        setCategories([...new Set(shuffledArray.map((article) => article.category))]);
        setAuthors([...new Set(shuffledArray.map((article) => article.author))]);
        setSources([...new Set(shuffledArray.map((article) => article.source))]);
        setLocallyManipulatedData(shuffledArray);
        setArticles(shuffledArray);
      } catch (error: unknown) {
        setError((error as Error).message);
      } finally {
        setIsLoading(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return { fetchArticles, isFetching: isLoading, articles: data.sortedData, error };
};

export default useFetchArticles;
