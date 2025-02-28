"use client";

import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";
import { guardian, newsApi, newYorkTimes } from "@/utils/constants";
import { AppFiltersModel, NormalizedArticle } from "@/types";

interface DataContextProps {
  data: { authors: string[]; articles: NormalizedArticle[]; categories: string[]; sortedData: NormalizedArticle[]; sources: string[] };
  setLocallyManipulatedData: Dispatch<SetStateAction<NormalizedArticle[]>>;
  setArticles: Dispatch<SetStateAction<NormalizedArticle[]>>;
  setFilters: Dispatch<SetStateAction<AppFiltersModel>>;
  setSelectedApis: Dispatch<SetStateAction<string[]>>;
  setCategories: Dispatch<SetStateAction<string[]>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setAuthors: Dispatch<SetStateAction<string[]>>;
  setSources: Dispatch<SetStateAction<string[]>>;
  filters: AppFiltersModel;
  isLoading: boolean;
  selectedApis: string[];
  availableApis: string[];
}

const DataContext = createContext<DataContextProps | null>(null);

const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const availableApis = [newsApi, guardian, newYorkTimes];
  const [articles, setArticles] = useState<NormalizedArticle[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [authors, setAuthors] = useState<string[]>([]);
  const [sources, setSources] = useState<string[]>([]);
  const [selectedApis, setSelectedApis] = useState(availableApis);
  const [locallyManipulatedData, setLocallyManipulatedData] = useState<NormalizedArticle[]>([]);
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
        isLoading,
        setIsLoading,
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
