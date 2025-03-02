import { GuardianArticle, NewsArticle, NormalizedArticle, NewYorkTimesArticle } from "@/types";

const normalizeArticleData = (data: NewsArticle | GuardianArticle | NewYorkTimesArticle): NormalizedArticle => {
  if ("title" in data) {
    return {
      title: data.title,
      date: data.publishedAt,
      category: inferNewsApiCategory(data),
      source: data.source.name || "News API",
      author: data.author || "Anonymous",
      link: data.url,
      snippet: data.description,
      imageUrl: data.urlToImage,
    };
  } else if ("webTitle" in data) {
    return {
      title: data.webTitle,
      date: data.webPublicationDate,
      category: data.pillarName || "General",
      source: data.fields?.publication || "The Guardian",
      author: data.fields?.byline || "Anonymous",
      link: data.webUrl,
      snippet: data.fields?.trailText || "",
      imageUrl: data.fields?.thumbnail || null,
    };
  } else {
    return {
      title: data.headline.main,
      date: data.pub_date,
      category: data.section_name || "General",
      source: data.source || "NYT",
      author: data.byline?.original?.replace("By ", "") || "Anonymous",
      link: data.web_url,
      snippet: data.snippet,
      imageUrl: data.multimedia?.[0]?.url ? `${data.web_url.split(".com")[0]}.com/${data.multimedia[0].url}` : null,
    };
  }
};

export const normalizeArticles = (array: (GuardianArticle | NewYorkTimesArticle | NewsArticle)[]): NormalizedArticle[] =>
  array.map((article) => normalizeArticleData(article));

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

export const areArraysEqual = (arr1: string[], arr2: string[]): boolean => {
  if (arr1.length !== arr2.length) return false;
  const sorted1 = [...arr1].sort();
  const sorted2 = [...arr2].sort();
  return sorted1.every((value, index) => value === sorted2[index]);
};
