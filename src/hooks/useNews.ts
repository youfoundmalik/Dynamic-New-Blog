;

import { useCallback, useState } from "react";
import { fetchNews } from "@/services/newsService";
import { ApiParamsModel } from "@/types";

const useFetchArticles = () => {
  const [isLoading, setIsLoading] = useState(false);

  const fetchArticles = useCallback(async (options: ApiParamsModel, apis: string[]) => {
    setIsLoading(true);
    try {
      return await fetchNews(options, apis);
    } catch (error: unknown) {
      throw new Error((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { fetchArticles, isLoading };
};

export default useFetchArticles;
