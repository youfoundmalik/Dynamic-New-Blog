"use client";

import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState, useCallback } from "react";
import { ApiParamsModel, AppFiltersModel, NormalizedArticle } from "@/types";
import { guardian, newsApi, newYorkTimes } from "@/utils/constants";
import { shuffleArray, sortDescending } from "@/utils/functions";
import useFetchArticles from "@/hooks/useNews";

interface DataContextProps {
  data: { authors: string[]; articles: NormalizedArticle[]; categories: string[]; sortedData: NormalizedArticle[]; sources: string[] };
  setLocallyManipulatedData: Dispatch<SetStateAction<NormalizedArticle[]>>;
  fetchData: (options?: ApiParamsModel, apis?: string[]) => Promise<void>;
  setArticles: Dispatch<SetStateAction<NormalizedArticle[]>>;
  setFilters: Dispatch<SetStateAction<AppFiltersModel>>;
  setSelectedApis: Dispatch<SetStateAction<string[]>>;
  setParams: Dispatch<SetStateAction<ApiParamsModel>>;
  setCategories: Dispatch<SetStateAction<string[]>>;
  setError: Dispatch<SetStateAction<string | null>>;
  setAuthors: Dispatch<SetStateAction<string[]>>;
  setSources: Dispatch<SetStateAction<string[]>>;
  filters: AppFiltersModel;
  params: ApiParamsModel;
  isLoading: boolean;
  error: string | null;
  selectedApis: string[];
  availableApis: string[];
}

const DataContext = createContext<DataContextProps | null>(null);

const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const currentDate = new Date().toISOString().split("T")[0];

  const [params, setParams] = useState<ApiParamsModel>({
    page: 1,
    query: "",
    sort: "relevance",
    startDate: "2025-02-20",
    endDate: currentDate,
  });
  const availableApis = [newsApi, guardian, newYorkTimes];
  const { isLoading, fetchArticles } = useFetchArticles();
  const [articles, setArticles] = useState<NormalizedArticle[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [authors, setAuthors] = useState<string[]>([]);
  const [sources, setSources] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedApis, setSelectedApis] = useState(availableApis);
  const [locallyManipulatedData, setLocallyManipulatedData] = useState<NormalizedArticle[]>([]);
  const [filters, setFilters] = useState<AppFiltersModel>({ sources: [], authors: [], categories: [] });

  const fetchData = useCallback(
    async (options = params, apis = selectedApis) => {
      setError(null);
      try {
        const response = await fetchArticles(options, apis);
        if (response) {
          const shuffledArray = params.sort === "newest" ? sortDescending(response) : shuffleArray(response);
          setCategories([...new Set(shuffledArray.map((article) => article.category))]);
          setAuthors([...new Set(shuffledArray.map((article) => article.author))]);
          setSources([...new Set(shuffledArray.map((article) => article.source))]);
          setLocallyManipulatedData(shuffledArray);
          setArticles(shuffledArray);
        }
      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
        setError(errorMessage);
      }
    },
    [fetchArticles, params, selectedApis]
  );

  return (
    <DataContext.Provider
      value={{
        data: { articles, categories, authors, sortedData: locallyManipulatedData, sources },
        setArticles,
        setAuthors,
        setSources,
        filters,
        setFilters,
        setCategories,
        setLocallyManipulatedData,
        isLoading,
        params,
        error,
        setError,
        fetchData,
        setParams,
        availableApis,
        selectedApis,
        setSelectedApis,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

const useDataContext = () => {
  const dataContext = useContext(DataContext);
  if (dataContext) return dataContext;

  throw new Error("Code not in the data context");
};

export { DataProvider, useDataContext };
