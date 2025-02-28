import { useDataContext } from "@/context/data-context";

const useSort = () => {
  const { data, setLocallyManipulatedData, setFilters, filters } = useDataContext();
  const handleSort = async (key: "category" | "source" | "author" | "date", item: string | boolean) => {
    let result = data.articles;

    // sort article by categories
    if (filters.categories.length > 0 || key === "category") {
      const categories = filters.categories.includes(item as string)
        ? filters.categories.filter((cat) => cat !== item)
        : [...filters.categories, item as string];
      result = categories.length > 0 ? result.filter((data) => categories.some((category) => data.category.includes(category))) : result;
      setFilters((prev) => ({ ...prev, categories }));
    }

    // sort article by authors
    if (filters.authors.length > 0 || key === "author") {
      const authors = filters.authors.includes(item as string) ? filters.authors.filter((cat) => cat !== item) : [...filters.authors, item as string];
      result = authors.length > 0 ? result.filter((data) => authors.some((author) => data.author.includes(author))) : result;
      setFilters((prev) => ({ ...prev, authors }));
    }

    // sort article by sources
    if (filters.sources.length > 0 || key === "source") {
      const sources = filters.sources.includes(item as string) ? filters.sources.filter((cat) => cat !== item) : [...filters.sources, item as string];
      result = sources.length > 0 ? result.filter((data) => sources.some((source) => data.source.includes(source))) : result;
      setFilters((prev) => ({ ...prev, sources }));
    }

    setLocallyManipulatedData(result);
  };
  return { handleSort };
};

export default useSort;
