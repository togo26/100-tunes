import React, { memo } from 'react';
import { Album } from '../../types/album.type';
import styled from '@emotion/styled';
import AlbumCard from './AlbumCard';

interface AlbumListProps {
  list: Album[];
}

const AlbumList: React.FC<AlbumListProps> = ({ list }: AlbumListProps) => {
  return (
    <Wrapper>
      {
        list.length ?
        list.map((item: Album) => <AlbumCard key={item.id} album={item} />)
        :
        <div>No Albums...</div>
      }
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: #000;
  width: 100%;
  height: 100%;
  overflow: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export default memo(AlbumList);
