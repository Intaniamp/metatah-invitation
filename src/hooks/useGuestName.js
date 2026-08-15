import { useMemo } from 'react'

/**
 * Reads the guest name from the URL query string so each shared link
 * can be personalized, e.g. https://yoursite.com/?to=Budi%20Santoso
 * Falls back to "Tamu Undangan" when no name is provided.
 */
export default function useGuestName() {
  return useMemo(() => {
    if (typeof window === 'undefined') return 'Tamu Undangan'
    const params = new URLSearchParams(window.location.search)
    const name = params.get('to')
    return name && name.trim().length > 0 ? name.trim() : 'Tamu Undangan'
  }, [])
}
