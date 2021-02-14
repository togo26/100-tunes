import React, { useEffect } from 'react';
import { Navigator, Screen } from 'karrotframe';
import useStore from './useStore';

import { GlobalStyle } from './styles/GlobalStyle';
import { AlbumListPage, AlbumDetailPage } from './components/pages';

const App: React.FC = () => {
  const { albums: { fetchAlbums } } = useStore();

  useEffect(() => {
    fetchAlbums();
  }, []);

  return (
    <>
      <GlobalStyle />
      <Navigator theme='Cupertino'>
        <Screen path='/' component={AlbumListPage} />
        <Screen path='/albums/:id' component={AlbumDetailPage} />
      </Navigator>
    </>
  );
};

export default App;
