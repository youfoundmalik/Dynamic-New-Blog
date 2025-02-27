import { NewsArticle } from "@/types";

export const shuffleArray = (array: NewsArticle[]) => {
  return array
    .map((item) => ({ item, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ item }) => ({
      ...item,
      title: item?.webTitle || item?.headline?.main || "",
      date: item?.pub_date || item?.webPublicationDate || new Date(),
      category: item?.pillarName || item?.section_name || "All",
      source: item?.source || "The Guardian",
      author: item?.byline?.original || item?.fields?.byline || "Anonymous",
      link: item?.webUrl || item?.web_url || "#",
      snippet: item?.snippet || item?.fields?.trailText || "",
      imageUrl: item?.multimedia?.[0]?.url
        ? item?.web_url?.split(".com")?.[0] + ".com/" + item.multimedia[0].url
        : item?.fields
        ? item.fields?.thumbnail
        : null,
    }));
};

export const sortAscending = (array: NewsArticle[]) =>
  array.map((item) => item).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

export const sortDescending = (array: NewsArticle[]) =>
  array.map((item) => item).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
