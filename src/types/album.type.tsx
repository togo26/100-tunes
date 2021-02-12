interface ReleaseDate {
  label: string;
  timestamp: number;
}

interface ImageUrl {
  small: string;
  medium: string;
  large: string;
}

export interface Album {
  ranking: number;
  id: string;
  name: string;
  artist: string;
  category: string;
  price: string;
  releaseDate: ReleaseDate;
  imageUrl: ImageUrl;
}
