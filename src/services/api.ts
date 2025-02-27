import axios from "axios";
import { config } from "@/utils/config";

export const fetchNYTAPI = async (query: string, page: number) => {
  const params = new URLSearchParams({
    q: query,
    page: page.toString(),
    "api-key": config.nyt || "",
    fq: "multimedia:*", // Ensures articles with images
  });

  return axios.get(`https://api.nytimes.com/svc/search/v2/articlesearch.json?${params.toString()}`);
};

export const fetchGuardianAPI = async (query: string, page: number) => {
  const params = new URLSearchParams({
    q: query,
    "api-key": config.guardian || "",
    "page-size": "10",
    page: page.toString(),
    "show-fields": "thumbnail", // Ensures images are returned
  });

  return axios.get(`https://content.guardianapis.com/search?${params.toString()}`);
};

export const fetchNewsAPI = async (query: string, page: number) => {
  const params = new URLSearchParams({
    pageSize: "10",
    page: page.toString(),
    apiKey: config.newsApi ?? "",
  });

  if (query) {
    params.append("q", query); // Ensure a query is always included
  } else {
    params.append("q", "latest"); // Default query to prevent 400 error
  }

  return axios.get(`https://newsapi.org/v2/everything?${params.toString()}`);
};
