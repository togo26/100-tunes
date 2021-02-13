import React, { useEffect, useState } from 'react';
import { ScreenComponentProps } from 'karrotframe';
import { observer } from 'mobx-react';
import styled from '@emotion/styled';

import { Album } from '../../types/album.type';
import useStore from '../../useStore';

import { AlbumList, AlbumFilterControls } from '../molecules';

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

const AlbumListPage: React.FC<ScreenComponentProps> = () => {
  const { albums: { albumList } } = useStore();
  const [list, setList] = useState<Album[]>([]);
  const [sortBy, setSortBy] = useState<SortBy>(initSortBy);

  useEffect(() => {
    if (!albumList.length) return;
    initializeDisplayList();
  }, [albumList]);

  const initializeDisplayList = () => {
    setList(albumList);
    setSortBy(prevSortBy => ({ ...prevSortBy, ranking: 'asc' }));
  };

  const handleSortList = (ev: React.MouseEvent<HTMLButtonElement>) => {
    const name = ev.currentTarget.id;
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

          if (isAscendingOrder && prevValue > currentValue) return -1;
          else if (prevValue < currentValue) return -1;
          return 1;
        });
      return newList;
    });
  };

  return (
    <Container>
      <HeadText>100:tunes</HeadText>
      <AlbumFilterControls onFilter={handleSortList} />
      <AlbumList list={list} />
      <ContainerGradientBox />
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #000;
  height: 100%;
`;

const HeadText = styled.h1`
  width: 340px;
  color: white;
  padding: 28px 0 28px 0;
  font-size: 54px;
  font-weight: 700;
`;

const ContainerGradientBox = styled.div`
  z-index: 15;
  position: fixed;
  bottom: 0;
  opacity: 1;
  background: linear-gradient(
    180deg, rgba(0,0,0,0) 0%,
    rgba(0,0,0,1) 100%
  );
`;

export default observer(AlbumListPage);
