// components/TTSButton.js

import { useState, useEffect } from 'react';

const TTSButton = () => {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (enabled) {
      speak("Text to speech enabled");
      document.addEventListener('mouseover', handleMouseOver);
    } else {
      speak("Text to speech disabled");
      document.removeEventListener('mouseover', handleMouseOver);
    }
    return () => {
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, [enabled]);

  const handleMouseOver = (event) => {
    const target = event.target;
    if (target.tagName === 'P' || target.tagName === 'SPAN' || target.tagName === 'H1' || target.tagName === 'H2' || target.tagName === 'H3' || target.tagName === 'H4' || target.tagName === 'H5' || target.tagName === 'H6') {
      speak(target.textContent);
    }
  };

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  };

  const toggleTTS = () => {
    setEnabled(!enabled);
  };

  return (
    <button onClick={toggleTTS}>{enabled ? 'Disable TTS' : 'Enable TTS'}</button>
  );
};

export default TTSButton;
