// useHoverTTS.js

import { useEffect, useState } from 'react';
import { speak } from '@/pages/api/text_to_speech/textToSpeechAPI';

const useHoverTTS = (text, ttsEnabled) => {
  useEffect(() => {
    const handleHover = () => {
      if (ttsEnabled) {
        speak(text);
      }
    };

    const element = document.querySelector('.hoverable-text');

    if (element) {
      element.addEventListener('mouseenter', handleHover);
      return () => {
        element.removeEventListener('mouseenter', handleHover);
      };
    }
  }, [text, ttsEnabled]);
};

export default useHoverTTS;
