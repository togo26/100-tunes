import { Album } from './types/album.type';

interface Response {
  id: { attributes: { 'im:id': string } };
  category: { attributes: { term: string }};
  'im:name': { label: string };
  'im:artist': { label: string };
  'im:price': { label: string };
  'im:releaseDate': {
    attributes: { label: string },
    label: string,
  };
  'im:image': [
    { label: string },
    { label: string },
    { label: string },
  ];
}

const API_URL = 'https://itunes.apple.com/us/rss/topalbums/limit=100/json';

const normalizeAlbums = (list: Response[]): Album[] => {
  return list.map((album: Response, i: number) => ({
    ranking: i + 1,
    id: album.id.attributes['im:id'],
    name: album['im:name'].label,
    artist: album['im:artist'].label,
    category: album.category.attributes.term,
    price: album['im:price'].label,
    releaseDate: {
      label: album['im:releaseDate'].attributes.label,
      timestamp: new Date(album['im:releaseDate'].label).getTime(),
    },
    imageUrl: {
      small: album['im:image'][0].label,
      medium: album['im:image'][1].label,
      large: album['im:image'][2].label,
    },
  }));
};

export const fetchAlbums = async (): Promise<[]> => {
  const result = await fetch(API_URL);
  const { feed: { entry } } = await result.json();
  return normalizeAlbums ? normalizeAlbums(entry) : entry;
};
