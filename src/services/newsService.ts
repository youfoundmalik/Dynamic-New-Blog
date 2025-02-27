import { normalizeArticles } from "@/utils/functions";
import { fetchGuardianAPI, fetchNewsAPI, fetchNYTAPI } from "./api";

export const fetchNews = async (query = "", page = 1) => {
  try {
    const [newsApiRes, guardianRes, nytRes] = await Promise.all([fetchNewsAPI(query, page), fetchGuardianAPI(query, page), fetchNYTAPI(query, page)]);
    return normalizeArticles([...newsApiRes.data.articles, ...guardianRes.data.response.results, ...nytRes.data.response.docs]);
  } catch (error) {
    console.error("Error fetching news:", error);
    return [];
    // if (isAxiosError(e)) {
    //   throw new Error(e.response?.data.message);
    // }
  }
};
