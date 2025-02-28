import { normalizeArticles } from "@/utils/functions";
import { fetchGuardianAPI, fetchNewsAPI, fetchNYTAPI } from "./api";
import { guardian, newYorkTimes, newsApi } from "@/utils/constants";
import { ApiParamsModel } from "@/types";

export const fetchNews = async (params: ApiParamsModel, apis: string[]) => {
  const response = [];
  try {
    if (apis.includes(guardian)) {
      const res = await fetchGuardianAPI(params);
      response.push(...res.data.response.results);
    }
    if (apis.includes(newYorkTimes)) {
      const res = await fetchNYTAPI(params);
      response.push(...res.data.response.docs);
    }
    if (apis.includes(newsApi)) {
      const res = await fetchNewsAPI(params);
      response.push(...res.data.articles);
    }
    return normalizeArticles(response);
  } catch (error) {
    console.error("Error fetching news:", error);
    return [];
  }
};
