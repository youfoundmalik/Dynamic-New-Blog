import { normalizeArticles } from "@/utils/functions";
import { fetchGuardianAPI, fetchNewsAPI, fetchNYTAPI } from "./api";
import { guardian, newYorkTimes, newsApi } from "@/utils/constants";

export const fetchNews = async (query = "", apis: string[], page = 1) => {
  const response = [];
  try {
    if (apis.includes(guardian)) {
      const res = await fetchGuardianAPI(query, page);
      response.push(...res.data.response.results);
    }
    if (apis.includes(newYorkTimes)) {
      const res = await fetchNYTAPI(query, page);
      response.push(...res.data.response.docs);
    }
    if (apis.includes(newsApi)) {
      const res = await fetchNewsAPI(query, page);
      response.push(...res.data.articles);
    }
    return normalizeArticles(response);
  } catch (error) {
    console.error("Error fetching news:", error);
    return [];
  }
};
