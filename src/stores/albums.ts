import { configure, makeAutoObservable, runInAction } from 'mobx';
import { Album } from '../types/album.type';
import * as api from '../api';

configure({ enforceActions: 'observed' });

class AlbumStore {
  private _list: Album[];
  private _state: string;
  private _error: string | null;

  constructor() {
    this._list = [];
    this._state = 'pending';
    this._error = null;
    this.fetchAlbums = this.fetchAlbums.bind(this);
    this.findTargetAlbum = this.findTargetAlbum.bind(this);
    makeAutoObservable(this);
  }

  findTargetAlbum(targetId: string): Album | undefined {
    return this._list.find(({ id }) => targetId === id);
  }

  get albumList(): Album[] {
    return this._list;
  }

  async fetchAlbums(): Promise<void> {
    this._list = [];
    this._state = 'pending';
    this._error = null;
    try {
      const result = await api.fetchAlbums();
      runInAction(() => {
        this._list = result;
      });
    } catch (error) {
      console.error(error);
      runInAction(() => {
        this._state = 'error';
        this._error = error.message;
      });
    } finally {
      runInAction(() => {
        this._state = 'done';
      });
    }
  }
}

export default new AlbumStore();
