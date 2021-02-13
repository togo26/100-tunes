import React from 'react';
import styled from '@emotion/styled';

import { Button } from '../atoms';

interface AlbumSortingControls {
  onSort(ev: React.MouseEvent<HTMLButtonElement>): void;
}

const AlbumSortingControls: React.FC<AlbumSortingControls> =
  ({ onSort }: AlbumSortingControls) => {
  return (
    <Wrapper>
      <Button id='ranking' onClick={onSort}>Ranking</Button>
      <Button id='name' onClick={onSort}>Name</Button>
      <Button id='releaseDate' onClick={onSort}>Release</Button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 340px;
  padding: 4px;
  margin-bottom: 24px;
`;

export default AlbumSortingControls;
