export interface AppFiltersModel {
  isRecent: boolean;
  sources: string[];
  authors: string[];
  categories: string[];
}

export interface NewsArticle extends GuardianArticle, NewYorkTimesArticle {
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
