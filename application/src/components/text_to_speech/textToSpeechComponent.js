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
    
      speak(target.textContent);
    
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
