import AlbumStore, { Albums } from './stores/albums';

interface useStore {
  albums: Albums
}

const useStore = (): useStore => ({ albums: AlbumStore });

export default useStore;
