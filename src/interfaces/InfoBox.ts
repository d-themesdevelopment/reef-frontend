import type Media from "./Media";

export default interface InfoBox {
  id: number;
  title: string;
  desc: string;
  media: Media;
}
