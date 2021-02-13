import AlbumStore from './stores/albums';

interface useStore {
  albums: typeof AlbumStore
}

const useStore = (): useStore => ({ albums: AlbumStore });

export default useStore;
