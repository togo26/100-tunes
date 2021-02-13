import React, { useEffect, useState } from 'react';
import { ScreenComponentProps, ScreenHelmet, useParams } from 'karrotframe';
import { observer } from 'mobx-react';
import useStore from '../../useStore';
import { Album } from '../../types/album.type';
import styled from '@emotion/styled';

const AlbumDetailPage: React.FC<ScreenComponentProps> = () => {
  const params: any = useParams();
  const { albums: { findTargetAlbum } } = useStore();
  const [album, setAlbum] = useState<Album>();

  useEffect(() => {
    if (!params.id) return;
    const targetAlbum = findTargetAlbum(params.id);
    setAlbum(targetAlbum);
  }, []);

  return (
    <>
      <ScreenHelmet title='Detail' />
      {album &&
        <Wrapper>
          <Ranking>{album.ranking}</Ranking>
          <AlbumImage src={album.imageUrl.large} alt={album.name} draggable={false} />
          <Category>{album.category}</Category>
          <AlbumName>{album.name}</AlbumName>
          <Artist>{album.artist}</Artist>
          <ReleaseDate>{album.releaseDate.label}</ReleaseDate>
          <BackgroundImage src={album.imageUrl.large} />
        </Wrapper>
      }
    </>
  );
};

const Wrapper = styled.div`
  z-index: 1;
  display: flex;
  width: 100%;
  height: 100vh;
  flex-direction: column;
  align-items: center;
  padding: 0 0 36px 0;
  text-align: center;
  background-color: #000;
  color: #fff;
`;

const BackgroundImage = styled.img`
  position: fixed;
  top: 0;
  left: 50%;
  height: 100%;
  opacity: 0.6;
  filter: blur(150px);
  transform: translateX(-50%);
`;

const Ranking = styled.p`
  margin: 32px 0;
  font-size: 24px;
  font-weight: 700;
  text-decoration: underline;
`;

const AlbumImage = styled.img`
  z-index: 10;
  width: 280px;
  height: 280px;
  border-radius: 16px;
  margin-bottom: 24px;
`;

const Category = styled.p`
  border: 1px solid #fff;
  padding: 8px 12px;
  border-radius: 8px;
  margin-bottom: 18px;
  font-size: 12px;
  font-weight: 700;
`;

const AlbumName = styled.h1`
  margin-bottom: 8px;
  font-size: 32px;
  width: 320px;
`;

const Artist = styled.p`
  margin-bottom: 12px;
  font-size: 14px;
  font-weight: 700;
`;

const ReleaseDate = styled.p`
  margin-bottom: 18px;
  color: gray;
`;

export default observer(AlbumDetailPage);
