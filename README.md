# Next.js News Aggregator

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Overview

This project is a simple and elegant blog site that curates news articles from three open-source news APIs. It presents the articles in a clean paginated layout and provides links to the original sources. Users can personalize their feed, search for news, and filter results based on various criteria.

## Data Sources

The application fetches news from the following APIs:

1. **The Guardian**
2. **New York Times**
3. **News API**

## Features

### Customization
Users can tailor their news feed by selecting which sources to fetch data from. By default, all three APIs are enabled.

### Search (External Query)
Users can search for news directly from the API sources by specifying:
- Keywords
- Date range (published date)
- Sorting order (by relevance or recency)

### Filtering (Internal Sorting)
Users can refine the fetched news using parameters such as:
- Category
- Author
- Publisher (source)

These parameters are dynamically extracted from the fetched data and update with each request.

## Getting Started

### Prerequisites

Before running the project, create a `.env` file in the root directory and add API keys for the three news sources. Refer to the provided sample `.env` file for guidance.

### Installation & Setup

1. Install dependencies:
 ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

2. Start the development server:
```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

Enjoy curating your personalized news feed with this Next.js-powered application!

