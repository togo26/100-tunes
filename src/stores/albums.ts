import { configure, makeAutoObservable, runInAction } from 'mobx';

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

interface ReleaseDate {
  label: string;
  timestamp: number;
}

interface ImageUrl {
  small: string;
  medium: string;
  large: string;
}

interface respondedAlbum {
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

interface Albums {
  data: Album[];
  state: string;
  error: string | null;
  fetchAlbums: () => void;
}

configure({ enforceActions: 'observed' });

class AlbumStore implements Albums {
  data = [];
  state = 'pending';
  error = null;

  constructor() {
    makeAutoObservable(this);
    this.fetchAlbums = this.fetchAlbums.bind(this);
  }

  async fetchAlbums() {
    this.data = [];
    this.state = 'pending';
    this.error = null;
    try {
      const result = await fetch('https://itunes.apple.com/us/rss/topalbums/limit=100/json');
      const { feed: { entry } } = await result.json();
      const normalizedAlbumList = entry.map((album: respondedAlbum, i: number) => ({
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

      runInAction(() => {
        this.data = normalizedAlbumList;
      });
    } catch (error) {
      runInAction(() => {
        console.error(error);
        this.state = 'error';
        this.error = error;
      });
    } finally {
      runInAction(() => {
        this.state = 'done';
      });
    }
  }
}

export default new AlbumStore();
