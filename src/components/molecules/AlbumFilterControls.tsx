import React from 'react';
import styled from '@emotion/styled';

import { Button } from '../atoms';

interface AlbumFilterControls {
  onFilter(ev: React.MouseEvent<HTMLButtonElement>): void;
}

const AlbumFilterControls: React.FC<AlbumFilterControls> =
  ({ onFilter }: AlbumFilterControls) => {
  return (
    <Wrapper>
      <Button id='ranking' onClick={onFilter}>Ranking</Button>
      <Button id='name' onClick={onFilter}>Name</Button>
      <Button id='releaseDate' onClick={onFilter}>Release</Button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 340px;
  padding: 4px;
  margin-bottom: 24px;
`;

export default AlbumFilterControls;
