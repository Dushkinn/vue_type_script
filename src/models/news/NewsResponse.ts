import type News from "@/models/news/news";

export default class NewsResponse {
  status!: string;
  totalResults!: number;
  results!: [News];
}
