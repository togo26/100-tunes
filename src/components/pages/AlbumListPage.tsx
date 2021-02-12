import React, { useEffect, useState } from 'react';
import { ScreenComponentProps, Link } from 'karrotframe';
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
      <HeadText>
        100:tunes
      </HeadText>
      <AlbumFilterControls>
        <button id='ranking' onClick={handleSortList}>Ranking</button>
        <button id='name' onClick={handleSortList}>Name</button>
        <button id='releaseDate' onClick={handleSortList}>Release</button>
      </AlbumFilterControls>
      <AlbumList>
        {
          list.length ?
          list.map((item: Album) =>
            <Link key={item.id} to={`/albums/${item.id}`}>
              <AlbumCardWrapper>
                <AlbumShadow src={item.imageUrl.large} alt={item.name} />
                <AlbumCard>
                  <AlbumTitle>{item.name}</AlbumTitle>
                  <AlbumRanking>{item.ranking}</AlbumRanking>
                  <Gradient />
                  <AlbumImage src={item.imageUrl.large} alt={item.name} />
                </AlbumCard>
              </AlbumCardWrapper>
            </Link>,
            )
          :
          <div>No Albums...</div>
        }
      </AlbumList>
      <ContainerGradient />
    </Container>
  );
});

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

const AlbumFilterControls = styled.div`
  width: 340px;
  padding: 4px;
  margin-bottom: 24px;
  color: white;

  button {
    margin-right: 10px;
    text-decoration: underline;
    font-weight: 700;
  }
`;

const AlbumList = styled.div`
  background-color: #000;
  width: 100%;
  height: 100%;
  overflow: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const AlbumCard = styled.div`
  position: relative;
  width: 320px;
  height: 320px;
  border-radius: 16px;
  margin-bottom: 2rem;
  overflow: hidden;
  color: white;
  background-color: #000;
`;

const AlbumImage = styled.img`
  width: 100%;
  height: 100%;
`;

const AlbumTitle = styled.h2`
  z-index: 10;
  position: absolute;
  left: 20px;
  bottom: 20px;
  width: 280px;
  font-size: 32px;
`;

const AlbumRanking = styled.h1`
  z-index: 10;
  position: absolute;
  right: 22px;
  top: 14px;
  font-size: 52px;
`;

const Gradient = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0.5;
  background: linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 100%);
`;

const ContainerGradient = styled(Gradient)`
  z-index: 15;
  position: fixed;
  bottom: 0;
  opacity: 1;
  height: 26%;
`;

const AlbumCardWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 380px;
`;

const AlbumShadow = styled.img`
  position: absolute;
  top: 16px;
  width: 300px;
  height: 90%;
  border-radius: 24px;
  filter: blur(18px);
  opacity: 0.4;
`;

export default AlbumListPage;
