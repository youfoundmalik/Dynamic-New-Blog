import axios from "axios";
import { config } from "@/utils/config";

export const fetchNews = async (query = "", page = 1) => {
  try {
    // const [newsApiRes, guardianRes, nytRes] = await Promise.all([
    const [guardianRes, nytRes] = await Promise.all([
      //   axios.get(`https://newsapi.org/v2/everything?q=${query}&pageSize=10&page=${page}&apiKey=${config.newsApi}`),
      axios.get(`https://content.guardianapis.com/search?q=${query}&show-fields=trailText,thumbnail,byline&page=${page}&api-key=${config.guardian}`),
      axios.get(`https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${query}&page=${page}&api-key=${config.nyt}`),
    ]);

    // return [...newsApiRes.data.articles, ...guardianRes.data.response.results, ...nytRes.data.response.docs];
    return [...guardianRes.data.response.results, ...nytRes.data.response.docs];
  } catch (error) {
    console.error("Error fetching news:", error);
    return [];
  }
};
