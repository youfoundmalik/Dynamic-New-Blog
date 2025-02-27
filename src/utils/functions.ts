import { GuardianArticle, NewsArticle, NormalizedArticle, NewYorkTimesArticle } from "@/types";

export const normalizeArticles = (array: (GuardianArticle | NewYorkTimesArticle | NewsArticle)[]): NormalizedArticle[] =>
  array.map((article) => {
    if ("title" in article) {
      const data = article as unknown as NewsArticle;
      return {
        title: data?.title || "",
        date: data?.publishedAt || new Date(),
        category: inferNewsApiCategory(article),
        source: data?.source?.name || "News Api",
        author: data?.author || "Anonymous",
        link: data?.url || "#",
        snippet: data?.description || "",
        imageUrl: data?.urlToImage || null,
      };
    } else if ("webTitle" in article) {
      const data = article as unknown as GuardianArticle;
      return {
        title: data?.webTitle || "",
        date: data?.webPublicationDate || new Date(),
        category: data?.pillarName || "General",
        source: "The Guardian",
        author: data?.fields?.byline || "Anonymous",
        link: data?.webUrl || "#",
        snippet: data?.fields?.trailText || "",
        imageUrl: data?.fields?.thumbnail || null,
      };
    } else if ("headline" in article) {
      const data = article as unknown as NewYorkTimesArticle;
      return {
        title: data?.headline?.main || "",
        date: data?.pub_date || new Date(),
        category: data?.section_name || "General",
        source: data?.source || "The Guardian",
        author: data?.byline?.original || "Anonymous",
        link: data?.web_url || "#",
        snippet: data?.snippet || "",
        imageUrl: data?.multimedia?.[0]?.url ? data?.web_url?.split(".com")?.[0] + ".com/" + data.multimedia[0].url : null,
      };
    }
    throw new Error("Unknown article format");
  });

export const shuffleArray = (array: NormalizedArticle[]) => {
  return array
    .map((item) => ({ item, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map((i) => i.item);
};

export const sortAscending = (array: NormalizedArticle[]) =>
  array.map((item) => item).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

export const sortDescending = (array: NormalizedArticle[]) =>
  array.map((item) => item).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

export const inferNewsApiCategory = (article: NewsArticle) => {
  const techKeywords = ["tech", "AI", "software", "laptop", "tesla", "microsoft", "camera", "bluetooth"]; // more keywords can be added
  const businessKeywords = ["finance", "market", "stock", "economy"]; // more keywords can be added
  const entertainmentKeywords = ["disney", "netflix", "show", "movie", "tv", "music"]; // more keywords can be added

  if (techKeywords.some((word) => article.title.toLowerCase().includes(word))) {
    return "Technology";
  }
  if (entertainmentKeywords.some((word) => article.title.toLowerCase().includes(word))) {
    return "Entertainment";
  }
  if (businessKeywords.some((word) => article.title.toLowerCase().includes(word))) {
    return "Business";
  }
  return "General"; // Default category (more category arrays can be added and checked for)
};
