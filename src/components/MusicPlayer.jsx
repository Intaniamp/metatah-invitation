import './MusicPlayer.css'

export default function MusicPlayer({ audioRef, isPlaying, onToggle, isVisible = true }) {
  return (
    <div className={`music-player ${isVisible ? '' : 'music-player--hidden'}`}>
      <audio ref={audioRef} src="/backsound.mp3" loop preload="auto" playsInline />
      <button
        className="music-player__button"
        onClick={onToggle}
        aria-label={isPlaying ? 'Matikan musik' : 'Nyalakan musik'}
      >
        <img src={isPlaying ? '/music-on.png' : '/music-off.png'} alt="" />
      </button>
    </div>
  )
}
