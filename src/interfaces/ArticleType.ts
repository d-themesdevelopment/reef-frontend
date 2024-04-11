import type Media from "./Media";

export default interface ArticleType {
  slug: string;
  title: string;
  desc: string;
  media: Media;
  date: string;
}
