import React, { useState, useEffect } from 'react';
import './index.css';

import Cover from './components/Cover';
import MusicPlayer from './components/MusicPlayer';
import Salam from './components/Salam';
import Peserta from './components/Peserta';
import Acara from './components/Acara';
import Rsvp from './components/Rsvp';
import useScrollAnimation from './hooks/useScrollAnimation';

function App() {
  const [isOpened, setIsOpened] = useState(false);
  const [guestName, setGuestName] = useState('');

  // Extract ?to=... from URL
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const nama = urlParams.get('to') || urlParams.get('untuk');
    if (nama) {
      setGuestName(nama);
    }
  }, []);

  // Initialize scroll animation hook
  useScrollAnimation([isOpened]);

  const handleOpen = () => {
    setIsOpened(true);
  };

  return (
    <>
      <Cover guestName={guestName} onOpen={handleOpen} isOpened={isOpened} />
      
      <MusicPlayer isOpened={isOpened} />

      <main id="konten" style={{ display: isOpened ? 'block' : 'none' }}>
        <Salam />
        <Peserta />
        <Acara />
        <Rsvp initialName={guestName} />
        
        <footer>
          <p>Om Santih, Santih, Santih Om</p>
        </footer>
      </main>
    </>
  );
}

export default App;
