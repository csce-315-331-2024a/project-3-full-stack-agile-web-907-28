// ToggleTTS.js

import React, { useState } from 'react';
import { speak } from '@/pages/api/text_to_speech/textToSpeechAPI';

const ToggleTTS = () => {
  const [ttsEnabled, setTTSenabled] = useState(true);

  const toggleTTS = () => {
    const newState = !ttsEnabled;
    setTTSenabled(newState);
    speak(newState ? 'Text To Speech enabled' : 'Text To Speech disabled');
  };

  return (
    <div style={{ textAlign: 'left' }}>
      <button onClick={toggleTTS} style={{ textAlign: 'left' }}>
        <span style={{ textAlign: 'left' }}>
          {ttsEnabled ? 'Disable Text To Speech' : 'Enable Text To Speech'}
        </span>
      </button>
    </div>
  );
};

export default ToggleTTS;
