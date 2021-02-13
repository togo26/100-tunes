import React from 'react';
import { Link } from 'karrotframe';
import { Album } from '../../types/album.type';
import styled from '@emotion/styled';

interface AlbumCardProps {
  album: Album;
}

const AlbumCard: React.FC<AlbumCardProps> = ({ album }: AlbumCardProps) => {
  const { id, imageUrl, name, ranking } = album;
  return (
    <Link to={`/albums/${id}`}>
      <Wrapper>
        <OuterShadowBox src={imageUrl.large} alt={name} />
        <InnerWrapper>
          <Title>{name}</Title>
          <Ranking>{ranking}</Ranking>
          <GradientBox />
          <Cover src={imageUrl.large} alt={name} />
        </InnerWrapper>
      </Wrapper>
    </Link>
  );
};

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 380px;
`;

const InnerWrapper = styled.div`
  position: relative;
  width: 320px;
  height: 320px;
  border-radius: 16px;
  margin-bottom: 2rem;
  overflow: hidden;
  color: white;
  background-color: #000;
`;

const Title = styled.h2`
  z-index: 10;
  position: absolute;
  left: 20px;
  bottom: 20px;
  width: 280px;
  font-size: 32px;
`;

const Ranking = styled.h1`
  z-index: 10;
  position: absolute;
  right: 22px;
  top: 14px;
  font-size: 52px;
  text-decoration: underline;
`;

const Cover = styled.img`
  width: 100%;
  height: 100%;
`;

const GradientBox = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0.5;
  background: linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 100%);
`;

const OuterShadowBox = styled.img`
  position: absolute;
  top: 16px;
  width: 300px;
  height: 90%;
  border-radius: 24px;
  filter: blur(18px);
  opacity: 0.4;
`;

export default AlbumCard;
