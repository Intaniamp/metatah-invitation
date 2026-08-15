import { useRef, useState, useCallback } from 'react'

/**
 * Controls the background music (Bali Shanti.mp3, expected in /public).
 * Call `start()` once, right after the guest opens the invitation
 * (browsers block autoplay before a user gesture).
 */
export default function useMusicPlayer() {
  const audioRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const start = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return Promise.resolve(false)

    audio.muted = false
    audio.volume = 1

    return audio
      .play()
      .then(() => {
        setIsPlaying(true)
        return true
      })
      .catch(() => {
        setIsPlaying(false)
        return false
      })
  }, [])

  const toggle = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    if (isPlaying) {
      audio.pause()
      setIsPlaying(false)
    } else {
      audio.muted = false
      audio.volume = 1
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false))
    }
  }, [isPlaying])

  return { audioRef, isPlaying, start, toggle }
}
