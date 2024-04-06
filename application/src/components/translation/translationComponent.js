import React, { useState } from 'react';
import { translateText } from '/api/translate/translate';

const TranslationComponent = () => {
  const [originalText, setOriginalText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [targetLanguage, setTargetLanguage] = useState('en'); // Default target language

  const handleTranslate = async () => {
    try {
      const translatedText = await translateText(originalText, targetLanguage);
      setTranslatedText(translatedText);
    } catch (error) {
      // Handle translation error
      console.error('Translation error:', error);
    }
  };

  return (
    <div>
      <textarea value={originalText} onChange={(e) => setOriginalText(e.target.value)} />
      <button onClick={handleTranslate}>Translate</button>
      <select value={targetLanguage} onChange={(e) => setTargetLanguage(e.target.value)}>
        <option value="en">English</option>
        <option value="fr">French</option>
        <option value="es">Spanish</option>
        {/* Add more languages as needed */}
      </select>
      <div>
        <h2>Translated Text</h2>
        <p>{translatedText}</p>
      </div>
    </div>
  );
};


export default TranslationComponent;
