import { useState, useEffect } from 'react';

/**
 * This function handles the creation of the Text to Speech button. It uses the window.speechSynthesis API to speak the text.
 * @param {boolean} ttsEnabled - The enabled state of the Text to Speech.
 * @param {function} onToggle - The callback function for toggling the Text to Speech.
 * @returns {JSX.Element}
 */
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
          target.tagName == 'B' ||
          target.tagName == 'DIV' ||
          target.tagName == 'BUTTON' ||
          target.tagName == 'TD' ||
          target.tagName == 'TH'
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

  /**
   * This function handles the speaking of the text. It uses the window.speechSynthesis API to speak the text.
   * @param {string} text - The text to speak.
   */
  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    setCurrentUtterance(utterance);
    utterance.onend = () => {
      setCurrentUtterance(null);
    };
    window.speechSynthesis.speak(utterance);
  };

  /**
   * This function handles the toggling of the Text to Speech. It sets the enabled state to the opposite of the current enabled state and calls the onToggle callback.
   */
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
    <button
        onClick={toggleTTS}
        style={{
          padding: '8px 20px',
          fontSize: '16px',
          backgroundColor: '#D3D3D3',
          border: 'none',
          borderRadius: '10px',
          cursor: 'pointer',
        }}
      >
        {enabled ? 'Disable Text to Speech' : 'Enable Text to Speech'}
      </button>
    </div>
  );
};

export default TTSButton;
