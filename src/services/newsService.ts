import { normalizeArticles } from "@/utils/functions";
import { fetchGuardianAPI, fetchNewsAPI, fetchNYTAPI } from "./api";
import { guardian, newYorkTimes, newsApi } from "@/utils/constants";
import { ApiParamsModel, ArticleResponse, GuardianArticle, NewsArticle, NewYorkTimesArticle, NormalizedArticle } from "@/types";

type ApiFetcher = (params: ApiParamsModel) => Promise<ArticleResponse>;

const apiFetchers: Record<string, ApiFetcher> = {
  [guardian]: fetchGuardianAPI,
  [newYorkTimes]: fetchNYTAPI,
  [newsApi]: fetchNewsAPI,
};

const pushArticles = (data: ArticleResponse["data"], response: (NewsArticle | GuardianArticle | NewYorkTimesArticle)[]) => {
  if (data.articles) {
    response.push(...data.articles);
  } else if (data.response?.results) {
    response.push(...data.response.results);
  } else if (data.response?.docs) {
    response.push(...data.response.docs);
  }
};

export const fetchNews = async (params: ApiParamsModel, apis: string[]): Promise<NormalizedArticle[]> => {
  const response: (NewsArticle | GuardianArticle | NewYorkTimesArticle)[] = [];
  try {
    // same as promises.all (all apis are fetched in parallel and one error will stop the execution)
    for (const api of apis) {
      if (apiFetchers[api]) {
        const res = await apiFetchers[api](params);
        pushArticles(res.data, response);
      }
    }
    return normalizeArticles(response);
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Failed to fetch news.";
    throw new Error(errorMessage);
  }
};
