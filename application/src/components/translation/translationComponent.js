import React, { useEffect } from 'react';

/**
 * This function handles the creation of the Google Translate button. It uses the Google Translate API to translate the text.
 * @returns {JSX.Element}
 */
const GoogleTranslate = () => {
  useEffect(() => {
    // Function to initialize Google Translate
    const googleTranslateElementInit = () => {
      // Ensure window.google.translate is defined before using it
      if (window.google && window.google.translate && !window.googleTranslateElement) {
        window.googleTranslateElement = new window.google.translate.TranslateElement({ pageLanguage: 'en' }, 'google_translate_element');
      }
    };

    // Check if the script is already present
    if (!document.querySelector('#google-translate-script')) {
      // Remove existing Google Translate widgets to prevent duplicates
      const existingWidget = document.querySelector('.goog-te-banner-frame');
      if (existingWidget && existingWidget.parentNode) {
        existingWidget.parentNode.removeChild(existingWidget);
      }

      // Create a new script element
      const script = document.createElement('script');
      script.id = 'google-translate-script';
      script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      document.body.appendChild(script);

      // Assign the initialization function to the window object
      window.googleTranslateElementInit = googleTranslateElementInit;
    } else {
      // Directly initialize Google Translate if the script is already present
      googleTranslateElementInit();
    }

    // Cleanup function to remove the script and reset initialization when the component unmounts
    return () => {
      const script = document.querySelector('#google-translate-script');
      if (script) {
        script.remove();
      }
      delete window.googleTranslateElement;
      const existingWidget = document.querySelector('.goog-te-banner-frame');
      if (existingWidget && existingWidget.parentNode) {
        existingWidget.parentNode.removeChild(existingWidget);
      }
    };
  }, []);

  return <div id="google_translate_element"></div>;
};

export default React.memo(GoogleTranslate);