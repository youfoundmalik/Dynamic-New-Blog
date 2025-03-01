import { useDataContext } from "@/context/data-context";

const useSort = () => {
  const { data, setLocallyManipulatedData, setFilters, filters } = useDataContext();
  const handleSort = async (key: "category" | "source" | "author" | "date", item: string[] | string) => {
    let result = data.articles;

    // Check if items is an array or a single string
    const isArray = Array.isArray(item);
    const itemsArray = isArray ? item : [item]; // Convert to array if it's a single string

    // sort article by categories in an array
    if (filters.categories.length > 0 || key === "category") {
      const categories = key === "category" ? itemsArray : filters.categories;

      result = categories.length > 0 ? result.filter((data) => categories.some((category) => data.category.includes(category))) : result;
      setFilters((prev) => ({ ...prev, categories }));
    }

    // sort article by authors
    if (filters.authors.length > 0 || key === "author") {
      const authors = key === "author" ? itemsArray : filters.authors;

      result = authors.length > 0 ? result.filter((data) => authors.some((author) => data.author.includes(author))) : result;
      setFilters((prev) => ({ ...prev, authors }));
    }

    // sort article by sources
    if (filters.sources.length > 0 || key === "source") {
      const sources = key === "source" ? itemsArray : filters.sources;

      result = sources.length > 0 ? result.filter((data) => sources.some((source) => data.source.includes(source))) : result;
      setFilters((prev) => ({ ...prev, sources }));
    }

    setLocallyManipulatedData(result);
  };
  return { handleSort };
};

export default useSort;
