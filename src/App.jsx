import { useState } from 'react'
import Cover from './components/Cover.jsx'
import Salam from './components/Salam.jsx'
import Acara from './components/Acara.jsx'
import Rsvp from './components/Rsvp.jsx'
import Peserta from './components/Peserta.jsx'
import MusicPlayer from './components/MusicPlayer.jsx'
import useGuestName from './hooks/useGuestName.js'
import useMusicPlayer from './hooks/useMusicPlayer.js'
import './App.css'

const GUEST_API_URL =
  'https://script.google.com/macros/s/AKfycbwmD4_Y_3qKNlh2DU4fk9kydyxeYyWPZM8RzdlTQpKz9aVPQ-1qObfyLVnx9RzE1uiyfA/exec'

function normalizeHadir(value) {
  const raw = (value || '').toString().trim().toLowerCase()
  if (raw === 'hadir') return 'hadir'
  if (raw === 'tidak hadir' || raw === 'tidak_hadir') return 'tidak_hadir'
  if (raw === 'masih ragu' || raw === 'ragu') return 'ragu'
  return raw || 'ragu'
}

function hadirLabel(value) {
  const normalized = normalizeHadir(value)
  if (normalized === 'hadir') return 'Hadir'
  if (normalized === 'tidak_hadir') return 'Tidak Hadir'
  return 'Masih Ragu'
}

export default function App() {
  const guestName = useGuestName()
  const { audioRef, isPlaying, start, toggle } = useMusicPlayer()
  const [isOpen, setIsOpen] = useState(false)
  const [wishes, setWishes] = useState([])

  const loadWishes = async () => {
    try {
      const response = await fetch(GUEST_API_URL)
      if (!response.ok) throw new Error('Gagal mengambil data tamu')
      const rows = await response.json()
      if (!Array.isArray(rows)) return

      const normalized = rows
        .map((row) => ({
          nama: (row.Nama || row.nama || '').toString().trim(),
          hadir: normalizeHadir(row.Kehadiran || row.kehadiran || row.hadir),
          ucapan: (row.Ucapan || row.ucapan || '').toString().trim(),
        }))
        .filter((row) => row.nama || row.ucapan)
        .map((row) => ({
          ...row,
          nama: row.nama || 'Tamu',
        }))
        .reverse()

      setWishes(normalized)
    } catch (error) {
      console.error('Gagal memuat data tamu:', error)
    }
  }

  const handleOpen = async () => {
    await start()
    setIsOpen(true)
    loadWishes()
  }

  const handleRsvpSubmit = async (entry) => {
    const normalizedEntry = {
      nama: entry.nama.trim(),
      hadir: normalizeHadir(entry.hadir),
      ucapan: entry.ucapan?.trim() || '',
    }

    setWishes((prev) => [normalizedEntry, ...prev])

    const payload = {
      nama: normalizedEntry.nama,
      Nama: normalizedEntry.nama,
      hadir: normalizedEntry.hadir,
      kehadiran: hadirLabel(normalizedEntry.hadir),
      Kehadiran: hadirLabel(normalizedEntry.hadir),
      ucapan: normalizedEntry.ucapan,
      Ucapan: normalizedEntry.ucapan,
      guest_name: guestName,
      created_at: new Date().toISOString(),
      data: JSON.stringify(normalizedEntry),
    }

    try {
      const response = await fetch(GUEST_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        throw new Error('POST JSON gagal')
      }
    } catch (error) {
      // Fallback: kirim sebagai simple request agar tetap lolos jika endpoint
      // belum mengizinkan CORS preflight untuk application/json.
      const formData = new URLSearchParams()
      formData.set('nama', payload.nama)
      formData.set('Nama', payload.Nama)
      formData.set('hadir', payload.hadir)
      formData.set('kehadiran', payload.kehadiran)
      formData.set('Kehadiran', payload.Kehadiran)
      formData.set('ucapan', payload.ucapan)
      formData.set('Ucapan', payload.Ucapan)
      formData.set('guest_name', payload.guest_name)
      formData.set('created_at', payload.created_at)
      formData.set('data', payload.data)

      await fetch(GUEST_API_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
        body: formData.toString(),
      })

      console.warn('Menggunakan fallback no-cors untuk simpan tamu:', error)
    }
  }

  return (
    <>
      {!isOpen ? (
        <Cover guestName={guestName} onOpen={handleOpen} />
      ) : (
        <div className="app app--open">
          <Salam />
          <Acara />
          <Rsvp guestName={guestName} onSubmit={handleRsvpSubmit} />
          <Peserta entries={wishes} />
        </div>
      )}
      <MusicPlayer audioRef={audioRef} isPlaying={isPlaying} onToggle={toggle} isVisible={isOpen} />
    </>
  )
}
