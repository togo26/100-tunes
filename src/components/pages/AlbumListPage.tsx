import React, { useEffect, useState } from 'react';
import { ScreenHelmet, ScreenComponentProps } from 'karrotframe';
import { observer } from 'mobx-react';
import { Album } from '../../types/album.type';
import useStore from '../../useStore';
import styled from '@emotion/styled';

interface SortBy {
  ranking: string;
  [name: string]: string;
  releaseDate: string;
}

const initSortBy = {
  ranking: 'desc',
  name: 'desc',
  releaseDate: 'desc',
};

const AlbumListPage: React.FC<ScreenComponentProps> = observer(() => {
  const { albums: { data } } = useStore();
  const [list, setList] = useState<Album[]>([]);
  const [sortBy, setSortBy] = useState<SortBy>(initSortBy);

  useEffect(() => {
    if (!data.length) return;
    initializeDisplayList();
  }, [data]);

  const initializeDisplayList = () => {
    setList(data);
    setSortBy(prevSortBy => ({ ...prevSortBy, ranking: 'asc' }));
  };

  const handleSortList = (ev: any) => {
    const name = ev.target.id;
    const isAscendingOrder = sortBy[name] === 'asc';

    setSortBy(initSortBy);
    setSortBy(prevSortBy => ({
      ...prevSortBy,
      [name]: isAscendingOrder ? 'desc' : 'asc',
    }));

    setList(prevList => {
      const newList = prevList
        .slice()
        .sort((prev: Album, current: Album) => {
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

          if (isAscendingOrder) {
            if (prevValue > currentValue) return -1;
          } else {
            if (prevValue < currentValue) return -1;
          }
          return 1;
        });
      return newList;
    });
  };

  return (
    <Container>
      <ScreenHelmet title='list' />
      <div>
        <button id='ranking' onClick={handleSortList}>Ranking</button>
        <button id='name' onClick={handleSortList}>Name</button>
        <button id='releaseDate' onClick={handleSortList}>Release</button>
      </div>
      <ul>
        {
          list.length ?
          list.map((item: Album) =>
            <li key={item.id}>{`${item.ranking} - ${item.name}}`}</li>)
          :
          <div>No Albums...</div>
        }
      </ul>
    </Container>
  );
});

const Container = styled.div`
`;

export default AlbumListPage;
