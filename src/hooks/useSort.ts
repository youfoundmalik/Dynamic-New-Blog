import { useDataContext } from "@/context/data-context";
import { NormalizedArticle, AppFiltersModel } from "@/types";

const sortArticles = (articles: NormalizedArticle[], filters: AppFiltersModel): NormalizedArticle[] => {
  let result = articles;

  if (filters.categories.length > 0) {
    result = result.filter((data) => filters.categories.some((category) => data.category.includes(category)));
  }

  if (filters.authors.length > 0) {
    result = result.filter((data) => filters.authors.some((author) => data.author.includes(author)));
  }

  if (filters.sources.length > 0) {
    result = result.filter((data) => filters.sources.some((source) => data.source.includes(source)));
  }

  return result;
};

const useSort = () => {
  const { data, setLocallyManipulatedData, setFilters, filters } = useDataContext();

  const handleSort = (key: "categories" | "sources" | "authors", item: string[] | string) => {
    const itemsArray = Array.isArray(item) ? item : [item];
    setFilters((prev) => ({ ...prev, [key]: itemsArray }));
    const sortedData = sortArticles(data.articles, { ...filters, [key]: itemsArray });
    setLocallyManipulatedData(sortedData);
  };

  return { handleSort };
};

export default useSort;
