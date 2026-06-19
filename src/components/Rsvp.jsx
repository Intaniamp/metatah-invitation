import React, { useState, useEffect } from 'react';

const scriptURL = 'https://script.google.com/macros/s/AKfycbwmD4_Y_3qKNlh2DU4fk9kydyxeYyWPZM8RzdlTQpKz9aVPQ-1qObfyLVnx9RzE1uiyfA/exec';

export default function Rsvp({ initialName }) {
    const [isLoading, setIsLoading] = useState(false);
    const [ucapanList, setUcapanList] = useState([]);
    const [isLoadingList, setIsLoadingList] = useState(true);

    const [formData, setFormData] = useState({
        Nama: initialName || '',
        Kehadiran: 'Hadir',
        Ucapan: ''
    });

    useEffect(() => {
        if (initialName) {
            setFormData(prev => ({ ...prev, Nama: initialName }));
        }
    }, [initialName]);

    const loadUcapan = () => {
        setIsLoadingList(true);
        fetch(scriptURL)
            .then(response => response.json())
            .then(data => {
                setUcapanList(data || []);
            })
            .catch(error => {
                console.error("Gagal memuat ucapan:", error);
            })
            .finally(() => {
                setIsLoadingList(false);
            });
    };

    useEffect(() => {
        loadUcapan();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);

        const data = new FormData();
        data.append('Nama', formData.Nama);
        data.append('Kehadiran', formData.Kehadiran);
        data.append('Ucapan', formData.Ucapan);

        fetch(scriptURL, { method: 'POST', body: data })
            .then(() => {
                alert("Ucapan berhasil dikirim!");
                setFormData(prev => ({ ...prev, Ucapan: '' })); // reset ucapan only
                loadUcapan();
            })
            .catch(error => {
                console.error('Error!', error.message);
                alert("Gagal mengirim.");
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    return (
        <section className="RSVP">
            <h2 className="scroll-animate">Mohon Doa Restu</h2>
            <p className="scroll-animate">Doa restu Bapak/Ibu/Saudara/i merupakan kehormatan bagi kami.</p>

            <form onSubmit={handleSubmit} name="submit-to-google-sheet">
                <input 
                    type="text" 
                    name="Nama" 
                    id="input-nama" 
                    placeholder="Nama Lengkap" 
                    required 
                    value={formData.Nama}
                    onChange={handleChange}
                />
                <select 
                    name="Kehadiran" 
                    required
                    value={formData.Kehadiran}
                    onChange={handleChange}
                >
                    <option value="Hadir">Hadir</option>
                    <option value="Tidak Hadir">Berhalangan Hadir</option>
                </select>
                <textarea 
                    name="Ucapan" 
                    placeholder="Tulis ucapan" 
                    rows="3" 
                    required
                    value={formData.Ucapan}
                    onChange={handleChange}
                ></textarea>
                
                {!isLoading && <button type="submit" className="btn-kirim">Kirim Ucapan</button>}
            </form>
            
            {isLoading && <div id="loading" style={{ display: 'block' }}>Mengirim...</div>}

            <div className="daftar-ucapan-container">
                <div id="list-ucapan">
                    {isLoadingList ? (
                        <p style={{ textAlign: 'center', color: '#c9b896' }}>Memuat ucapan...</p>
                    ) : ucapanList.length === 0 ? (
                        <p style={{ textAlign: 'center' }}>Belum ada ucapan.</p>
                    ) : (
                        ucapanList.map((item, index) => (
                            <div key={index} className="kartu-ucapan">
                                <h4>{item.Nama} <span className="badge">{item.Kehadiran}</span></h4>
                                <p>{item.Ucapan}</p>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </section>
    );
}
