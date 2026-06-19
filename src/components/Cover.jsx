import React from 'react';

export default function Cover({ guestName, onOpen, isOpened }) {
    return (
        <section 
            id="cover" 
            className="cover-section"
            style={{
                transform: isOpened ? 'translateY(-100%)' : 'translateY(0)',
                transition: 'transform 1.2s cubic-bezier(0.645, 0.045, 0.355, 1)'
            }}
        >
            <div className="isian">
                <h3>Upacara Manusa Yadnya</h3>
                <h1>Metatah</h1>
                <h3>29 Agustus 2026</h3>
                <p>Kepada Yth. Bapak/Ibu/Saudara/i</p>
                <div className="kotak-nama">
                    <h2 id="nama-tamu">{guestName || 'Tamu Undangan'}</h2>
                </div>
                <button onClick={onOpen}>Buka Undangan</button>
            </div>
        </section>
    );
}
