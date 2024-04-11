import type Media from "./Media";

export default interface CategoryBox {
  id: number;
  title: string;
  desc: string;
  logo: Media;
  background: Media;
}
