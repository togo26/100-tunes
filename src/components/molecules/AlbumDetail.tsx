import React from 'react';
import { Album } from '../../types/album.type';
import styled from '@emotion/styled';

interface AlbumDetailProps {
  album: Album;
}

const AlbumDetail: React.FC<AlbumDetailProps> = ({ album }: AlbumDetailProps) => {
  const {
    ranking,
    imageUrl,
    name,
    category,
    artist,
    releaseDate,
  } = album;

  return (
    <Wrapper>
      <Ranking>{ranking}</Ranking>
      <AlbumImage src={imageUrl.large} alt={name} draggable={false} />
      <Category>{category}</Category>
      <AlbumName>{name}</AlbumName>
      <Artist>{artist}</Artist>
      <ReleaseDate>{releaseDate.label}</ReleaseDate>
      <BackgroundImage src={imageUrl.large} />
    </Wrapper>
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

export default AlbumDetail;
