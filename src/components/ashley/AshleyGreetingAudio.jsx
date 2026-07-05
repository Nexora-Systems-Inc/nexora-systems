import { useCallback, useEffect, useRef, useState } from 'react';
import { getAshleyWelcomeAudioSrc } from '../../config/ashleyAssets';
import './AshleyGreetingAudio.css';

const AUTOPLAY_DELAY_MS = 400;

const LABELS = {
  en: { replay: 'Replay', mute: 'Mute', unmute: 'Unmute' },
  fr: { replay: 'Réécouter', mute: 'Muet', unmute: 'Activer le son' },
};

export default function AshleyGreetingAudio({ lang = 'en' }) {
  const audioRef = useRef(null);
  const autoPlayAttemptedRef = useRef(false);
  const [muted, setMuted] = useState(false);
  const src = getAshleyWelcomeAudioSrc(lang);
  const labels = LABELS[lang] ?? LABELS.en;

  const playFromStart = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.currentTime = 0;
    try {
      await audio.play();
    } catch {
      // Autoplay or playback blocked — fail silently.
    }
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return undefined;

    const timeoutId = window.setTimeout(() => {
      if (autoPlayAttemptedRef.current) return;
      autoPlayAttemptedRef.current = true;
      void playFromStart();
    }, AUTOPLAY_DELAY_MS);

    return () => {
      window.clearTimeout(timeoutId);
      audio.pause();
      audio.currentTime = 0;
    };
  }, [src, playFromStart]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return undefined;

    const syncMuted = () => setMuted(audio.muted);

    audio.addEventListener('volumechange', syncMuted);
    return () => audio.removeEventListener('volumechange', syncMuted);
  }, [src]);

  function handleReplay() {
    void playFromStart();
  }

  function handleToggleMute() {
    const audio = audioRef.current;
    if (!audio) return;

    audio.muted = !audio.muted;
    setMuted(audio.muted);
  }

  return (
    <div className="ashley-greeting-audio">
      <audio ref={audioRef} src={src} preload="auto" aria-hidden="true" />
      <div className="ashley-greeting-audio-controls" role="group" aria-label="Ashley greeting audio">
        <button type="button" className="ashley-greeting-audio-btn" onClick={handleReplay}>
          <span className="ashley-greeting-audio-icon" aria-hidden="true">▶</span>
          {labels.replay}
        </button>
        <button
          type="button"
          className="ashley-greeting-audio-btn"
          onClick={handleToggleMute}
          aria-pressed={muted}
        >
          <span className="ashley-greeting-audio-icon" aria-hidden="true">{muted ? '🔇' : '🔊'}</span>
          {muted ? labels.unmute : labels.mute}
        </button>
      </div>
    </div>
  );
}
