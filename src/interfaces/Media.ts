export default interface Media {
  id: number;
  image: {
    data: {
      attributes: Image;
    };
  };
  alt: string;
}

interface Image {
  url: string;
  width: string;
  height: string;
}
