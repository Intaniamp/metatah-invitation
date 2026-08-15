import './Peserta.css'

const HADIR_LABEL = {
  hadir: 'Hadir',
  tidak_hadir: 'Tidak Hadir',
  ragu: 'Masih Ragu',
}

/**
 * Shows the wall of ucapan/doa left by guests through Rsvp.
 * `entries` is expected as [{ nama, hadir, ucapan }, ...], newest first.
 */
export default function Peserta({ entries = [] }) {
  if (entries.length === 0) {
    return (
      <section className="peserta paper-bg">
        <span className="corner-ornament top-right" />
        <span className="corner-ornament bottom-left" />
        <div className="peserta__card frosted-card">
          <h2 className="peserta__title">Ucapan &amp; Doa</h2>
          <p className="peserta__empty">Jadilah yang pertama mengirimkan ucapan.</p>
        </div>
      </section>
    )
  }

  return (
    <section className="peserta paper-bg">
      <span className="corner-ornament top-right" />
      <span className="corner-ornament bottom-left" />
      <div className="peserta__card frosted-card">
        <h2 className="peserta__title">Ucapan &amp; Doa</h2>

        <ul className="peserta__list">
          {entries.map((entry, i) => (
            <li className="peserta__item" key={`${entry.nama}-${i}`}>
              <div className="peserta__item-head">
                <span className="peserta__item-name">{entry.nama}</span>
                <span className="peserta__item-status">{HADIR_LABEL[entry.hadir] ?? entry.hadir}</span>
              </div>
              {entry.ucapan && <p className="peserta__item-text">{entry.ucapan}</p>}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
