import './Cover.css'

export default function Cover({ guestName, onOpen }) {
  return (
    <section className="cover paper-bg">

      <div className="cover__content">
        <p className="cover__eyebrow">Undangan Upacara Manusa Yadnya</p>

        <img className="cover__emblem" src="/om.png" alt="Simbol Om" />

        <h1 className="cover__title">Mepandes</h1>

        <div className="cover__to">
          <p className="cover__to-label">Kepada Yth. Bapak/Ibu/Saudara/i</p>
          <p className="cover__to-name">{guestName}</p>
        </div>

        <button className="btn-primary cover__button" onClick={onOpen}>
          <EnvelopeIcon />
          Buka Undangan
        </button>
      </div>
    </section>
  )
}

function EnvelopeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2.5" y="4.5" width="19" height="15" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M3 6l9 7 9-7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
