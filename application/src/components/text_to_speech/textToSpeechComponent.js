import { useState, useEffect } from 'react';

const TTSButton = ({ ttsEnabled, onToggle }) => {
  const [enabled, setEnabled] = useState(ttsEnabled);
  const [currentUtterance, setCurrentUtterance] = useState(null);

  useEffect(() => {
    setEnabled(ttsEnabled);
  }, [ttsEnabled]);

  useEffect(() => {
    const handleMouseOver = (event) => {
      if (enabled) {
        if (currentUtterance) {
          window.speechSynthesis.cancel();
        }
        const target = event.target;
        if (target.tagName === 'IMG' && target.alt) {
          speak(target.alt);
        } else if (
          target.tagName === 'P' ||
          target.tagName === 'SPAN' ||
          target.tagName === 'H1' ||
          target.tagName === 'H2' ||
          target.tagName === 'H3' ||
          target.tagName === 'H4' ||
          target.tagName === 'H5' ||
          target.tagName === 'H6' ||
          target.tagName == 'B'
        ) {
          speak(target.textContent);
        }
      }
    };

    if (enabled) {
      document.addEventListener('mouseover', handleMouseOver);
    } else {
      document.removeEventListener('mouseover', handleMouseOver);
    }

    return () => {
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, [enabled, currentUtterance]);

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    setCurrentUtterance(utterance);
    utterance.onend = () => {
      setCurrentUtterance(null);
    };
    window.speechSynthesis.speak(utterance);
  };

  const toggleTTS = () => {
    const newEnabled = !enabled;
    setEnabled(newEnabled);
    onToggle(newEnabled);
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
