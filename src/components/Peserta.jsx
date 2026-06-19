import React from 'react';

export default function Peserta() {
    return (
        <section className="peserta">
            <h2 className="scroll-animate">Sane Metatah:</h2>
            <div className="card">
                <img src="/intania.jpeg" alt="putri 1" className="profile" />
                <h3 className="scroll-animate">I Gusti Agung Ayu Intania Mutiara Putri</h3>
                <p className="scroll-animate">Putri Pertama</p>
            </div>

            <div className="card">
                <img src="/cantika.jpeg" alt="putri 2" className="profile" />
                <h3 className="scroll-animate">I Gusti Agung Ayu Cantika Paramita Putri</h3>
                <p className="scroll-animate">Putri Kedua</p>
            </div>

            <p className="orang-tua scroll-animate">
                Putri dari pasangan:<br />
                Bapak I Gusti Ketut Gede Mantara Putra <br />
                &amp; <br />
                Ibu Sang Ayu Nyoman Sri Handayani
            </p>
        </section>
    );
}
