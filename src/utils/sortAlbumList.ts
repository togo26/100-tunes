import { Album } from '../types/album.type';

export const sortAlbumList = (
  list: Album[],
  name: string,
  isAscendingOrder: boolean,
): Album[] => {
  return list.sort((prev: Album, current: Album) => {
    let prevValue;
    let currentValue;

    switch (name) {
      case 'name':
        prevValue = prev.name.toLowerCase();
        currentValue = current.name.toLowerCase();
        break;
      case 'releaseDate':
        prevValue = prev.releaseDate.timestamp;
        currentValue = current.releaseDate.timestamp;
        break;
      default:
        prevValue = prev.ranking;
        currentValue = current.ranking;
    }

    if (isAscendingOrder && prevValue > currentValue) return -1;
    else if (prevValue < currentValue) return -1;
    return 1;
  });
};
