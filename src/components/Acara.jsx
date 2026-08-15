import './Acara.css'

const events = [
  {
    name: 'Mepandes',
    date: 'Sabtu, 29 Agustus 2026',
    time: 'Pukul 08.00 - 11.00 WITA',
  },
  {
    name: 'Resepsi',
    date: 'Minggu, 30 Agustus 2026',
    time: 'Pukul 10.00 - Selesai',
  },
]

export default function Acara({ mapsUrl = 'https://maps.app.goo.gl/TK8FLQmSMXJgwp7i7' }) {
  return (
    <section className="acara paper-bg">
      <span className="corner-ornament top-right" />
      <span className="corner-ornament bottom-left" />

      <div className="acara__card frosted-card">
        <h2 className="acara__title">Upacara Manusa Yadnya</h2>

        {events.map((event, i) => (
          <div className="acara__event" key={event.name}>
            <h3 className="acara__event-name">{event.name}</h3>
            <p className="acara__event-date">{event.date}</p>
            <p className="acara__event-time">{event.time}</p>
            {i === 0 && <p className="acara__ampersand">&amp;</p>}
          </div>
        ))}

        <a className="btn-primary acara__button" href={mapsUrl} target="_blank" rel="noreferrer">
          <PinIcon />
          Lihat Lokasi
        </a>
      </div>
    </section>
  )
}

function PinIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 22s7-7.58 7-13a7 7 0 10-14 0c0 5.42 7 13 7 13z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="9" r="2.4" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  )
}
