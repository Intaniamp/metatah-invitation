import React from 'react';

export default function Acara() {
    return (
        <section className="acara">
            <h2 className="scroll-animate">Waktu &amp; Tempat</h2>
            <p className="scroll-animate">Acara akan dilaksanakan pada:</p>

            <div className="kotak-waktu">
                <h3 className="scroll-animate">Minggu</h3>
                <h1 className="scroll-animate">30</h1>
                <h3 className="scroll-animate">Agustus 2026</h3>
            </div>

            <p className="scroll-animate"><b>Pukul:</b><br />10.00 WITA - Selesai</p>
            <p className="scroll-animate"><b>Lokasi:</b><br />Jl. Ir. Ida Bagus Oka Gang Kujang No. 20, Panjer, Denpasar Selatan</p>
            <a href="https://maps.app.goo.gl/UHgByHXcoDA3qtHA7" target="_blank" rel="noreferrer" className="btn-lokasi">
                <span className="scroll-animate">📍 Lihat Google Maps</span>
            </a>
        </section>
    );
}
