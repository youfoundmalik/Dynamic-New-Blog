import { useCallback, useMemo } from "react";
import { useDataContext } from "@/context/data-context";
import { NormalizedArticle, AppFiltersModel } from "@/types";

const sortArticles = (articles: NormalizedArticle[], filters: AppFiltersModel): NormalizedArticle[] => {
  // Return early if no filters are applied
  if (!filters.categories.length && !filters.authors.length && !filters.sources.length) {
    return articles;
  }

  return articles.filter((article) => {
    const categoryMatch = filters.categories.length === 0 || filters.categories.some((category) => article.category.includes(category));

    const authorMatch = filters.authors.length === 0 || filters.authors.some((author) => article.author.includes(author));

    const sourceMatch = filters.sources.length === 0 || filters.sources.some((source) => article.source.includes(source));

    return categoryMatch && authorMatch && sourceMatch;
  });
};

const useSort = () => {
  const { data, setLocallyManipulatedData, setFilters, filters } = useDataContext();

  // Memoize the sort function based on data.articles and filters
  const memoizedSortArticles = useMemo(() => {
    return (articles: NormalizedArticle[], filterParams: AppFiltersModel) => sortArticles(articles, filterParams);
  }, []);

  const handleSort = useCallback(
    (key: keyof AppFiltersModel, item: string[] | string) => {
      const itemsArray = Array.isArray(item) ? item : [item];
      const newFilters = { ...filters, [key]: itemsArray };

      setFilters(newFilters);
      const sortedData = memoizedSortArticles(data.articles, newFilters);
      setLocallyManipulatedData(sortedData);
    },
    [data.articles, filters, memoizedSortArticles, setFilters, setLocallyManipulatedData]
  );

  return { handleSort };
};

export default useSort;
