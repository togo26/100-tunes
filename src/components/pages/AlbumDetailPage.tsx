import React, { useEffect, useState } from 'react';
import { ScreenComponentProps, ScreenHelmet, useParams } from 'karrotframe';
import { observer } from 'mobx-react';

import { Album } from '../../types/album.type';
import useStore from '../../useStore';

import { AlbumDetail } from '../molecules';

interface Params {
  id: string | undefined;
}

const AlbumDetailPage: React.FC<ScreenComponentProps> = () => {
  const params = useParams<Params>();
  const { albums: { findTargetAlbum } } = useStore();
  const [album, setAlbum] = useState<Album>();

  useEffect(() => {
    if (!params?.id) return;
    const targetAlbum = findTargetAlbum(params.id);
    setAlbum(targetAlbum);
  }, []);

  return (
    <>
      <ScreenHelmet title='Detail' />
      {album && <AlbumDetail album={album} />}
    </>
  );
};

export default observer(AlbumDetailPage);
