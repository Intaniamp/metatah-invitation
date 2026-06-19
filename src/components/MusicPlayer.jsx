import React, { useRef, useState, useEffect } from 'react';

export default function MusicPlayer({ isOpened }) {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        if (isOpened && audioRef.current) {
            audioRef.current.play().then(() => {
                setIsPlaying(true);
            }).catch(err => console.log("Autoplay prevented:", err));
        }
    }, [isOpened]);

    const toggleMusik = () => {
        if (!audioRef.current) return;
        
        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
        } else {
            audioRef.current.play();
            setIsPlaying(true);
        }
    };

    return (
        <>
            <audio id="musik" ref={audioRef} loop>
                <source src="/Bali Shanti.mp3" type="audio/mp3" />
            </audio>
            {isOpened && (
                <button 
                    id="tombol-musik" 
                    type="button" 
                    onClick={toggleMusik} 
                    aria-label="Toggle musik"
                    style={{ display: 'flex' }}
                >
                    <img 
                        id="ikon-musik" 
                        src={isPlaying ? "/music-on.png" : "/music-off.png"} 
                        alt={isPlaying ? "Musik aktif" : "Musik nonaktif"} 
                    />
                </button>
            )}
        </>
    );
}
