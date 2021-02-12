import { configure, makeAutoObservable, runInAction } from 'mobx';
import { Album } from '../types/album.type';
import * as api from '../api';

export interface Albums {
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
      const result = await api.fetchAlbums();
      runInAction(() => {
        this.data = result;
      });
    } catch (error) {
      console.error(error);
      runInAction(() => {
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
