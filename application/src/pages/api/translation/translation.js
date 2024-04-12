import axios from 'axios';

/**
 * This API route is for translating text. It uses the axios library for the API call.
 * @param {string} originalText - The text to be translated.
 * @param {string} targetLanguage - The target language to translate to.
 * @returns {Promise<string>} - A promise that resolves to the translated text.
 */
const translateText = async (originalText, targetLanguage) => {
  try {
    const response = await axios.post(
      'https://translate.googleapis.com/$discovery/rest?version=v3',
      {
        q: originalText,
        source: 'auto', // Auto-detect source language
        target: targetLanguage,
        format: 'text'
      },
      {
        params: {
          key: 'AIzaSyA-AekMINfm-AM4QySqdNAFT0c7Xr5Zrf4'
        }
      }
    );

    const translatedText = response.data.data.translations[0].translatedText;
    return translatedText;
  } catch (error) {
    console.error('Error translating text:', error);
    throw error;
  }
};

export { translateText };
