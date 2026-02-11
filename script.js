// >>> PASTE LINK SCRIPT GOOGLE KAMU DISINI <<<
const scriptURL = 'https://script.google.com/macros/s/AKfycbwmD4_Y_3qKNlh2DU4fk9kydyxeYyWPZM8RzdlTQpKz9aVPQ-1qObfyLVnx9RzE1uiyfA/exec'; 

// 1. SAAT WEBSITE DIBUKA: Cek Nama Tamu & Load Ucapan
window.addEventListener('load', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const nama = urlParams.get('to') || urlParams.get('untuk');
    if (nama) {
        document.getElementById('nama-tamu').innerText = nama;
        document.getElementById('input-nama').value = nama;
    }
    loadUcapan(); // Panggil fungsi ambil data
    
    // Inisialisasi scroll animation
    initScrollAnimation();
});

// 2. FUNGSI BUKA UNDANGAN
function bukaUndangan() {
    document.getElementById('cover').style.transform = 'translateY(-100%)';
    document.getElementById('konten').style.display = 'block';
    
    // Play Musik
    const lagu = document.getElementById('musik');
    lagu.play();
    document.getElementById('tombol-musik').style.display = 'flex';
    
    // Trigger scroll animation setelah dibuka
    setTimeout(() => {
        initScrollAnimation();
    }, 100);
}

// 3. TOMBOL MUSIK
function toggleMusik() {
    const lagu = document.getElementById('musik');
    const ikonMusik = document.getElementById('ikon-musik');
    
    if (lagu.paused) {
        lagu.play();
        ikonMusik.src = 'music-on.png';
        ikonMusik.alt = 'Musik aktif';
    } else {
        lagu.pause();
        ikonMusik.src = 'music-off.png';
        ikonMusik.alt = 'Musik nonaktif';
    }
}

// 4. KIRIM DATA KE GOOGLE SHEET
const form = document.forms['submit-to-google-sheet'];
const btnKirim = document.querySelector('.btn-kirim');
const loading = document.getElementById('loading');

form.addEventListener('submit', e => {
    e.preventDefault();
    btnKirim.style.display = 'none';
    loading.style.display = 'block';

    fetch(scriptURL, { method: 'POST', body: new FormData(form)})
        .then(response => {
            loading.style.display = 'none';
            btnKirim.style.display = 'block';
            alert("Ucapan berhasil dikirim!");
            form.reset();
            loadUcapan(); // Refresh daftar ucapan otomatis!
        })
        .catch(error => {
            console.error('Error!', error.message);
            alert("Gagal mengirim.");
        });
});

// 5. AMBIL DATA DARI GOOGLE SHEET (TAMPILKAN KE LAYAR)
function loadUcapan() {
    const listContainer = document.getElementById('list-ucapan');
    
    fetch(scriptURL)
        .then(response => response.json())
        .then(data => {
            listContainer.innerHTML = ''; // Bersihkan loading
            if(data.length === 0) {
                listContainer.innerHTML = '<p style="text-align:center;">Belum ada ucapan.</p>';
                return;
            }
            // Loop bikin kartu
            data.forEach(item => {
                const div = document.createElement('div');
                div.classList.add('kartu-ucapan');
                div.innerHTML = `
                    <h4>${item.Nama} <span class="badge">${item.Kehadiran}</span></h4>
                    <p>${item.Ucapan}</p>
                `;
                listContainer.appendChild(div);
            });
        });
}

// 6. FUNGSI SCROLL ANIMATION (FADE IN SAAT SCROLL)
function initScrollAnimation() {
    const scrollElements = document.querySelectorAll('.scroll-animate');
    
    const elementInView = (el, offset = 100) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop <= 
            (window.innerHeight || document.documentElement.clientHeight) - offset
        );
    };
    
    const displayScrollElement = (element) => {
        element.classList.add('show');
    };
    
    const hideScrollElement = (element) => {
        element.classList.remove('show');
    };
    
    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 100)) {
                displayScrollElement(el);
            }
        });
    };
    
    // Jalankan sekali saat load
    handleScrollAnimation();
    
    // Jalankan saat scroll
    window.addEventListener('scroll', () => {
        handleScrollAnimation();
    });
}