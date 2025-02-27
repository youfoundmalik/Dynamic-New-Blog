"use client";

import { AppFiltersModel, NewsArticle } from "@/types";
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";

interface DataContextProps {
  data: { authors: string[]; articles: NewsArticle[]; categories: string[]; sortedData: NewsArticle[]; sources: string[] };
  setLocallyManipulatedData: Dispatch<SetStateAction<NewsArticle[]>>;
  setArticles: Dispatch<SetStateAction<NewsArticle[]>>;
  setCategories: Dispatch<SetStateAction<string[]>>;
  setAuthors: Dispatch<SetStateAction<string[]>>;
  setSources: Dispatch<SetStateAction<string[]>>;
  filters: AppFiltersModel;
  setFilters: Dispatch<SetStateAction<AppFiltersModel>>;
}

const DataContext = createContext<DataContextProps | null>(null);

const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [authors, setAuthors] = useState<string[]>([]);
  const [sources, setSources] = useState<string[]>([]);
  const [locallyManipulatedData, setLocallyManipulatedData] = useState<NewsArticle[]>([]);
  const [filters, setFilters] = useState<AppFiltersModel>({ isRecent: false, sources: [], authors: [], categories: [] });

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
