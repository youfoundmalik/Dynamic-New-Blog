import axios from "axios";
import { config } from "@/utils/config";
import { ApiParamsModel } from "@/types";

export const fetchNYTAPI = async (queryParams: ApiParamsModel) => {
  const params = new URLSearchParams({
    q: queryParams.query,
    page: queryParams.page.toString(),
    "api-key": config.nyt || "",
    fq: "multimedia:*", // Ensures articles with images
    sort: queryParams.sort,
  });

  if (queryParams.startDate) params.append("begin_date", queryParams.startDate.replace(/-/g, ""));
  if (queryParams.endDate) params.append("end_date", queryParams.endDate.replace(/-/g, ""));

  return axios.get(`https://api.nytimes.com/svc/search/v2/articlesearch.json?${params.toString()}`);
};

export const fetchGuardianAPI = async (queryParams: ApiParamsModel) => {
  const params = new URLSearchParams({
    q: queryParams.query,
    "api-key": config.guardian || "",
    "page-size": "10",
    page: queryParams.page.toString(),
    "show-fields": "thumbnail", // Ensures images are returned
    "order-by": queryParams.sort,
  });

  if (queryParams.startDate) params.append("from-date", queryParams.startDate);
  if (queryParams.endDate) params.append("to-date", queryParams.endDate);

  return axios.get(`https://content.guardianapis.com/search?${params.toString()}`);
};

export const fetchNewsAPI = async (queryParams: ApiParamsModel) => {
  const params = new URLSearchParams({
    pageSize: "10",
    page: queryParams.page.toString(),
    apiKey: config.newsApi ?? "",
  });

  params.append("sortBy", queryParams.sort === "newest" ? "publishedAt" : "relevancy");
  params.append("q", queryParams.query ? queryParams.query : "latest"); // Ensure a query is always included
  if (queryParams.startDate) params.append("from", queryParams.startDate);
  if (queryParams.endDate) params.append("to", queryParams.endDate);

  return axios.get(`https://newsapi.org/v2/everything?${params.toString()}`);
};
