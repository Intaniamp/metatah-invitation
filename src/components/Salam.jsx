import './Salam.css'

const peserta = [
  {
    photo: '/intania.jpeg',
    displayName: 'Intania',
    fullName: 'I Gusti Agung Ayu Intania Mutiara Putri',
    role: 'Putri Pertama',
  },
  {
    photo: '/cantika.jpeg',
    displayName: 'Cantika',
    fullName: 'I Gusti Agung Ayu Cantika Paramita Putri',
    role: 'Putri Kedua',
  },
]

export default function Salam() {
  return (
    <section className="salam paper-bg">
      <span className="corner-ornament top-left" />
      <span className="corner-ornament bottom-right" />

      <div className="salam__content">
        <p className="eyebrow-balinese salam__greeting"><img src="/om swastyastu.png" alt="Swastyastu" /></p>

        <p className="salam__intro">
          Atas Asung Kertha Wara Nugraha Ida Sang Hyang Widhi Wasa/ Tuhan Yang Maha Esa, kami
          bermaksud mengundang Bapak/ Ibu/ Saudara/ i pada Upacara Manusa Yadnya
          Mepandes/Potong Gigi kedua putri kami.
        </p>

        <div className="divider-motif" aria-hidden="true">
          <img src="/lineup.png" alt="Lineup" />
        </div>

        {peserta.map((p, i) => (
          <div className="salam__person" key={p.displayName}>
            <h2 className="salam__name">{p.displayName}</h2>
            <p className="salam__fullname">{p.fullName}</p>
            <p className="salam__role">{p.role}</p>
            {i === 0 && <p className="salam__ampersand">&amp;</p>}
          </div>
        ))}

        <div className="divider-motif" aria-hidden="true">
          <img src="/lineup.png" alt="Lineup" />
        </div>
      </div>
    </section>
  )
}
