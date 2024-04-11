import type Media from "./Media";

export default interface Service {
  slug: string;
  title: string;
  desc: string;
  media: Media;
}
