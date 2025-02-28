import { sortNewest, sortRelevance } from "./utils/constants";

export interface AppFiltersModel {
  sources: string[];
  authors: string[];
  categories: string[];
}

export interface ApiParamsModel {
  sort: typeof sortNewest | typeof sortRelevance;
  query: string;
  page: number;
  startDate?: string;
  endDate?: string;
}

export interface NormalizedArticle {
  title: string;
  date: string | Date;
  category: string;
  source: string;
  link: string;
  imageUrl: string | null;
  author: string;
}

export interface GuardianArticle {
  id: string;
  webPublicationDate: string;
  webTitle: string;
  webUrl: string;
  pillarName: string;
  fields: {
    trailText: string;
    thumbnail: string;
    byline: string;
  };
}

export interface NewYorkTimesArticle {
  web_url: string;
  snippet: string;
  source: string;
  pub_date: string;
  section_name: string;
  _id: string;
  headline: {
    main: string;
  };
  multimedia: {
    url: string;
  }[];
  byline: { original: string };
}

export interface NewsArticle {
  source: {
    name: string;
  };
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string;
}
