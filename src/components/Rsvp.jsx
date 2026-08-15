import { useState } from 'react'
import './Rsvp.css'

export default function Rsvp({ guestName, onSubmit }) {
  const [form, setForm] = useState({
    nama: guestName === 'Tamu Undangan' ? '' : guestName,
    hadir: '',
    ucapan: '',
  })
  const [status, setStatus] = useState('idle') // idle | sending | sent

  const handleChange = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.nama.trim() || !form.hadir) return
    setStatus('sending')
    try {
      if (onSubmit) await onSubmit(form)
      setStatus('sent')
      setForm((prev) => ({ ...prev, ucapan: '' }))
    } catch {
      setStatus('idle')
    }
  }

  return (
    <section className="rsvp paper-bg">
      <span className="corner-ornament top-left" />
      <span className="corner-ornament bottom-right" />

      <div className="rsvp__card frosted-card">
        <h2 className="rsvp__title">Konfirmasi Kehadiran</h2>
        <p className="rsvp__subtitle">
          Doa restu Bapak/Ibu/Saudara/i merupakan kehormatan bagi kami.
        </p>

        <form className="rsvp__form" onSubmit={handleSubmit}>
          <input
            className="rsvp__input"
            type="text"
            placeholder="Nama"
            value={form.nama}
            onChange={handleChange('nama')}
            required
          />

          <select
            className="rsvp__input rsvp__select"
            value={form.hadir}
            onChange={handleChange('hadir')}
            required
          >
            <option value="" disabled>
              Kehadiran
            </option>
            <option value="hadir">Hadir</option>
            <option value="tidak_hadir">Tidak Hadir</option>
            <option value="ragu">Masih Ragu</option>
          </select>

          <textarea
            className="rsvp__input rsvp__textarea"
            placeholder="Tulis Ucapan"
            rows={4}
            value={form.ucapan}
            onChange={handleChange('ucapan')}
          />

          <button className="btn-primary rsvp__submit" type="submit" disabled={status === 'sending'}>
            {status === 'sending' ? 'Mengirim...' : status === 'sent' ? 'Terkirim' : 'Kirim'}
          </button>
        </form>

        <div className="divider-motif" aria-hidden="true">
          <img src="/lineup.png" alt="Lineup" />
        </div>

        <p className="rsvp__thanks">
          Atas kehadiran dan doa restu dari Bapak/Ibu/Saudara/i, kami mengucapkan terima kasih
        </p>

        <p className="eyebrow-balinese rsvp__closing"><img src="/om santi santi santi om.png" alt="Om Shanti Shanti Shanti Om" /></p>
      </div>
    </section>
  )
}
