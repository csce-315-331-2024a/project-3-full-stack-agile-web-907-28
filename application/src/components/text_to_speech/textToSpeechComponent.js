import { useState, useEffect } from 'react';

const TTSButton = () => {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const handleMouseOver = (event) => {
      if (enabled) {
        const target = event.target;
        if (target.tagName === 'IMG' && target.alt) {
          speak(target.alt);
        } else if (target.tagName === 'P' || target.tagName === 'SPAN' || target.tagName === 'H1' || target.tagName === 'H2' || target.tagName === 'H3' || target.tagName === 'H4' || target.tagName === 'H5' || target.tagName === 'H6') {
          speak(target.textContent);
        }
      }
    };

    if (enabled) {
      document.addEventListener('mouseover', handleMouseOver);
    }

    return () => {
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, [enabled]);

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  };

  const toggleTTS = () => {
    const newEnabled = !enabled;
    setEnabled(newEnabled);
    if (!newEnabled) {
      speak("Text to speech disabled");
    } else {
      speak("Text to speech enabled");

    }
  };

  return (
    <div>
      <button onClick={toggleTTS}>{enabled ? 'Disable TTS' : 'Enable TTS'}</button>
    </div>
  );
};

export default TTSButton;
